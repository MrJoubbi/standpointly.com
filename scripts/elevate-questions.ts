import * as fs from "fs";
import * as path from "path";

const enPath = path.join(process.cwd(), "messages", "en.json");
const en = JSON.parse(fs.readFileSync(enPath, "utf-8"));

// 1. Refined Questions (replacing caricatures with authentic, nuanced human reflections)
const questionUpdates: Record<string, Record<string, string>> = {
  "burnout": {
    "b07": "My physical stamina is completely depleted, and I find it difficult to care about the outcomes of my work.",
    "b08": "I feel completely burned out both physically and emotionally, with little hope that things will improve.",
    "b09": "Even when running on empty, I remain deeply invested in doing right by the people who rely on my work.",
    "b10": "Physical exhaustion rarely diminishes my commitment to supporting my team.",
    "b21": "I have enough energy to do my job, but I feel completely detached from the purpose behind it.",
    "b22": "I focus on meeting basic requirements while emotionally disengaging from workplace rhetoric.",
    "b23": "I feel genuinely energized by my work and proud of the contribution it makes.",
    "b24": "I finish most workdays with energy to spare and a clear sense of accomplishment."
  },
  "emotional-regulation": {
    "er07": "When hit with bad news, I look for practical lessons while keeping my outward reaction composed.",
    "er08": "I actively manage my perspective during a crisis so my external presence remains steady.",
    "er09": "I can find constructive meaning in a setback even while openly expressing my grief or frustration.",
    "er10": "I process the positive lessons of a challenge aloud, letting others see the full arc of my feelings.",
    "er21": "Even when experiencing intense anger, I refuse to let it show in my face or voice.",
    "er22": "I prefer to feel my distress privately rather than explain it or show it to others.",
    "er23": "My emotional reactions are immediate and visible; holding back feels unnatural to me.",
    "er24": "People can immediately read what I am feeling from my expression and tone."
  },
  "resilience": {
    "r07": "When a plan fails, I immediately pivot to an alternative approach without losing momentum.",
    "r08": "I adapt my strategy quickly when conditions change, while keeping my overarching goal firmly in view.",
    "r09": "I prefer to stick to my original plan and power through obstacles, rather than constantly changing course.",
    "r10": "Once I commit to a course of action, I see it through to the end even when circumstances become difficult.",
    "r21": "I let go of unworkable plans easily and redirect my energy toward fresh opportunities.",
    "r22": "I see little point in fighting stubborn resistance when alternative paths are available.",
    "r23": "Major setbacks leave me feeling cautious and hesitant to take new risks.",
    "r24": "It takes me a long time to regain my footing and confidence after a significant failure."
  },
  "procrastination": {
    "p07": "When facing an intimidating task, I easily lose hours to digital distractions.",
    "p08": "I struggle with both starting difficult tasks and resisting short-term temptations, leading to delayed deadlines.",
    "p09": "I often sit immobilized by the weight of an assignment, avoiding it without even enjoying my free time.",
    "p10": "High standards can paralyze my ability to begin, trapping me in anxious hesitation."
  },
  "career-personality": {
    "cp07": "I want to lead an enterprise where I hold sovereign decision-making authority over strategy.",
    "cp08": "Building and steering an independent venture is far more appealing to me than climbing an existing corporate ladder.",
    "cp09": "I prefer directing large, well-resourced teams within an established institutional structure.",
    "cp10": "Navigating complex organizational systems to achieve large-scale strategic outcomes suits my strengths.",
    "cp21": "I prefer working as an independent specialist, retaining complete ownership over my hours and client selection.",
    "cp22": "Total autonomy over how and where I apply my craft is more valuable to me than corporate prestige.",
    "cp23": "I value the stability and resources of an established organization that allows me to focus purely on my craft.",
    "cp24": "Dependable organizational stability provides the best foundation for developing deep technical mastery."
  },
  "work-style": {
    "ws07": "I do my best work in fast-paced collaborative sprints where rapid iteration is prioritized.",
    "ws08": "Live, intensive group problem-solving produces better results than drawn-out solo planning.",
    "ws09": "I value close team alignment supported by detailed project roadmaps and clear documentation.",
    "ws10": "Thorough group deliberation before execution prevents costly misunderstandings down the road.",
    "ws21": "When working solo, I prefer rapid experimentation and immediate testing over formal approval loops.",
    "ws22": "I make the fastest progress when working independently without having to coordinate every step with others.",
    "ws23": "I prefer solitary, uninterrupted focus where I can thoroughly refine a piece of work before sharing it.",
    "ws24": "Patient, independent craftsmanship produces far more enduring results than rushed collective brainstorming."
  },
  "career-values": {
    "cv07": "I prioritize business opportunities that deliver strong financial returns without compromising my personal life.",
    "cv08": "Commercial success is only meaningful to me if it leaves ample room for family, health, and leisure.",
    "cv09": "I am willing to dedicate long hours and intense effort to reach the top of competitive commercial markets.",
    "cv10": "Achieving exceptional financial success justifies significant personal sacrifice during the building phase.",
    "cv21": "I find fulfillment contributing to meaningful social causes within a sustainable, balanced schedule.",
    "cv22": "I believe one can champion important social causes without sacrificing personal health or family time.",
    "cv23": "I am willing to subordinate personal comfort and leisure when an urgent social or environmental mission demands it.",
    "cv24": "True dedication to systemic change often requires intense personal commitment and sacrifice."
  },
  "decision-making-style": {
    "dms07": "I make rapid, high-stakes decisions by swiftly identifying the decisive data points.",
    "dms08": "I prefer calculating the core numbers quickly and acting decisively rather than waiting for absolute certainty.",
    "dms09": "I conduct exhaustive research and risk modeling before committing to a significant decision.",
    "dms10": "I resist pressure to decide prematurely until I have analyzed all contingencies thoroughly.",
    "dms21": "I trust my immediate gut reaction and act quickly rather than second-guessing myself.",
    "dms22": "I prefer following a strong intuitive impulse forward and adjusting course through direct action.",
    "dms23": "I prefer to sit with a major choice quietly, allowing clarity to emerge before taking a definitive stand.",
    "dms24": "I wait until an intuitive sense of peace and alignment settles in before committing to a path."
  }
};

for (const [testId, updates] of Object.entries(questionUpdates)) {
  if (en.q[testId]) {
    for (const [qId, text] of Object.entries(updates)) {
      if (en.q[testId][qId]) {
        en.q[testId][qId] = text;
      }
    }
  }
}

console.log("Updated questions in en.json successfully.");
fs.writeFileSync(enPath, JSON.stringify(en, null, 2), "utf-8");
