import * as fs from "fs";
import * as path from "path";
import { PERSONALITY_DESCRIPTIONS } from "./descriptions/personality";
import { RELATIONSHIPS_DESCRIPTIONS } from "./descriptions/relationships";
import { SOCIETY_DESCRIPTIONS } from "./descriptions/society";
import { WELLBEING_DESCRIPTIONS } from "./descriptions/wellbeing";
import { CAREER_DESCRIPTIONS } from "./descriptions/career";

const enPath = path.join(process.cwd(), "messages", "en.json");
const en = JSON.parse(fs.readFileSync(enPath, "utf-8"));

const allNewDescriptions: Record<string, Record<string, string>> = {
  ...PERSONALITY_DESCRIPTIONS,
  ...RELATIONSHIPS_DESCRIPTIONS,
  ...SOCIETY_DESCRIPTIONS,
  ...WELLBEING_DESCRIPTIONS,
  ...CAREER_DESCRIPTIONS,
};

let updatedCount = 0;
let updatedTests = 0;

for (const [testId, cells] of Object.entries(allNewDescriptions)) {
  if (!en.description[testId]) {
    en.description[testId] = {};
  }
  let testCellsUpdated = 0;
  for (const [cellId, text] of Object.entries(cells)) {
    en.description[testId][cellId] = text;
    testCellsUpdated++;
    updatedCount++;
  }
  updatedTests++;
  console.log(`[OK] Updated test: ${testId} (${testCellsUpdated} cells)`);
}

fs.writeFileSync(enPath, JSON.stringify(en, null, 2), "utf-8");

console.log(`\n========================================`);
console.log(`SUCCESS: Updated ${updatedCount} descriptions across ${updatedTests} tests in messages/en.json.`);
console.log(`Total tests in en.description: ${Object.keys(en.description).length}`);
console.log(`========================================\n`);
