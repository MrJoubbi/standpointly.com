const fs = require("fs");
const path = require("path");
const { buildQuestionStructure } = require("./question-structure.js");
const { INSTRUMENTS_DEFINITIONS } = require("./definitions.js");

function main() {
  const enPath = path.join(__dirname, "../messages/en.json");
  const en = JSON.parse(fs.readFileSync(enPath, "utf8"));

  // Ensure sections exist
  en.test = en.test || {};
  en.axis = en.axis || {};
  en.sector = en.sector || {};
  en.cell = en.cell || {};
  en.description = en.description || {};
  en.q = en.q || {};

  for (const def of INSTRUMENTS_DEFINITIONS) {
    const { id, title, summary, axes, cells, questionThemes } = def;
    const xId = axes.x.id;
    const yId = axes.y.id;

    // Build question structure
    const prefix = id.split("-").map(p => p[0]).join("");
    const questions = buildQuestionStructure(id, prefix, xId, yId);

    // Map statements to question texts
    const statementMap = {};
    // q01-q06
    for (let i = 0; i < 6; i++) {
      statementMap[questions[i].id] = questionThemes.xPos[i];
    }
    // q07, q08: crossPP
    statementMap[questions[6].id] = questionThemes.crossPP[0];
    statementMap[questions[7].id] = questionThemes.crossPP[1];
    // q09, q10: crossPM
    statementMap[questions[8].id] = questionThemes.crossPM[0];
    statementMap[questions[9].id] = questionThemes.crossPM[1];
    // q11-q14
    for (let i = 0; i < 4; i++) {
      statementMap[questions[10 + i].id] = questionThemes.xPos[6 + i];
    }
    // q15-q20
    for (let i = 0; i < 6; i++) {
      statementMap[questions[14 + i].id] = questionThemes.xNeg[i];
    }
    // q21, q22: crossMP
    statementMap[questions[20].id] = questionThemes.crossMP[0];
    statementMap[questions[21].id] = questionThemes.crossMP[1];
    // q23, q24: crossMM
    statementMap[questions[22].id] = questionThemes.crossMM[0];
    statementMap[questions[23].id] = questionThemes.crossMM[1];
    // q25-q28
    for (let i = 0; i < 4; i++) {
      statementMap[questions[24 + i].id] = questionThemes.xNeg[6 + i];
    }
    // q29-q32: yPos
    for (let i = 0; i < 4; i++) {
      statementMap[questions[28 + i].id] = questionThemes.yPos[i];
    }
    // q33-q36: yNeg
    for (let i = 0; i < 4; i++) {
      statementMap[questions[32 + i].id] = questionThemes.yNeg[i];
    }

    // Verify all 36 questions have statements
    for (const q of questions) {
      if (!statementMap[q.id]) {
        throw new Error(`Missing statement for question ${q.id} in test ${id}`);
      }
    }

    // Calculate max_raw
    const maxRawX = questions.reduce((acc, q) => acc + Math.abs(q.w[xId] || 0), 0) * 2;
    const maxRawY = questions.reduce((acc, q) => acc + Math.abs(q.w[yId] || 0), 0) * 2;

    const testConfig = {
      id,
      version: 1,
      title_key: `test.${id}.title`,
      summary_key: `test.${id}.summary`,
      scale: {
        type: "likert5",
        values: [
          { key: "strongly_disagree", value: -2 },
          { key: "disagree", value: -1 },
          { key: "neutral", value: 0 },
          { key: "agree", value: 1 },
          { key: "strongly_agree", value: 2 }
        ]
      },
      axes: {
        x: {
          id: xId,
          name_key: `axis.${xId}.name`,
          negative_label_key: `axis.${xId}.negative`,
          positive_label_key: `axis.${xId}.positive`,
          max_raw: maxRawX
        },
        y: {
          id: yId,
          name_key: `axis.${yId}.name`,
          negative_label_key: `axis.${yId}.negative`,
          positive_label_key: `axis.${yId}.positive`,
          max_raw: maxRawY
        }
      },
      scoring: {
        gain: 0.9,
        clamp: 1,
        band: 0.33
      },
      cells: cells.map(c => ({
        id: c.id,
        name_key: `sector.${id}.${c.id}`,
        label_key: `cell.${id}.${c.id}`,
        description_key: `description.${id}.${c.id}`
      })),
      questions
    };

    // Write config file
    const configPath = path.join(__dirname, `../config/tests/${id}.json`);
    fs.writeFileSync(configPath, JSON.stringify(testConfig, null, 2) + "\n", "utf8");
    console.log(`Wrote config/tests/${id}.json`);

    // Add translation keys
    en.test[id] = {
      title,
      summary
    };

    en.axis[xId] = {
      name: axes.x.name,
      negative: axes.x.negative,
      positive: axes.x.positive
    };

    en.axis[yId] = {
      name: axes.y.name,
      negative: axes.y.negative,
      positive: axes.y.positive
    };

    en.sector[id] = en.sector[id] || {};
    en.cell[id] = en.cell[id] || {};
    en.description[id] = en.description[id] || {};

    for (const c of cells) {
      en.sector[id][c.id] = c.sector;
      en.cell[id][c.id] = c.label;
      en.description[id][c.id] = c.desc;
    }

    en.q[id] = en.q[id] || {};
    for (const [qId, statement] of Object.entries(statementMap)) {
      en.q[id][qId] = statement;
    }
  }

  fs.writeFileSync(enPath, JSON.stringify(en, null, 2) + "\n", "utf8");
  console.log("Updated messages/en.json successfully with all 18 instruments!");
}

main();
