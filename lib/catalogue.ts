/**
 * The Standpointly Test Catalogue & Field Architecture.
 *
 * Standpointly instruments are organized into 5 scientific fields:
 * FIELD 01 — Personality
 * FIELD 02 — Relationships
 * FIELD 03 — Beliefs & Values
 * FIELD 04 — Wellbeing
 * FIELD 05 — Work & Career
 *
 * "Discover where you stand."
 * Clean, serious, editorial, minimal, and research-informed.
 */

import { listTestIds, loadTest } from "@/lib/config";

export type FieldId =
  | "personality"
  | "relationships"
  | "beliefs"
  | "wellbeing"
  | "career";

/** Backwards-compatible alias */
export type TestClusterId = FieldId;

export interface InstrumentMetadata {
  id: string;
  code: string;
  slug: string;
  fieldId: FieldId;
  fieldCode: string;
  fieldSlug: string;
  titleKey: string;
  summaryKey: string;
  dimensions: string[];
  relatedSlugs: string[];
  theoreticalFoundation?: string;
  nonClinicalNotice?: boolean;
}

export type AvailableTest = {
  status: "available";
  id: string;
  code: string;
  slug: string;
  fieldId: FieldId;
  fieldCode: string;
  fieldSlug: string;
  clusterId: FieldId; // backwards compatibility
  titleKey: string;
  summaryKey: string;
  questionCount: number;
  minutes: number;
  dimensions: string[];
  relatedSlugs: string[];
  nonClinicalNotice?: boolean;
};

export type PlannedTest = {
  status: "planned";
  id: string;
  code: string;
  slug: string;
  fieldId: FieldId;
  fieldCode: string;
  fieldSlug: string;
  clusterId: FieldId; // backwards compatibility
  titleKey: string;
  summaryKey: string;
  dimensions: string[];
  relatedSlugs: string[];
  nonClinicalNotice?: boolean;
};

export type CatalogueEntry = AvailableTest | PlannedTest;

export type TestCluster = {
  id: FieldId;
  code: string;
  slug: string;
  name: string;
  subtitle: string;
  taglineKey: string;
  descriptionKey: string;
  tests: CatalogueEntry[];
  availableCount: number;
  plannedCount: number;
  futureRoadmap: string[];
};

/** Seconds per statement, for the "about N minutes" estimate. */
const SECONDS_PER_QUESTION = 8;

export interface FieldDefinition {
  id: FieldId;
  code: string;
  slug: string;
  name: string;
  subtitle: string;
  taglineKey: string;
  descriptionKey: string;
  instruments: readonly InstrumentMetadata[];
  futureRoadmap: readonly string[];
}

export const FIELDS_DEFINITION: readonly FieldDefinition[] = [
  {
    id: "personality",
    code: "01",
    slug: "personality",
    name: "Personality",
    subtitle: "Core traits, behavioral tendencies, and emotional patterns",
    taglineKey: "field.personality.subtitle",
    descriptionKey: "field.personality.description",
    futureRoadmap: [
      "Narcissism",
      "Machiavellianism",
      "Psychopathy Traits",
      "Assertiveness",
      "Perfectionism",
      "Impulsivity",
      "Locus of Control",
      "People-Pleasing",
      "Communication Style",
      "Conflict Style",
      "Emotional Regulation",
    ],
    instruments: [
      {
        id: "big-five",
        code: "01.01",
        slug: "big-five",
        fieldId: "personality",
        fieldCode: "01",
        fieldSlug: "personality",
        titleKey: "planned.big-five.title",
        summaryKey: "planned.big-five.summary",
        dimensions: [
          "Openness to Experience",
          "Conscientiousness",
          "Extraversion",
          "Agreeableness",
          "Neuroticism",
        ],
        relatedSlugs: ["dark-triad", "empathy", "emotional-intelligence", "self-esteem"],
        theoreticalFoundation:
          "Rooted in decades of empirical trait psychology (Costa & McCrae; Goldberg), measuring five orthogonal axes that account for the dominant variance in human individual differences.",
      },
      {
        id: "dark-triad",
        code: "01.02",
        slug: "dark-triad",
        fieldId: "personality",
        fieldCode: "01",
        fieldSlug: "personality",
        titleKey: "planned.dark-triad.title",
        summaryKey: "planned.dark-triad.summary",
        dimensions: [
          "Machiavellian Strategy",
          "Subclinical Narcissism",
          "Subclinical Psychopathy",
        ],
        relatedSlugs: ["big-five", "empathy", "emotional-intelligence"],
        theoreticalFoundation:
          "Paulhus and Williams framework measuring three distinct but overlapping subclinical personality constructs related to interpersonal exploitation, grandiosity, and impulsivity.",
      },
      {
        id: "empathy",
        code: "01.03",
        slug: "empathy",
        fieldId: "personality",
        fieldCode: "01",
        fieldSlug: "personality",
        titleKey: "planned.empathy.title",
        summaryKey: "planned.empathy.summary",
        dimensions: [
          "Cognitive Perspective Taking",
          "Affective Resonance",
          "Compassionate Action",
        ],
        relatedSlugs: ["emotional-intelligence", "big-five", "dark-triad"],
        theoreticalFoundation:
          "Interpersonal Reactivity Index (Davis) parsing the dual capacities to mentally model others' states versus feeling emotional contagion.",
      },
      {
        id: "emotional-intelligence",
        code: "01.04",
        slug: "emotional-intelligence",
        fieldId: "personality",
        fieldCode: "01",
        fieldSlug: "personality",
        titleKey: "planned.emotional-intelligence.title",
        summaryKey: "planned.emotional-intelligence.summary",
        dimensions: [
          "Self-Awareness",
          "Self-Regulation",
          "Social Attunement",
          "Relational Management",
        ],
        relatedSlugs: ["empathy", "big-five", "self-esteem"],
        theoreticalFoundation:
          "Trait emotional intelligence framework measuring self-perceived abilities to identify, express, regulate, and harness emotions adaptively.",
      },
      {
        id: "self-esteem",
        code: "01.05",
        slug: "self-esteem",
        fieldId: "personality",
        fieldCode: "01",
        fieldSlug: "personality",
        titleKey: "planned.self-esteem.title",
        summaryKey: "planned.self-esteem.summary",
        dimensions: [
          "Core Self-Worth",
          "Contingent Validation",
          "Self-Compassion",
          "Competence Appraisal",
        ],
        relatedSlugs: ["big-five", "emotional-intelligence", "resilience"],
        theoreticalFoundation:
          "Rosenberg Self-Esteem Scale paired with Crocker & Wolfe contingent self-worth models, differentiating stable authentic worth from extrinsic approval dependencies.",
      },
    ],
  },
  {
    id: "relationships",
    code: "02",
    slug: "relationships",
    name: "Relationships",
    subtitle: "Attachment, intimacy, communication, and interpersonal patterns",
    taglineKey: "field.relationships.subtitle",
    descriptionKey: "field.relationships.description",
    futureRoadmap: [
      "Emotional Availability",
      "Fear of Abandonment",
      "Fear of Intimacy",
      "Communication Style",
      "Conflict Style",
      "Jealousy",
      "Trust",
      "Emotional Dependency",
      "Relationship Self-Sabotage",
      "Love Style",
      "People-Pleasing",
    ],
    instruments: [
      {
        id: "attachment",
        code: "02.01",
        slug: "attachment-style",
        fieldId: "relationships",
        fieldCode: "02",
        fieldSlug: "relationships",
        titleKey: "planned.attachment-style.title",
        summaryKey: "planned.attachment-style.summary",
        dimensions: [
          "Avoidance (Intimacy Comfort vs Relational Guarding)",
          "Anxiety (Grounding vs Abandonment Hypervigilance)",
        ],
        relatedSlugs: [
          "love-language",
          "relationship-compatibility",
          "relationship-anxiety",
          "relationship-boundaries",
        ],
        theoreticalFoundation:
          "Brennan, Clark & Shaver (ECR-R) adult attachment model mapping relational behavior onto orthogonal avoidance and anxiety axes rather than categorical pigeonholes.",
      },
      {
        id: "love-language",
        code: "02.02",
        slug: "love-language",
        fieldId: "relationships",
        fieldCode: "02",
        fieldSlug: "relationships",
        titleKey: "planned.love-language.title",
        summaryKey: "planned.love-language.summary",
        dimensions: [
          "Words of Affirmation",
          "Quality Time",
          "Physical Touch",
          "Acts of Service",
          "Receiving Gifts",
        ],
        relatedSlugs: [
          "attachment-style",
          "relationship-compatibility",
          "relationship-boundaries",
        ],
        theoreticalFoundation:
          "Interpersonal affection exchange framework evaluating priority modalities for relational reassurance, bonding, and appreciation.",
      },
      {
        id: "compatibility",
        code: "02.03",
        slug: "relationship-compatibility",
        fieldId: "relationships",
        fieldCode: "02",
        fieldSlug: "relationships",
        titleKey: "planned.relationship-compatibility.title",
        summaryKey: "planned.relationship-compatibility.summary",
        dimensions: [
          "Core Value Alignment",
          "Conflict Resolution Rhythm",
          "Emotional Intimacy Pacing",
          "Autonomy vs Togetherness",
        ],
        relatedSlugs: [
          "attachment-style",
          "relationship-boundaries",
          "love-language",
        ],
        theoreticalFoundation:
          "Dyadic complementarity and similarity-attraction research assessing alignment across structural lifestyle values and relational friction points.",
      },
      {
        id: "relationship-anxiety",
        code: "02.04",
        slug: "relationship-anxiety",
        fieldId: "relationships",
        fieldCode: "02",
        fieldSlug: "relationships",
        titleKey: "planned.relationship-anxiety.title",
        summaryKey: "planned.relationship-anxiety.summary",
        dimensions: [
          "Relational Hypervigilance",
          "Reassurance Seeking",
          "Abandonment Anticipation",
          "Autonomous Grounding",
        ],
        relatedSlugs: [
          "attachment-style",
          "relationship-boundaries",
          "relationship-compatibility",
        ],
        theoreticalFoundation:
          "Cognitive-affective assessment of relational hyperactivation and reassurance dependencies within intimate partnerships.",
      },
      {
        id: "boundaries",
        code: "02.05",
        slug: "relationship-boundaries",
        fieldId: "relationships",
        fieldCode: "02",
        fieldSlug: "relationships",
        titleKey: "planned.relationship-boundaries.title",
        summaryKey: "planned.relationship-boundaries.summary",
        dimensions: [
          "Boundary Permeability",
          "Assertive Boundary Setting",
          "Emotional Differentiation",
          "Enmeshment Resistance",
        ],
        relatedSlugs: [
          "attachment-style",
          "relationship-compatibility",
          "relationship-anxiety",
        ],
        theoreticalFoundation:
          "Bowen Family Systems theory measuring interpersonal differentiation: the ability to maintain autonomous selfhood while staying emotionally connected.",
      },
    ],
  },
  {
    id: "beliefs",
    code: "03",
    slug: "beliefs-values",
    name: "Beliefs & Values",
    subtitle: "Ideology, morality, identity, and social values",
    taglineKey: "field.beliefs.subtitle",
    descriptionKey: "field.beliefs.description",
    futureRoadmap: [
      "Economic Left vs Right",
      "Social Liberal vs Conservative",
      "Authoritarian vs Libertarian",
      "Capitalism vs Socialism",
      "Traditional vs Progressive Values",
      "Environmental Values",
      "Authority vs Freedom",
      "Free Speech Values",
      "Nationalism vs Globalism",
      "Gender Role Attitudes",
    ],
    instruments: [
      {
        id: "political",
        code: "03.01",
        slug: "political-ideology",
        fieldId: "beliefs",
        fieldCode: "03",
        fieldSlug: "beliefs-values",
        titleKey: "planned.political-ideology.title",
        summaryKey: "planned.political-ideology.summary",
        dimensions: [
          "Economic Axis (Collective Provision to Private Enterprise)",
          "Social Axis (Institutional Authority to Individual Liberty)",
        ],
        relatedSlugs: [
          "feminist-perspectives",
          "moral-foundations",
          "gender-equality",
          "individualism-collectivism",
        ],
        theoreticalFoundation:
          "Two-dimensional political spectrum decoupling economic organization from social authority, grounded in modern political philosophy and zero-sum balanced scoring.",
      },
      {
        id: "feminist-perspectives",
        code: "03.02",
        slug: "feminist-perspectives",
        fieldId: "beliefs",
        fieldCode: "03",
        fieldSlug: "beliefs-values",
        titleKey: "planned.feminist-perspectives.title",
        summaryKey: "planned.feminist-perspectives.summary",
        dimensions: [
          "Gender Equality & Equity",
          "Gender Roles & Deconstruction",
          "Structural & Institutional Reform",
          "Individual Freedom & Autonomy",
          "Social Transformation vs Pragmatism",
        ],
        relatedSlugs: [
          "gender-equality",
          "political-ideology",
          "moral-foundations",
          "individualism-collectivism",
        ],
        theoreticalFoundation:
          "Multidimensional assessment measuring nuanced standpoints across liberal, radical, socialist, and intersectional feminist philosophies rather than a simplistic binary.",
      },
      {
        id: "moral-foundations",
        code: "03.03",
        slug: "moral-foundations",
        fieldId: "beliefs",
        fieldCode: "03",
        fieldSlug: "beliefs-values",
        titleKey: "planned.moral-foundations.title",
        summaryKey: "planned.moral-foundations.summary",
        dimensions: [
          "Care / Harm",
          "Fairness / Cheating",
          "Loyalty / Betrayal",
          "Authority / Subversion",
          "Sanctity / Degradation",
          "Liberty / Oppression",
        ],
        relatedSlugs: [
          "political-ideology",
          "feminist-perspectives",
          "individualism-collectivism",
        ],
        theoreticalFoundation:
          "Haidt & Graham Moral Foundations Theory evaluating the evolutionary psychological modules that underpin moral reasoning across cultures.",
      },
      {
        id: "gender-equality",
        code: "03.04",
        slug: "gender-equality",
        fieldId: "beliefs",
        fieldCode: "03",
        fieldSlug: "beliefs-values",
        titleKey: "planned.gender-equality.title",
        summaryKey: "planned.gender-equality.summary",
        dimensions: [
          "Occupational & Wage Parity",
          "Domestic Caretaking Symmetry",
          "Institutional Representation",
          "Cultural Norm Evolution",
        ],
        relatedSlugs: [
          "feminist-perspectives",
          "political-ideology",
          "moral-foundations",
        ],
        theoreticalFoundation:
          "Socio-structural measurement of attitudes toward systemic gender parity in economic, familial, and political spheres.",
      },
      {
        id: "individualism-collectivism",
        code: "03.05",
        slug: "individualism-collectivism",
        fieldId: "beliefs",
        fieldCode: "03",
        fieldSlug: "beliefs-values",
        titleKey: "planned.individualism-collectivism.title",
        summaryKey: "planned.individualism-collectivism.summary",
        dimensions: [
          "Relational Interdependence",
          "Autonomous Agency",
          "Collective Responsibility",
          "Individual Merit & Rights",
        ],
        relatedSlugs: [
          "political-ideology",
          "moral-foundations",
          "feminist-perspectives",
        ],
        theoreticalFoundation:
          "Triandis cultural psychology framework evaluating horizontal and vertical dimensions of individual versus collective primacy.",
      },
    ],
  },
  {
    id: "wellbeing",
    code: "04",
    slug: "wellbeing",
    name: "Wellbeing",
    subtitle: "Emotional resilience, self-perception, and psychological patterns",
    taglineKey: "field.wellbeing.subtitle",
    descriptionKey: "field.wellbeing.description",
    futureRoadmap: [
      "Self-Esteem",
      "Overthinking",
      "Fear of Failure",
      "Fear of Rejection",
      "Imposter Feelings",
      "Emotional Maturity",
      "Perfectionism",
      "People-Pleasing",
      "Social Confidence",
      "Work-Life Balance",
    ],
    instruments: [
      {
        id: "stress",
        code: "04.01",
        slug: "stress",
        fieldId: "wellbeing",
        fieldCode: "04",
        fieldSlug: "wellbeing",
        titleKey: "planned.stress.title",
        summaryKey: "planned.stress.summary",
        dimensions: [
          "Perceived Strain",
          "Cognitive Overload",
          "Somatic Reactivity",
          "Coping Resource Efficacy",
        ],
        relatedSlugs: ["burnout", "resilience", "emotional-regulation"],
        theoreticalFoundation:
          "Cohen Perceived Stress Scale (PSS) framework evaluating cognitive appraisal of life unpredictability, uncontrollability, and overload. Framed for self-reflection; non-clinical.",
        nonClinicalNotice: true,
      },
      {
        id: "burnout",
        code: "04.02",
        slug: "burnout",
        fieldId: "wellbeing",
        fieldCode: "04",
        fieldSlug: "wellbeing",
        titleKey: "planned.burnout.title",
        summaryKey: "planned.burnout.summary",
        dimensions: [
          "Emotional Exhaustion",
          "Mental Cynicism & Depersonalisation",
          "Perceived Inefficacy",
        ],
        relatedSlugs: ["stress", "resilience", "emotional-regulation"],
        theoreticalFoundation:
          "Maslach Burnout Inventory dimensions tracking occupational strain across physical depletion, detachment, and diminishing self-accomplishment.",
        nonClinicalNotice: true,
      },
      {
        id: "emotional-regulation",
        code: "04.03",
        slug: "emotional-regulation",
        fieldId: "wellbeing",
        fieldCode: "04",
        fieldSlug: "wellbeing",
        titleKey: "planned.emotional-regulation.title",
        summaryKey: "planned.emotional-regulation.summary",
        dimensions: [
          "Cognitive Reappraisal",
          "Expressive Suppression",
          "Impulse Modulation",
          "Distress Tolerance",
        ],
        relatedSlugs: ["resilience", "stress", "procrastination"],
        theoreticalFoundation:
          "Gross Emotion Regulation Model (ERQ) comparing antecedent-focused reappraisal strategies with response-focused expressive suppression.",
        nonClinicalNotice: true,
      },
      {
        id: "resilience",
        code: "04.04",
        slug: "resilience",
        fieldId: "wellbeing",
        fieldCode: "04",
        fieldSlug: "wellbeing",
        titleKey: "planned.resilience.title",
        summaryKey: "planned.resilience.summary",
        dimensions: [
          "Recovery Velocity",
          "Adaptive Tenacity",
          "Optimistic Cognitive Reframing",
          "Social Resource Mobilisation",
        ],
        relatedSlugs: ["stress", "burnout", "emotional-regulation"],
        theoreticalFoundation:
          "Connor-Davidson Resilience Scale (CD-RISC) assessing psychological bounce-back and adaptive flexibility under acute challenge.",
        nonClinicalNotice: true,
      },
      {
        id: "procrastination",
        code: "04.05",
        slug: "procrastination",
        fieldId: "wellbeing",
        fieldCode: "04",
        fieldSlug: "wellbeing",
        titleKey: "planned.procrastination.title",
        summaryKey: "planned.procrastination.summary",
        dimensions: [
          "Task Aversion",
          "Temporal Discounting",
          "Perfectionistic Hesitation",
          "Decisional Delay",
        ],
        relatedSlugs: ["stress", "emotional-regulation", "burnout"],
        theoreticalFoundation:
          "Steel's Temporal Motivation Theory (TMT) analyzing how expectancy, value, impulsiveness, and delay create irrational task postponements.",
        nonClinicalNotice: true,
      },
    ],
  },
  {
    id: "career",
    code: "05",
    slug: "work-career",
    name: "Work & Career",
    subtitle: "Motivation, work style, leadership, and career preferences",
    taglineKey: "field.career.subtitle",
    descriptionKey: "field.career.description",
    futureRoadmap: [
      "DISC",
      "RIASEC / Holland Code",
      "Risk Tolerance",
      "Teamwork Style",
      "Entrepreneurial Tendencies",
      "Achievement Motivation",
      "Growth Mindset",
      "Leadership Values",
      "Work-Life Balance",
      "Workplace Communication",
    ],
    instruments: [
      {
        id: "career-personality",
        code: "05.01",
        slug: "career-personality",
        fieldId: "career",
        fieldCode: "05",
        fieldSlug: "work-career",
        titleKey: "planned.career-personality.title",
        summaryKey: "planned.career-personality.summary",
        dimensions: [
          "Vocational Orientation",
          "Cognitive Problem-Solving Rhythm",
          "Interpersonal Collaboration Synergy",
          "Autonomy Drive",
        ],
        relatedSlugs: ["work-style", "leadership-style", "career-values"],
        theoreticalFoundation:
          "Schein Career Anchors framework identifying core internal competencies, motives, and values that guide occupational decisions.",
      },
      {
        id: "work-style",
        code: "05.02",
        slug: "work-style",
        fieldId: "career",
        fieldCode: "05",
        fieldSlug: "work-career",
        titleKey: "planned.work-style.title",
        summaryKey: "planned.work-style.summary",
        dimensions: [
          "Operational Pace",
          "Structure vs Flexibility",
          "Collaborative vs Independent",
          "Detail vs Conceptual Breadth",
        ],
        relatedSlugs: [
          "career-personality",
          "leadership-style",
          "decision-making-style",
        ],
        theoreticalFoundation:
          "Workplace behavioral rhythm assessment evaluating optimal environmental and task execution structures.",
      },
      {
        id: "leadership-style",
        code: "05.03",
        slug: "leadership-style",
        fieldId: "career",
        fieldCode: "05",
        fieldSlug: "work-career",
        titleKey: "planned.leadership-style.title",
        summaryKey: "planned.leadership-style.summary",
        dimensions: [
          "Visionary Alignment",
          "Directive Execution",
          "Servant Empowerment",
          "Adaptive Situational Leadership",
        ],
        relatedSlugs: [
          "career-personality",
          "work-style",
          "decision-making-style",
        ],
        theoreticalFoundation:
          "Bass & Avolio Full Range Leadership Model (FRLM) categorizing transformational, transactional, and empowering leadership behaviors.",
      },
      {
        id: "career-values",
        code: "05.04",
        slug: "career-values",
        fieldId: "career",
        fieldCode: "05",
        fieldSlug: "work-career",
        titleKey: "planned.career-values.title",
        summaryKey: "planned.career-values.summary",
        dimensions: [
          "Intellectual Challenge",
          "Financial Security & Wealth",
          "Social Impact & Purpose",
          "Lifestyle Autonomy",
          "Prestige & Mastery",
        ],
        relatedSlugs: [
          "career-personality",
          "work-style",
          "leadership-style",
        ],
        theoreticalFoundation:
          "Super's Work Values Inventory measuring extrinsic and intrinsic rewards essential for occupational congruence and longevity.",
      },
      {
        id: "decision-making-style",
        code: "05.05",
        slug: "decision-making-style",
        fieldId: "career",
        fieldCode: "05",
        fieldSlug: "work-career",
        titleKey: "planned.decision-making-style.title",
        summaryKey: "planned.decision-making-style.summary",
        dimensions: [
          "Rational Analytical",
          "Intuitive Experiential",
          "Consensual Collaborative",
          "Decisive Pragmatic",
        ],
        relatedSlugs: [
          "leadership-style",
          "work-style",
          "career-personality",
        ],
        theoreticalFoundation:
          "Scott & Bruce General Decision-Making Style (GDMS) evaluating cognitive heuristics and information processing patterns.",
      },
    ],
  },
] as const;

/** Backwards-compatible cluster definition representation */
export type ClusterDefinition = {
  id: FieldId;
  code: string;
  name: string;
  taglineKey: string;
  descriptionKey: string;
  testIds: readonly string[];
};

export const CLUSTERS_DEFINITION: readonly ClusterDefinition[] =
  FIELDS_DEFINITION.map((f) => ({
    id: f.id,
    code: f.code,
    name: f.name,
    taglineKey: f.taglineKey,
    descriptionKey: f.descriptionKey,
    testIds: f.instruments.map((inst) => inst.id),
  }));

export function clusterForTest(testId: string): FieldId {
  for (const field of FIELDS_DEFINITION) {
    if (
      field.instruments.some(
        (inst) =>
          inst.id === testId ||
          inst.slug === testId ||
          (testId === "political" && inst.id === "political") ||
          (testId === "attachment" && inst.id === "attachment"),
      )
    ) {
      return field.id;
    }
  }
  return "personality";
}

export function availableTests(): AvailableTest[] {
  const configs = listTestIds();
  const available: AvailableTest[] = [];

  for (const id of configs) {
    try {
      const config = loadTest(id);
      const fieldId = clusterForTest(config.id);
      const field = FIELDS_DEFINITION.find((f) => f.id === fieldId);
      const instMeta = field?.instruments.find(
        (i) => i.id === config.id || i.slug === config.id,
      );

      available.push({
        status: "available",
        id: config.id,
        code: instMeta?.code ?? "01.00",
        slug: instMeta?.slug ?? config.id,
        fieldId,
        fieldCode: field?.code ?? "01",
        fieldSlug: field?.slug ?? fieldId,
        clusterId: fieldId,
        titleKey: config.title_key,
        summaryKey: config.summary_key,
        questionCount: config.questions.length,
        minutes: Math.max(
          1,
          Math.round((config.questions.length * SECONDS_PER_QUESTION) / 60),
        ),
        dimensions: instMeta?.dimensions ?? [],
        relatedSlugs: instMeta?.relatedSlugs ?? [],
        nonClinicalNotice: instMeta?.nonClinicalNotice,
      });
    } catch {
      // ignore unparseable
    }
  }

  return available;
}

export function plannedTests(): PlannedTest[] {
  const availableIds = new Set(listTestIds());
  const list: PlannedTest[] = [];

  for (const field of FIELDS_DEFINITION) {
    for (const inst of field.instruments) {
      if (!availableIds.has(inst.id)) {
        list.push({
          status: "planned",
          id: inst.id,
          code: inst.code,
          slug: inst.slug,
          fieldId: field.id,
          fieldCode: field.code,
          fieldSlug: field.slug,
          clusterId: field.id,
          titleKey: inst.titleKey,
          summaryKey: inst.summaryKey,
          dimensions: inst.dimensions,
          relatedSlugs: inst.relatedSlugs,
          nonClinicalNotice: inst.nonClinicalNotice,
        });
      }
    }
  }
  return list;
}

export function testClusters(): TestCluster[] {
  const availableMap = new Map<string, AvailableTest>();
  for (const test of availableTests()) {
    availableMap.set(test.id, test);
  }

  return FIELDS_DEFINITION.map((field) => {
    const tests: CatalogueEntry[] = field.instruments.map((inst) => {
      const avail = availableMap.get(inst.id);
      if (avail) {
        return avail;
      }
      return {
        status: "planned",
        id: inst.id,
        code: inst.code,
        slug: inst.slug,
        fieldId: field.id,
        fieldCode: field.code,
        fieldSlug: field.slug,
        clusterId: field.id,
        titleKey: inst.titleKey,
        summaryKey: inst.summaryKey,
        dimensions: inst.dimensions,
        relatedSlugs: inst.relatedSlugs,
        nonClinicalNotice: inst.nonClinicalNotice,
      };
    });

    const availableCount = tests.filter((t) => t.status === "available").length;
    const plannedCount = tests.filter((t) => t.status === "planned").length;

    return {
      id: field.id,
      code: field.code,
      slug: field.slug,
      name: field.name,
      subtitle: field.subtitle,
      taglineKey: field.taglineKey,
      descriptionKey: field.descriptionKey,
      tests,
      availableCount,
      plannedCount,
      futureRoadmap: [...field.futureRoadmap],
    };
  });
}

export function catalogue(): CatalogueEntry[] {
  return testClusters().flatMap((c) => c.tests);
}

export function findFieldBySlug(slug: string): FieldDefinition | undefined {
  const normalized = slug.toLowerCase();
  return FIELDS_DEFINITION.find(
    (f) =>
      f.slug === normalized ||
      f.id === normalized ||
      f.name.toLowerCase() === normalized,
  );
}

export function findInstrument(
  slugOrId: string,
): { instrument: InstrumentMetadata; field: FieldDefinition } | undefined {
  const normalized = slugOrId.toLowerCase();
  for (const field of FIELDS_DEFINITION) {
    for (const inst of field.instruments) {
      if (
        inst.slug === normalized ||
        inst.id === normalized ||
        inst.code === normalized ||
        (normalized === "political" && inst.id === "political") ||
        (normalized === "attachment" && inst.id === "attachment")
      ) {
        return { instrument: inst, field };
      }
    }
  }
  return undefined;
}

export function getRelatedInstruments(
  instrument: InstrumentMetadata,
): InstrumentMetadata[] {
  const related: InstrumentMetadata[] = [];
  const slugs = new Set(instrument.relatedSlugs);

  for (const field of FIELDS_DEFINITION) {
    for (const inst of field.instruments) {
      if (slugs.has(inst.slug) || slugs.has(inst.id)) {
        related.push(inst);
      }
    }
  }

  return related;
}
