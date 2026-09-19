/**
 * Generator script for the remaining 18 Standpointly instruments:
 *
 * Field 01 - Personality:
 * - dark-triad (01.02)
 * - empathy (01.03)
 * - emotional-intelligence (01.04)
 * - self-esteem (01.05)
 *
 * Field 02 - Relationships:
 * - compatibility (02.03) [slug: relationship-compatibility]
 * - relationship-anxiety (02.04) [slug: relationship-anxiety]
 * - boundaries (02.05) [slug: relationship-boundaries]
 *
 * Field 03 - Beliefs & Values:
 * - feminist-perspectives (03.02) [slug: feminist-perspectives]
 * - gender-equality (03.04) [slug: gender-equality]
 * - individualism-collectivism (03.05) [slug: individualism-collectivism]
 *
 * Field 04 - Wellbeing:
 * - burnout (04.02) [slug: burnout]
 * - emotional-regulation (04.03) [slug: emotional-regulation]
 * - resilience (04.04) [slug: resilience]
 * - procrastination (04.05) [slug: procrastination]
 *
 * Field 05 - Work & Career:
 * - career-personality (05.01) [slug: career-personality]
 * - work-style (05.02) [slug: work-style]
 * - career-values (05.04) [slug: career-values]
 * - decision-making-style (05.05) [slug: decision-making-style]
 */

const fs = require("fs");
const path = require("path");

function buildQuestionStructure(testId, prefix, xId, yId) {
  const q = [];
  // 14 positive on X (2 with Y positive, 2 with Y negative, 10 pure)
  for (let i = 1; i <= 6; i++) {
    const num = String(i).padStart(2, "0");
    q.push({ id: `${prefix}${num}`, text_key: `q.${testId}.${prefix}${num}`, w: { [xId]: 2, [yId]: 0 } });
  }
  // Cross-loaded ++
  q.push({ id: `${prefix}07`, text_key: `q.${testId}.${prefix}07`, w: { [xId]: 2, [yId]: 2 } });
  q.push({ id: `${prefix}08`, text_key: `q.${testId}.${prefix}08`, w: { [xId]: 2, [yId]: 2 } });
  // Cross-loaded +-
  q.push({ id: `${prefix}09`, text_key: `q.${testId}.${prefix}09`, w: { [xId]: 2, [yId]: -2 } });
  q.push({ id: `${prefix}10`, text_key: `q.${testId}.${prefix}10`, w: { [xId]: 2, [yId]: -2 } });
  for (let i = 11; i <= 14; i++) {
    const num = String(i).padStart(2, "0");
    q.push({ id: `${prefix}${num}`, text_key: `q.${testId}.${prefix}${num}`, w: { [xId]: 2, [yId]: 0 } });
  }

  // 14 negative on X (2 with Y positive, 2 with Y negative, 10 pure)
  for (let i = 15; i <= 20; i++) {
    const num = String(i).padStart(2, "0");
    q.push({ id: `${prefix}${num}`, text_key: `q.${testId}.${prefix}${num}`, w: { [xId]: -2, [yId]: 0 } });
  }
  // Cross-loaded -+
  q.push({ id: `${prefix}21`, text_key: `q.${testId}.${prefix}21`, w: { [xId]: -2, [yId]: 2 } });
  q.push({ id: `${prefix}22`, text_key: `q.${testId}.${prefix}22`, w: { [xId]: -2, [yId]: 2 } });
  // Cross-loaded --
  q.push({ id: `${prefix}23`, text_key: `q.${testId}.${prefix}23`, w: { [xId]: -2, [yId]: -2 } });
  q.push({ id: `${prefix}24`, text_key: `q.${testId}.${prefix}24`, w: { [xId]: -2, [yId]: -2 } });
  for (let i = 25; i <= 28; i++) {
    const num = String(i).padStart(2, "0");
    q.push({ id: `${prefix}${num}`, text_key: `q.${testId}.${prefix}${num}`, w: { [xId]: -2, [yId]: 0 } });
  }

  // 8 pure on Y (4 positive = +8, 4 negative = -8)
  for (let i = 29; i <= 32; i++) {
    const num = String(i).padStart(2, "0");
    q.push({ id: `${prefix}${num}`, text_key: `q.${testId}.${prefix}${num}`, w: { [xId]: 0, [yId]: 2 } });
  }
  for (let i = 33; i <= 36; i++) {
    const num = String(i).padStart(2, "0");
    q.push({ id: `${prefix}${num}`, text_key: `q.${testId}.${prefix}${num}`, w: { [xId]: 0, [yId]: -2 } });
  }

  return q;
}

module.exports = { buildQuestionStructure };
