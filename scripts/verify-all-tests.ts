import * as fs from "fs";
import * as path from "path";
import { ARCHETYPE_INSIGHTS, getArchetypeInsights } from "../lib/insights";

const enPath = path.join(process.cwd(), "messages", "en.json");
const en = JSON.parse(fs.readFileSync(enPath, "utf-8"));

const testsConfigDir = path.join(process.cwd(), "config", "tests");
const configFiles = fs.readdirSync(testsConfigDir).filter(f => f.endsWith(".json"));

console.log(`Auditing all ${configFiles.length} tests in config/tests...\n`);

let errors: string[] = [];
let auditedCount = 0;

for (const file of configFiles) {
  const testId = file.replace(".json", "");
  auditedCount++;

  const config = JSON.parse(fs.readFileSync(path.join(testsConfigDir, file), "utf-8"));
  const cells: string[] = [];
  
  if (config.cells) {
    if (Array.isArray(config.cells)) {
      for (const row of config.cells) {
        if (Array.isArray(row)) {
          cells.push(...row);
        } else if (typeof row === "string") {
          cells.push(row);
        }
      }
    } else if (typeof config.cells === "object") {
      cells.push(...Object.keys(config.cells));
    }
  }

  // Verify questions
  const qObj = en.q[testId];
  if (!qObj) {
    errors.push(`[${testId}] Missing questions in messages/en.json`);
  } else {
    const qCount = Object.keys(qObj).length;
    if (qCount < 30) {
      errors.push(`[${testId}] Question count is low: ${qCount}`);
    }
  }

  // Verify cells in en.json
  const descObj = en.description[testId];
  if (!descObj) {
    errors.push(`[${testId}] Missing description block in messages/en.json`);
  } else {
    for (const cellId of cells) {
      const desc = descObj[cellId];
      if (!desc) {
        errors.push(`[${testId}] Missing description for cell '${cellId}'`);
      } else if (desc.length < 150) {
        errors.push(`[${testId}] Description for cell '${cellId}' is too short (${desc.length} chars)`);
      }
    }
  }

  // Verify insights
  for (const cellId of cells) {
    const insight = getArchetypeInsights(testId, cellId);
    if (!insight) {
      errors.push(`[${testId}] Missing ArchetypeInsight for cell '${cellId}'`);
    } else {
      if (!insight.strengths || insight.strengths.length < 2) {
        errors.push(`[${testId}] ArchetypeInsight for '${cellId}' has fewer than 2 strengths`);
      }
      if (!insight.blindspots || insight.blindspots.length < 2) {
        errors.push(`[${testId}] ArchetypeInsight for '${cellId}' has fewer than 2 blindspots`);
      }
      if (!insight.communicationTips || insight.communicationTips.length < 2) {
        errors.push(`[${testId}] ArchetypeInsight for '${cellId}' has fewer than 2 communicationTips`);
      }
    }
  }
}

console.log(`Audited ${auditedCount} tests.`);
if (errors.length === 0) {
  console.log(`\nPERFECT: All tests have rich descriptions (>150 chars), full insights (strengths, blindspots, communicationTips), and verified questions!`);
} else {
  console.log(`\nFound ${errors.length} issues:`);
  errors.forEach(e => console.log(` - ${e}`));
  process.exit(1);
}
