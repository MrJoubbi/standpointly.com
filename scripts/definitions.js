/**
 * Full definitions for 18 Standpointly psychometric instruments:
 * Field 01: dark-triad, empathy, emotional-intelligence, self-esteem
 * Field 02: compatibility, relationship-anxiety, boundaries
 * Field 03: feminist-perspectives, gender-equality, individualism-collectivism
 * Field 04: burnout, emotional-regulation, resilience, procrastination
 * Field 05: career-personality, work-style, career-values, decision-making-style
 */

const INSTRUMENTS_DEFINITIONS = [
  // -------------------------------------------------------------
  // 01.02 DARK-TRIAD
  // -------------------------------------------------------------
  {
    id: "dark-triad",
    slug: "dark-triad",
    code: "01.02",
    fieldId: "personality",
    title: "The Dark Triad Spectrum",
    summary: "Evaluate subclinical personality traits across Machiavellian tactical strategy and ego-narcissistic ambition.",
    axes: {
      x: {
        id: "manipulation",
        name: "Strategic Pragmatism & Influence",
        negative: "Transparent Candor",
        positive: "Calculated Influence"
      },
      y: {
        id: "grandiosity",
        name: "Ego Grandiosity & Callousness",
        negative: "Empathetic Humility",
        positive: "Unflinching Ambition"
      }
    },
    cells: [
      { id: "humble_empath", sector: "The Humble Empath", label: "Transparent & Empathetic", desc: "Prioritizes communal harmony, genuine authenticity, and unpretentious cooperation." },
      { id: "grounded_realist", sector: "The Grounded Realist", label: "Balanced & Candid", desc: "Pragmatic without deceit; communicates clearly with honest intentions." },
      { id: "dominant_visionary", sector: "The Dominant Visionary", label: "Assertive Leader", desc: "Driven by high self-belief and direct leadership, maintaining candid transparency." },
      { id: "honest_collaborator", sector: "The Honest Collaborator", label: "Cooperative Partner", desc: "Builds trust through predictable, open interactions and mutual regard." },
      { id: "tempered_pragmatist", sector: "The Tempered Pragmatist", label: "Adaptive Strategist", desc: "Balances ethical transparency with shrewd awareness of interpersonal politics." },
      { id: "shrewd_operator", sector: "The Shrewd Operator", label: "Tactical Strategist", desc: "Highly adept at reading social dynamics and deploying strategic leverage." },
      { id: "detached_cynic", sector: "The Detached Cynic", label: "Skeptical Observer", desc: "Observes human dynamics with guarded detachment and a low tolerance for hypocrisy." },
      { id: "opportunistic_tactician", sector: "The Opportunistic Tactician", label: "Adaptive Tactician", desc: "Quick to seize practical advantages while navigating complex institutional arenas." },
      { id: "machiavellian_maverick", sector: "The Machiavellian Maverick", label: "Sovereign Strategist", desc: "Operates with uncompromising calculated focus, emotional detachment, and high ambition." }
    ],
    questionThemes: {
      xPos: [
        "It is wise to share secrets only when it serves a clear strategic objective.",
        "Knowing what motivates others gives you legitimate leverage in negotiations.",
        "A measured presentation of the truth is often more effective than raw bluntness.",
        "In competitive environments, revealing all your intentions too early is foolish.",
        "People in positions of power must master the subtle art of interpersonal persuasion.",
        "Tactical timing and patience achieve far more than impulsive honesty.",
        "Directing people toward your preferred outcome is a necessary leadership competency.",
        "Unflinching focus on end results justifies flexible diplomatic maneuvering.",
        "One must keep their long-term plans carefully guarded from competitors.",
        "Understanding people's psychological vulnerabilities is a hallmark of high competence."
      ],
      xNeg: [
        "I place honesty and total transparency above any tactical or political advantage.",
        "Manipulating someone's feelings to achieve an objective is fundamentally unacceptable.",
        "I express my true feelings and opinions even when it puts me at a disadvantage.",
        "True strength comes from being completely genuine with colleagues and friends.",
        "I would rather lose an argument fairly than win through psychological games.",
        "Openness and vulnerability are the bedrock of genuine human connection.",
        "I find calculated flattery distasteful and refuse to use it.",
        "Treating everyone with unconditional fairness always outperforms competitive gamesmanship.",
        "I refuse to hide my real motives to gain an upper hand in social situations.",
        "Direct, uncomplicated honesty is the only ethical foundation for personal relationships."
      ],
      crossPP: [
        "High-stakes success requires both calculated strategic maneuvers and unapologetic ambition.",
        "To leave a lasting mark on the world, one must be willing to bend rules and outshine rivals."
      ],
      crossPM: [
        "I deploy strategic diplomacy solely to protect vulnerable teams and maintain team harmony.",
        "Subtle political tact is best used quietly behind the scenes without seeking personal glory."
      ],
      crossMP: [
        "I hold extraordinarily high standards for myself and demand recognition without playing political games.",
        "My ambition is direct and unvarnished; I do not need sneaky tactics to prove my superiority."
      ],
      crossMM: [
        "I embrace modest humility and place the collective welfare of others ahead of personal status.",
        "I strive to live simply, treating all people with gentleness, transparency, and warmth."
      ],
      yPos: [
        "I feel destined to achieve things far greater than the average person.",
        "Complacency is a flaw; exceptional individuals deserve exceptional status and influence.",
        "When tough decisions must be made, emotional sentimentality must not soften my resolve.",
        "I naturally expect deference when I possess superior expertise and vision."
      ],
      yNeg: [
        "I view myself as fundamentally equal in value to every other human being.",
        "Public accolades and personal status mean very little to me compared to inner peace.",
        "I am deeply sensitive to other people's emotional distress and prioritize their comfort.",
        "I prefer blending into a dedicated team rather than standing out as a singular hero."
      ]
    }
  },

  // -------------------------------------------------------------
  // 01.03 EMPATHY
  // -------------------------------------------------------------
  {
    id: "empathy",
    slug: "empathy",
    code: "01.03",
    fieldId: "personality",
    title: "Affective & Cognitive Empathy Mapping",
    summary: "Differentiate your empathic capacities between cognitive perspective-taking and affective emotional resonance.",
    axes: {
      x: {
        id: "cognitive_empathy",
        name: "Cognitive Perspective Taking",
        negative: "Subjective Internal Focus",
        positive: "Multilateral Perspective Taking"
      },
      y: {
        id: "affective_empathy",
        name: "Affective Emotional Resonance",
        negative: "Emotionally Contained",
        positive: "Deep Emotional Resonance"
      }
    },
    cells: [
      { id: "compassionate_sage", sector: "The Compassionate Sage", label: "Reflective Supporter", desc: "Possesses deep emotional care while remaining grounded in personal boundaries." },
      { id: "attuned_counselor", sector: "The Attuned Counselor", label: "Balanced Empathetic Guide", desc: "Understands others intuitively while regulating their own emotional equilibrium." },
      { id: "resonant_feeler", sector: "The Resonant Feeler", label: "Deeply Attuned Knower", desc: "Feels the joys and heartaches of others vividly as if they were their own." },
      { id: "objective_analyst", sector: "The Objective Analyst", label: "Rational Problem-Solver", desc: "Analyzes interpersonal situations through logical clarity rather than shared emotion." },
      { id: "integrated_empath", sector: "The Integrated Empath", label: "Comprehensive Empath", desc: "Masters both intellectual perspective-taking and deep emotional resonance." },
      { id: "intuitive_connector", sector: "The Intuitive Connector", label: "Relational Bridges", desc: "Seamlessly translates between differing worldviews while honoring heartfelt emotions." },
      { id: "stoic_observer", sector: "The Stoic Observer", label: "Self-Contained Realist", desc: "Keeps a clear emotional boundary, focusing on personal duties and self-reliance." },
      { id: "pragmatic_supporter", sector: "The Pragmatic Supporter", label: "Action-Oriented Ally", desc: "Solves tangible problems for others without becoming overwhelmed by their feelings." },
      { id: "unfiltered_sponge", sector: "The Unfiltered Sponge", label: "Visceral Resonator", desc: "Absorbs ambient emotional energies instantly from surrounding environments." }
    ],
    questionThemes: {
      xPos: [
        "I effortlessly imagine how complex situations look from another person's viewpoint.",
        "Before judging someone's reaction, I deliberately analyze their personal history and context.",
        "I can understand the logic behind an argument even when I personally disagree with it.",
        "I frequently consider alternative perspectives during heated disagreements.",
        "I notice subtle changes in someone's tone and accurately deduce what they are thinking.",
        "I enjoy mentally reconstructing how someone from a completely different culture sees life.",
        "I easily anticipate what someone will need before they have to articulate it logically.",
        "I look at conflicts from an impartial third-party standpoint to understand all parties.",
        "I adjust my communication style according to the cognitive framework of my listener.",
        "Understanding people's underlying motives is an intuitive and analytical reflex for me."
      ],
      xNeg: [
        "I focus primarily on my own lived experience rather than guessing other people's inner thoughts.",
        "I find it exhausting to constantly try to see things from opposing viewpoints.",
        "When someone acts irrationally, I focus on what happened rather than why they felt that way.",
        "I rely on my own direct judgment rather than trying to inhabit another's mental model.",
        "People should clearly state what they think rather than expecting others to read their mind.",
        "I do not spend time analyzing the complex psychological backgrounds of acquaintances.",
        "I evaluate ideas on objective merit rather than the emotional perspective of the speaker.",
        "I stay firmly rooted in my own worldview and rarely question my personal standpoint.",
        "Trying to accommodate every perspective often leads to indecisiveness and confusion.",
        "I prefer straightforward, direct communication over subtle mental perspective-taking."
      ],
      crossPP: [
        "I both intellectually understand someone's suffering and feel their physical pain in my chest.",
        "In moments of crisis, I simultaneously see the big picture and resonate deeply with everyone affected."
      ],
      crossPM: [
        "I can dissect another person's emotional turmoil with clinical, detached cognitive clarity.",
        "I understand exactly why someone is upset while remaining completely calm and unruffled myself."
      ],
      crossMP: [
        "I immediately absorb the tension in a room even when I have no clue what caused it.",
        "I weep openly at touching stories even when I don't fully understand the character's motives."
      ],
      crossMM: [
        "I keep both my thoughts and emotions strictly focused on my personal priorities.",
        "I rarely get caught up in other people's dramas or emotional fluctuations."
      ],
      yPos: [
        "Seeing someone cry instantly triggers a knot of genuine sorrow inside me.",
        "The emotional atmosphere of a gathering directly impacts my physical energy level.",
        "I feel a profound, heartfelt warmth whenever I witness acts of tender kindness.",
        "When a loved one is stressed, I experience their anxiety as if it were happening to me."
      ],
      yNeg: [
        "I remain emotionally steady and unmoved even when those around me are panicking.",
        "I do not internalize other people's moods; my emotional state remains self-generated.",
        "Crying scenes in films rarely evoke any visceral physical sensation in my body.",
        "I maintain a firm psychological barrier that shields me from external emotional chaos."
      ]
    }
  },

  // -------------------------------------------------------------
  // 01.04 EMOTIONAL-INTELLIGENCE
  // -------------------------------------------------------------
  {
    id: "emotional-intelligence",
    slug: "emotional-intelligence",
    code: "01.04",
    fieldId: "personality",
    title: "Emotional Intelligence Spectrum",
    summary: "Map your emotional architecture across granular self-awareness and intentional self-regulation.",
    axes: {
      x: {
        id: "emotional_awareness",
        name: "Granular Emotional Awareness",
        negative: "Implicit Intuitive Sensing",
        positive: "Articulate Diagnostic Awareness"
      },
      y: {
        id: "emotional_modulation",
        name: "Intentional Self-Modulation",
        negative: "Spontaneous Expressive Flow",
        positive: "Equanimous Self-Regulation"
      }
    },
    cells: [
      { id: "stoic_anchor", sector: "The Stoic Anchor", label: "Calm & Contained", desc: "Steadfast, peaceful, and controlled, maintaining an even keel under pressure." },
      { id: "grounded_harmonizer", sector: "The Grounded Harmonizer", label: "Measured Regulator", desc: "Regulates emotions skillfully while honoring everyday relational needs." },
      { id: "mindful_master", sector: "The Mindful Master", label: "Masterful Synthesizer", desc: "Combines pinpoint diagnostic self-knowledge with serene emotional self-mastery." },
      { id: "quiet_observer", sector: "The Quiet Observer", label: "Reflective Sensor", desc: "Processes internal feelings privately with understated contemplation." },
      { id: "adaptive_synthesizer", sector: "The Adaptive Synthesizer", label: "Balanced EQ Operator", desc: "Balances real-time emotional insight with flexible, situation-appropriate responses." },
      { id: "dynamic_coach", sector: "The Dynamic Coach", label: "Emotionally Articulate Guide", desc: "Names complex feelings with precision and channels them toward constructive growth." },
      { id: "raw_expressive", sector: "The Raw Expressive", label: "Passionate Authentic", desc: "Expresses emotions spontaneously and unreservedly with vibrant vitality." },
      { id: "reactive_sensor", sector: "The Reactive Sensor", label: "Immediate Responder", desc: "Feels intensely and responds instantly to shifts in the emotional landscape." },
      { id: "charismatic_spark", sector: "The Charismatic Spark", label: "Expressive Catalyst", desc: "Uses rich emotional vocabulary to inspire and energize collaborative spaces." }
    ],
    questionThemes: {
      xPos: [
        "I can instantly distinguish between subtle shades of emotion such as frustration versus disappointment.",
        "I track physical body cues to identify the exact roots of emerging stress.",
        "I possess a rich, precise vocabulary for articulating my internal psychological states.",
        "I know precisely which underlying beliefs trigger my defensive reactions.",
        "I frequently pause to reflect on why a specific interaction left me feeling uneasy.",
        "I recognize conflicting emotions simultaneously, such as grief intertwined with relief.",
        "I accurately forecast how future events will influence my mood and motivation.",
        "I quickly identify the psychological needs that lie beneath my emotional impulses.",
        "I can objectively describe my emotional patterns to a colleague or therapist.",
        "Self-reflection on my inner affective landscape is a natural daily habit."
      ],
      xNeg: [
        "I experience emotions as general, broad states rather than distinct, dissected categories.",
        "I don't overanalyze my feelings; I just deal with things as they come.",
        "Putting my exact emotional state into precise words often feels unnecessary.",
        "I focus on what needs to be done rather than dissecting how I feel about it.",
        "I rarely spend time cataloging the specific triggers of my daily moods.",
        "Feelings are too fluid and mysterious to reduce to clinical labels.",
        "I trust my gut instincts without needing to intellectually dissect every sensation.",
        "Analyzing my emotions tends to make things more complicated than they really are.",
        "I move on from negative feelings quickly instead of searching for their root cause.",
        "My emotional reactions are simple and direct, requiring no deep diagnostic examination."
      ],
      crossPP: [
        "When I feel an intense emotion rising, I pinpoint its exact trigger and regulate my expression smoothly.",
        "I maintain conscious diagnostic clarity while keeping my nervous system calm and composed."
      ],
      crossPM: [
        "I can analyze and explain my profound rage with crystalline clarity while allowing it to roar freely.",
        "I articulate my feelings with vivid precision while letting my passionate impulses flow uncensored."
      ],
      crossMP: [
        "Even when I cannot name what is bothering me, I maintain firm control over my composure.",
        "I instinctively calm my physical breathing and steady my demeanor during stressful moments."
      ],
      crossMM: [
        "I wear my heart completely on my sleeve and react authentically in the heat of the moment.",
        "My emotional responses are raw, immediate, and free from any filtering or restraint."
      ],
      yPos: [
        "I deliberately calm myself down when anger threatens to derail an important conversation.",
        "I can delay gratification and soothe my own impatience with practiced equanimity.",
        "Under extreme pressure, I consciously direct my focus toward productive solutions.",
        "I avoid saying or doing things in anger that I know I would later regret."
      ],
      yNeg: [
        "When I get angry or excited, it is immediately obvious to everyone in the room.",
        "Suppressing or holding back an emotion feels unnatural and unhealthy to me.",
        "I let my immediate passions guide my immediate actions without calculating consequences.",
        "I believe in authentic, uncensored expression over polite, sanitized composure."
      ]
    }
  },

  // -------------------------------------------------------------
  // 01.05 SELF-ESTEEM
  // -------------------------------------------------------------
  {
    id: "self-esteem",
    slug: "self-esteem",
    code: "01.05",
    fieldId: "personality",
    title: "Self-Worth & Contingency Profile",
    summary: "Distinguish between active competence-based self-efficacy and unconditional, intrinsic self-acceptance.",
    axes: {
      x: {
        id: "self_efficacy",
        name: "Agency & Competence Efficacy",
        negative: "Hesitant Self-Doubt",
        positive: "Confident Agentic Mastery"
      },
      y: {
        id: "unconditional_worth",
        name: "Unconditional Inherent Worth",
        negative: "Contingent & Fragile Worth",
        positive: "Stable Inherent Self-Acceptance"
      }
    },
    cells: [
      { id: "serene_anchor", sector: "The Serene Anchor", label: "Quiet Self-Acceptance", desc: "Possesses profound unconditional peace with self, unburdened by the need to prove competence." },
      { id: "grounded_realist", sector: "The Grounded Realist", label: "Humility & Realism", desc: "Recognizes human limits while maintaining solid self-respect and steady perseverance." },
      { id: "radiant_sovereign", sector: "The Radiant Sovereign", label: "Wholehearted Master", desc: "Integrates strong execution mastery with indestructible, unconditional self-worth." },
      { id: "quiet_evaluator", sector: "The Quiet Evaluator", label: "Reflective Striver", desc: "Carefully monitors personal growth, learning from both success and failure with grace." },
      { id: "resilient_striver", sector: "The Resilient Striver", label: "Adaptive Believer", desc: "Maintains a balanced and realistic appraisal of capabilities across changing seasons." },
      { id: "driven_achiever", sector: "The Driven Achiever", label: "High-Agency Performer", desc: "Draws confidence from overcoming formidable challenges and mastering difficult skills." },
      { id: "vulnerable_critic", sector: "The Vulnerable Critic", label: "Self-Critical Doubter", desc: "Often battles harsh internal scrutiny and worries about falling short of standards." },
      { id: "strained_performer", sector: "The Strained Performer", label: "Validation Seeker", desc: "Works tirelessly to achieve outward success to soothe underlying self-worth insecurities." },
      { id: "defensive_perfectionist", sector: "The Defensive Perfectionist", label: "Relentless Competitor", desc: "Channels extraordinary competence to defend against fears of inadequacy." }
    ],
    questionThemes: {
      xPos: [
        "I am confident in my ability to master new, complex skills when I apply myself.",
        "When confronted with unexpected obstacles, I trust my capacity to find an effective solution.",
        "I back myself to succeed even in unfamiliar and demanding environments.",
        "I take decisive initiative because I trust my judgment and execution abilities.",
        "Past triumphs give me unwavering confidence that I can overcome future hurdles.",
        "I view difficult setbacks as problems to solve rather than reflections of helplessness.",
        "I have a proven track record of converting ambitious visions into tangible results.",
        "I feel fully equipped to handle whatever personal or professional challenges arise.",
        "I proactively step into leadership roles because I know I can deliver results.",
        "My competence allows me to navigate high-stakes ambiguity with steady poise."
      ],
      xNeg: [
        "I frequently second-guess my decisions and worry that I lack necessary capabilities.",
        "When projects become complex, I tend to assume that others could handle them better.",
        "I often feel like an impostor who has simply gotten lucky so far.",
        "Unexpected challenges easily undermine my belief in my problem-solving ability.",
        "I hesitate to take on ambitious goals because I fear being exposed as inadequate.",
        "I rely heavily on explicit instructions rather than trusting my independent competence.",
        "Failure at a task makes me feel that I am fundamentally ill-equipped for success.",
        "I tend to magnify my mistakes while minimizing my genuine accomplishments.",
        "I struggle to assert my expertise even in areas where I have substantial experience.",
        "Doubt about my practical abilities often prevents me from taking calculated risks."
      ],
      crossPP: [
        "I know I have formidable practical mastery, yet my self-worth remains unshakable even if I fail.",
        "I celebrate my high competence while knowing my fundamental human worth never depends on it."
      ],
      crossPM: [
        "I know I am exceptionally skilled, but any failure plunges me into devastating self-reproach.",
        "My confidence is massive when winning, but my inner worth crashes when results slip."
      ],
      crossMP: [
        "Even when I feel clumsy and unskilled at a new task, I love and accept myself unconditionally.",
        "My practical capabilities may be modest, but my dignity and inner peace are rock solid."
      ],
      crossMM: [
        "I feel both incapable of achieving difficult goals and fundamentally unworthy of love.",
        "Self-criticism dominates my mind; I constantly judge my competence and my character harshly."
      ],
      yPos: [
        "My sense of fundamental self-worth remains intact regardless of external approval.",
        "I forgive myself easily when I make foolish mistakes; I am human and worthy of grace.",
        "I feel secure in my core identity without needing to prove anything to anyone.",
        "Rejection or criticism from others does not diminish my foundational self-respect."
      ],
      yNeg: [
        "My self-esteem fluctuates wildly based on whether I have performed well that day.",
        "A single critical remark can ruin my mood and make me feel completely worthless.",
        "I constantly crave validation and praise from others to feel good about myself.",
        "If I am not excelling at what I do, I struggle to find any reason to value myself."
      ]
    }
  },

  // -------------------------------------------------------------
  // 02.03 COMPATIBILITY
  // -------------------------------------------------------------
  {
    id: "compatibility",
    slug: "relationship-compatibility",
    code: "02.03",
    fieldId: "relationships",
    title: "Relational Compatibility Matrix",
    summary: "Evaluate your partnership dynamics across desired relational interdependence and lifestyle rhythm structure.",
    axes: {
      x: {
        id: "interdependence",
        name: "Relational Interdependence",
        negative: "Autonomous Differentiation",
        positive: "Interdependent Synergy"
      },
      y: {
        id: "temperament_harmony",
        name: "Lifestyle Rhythm & Structure",
        negative: "Spontaneous Novelty",
        positive: "Predictable Structured Harmony"
      }
    },
    cells: [
      { id: "parallel_anchors", sector: "Parallel Anchors", label: "Autonomous & Structured", desc: "Values clear independent routines and dependable, predictable partnership agreements." },
      { id: "harmonious_duo", sector: "The Harmonious Duo", label: "Balanced & Stable", desc: "Builds a steady, organized joint life while honoring mutual personal space." },
      { id: "fused_partners", sector: "Fused Partners", label: "United & Structured", desc: "Thrives on deep shared routines, collaborative planning, and doing everything together." },
      { id: "independent_allies", sector: "Independent Allies", label: "Self-Sovereign Mates", desc: "Offers loyal companionship while fiercely protecting individual autonomy and creative pursuits." },
      { id: "balanced_mates", sector: "Balanced Mates", label: "Dynamic Equilibrium", desc: "Harmoniously toggles between togetherness and independence as life requires." },
      { id: "collaborative_explorers", sector: "Collaborative Explorers", label: "Interdependent Explorers", desc: "Channels joint partnership energy into shared dreams, mutual projects, and shared goals." },
      { id: "free_spirits", sector: "Free Spirits", label: "Spontaneous & Independent", desc: "Unconventional and adaptable; thrives on freedom, unexpected adventures, and loose schedules." },
      { id: "adventurous_seekers", sector: "Adventurous Seekers", label: "Novelty Seeking Partners", desc: "Enjoys spontaneous getaways and playful disruption to keep relational sparks alive." },
      { id: "kaleidoscopic_lovers", sector: "Kaleidoscopic Lovers", label: "Intensely Spontaneous", desc: "Passionate, tightly bonded, and always ready for impromptu shared experiences." }
    ],
    questionThemes: {
      xPos: [
        "In a healthy relationship, major decisions should always be made jointly as a unified team.",
        "I feel most fulfilled when my partner and I share overlapping social circles and daily activities.",
        "Merging finances and long-term life plans represents the true beauty of commitment.",
        "I love consulting my partner before making choices that impact our daily calendar.",
        "Deep intimacy means wanting to share your inner world, struggles, and triumphs continuously.",
        "I believe the concept of 'us' should take precedence over individual ego in a relationship.",
        "Shared hobbies and collaborative projects form the essential glue of lasting love.",
        "I naturally refer to our goals and possessions in the collective 'we' rather than 'I'.",
        "Knowing that my partner relies on me for emotional support deepens my devotion.",
        "Building a unified joint destiny is the primary purpose of romantic partnership."
      ],
      xNeg: [
        "Maintaining distinct independent identities is crucial for keeping romance alive.",
        "I need significant solitary time to recharge, even in the closest partnership.",
        "Separate finances and personal career trajectories prevent unhealthy enmeshment.",
        "A partner should not be expected to be your sole source of friendship or fulfillment.",
        "I value having private hobbies and friendships that belong entirely to me.",
        "Couples who do everything together risk suffocating each other's individuality.",
        "I prefer making my own day-to-day decisions without needing constant consultation.",
        "Personal autonomy and self-sovereignty must never be sacrificed for a relationship.",
        "Healthy boundaries ensure that two whole individuals meet without losing themselves.",
        "I need a partner who is completely content spending weekends on their own projects."
      ],
      crossPP: [
        "My ideal partnership combines deeply entwined shared routines with reliable, structured planning.",
        "We thrive when our schedules are seamlessly synchronized and our domestic life is orderly."
      ],
      crossPM: [
        "We are joined at the hip, constantly chasing impromptu adventures and spontaneous thrills together.",
        "Our deep emotional fusion loves unpredictable travels and ditching plans on a whim."
      ],
      crossMP: [
        "We each manage our independent lives with meticulous calendars, respecting each other's predictable space.",
        "We maintain separate spheres of life governed by disciplined, respectful routines."
      ],
      crossMM: [
        "We both cherish total personal freedom, unstructured days, and zero rigid expectations.",
        "Our connection is playful, independent, and thrives entirely on spontaneous inspiration."
      ],
      yPos: [
        "Having consistent weekly rituals and predictable domestic routines brings me peace.",
        "I feel most secure when both partners honor commitments and planned schedules.",
        "Sudden last-minute changes to our weekend plans cause me unnecessary friction.",
        "Clear agreements regarding chores, finances, and time allocation prevent conflicts."
      ],
      yNeg: [
        "Too much routine makes a relationship feel stale, boring, and institutional.",
        "I love dropping everything to embark on a sudden midnight road trip or weekend getaway.",
        "Strict schedules stifle romantic spontaneity; I prefer going with the natural flow.",
        "A little unpredictability and surprise keep relational chemistry vibrant and exciting."
      ]
    }
  },

  // -------------------------------------------------------------
  // 02.04 RELATIONSHIP-ANXIETY
  // -------------------------------------------------------------
  {
    id: "relationship-anxiety",
    slug: "relationship-anxiety",
    code: "02.04",
    fieldId: "relationships",
    title: "Relational Security & Vigilance",
    summary: "Map interpersonal vulnerabilities across abandonment vigilance and explicit reassurance dependency.",
    axes: {
      x: {
        id: "abandonment_vigilance",
        name: "Abandonment Vigilance & Hyperactivation",
        negative: "Grounded Assurance",
        positive: "Hypervigilant Sensitivity"
      },
      y: {
        id: "reassurance_seeking",
        name: "Reassurance Seeking & Dependency",
        negative: "Autonomous Self-Soothing",
        positive: "Active Reassurance Solicitousness"
      }
    },
    cells: [
      { id: "tranquil_secure", sector: "Tranquil Secure", label: "Serene & Grounded", desc: "Possesses steady trust in relational permanence and soothes their own emotions with ease." },
      { id: "anchored_partner", sector: "The Anchored Partner", label: "Steady Companion", desc: "Enjoys warm communication while remaining fundamentally grounded in emotional security." },
      { id: "watchful_guardian", sector: "The Watchful Guardian", label: "Quietly Sensitive", desc: "Notices interpersonal nuances alertly while containing their concerns internally." },
      { id: "quiet_stoic", sector: "The Quiet Stoic", label: "Self-Sufficient Ally", desc: "Prefers solving emotional turbulence privately rather than asking for overt affirmation." },
      { id: "steady_reciprocator", sector: "The Steady Reciprocator", label: "Balanced Partner", desc: "Balances honest requests for clarity with mutual respect for partner boundaries." },
      { id: "attentive_seeker", sector: "The Attentive Seeker", label: "Vigilant Reassurer", desc: "Quick to pick up on shifts in connection and proactively confirms mutual affection." },
      { id: "withdrawn_protector", sector: "The Withdrawn Protector", label: "Guarded Self-Shield", desc: "Retreats into self-protection when feeling vulnerable to preempt potential heartache." },
      { id: "longing_inquirer", sector: "The Longing Inquirer", label: "Affirmation Seeker", desc: "Deeply craves verbal affirmation and explicit reminders that love remains intact." },
      { id: "anxious_attacher", sector: "The Anxious Attacher", label: "Hyper-Attuned Seeker", desc: "Experiences acute fear of disconnect and seeks frequent, immediate relational verification." }
    ],
    questionThemes: {
      xPos: [
        "When my partner is quiet or uncommunicative, I immediately worry that they are pulling away.",
        "I tend to analyze brief text messages for hidden signs of irritation or cooling affection.",
        "The thought of someone I love losing interest in me triggers intense stomach butterflies.",
        "I am hyper-alert to micro-expressions that might signal disappointment in our connection.",
        "I often wonder whether my partner loves me as deeply as I love them.",
        "Delays in response to my calls frequently make me assume the worst has happened.",
        "I feel a deep, nagging dread that happiness in love is inherently fragile and fleeting.",
        "Past betrayals make it difficult to trust that a partner will stay committed forever.",
        "I replay recent conversations in my head searching for mistakes I might have made.",
        "Emotional distance from a loved one feels physically destabilizing to my sense of well-being."
      ],
      xNeg: [
        "I trust that my partner's love remains steady even when we spend days apart.",
        "If my partner is in a bad mood, I assume it relates to external stress, not to me.",
        "I rarely worry about being abandoned or replaced by someone else.",
        "I feel relaxed and confident in the durability of my close romantic bonds.",
        "A brief or delayed text message does not cause me any relational anxiety whatsoever.",
        "I don't need constant reminders to know that I am valued and cherished.",
        "I assume good intentions in my relationship unless there is undeniable evidence otherwise.",
        "I give my partner emotional space without feeling threatened or insecure.",
        "My self-esteem is independent enough that relational ups and downs don't shatter me.",
        "I approach intimate partnerships with calm, baseline confidence and peace."
      ],
      crossPP: [
        "When I sense emotional cooling, my anxiety spikes and I immediately ask if everything is okay.",
        "I obsess over potential abandonment and repeatedly ask my partner to reassure me of their love."
      ],
      crossPM: [
        "I panic internally that my partner will leave, yet I bottle it up and suffer in complete silence.",
        "I feel hyper-vigilant about disconnection but refuse to show my desperation by asking for help."
      ],
      crossMP: [
        "I feel secure in our bond, but I still love receiving frequent verbal affirmations and sweet check-ins.",
        "I don't fear being left, yet I actively enjoy continuous expressions of devotion and compliments."
      ],
      crossMM: [
        "I am completely confident in our security and self-soothe any rare moments of doubt easily.",
        "I feel emotionally whole on my own and never demand external reassurance to feel worthy."
      ],
      yPos: [
        "I feel an urgent need to talk things through the moment any relational friction occurs.",
        "Hearing 'I love you' and receiving explicit verbal appreciation calms my nervous system.",
        "I frequently ask my partner for confirmation that our relationship is on solid ground.",
        "Without regular validation, I begin to feel invisible or unappreciated in a partnership."
      ],
      yNeg: [
        "I process relationship doubts internally through solitary reflection and journaling.",
        "I find repetitive reassurance seeking suffocating and prefer to let actions speak.",
        "I can sit comfortably with unresolved relationship questions until the right time to speak.",
        "I soothe my own emotional distress without demanding immediate comfort from my partner."
      ]
    }
  },

  // -------------------------------------------------------------
  // 02.05 BOUNDARIES
  // -------------------------------------------------------------
  {
    id: "boundaries",
    slug: "relationship-boundaries",
    code: "02.05",
    fieldId: "relationships",
    title: "Interpersonal Boundary Architecture",
    summary: "Examine your boundary dynamics across self-differentiation sovereignty and structural relational permeability.",
    axes: {
      x: {
        id: "differentiation",
        name: "Self-Differentiation & Sovereignty",
        negative: "Enmeshed Permeability",
        positive: "Differentiated Sovereignty"
      },
      y: {
        id: "boundary_flexibility",
        name: "Relational Warmth & Flexibility",
        negative: "Rigid Fortification",
        positive: "Adaptive Warmth"
      }
    },
    cells: [
      { id: "protective_fortress", sector: "The Protective Fortress", label: "Fortified Sovereign", desc: "Maintains clear individual autonomy behind robust, uncompromising psychological walls." },
      { id: "selective_sanctuary", sector: "The Selective Sanctuary", label: "Discriminating Guardian", desc: "Opens up only after rigorous trust has been built through demonstrated consistency." },
      { id: "sovereign_haven", sector: "The Sovereign Haven", label: "Warmly Sovereign", desc: "Effortlessly asserts personal boundaries while welcoming deep, authentic intimacy." },
      { id: "closed_sentinel", sector: "The Closed Sentinel", label: "Vigilant Protector", desc: "Prioritizes self-protection and emotional caution to avoid boundary violations." },
      { id: "balanced_guardian", sector: "The Balanced Guardian", label: "Measured Arbiter", desc: "Balances personal needs with external requests in an assertive, harmonious manner." },
      { id: "flexible_diplomat", sector: "The Flexible Diplomat", label: "Adaptive Connector", desc: "Adjusts boundaries contextually with grace, diplomacy, and genuine warmth." },
      { id: "permeable_giver", sector: "The Permeable Giver", label: "Self-Sacrificing Helper", desc: "Puts others' feelings first, often struggling to say no to loved ones in need." },
      { id: "fluid_accommodator", sector: "The Fluid Accommodator", label: "Harmonizing Peacemaker", desc: "Blends seamlessly into others' preferences to preserve peace and avoid friction." },
      { id: "open_conduit", sector: "The Open Conduit", label: "Unbounded Empath", desc: "Merges deeply with surrounding emotional energies, risking personal exhaustion." }
    ],
    questionThemes: {
      xPos: [
        "I say 'no' clearly and unapologetically when a request conflicts with my well-being.",
        "I remain rooted in my personal convictions even when everyone in the room disagrees.",
        "I don't feel responsible for fixing other people's negative moods or emotional crises.",
        "I establish clear limits regarding what I will and will not tolerate in relationships.",
        "I maintain my separate identity and personal schedule even when madly in love.",
        "I can deliver tough, honest boundaries without feeling overwhelmed by guilt.",
        "My emotional state is my own responsibility, not dependent on external validation.",
        "I stop conversations that turn disrespectful or invasive without hesitation.",
        "I protect my energy and personal space as non-negotiable spiritual priorities.",
        "I clearly distinguish between where my feelings end and another's feelings begin."
      ],
      xNeg: [
        "I often say 'yes' to requests I resent just to avoid disappointing someone.",
        "When someone close to me is angry or upset, I feel compelled to fix it immediately.",
        "I compromise my core values to keep peace and prevent relational tension.",
        "I find it agonizingly difficult to set limits with demanding family members.",
        "I lose touch with my own desires when trying to please a romantic partner.",
        "I feel profound guilt for taking a rest day when friends ask for help.",
        "I absorb other people's problems as if they were my personal obligations.",
        "I tend to let people overstep my boundaries because I fear being seen as selfish.",
        "My calendar is constantly overwhelmed by other people's priorities and crises.",
        "I struggle to know what I truly want when I am surrounded by strong personalities."
      ],
      crossPP: [
        "I enforce rock-solid personal boundaries while extending generous, compassionate warmth.",
        "I stand sovereign in my selfhood yet gladly bend my plans when genuine intimacy calls."
      ],
      crossPM: [
        "My boundaries are like concrete walls; once someone violates my rule, they are shut out forever.",
        "I protect my sovereignty with cold, unyielding detachment that keeps everyone at bay."
      ],
      crossMP: [
        "I have porous personal boundaries, welcoming everyone's emotions with open, forgiving warmth.",
        "I blur my own limits easily, gladly accommodating others because connection matters most."
      ],
      crossMM: [
        "I feel enmeshed and overwhelmed by others, yet react with defensive, rigid hostility.",
        "I struggle to assert healthy limits, so I oscillate between pleasing others and slamming the door."
      ],
      yPos: [
        "I happily adjust my boundaries when a loved one is going through a genuine emergency.",
        "I welcome close friends into my personal space and share my resources generously.",
        "I believe intimacy requires vulnerability and a willingness to soften strict rules.",
        "I forgive minor interpersonal slights with compassionate understanding."
      ],
      yNeg: [
        "I adhere strictly to established agreements and rarely make exceptions for anyone.",
        "I keep my private thoughts strictly guarded and share personal details very sparingly.",
        "I maintain formal, guarded distance until someone has earned my complete trust over years.",
        "I refuse to let anyone disrupt my scheduled routines under any circumstance."
      ]
    }
  },

  // -------------------------------------------------------------
  // 03.02 FEMINIST-PERSPECTIVES
  // -------------------------------------------------------------
  {
    id: "feminist-perspectives",
    slug: "feminist-perspectives",
    code: "03.02",
    fieldId: "beliefs",
    title: "Feminist Perspectives Compass",
    summary: "Navigate diverse feminist intellectual traditions across systemic structural critique and pluralistic gender fluidity.",
    axes: {
      x: {
        id: "institutional_scope",
        name: "Structural Transformation vs Individual Agency",
        negative: "Individual Merit & Agency",
        positive: "Systemic Institutional Critique"
      },
      y: {
        id: "gender_fluidity",
        name: "Gender Conception & Fluidity",
        negative: "Essentialist Complementarity",
        positive: "Social Construction & Fluidity"
      }
    },
    cells: [
      { id: "traditional_equity", sector: "Traditional Equity", label: "Complementary Reformist", desc: "Advocates for women's dignity and equal rights while respecting natural complementary roles." },
      { id: "civic_reformer", sector: "The Civic Reformer", label: "Pragmatic Legal Equalizer", desc: "Focuses on concrete legal protections, equal pay, and institutional meritocracy." },
      { id: "radical_deconstructionist", sector: "Radical Deconstructionist", label: "Structural Transformer", desc: "Analyzes patriarchy as a deep-rooted historical structure requiring radical reimagining." },
      { id: "libertarian_individualist", sector: "Libertarian Individualist", label: "Autonomous Libertarian", desc: "Champions individual legal autonomy and free-market choice over collective mandates." },
      { id: "intersectional_pragmatist", sector: "Intersectional Pragmatist", label: "Multidimensional Analyst", desc: "Weaves together race, class, and gender realities into practical policy reform." },
      { id: "transformational_abolitionist", sector: "Transformational Abolitionist", label: "Systemic Liberationist", desc: "Combines radical structural economic critique with comprehensive social liberation." },
      { id: "autonomous_egalitarian", sector: "Autonomous Egalitarian", label: "Individual Choice Advocate", desc: "Celebrates individual self-determination and varied lifestyle choices without ideological pressure." },
      { id: "materialist_advocate", sector: "Materialist Advocate", label: "Economic Parity Champion", desc: "Targets economic subjugation, unpaid care work, and labor disparities directly." },
      { id: "liberationist_visionary", sector: "Liberationist Visionary", label: "Radical Fluidity Visionary", desc: "Envisions a post-patriarchal world embracing infinite gender expression and total liberation." }
    ],
    questionThemes: {
      xPos: [
        "Gender disparities cannot be solved merely by individual grit; institutions must be overhauled.",
        "Unpaid domestic caregiving represents massive economic labor that society systematically exploits.",
        "Patriarchal power dynamics permeate language, corporate hierarchies, and cultural media.",
        "Equal opportunity policies must actively account for systemic historical disadvantages.",
        "Corporate boards and political bodies require proactive structural intervention to achieve equity.",
        "The traditional nuclear family structure historically functioned to concentrate economic power in men.",
        "Workplace cultures are predominantly built around masculine norms that penalize caregiving.",
        "Achieving genuine gender justice requires dismantling interlocking systems of economic privilege.",
        "Social institutions often socialize women into accommodating subservience from childhood.",
        "Legislation must address systemic wage gaps, maternal penalties, and glass ceilings directly."
      ],
      xNeg: [
        "Individual talent, hard work, and personal choices matter far more than patriarchal oppression.",
        "Modern democratic societies have largely achieved formal legal equality for all individuals.",
        "Women and men possess distinct biological traits that naturally influence vocational choices.",
        "Government mandates and quotas undermine true meritocracy and fair competition.",
        "Success in modern careers is open to anyone willing to put in the requisite dedication.",
        "Overemphasizing systemic victimhood disempowers individuals from taking agency over their lives.",
        "The gender pay gap largely reflects voluntary choices regarding hours, risks, and specialties.",
        "Traditional gender arrangements often provide profound emotional stability and mutual joy.",
        "Social engineering to enforce equal outcomes creates resentment and bureaucratic overreach.",
        "Individual empowerment through education and entrepreneurship beats ideological activism."
      ],
      crossPP: [
        "True liberation demands dismantling patriarchal economic structures while freeing gender from binary cages.",
        "We must overturn systemic institutional oppression and embrace radical, fluid self-identification."
      ],
      crossPM: [
        "We need powerful state interventions for maternal leave and childcare while honoring maternal roles.",
        "Massive structural economic support for women is vital, recognizing unique biological realities."
      ],
      crossMP: [
        "Individuals should be completely free to construct their own fluid gender identity without state regulation.",
        "Personal freedom to transcend traditional gender norms should flourish through free individual choice."
      ],
      crossMM: [
        "Men and women have distinct biological callings; true freedom lies in mutual, honorable complementarity.",
        "Traditional family values and natural sex differences provide the healthiest foundation for society."
      ],
      yPos: [
        "Gender identity is fundamentally a social construct rather than a rigid biological imperative.",
        "Society should fully embrace diverse gender expressions beyond the conventional binary.",
        "Rigid masculine and feminine stereotypes harm both men and women by suppressing authentic selfhood.",
        "Language and cultural expectations should evolve to accommodate non-binary identities seamlessly."
      ],
      yNeg: [
        "Biological sex is binary, immutable, and provides the foundation for masculine and feminine traits.",
        "Men and women possess natural psychological differences that complement one another harmoniously.",
        "Eradicating traditional distinctions between motherhood and fatherhood destabilizes children's development.",
        "Cultural traditions recognizing distinct male and female roles have stood the test of millennia for good reason."
      ]
    }
  },

  // -------------------------------------------------------------
  // 03.04 GENDER-EQUALITY
  // -------------------------------------------------------------
  {
    id: "gender-equality",
    slug: "gender-equality",
    code: "03.04",
    fieldId: "beliefs",
    title: "Gender Parity & Structural Equity",
    summary: "Examine attitudes toward socioeconomic parity and egalitarian role symmetry across public and private life.",
    axes: {
      x: {
        id: "economic_parity",
        name: "Economic & Institutional Parity",
        negative: "Market Meritocracy",
        positive: "Proactive Structural Parity"
      },
      y: {
        id: "role_symmetry",
        name: "Domestic & Cultural Role Symmetry",
        negative: "Complementary Tradition",
        positive: "Egalitarian Symmetry"
      }
    },
    cells: [
      { id: "complementary_steward", sector: "Complementary Steward", label: "Traditional Harmonist", desc: "Values mutual respect while upholding traditional domestic division of labor." },
      { id: "measured_reformist", sector: "The Measured Reformist", label: "Pragmatic Modernizer", desc: "Supports equal career opportunities while honoring personal family preferences." },
      { id: "systemic_equalizer", sector: "The Systemic Equalizer", label: "Proactive Parity Advocate", desc: "Champions robust economic policies, equal pay, and parental equality measures." },
      { id: "pragmatic_neutral", sector: "The Pragmatic Neutral", label: "Individual Merit Realist", desc: "Believes fair market competition naturally rewards talent regardless of gender." },
      { id: "balanced_egalitarian", sector: "The Balanced Egalitarian", label: "Comprehensive Equalizer", desc: "Promotes equal partnership at home and equal opportunity in public institutions." },
      { id: "progressive_parity_champion", sector: "Progressive Parity Champion", label: "Vocal Equal Rights Leader", desc: "Actively pushes for equal leadership representation and shared caregiving." },
      { id: "libertarian_individualist", sector: "Libertarian Individualist", label: "Free Choice Champion", desc: "Opposes gender-based regulations, trusting voluntary contracts and free choice." },
      { id: "civic_modernizer", sector: "The Civic Modernizer", label: "Cultural Modernizer", desc: "Encourages cultural shifts toward shared household duties and flexible careers." },
      { id: "radical_symmetry_advocate", sector: "Radical Symmetry Advocate", label: "Total Symmetry Vanguard", desc: "Demands complete 50/50 division in all spheres: domestic, financial, and political." }
    ],
    questionThemes: {
      xPos: [
        "Corporations should be legally required to publish detailed gender pay gap audits annually.",
        "Public policy should ensure affordable universal childcare so parents can pursue careers equally.",
        "Targeted leadership programs are necessary to overcome systemic historical barriers for women.",
        "Parental leave must be equally available and culturally expected for fathers as well as mothers.",
        "State institutions have a duty to eliminate institutional glass ceilings through active oversight.",
        "Economic independence for women is a foundational human right that governments must safeguard.",
        "Venture capital funding disparities should be actively addressed through equitable investment guidelines.",
        "Tax policies should be reformed to remove penalties on secondary earners in married households.",
        "Equal pay for work of equal value must be strictly enforced across all commercial sectors.",
        "Educational programs should proactively encourage girls to enter STEM and boys to enter care professions."
      ],
      xNeg: [
        "Wages should be determined solely by voluntary contracts and free-market productivity, not regulations.",
        "Mandatory quotas in hiring or board appointments compromise meritocratic excellence.",
        "If women choose lower-paying fields or flexible hours for family, governments should not interfere.",
        "Businesses operate best without burdensome bureaucratic diversity reporting requirements.",
        "Individuals should be evaluated on their individual portfolio, not demographic identity.",
        "Efforts to artificially enforce equal demographic outcomes in every industry are misguided.",
        "Market competition naturally punishes genuinely sexist employers without needing extra laws.",
        "Forced parental leave policies intrude upon private family autonomy and business scheduling.",
        "Differences in career trajectories often reflect freely made personal preferences that must be respected.",
        "Meritocracy alone ensures the most competent person gets the job regardless of background."
      ],
      crossPP: [
        "Both government policy and domestic life must mandate absolute 50/50 balance in labor and income.",
        "True equity requires equal economic legislation combined with completely identical domestic caretaking."
      ],
      crossPM: [
        "Women should have equal pay and corporate rights, while family homes thrive when mothers nurture children.",
        "I favor strong legal wage protections alongside traditional, loving domestic family roles."
      ],
      crossMP: [
        "Couples should divide dishwashing and parenting exactly 50/50 through free mutual agreement, without state mandates.",
        "Domestic symmetry should be practiced voluntarily at home without government economic interference."
      ],
      crossMM: [
        "Free markets should set wages, and traditional division between male provider and female homemaker is best.",
        "Private enterprise and traditional complementary gender roles form the bedrock of a stable nation."
      ],
      yPos: [
        "Fathers should spend just as much time changing diapers and cooking as mothers do.",
        "Household chores should be divided exactly 50/50 between adult partners in a relationship.",
        "Boys and girls should be raised with identical toys, chores, and emotional expectations.",
        "A woman being the primary breadwinner while the man stays home should be completely normalized."
      ],
      yNeg: [
        "Mothers possess an innate biological maternal instinct that fathers simply cannot replicate.",
        "Men naturally carry the primary duty to physically protect and financially provide for their families.",
        "Traditional gender divisions in the home have fostered familial harmony for generations.",
        "Expecting men and women to behave identically in romantic and domestic life denies human nature."
      ]
    }
  },

  // -------------------------------------------------------------
  // 03.05 INDIVIDUALISM-COLLECTIVISM
  // -------------------------------------------------------------
  {
    id: "individualism-collectivism",
    slug: "individualism-collectivism",
    code: "03.05",
    fieldId: "beliefs",
    title: "Individualism vs. Collectivism Spectrum",
    summary: "Map your cultural and moral compass across personal sovereign agency and collective communal solidarity.",
    axes: {
      x: {
        id: "identity_primacy",
        name: "Primacy of Identity & Duty",
        negative: "Communal Interdependence",
        positive: "Autonomous Sovereign Agency"
      },
      y: {
        id: "social_hierarchy",
        name: "Social Order & Hierarchy",
        negative: "Horizontal Egalitarianism",
        positive: "Vertical Meritocratic Order"
      }
    },
    cells: [
      { id: "communal_cooperative", sector: "Communal Cooperative", label: "Egalitarian Collectivist", desc: "Prioritizes community welfare, consensus decision-making, and flat social equality." },
      { id: "civic_solidarist", sector: "The Civic Solidarist", label: "Solidaristic Citizen", desc: "Balances communal solidarity with respect for civic duty and legal structure." },
      { id: "hierarchical_traditionalist", sector: "Hierarchical Traditionalist", label: "Devoted Traditionalist", desc: "Honors filial piety, generational wisdom, and duty to extended family and ancestral elders." },
      { id: "horizontal_libertarian", sector: "Horizontal Libertarian", label: "Autonomous Egalitarian", desc: "Believes in universal human equality while rejecting both state dominance and social hierarchy." },
      { id: "reciprocal_synthesizer", sector: "Reciprocal Synthesizer", label: "Balanced Citizen", desc: "Harmonizes individual self-actualization with active civic contribution to society." },
      { id: "competitive_meritocrat", sector: "Competitive Meritocrat", label: "Meritocratic Achiever", desc: "Respects institutional rank and strives to ascend hierarchies through individual excellence." },
      { id: "anarcho_individualist", sector: "Anarcho-Individualist", label: "Pure Sovereign", desc: "Rejects all hierarchical authority and communal coercion, claiming absolute individual liberty." },
      { id: "autonomous_equalizer", sector: "Autonomous Equalizer", label: "Self-Reliant Equalizer", desc: "Forges an independent path while treating every other individual as an absolute equal." },
      { id: "sovereign_pioneer", sector: "Sovereign Pioneer", label: "Unconstrained Pioneer", desc: "Driven by personal ambition, self-reliance, and competition to reach the pinnacle of success." }
    ],
    questionThemes: {
      xPos: [
        "An individual's primary duty is to discover and live their own authentic truth.",
        "Personal freedom and self-determination must never be subordinated to group conformity.",
        "People should be judged solely on their individual achievements, not their group background.",
        "It is better to stand out as a unique individual than to blend seamlessly into the crowd.",
        "I make major career and life choices independently without seeking family consensus.",
        "An individual has every right to break away from traditions that hold back their potential.",
        "Self-reliance and personal accountability are the greatest virtues an individual can cultivate.",
        "Society thrives best when individuals pursue their enlightened self-interest freely.",
        "Sacrificing personal dreams to please parents or relatives leads to lifelong regret.",
        "My identity is self-authored, not defined by my clan, nation, or social caste."
      ],
      xNeg: [
        "The well-being and harmony of the group must take precedence over personal desires.",
        "Fulfilling obligations to family and community brings deeper meaning than personal ambition.",
        "Making important life decisions without consulting extended family is selfish and disrespectful.",
        "Maintaining social harmony often requires swallowing one's pride and personal opinions.",
        "I feel deeply responsible for the honor, reputation, and welfare of my family name.",
        "Shared collective rituals unite communities in ways individual freedom never can.",
        "When a community member is in distress, everyone has an unconditional moral obligation to help.",
        "Loyalty to one's heritage, ancestors, and group identity is a bedrock moral duty.",
        "Hyper-individualism has eroded human connection, leaving modern people isolated and lonely.",
        "True honor is found in selfless devotion to the collective good of the community."
      ],
      crossPP: [
        "I fight fiercely for individual personal ambition and strive to climb to the top of the competitive hierarchy.",
        "Unrestrained meritocratic competition allows extraordinary individuals to attain rightful elite rank."
      ],
      crossPM: [
        "I claim absolute individual sovereignty while believing all humans are strictly equal without superiors.",
        "Every person should be an autonomous sovereign free from both bosses and communal guilt."
      ],
      crossMP: [
        "Devotion to the collective thrives under respected elders and honored generational hierarchy.",
        "The community operates most harmoniously when everyone knows and respects their place in the order."
      ],
      crossMM: [
        "A true community is a flat, equal circle where everyone shares everything with zero hierarchy.",
        "Pure egalitarian cooperation without bosses or leaders represents the highest human ideal."
      ],
      yPos: [
        "Respecting established authority, seniority, and experienced leadership creates social stability.",
        "Hierarchies are natural and necessary; superior competence and wisdom deserve higher status.",
        "Younger generations should defer to the accumulated wisdom and guidance of their elders.",
        "Clear chains of command and social order prevent chaos, confusion, and inefficiency."
      ],
      yNeg: [
        "All forms of social hierarchy and status differences should be actively flattened.",
        "No human being has the right to lord authority over another simply due to rank or age.",
        "Consensus and horizontal democracy are far superior to top-down command and control.",
        "Deference to traditional authority figures often perpetuates outdated oppression."
      ]
    }
  },

  // -------------------------------------------------------------
  // 04.02 BURNOUT
  // -------------------------------------------------------------
  {
    id: "burnout",
    slug: "burnout",
    code: "04.02",
    fieldId: "wellbeing",
    title: "Occupational Burnout & Exhaustion Index",
    summary: "Track occupational strain across emotional and physical depletion and mental cynical disengagement.",
    axes: {
      x: {
        id: "exhaustion",
        name: "Physical & Emotional Depletion",
        negative: "Vital Energy Reserves",
        positive: "Severe Exhaustion"
      },
      y: {
        id: "cynicism",
        name: "Mental Detachment & Cynicism",
        negative: "Connected Purpose",
        positive: "Cynical Disengagement"
      }
    },
    cells: [
      { id: "vital_thriver", sector: "Vital Thriver", label: "Energized & Engaged", desc: "Radiates abundant vitality, deeply connected to purpose, and thrives under challenges." },
      { id: "energized_realist", sector: "The Energized Realist", label: "Balanced Contributor", desc: "Maintains strong energy while protecting healthy boundaries against institutional nonsense." },
      { id: "strained_idealist", sector: "The Strained Idealist", label: "Tired Believer", desc: "Deeply cares about the mission but feels physical and mental exhaustion setting in." },
      { id: "steady_contributor", sector: "The Steady Contributor", label: "Dependable Worker", desc: "Maintains steady pace and balanced expectations without burning out." },
      { id: "ambivalent_grinder", sector: "The Ambivalent Grinder", label: "Fatigued Pragmatist", desc: "Carries on through routine work while feeling periodic drain and mild detachment." },
      { id: "exhausted_striver", sector: "The Exhausted Striver", label: "Depleted Achiever", desc: "Pushes through severe physical fatigue with sheer willpower despite waning stamina." },
      { id: "detached_skeptic", sector: "The Detached Skeptic", label: "Cynical Survivor", desc: "Emotionally detached from organizational politics to preserve baseline mental sanity." },
      { id: "disillusioned_survivor", sector: "Disillusioned Survivor", label: "Disheartened Worker", desc: "Has lost faith in the organization's integrity and simply clocks in for survival." },
      { id: "acute_burnout", sector: "Acute Burnout", label: "Completely Depleted", desc: "Suffering from total energetic depletion, chronic cynicism, and severe burnout." }
    ],
    questionThemes: {
      xPos: [
        "I wake up in the morning feeling completely exhausted before my workday even begins.",
        "At the end of a typical day, I feel completely wiped out and drained of all energy.",
        "Simple tasks that used to take minutes now feel like climbing a steep mountain.",
        "I experience persistent physical fatigue that a full weekend of sleep does not cure.",
        "My emotional battery is constantly in the red zone with zero reserve capacity.",
        "I feel an overwhelming heaviness in my limbs when thinking about my responsibilities.",
        "My concentration and memory feel noticeably foggy due to chronic cognitive overload.",
        "I find myself sighing constantly and feeling that my energy reserves are bankrupt.",
        "The boundary between work stress and restful sleep has completely collapsed.",
        "I feel as though I am running on empty fumes, pushing forward through sheer force."
      ],
      xNeg: [
        "I wake up most mornings feeling refreshed, clear-headed, and ready for the day.",
        "I have plenty of energy left over after work to enjoy hobbies and time with loved ones.",
        "My physical stamina remains robust and resilient throughout the working week.",
        "When I take time off, my vitality and enthusiasm replenish quickly and completely.",
        "I handle complex mental demands without feeling chronically drained or depleted.",
        "I feel physically invigorated and active throughout my normal daily routines.",
        "My sleep is deep, restorative, and leaves me feeling genuinely revitalized.",
        "I maintain strong, stable energy levels without needing excessive caffeine stimulants.",
        "I possess generous reserve energy to handle unexpected emergencies with ease.",
        "Life feels light and manageable rather than an endless test of physical endurance."
      ],
      crossPP: [
        "I am both physically exhausted to the bone and completely cynical about the point of my work.",
        "Total energetic collapse combined with bitter disillusionment has made work unbearable."
      ],
      crossPM: [
        "I am utterly exhausted physically, yet I still care passionately about doing my work with heart.",
        "My body is breaking down from fatigue, but my dedication to my colleagues remains sacred."
      ],
      crossMP: [
        "I have plenty of physical energy, but I view my company's mission with utter contempt and cynicism.",
        "My body is healthy and awake, but I emotionally detached months ago and just do the bare minimum."
      ],
      crossMM: [
        "I am full of vibrant physical vitality and feel deeply inspired by the noble purpose of my career.",
        "My energy is abundant, and I find genuine joy and meaning in my daily contributions."
      ],
      yPos: [
        "I have become increasingly skeptical and cynical about whether my work actually matters.",
        "I catch myself treating colleagues or clients like impersonal numbers rather than humans.",
        "I don't care about organizational goals anymore; I just do the minimum to collect a check.",
        "Corporate slogans about purpose and values provoke immediate eye-rolling and cynicism in me."
      ],
      yNeg: [
        "I feel a genuine, heartfelt pride in the work I produce and the people I serve.",
        "I care deeply about my colleagues' well-being and invest emotional warmth into my team.",
        "I believe my daily efforts contribute toward a meaningful, worthwhile broader purpose.",
        "I stay optimistic and committed to making a constructive difference in my workplace."
      ]
    }
  },

  // -------------------------------------------------------------
  // 04.03 EMOTIONAL-REGULATION
  // -------------------------------------------------------------
  {
    id: "emotional-regulation",
    slug: "emotional-regulation",
    code: "04.03",
    fieldId: "wellbeing",
    title: "Emotion Regulation Strategies",
    summary: "Analyze cognitive reframing versus expressive containment based on Gross's Process Model of Emotion Regulation.",
    axes: {
      x: {
        id: "cognitive_reappraisal",
        name: "Cognitive Reappraisal",
        negative: "Direct Felt Intuition",
        positive: "Constructive Cognitive Reframing"
      },
      y: {
        id: "expressive_modulation",
        name: "Expressive Containment",
        negative: "Unfiltered Spontaneity",
        positive: "Controlled Composure"
      }
    },
    cells: [
      { id: "stoic_processor", sector: "The Stoic Processor", label: "Contained & Experiential", desc: "Processes feelings silently inside while presenting a steady, calm exterior to others." },
      { id: "calibrated_regulator", sector: "The Calibrated Regulator", label: "Composed Arbiter", desc: "Regulates internal stress effectively while maintaining polite, measured social composure." },
      { id: "strategic_reappraiser", sector: "Strategic Reappraiser", label: "Masterful Reframer", desc: "Masters both mental reframing and outward poise to navigate intense crises smoothly." },
      { id: "quiet_internalizer", sector: "The Quiet Internalizer", label: "Reflective Internalizer", desc: "Takes time to process events quietly without broadcasting raw reactions to the room." },
      { id: "adaptive_moderator", sector: "The Adaptive Moderator", label: "Balanced Coping Synthesizer", desc: "Blends healthy mental reframing with authentic emotional expression as fitting." },
      { id: "mindful_reframer", sector: "The Mindful Reframer", label: "Positive Reframer", desc: "Quickly finds silver linings and growth lessons, inspiring those around them with optimism." },
      { id: "raw_authentic", sector: "The Raw Authentic", label: "Unvarnished Expressor", desc: "Lets feelings show instantly on their face; what you see is completely what you get." },
      { id: "spontaneous_expressor", sector: "Spontaneous Expressor", label: "Expressive Communicator", desc: "Shares emotional highs and lows warmly without holding back tears or laughter." },
      { id: "expressive_synthesizer", sector: "Expressive Synthesizer", label: "Dynamic Meaning-Maker", desc: "Actively reframes challenges while talking through emotions with vibrant, animated energy." }
    ],
    questionThemes: {
      xPos: [
        "When faced with a stressful situation, I deliberately change the way I think about it to feel calmer.",
        "I actively look for silver linings and growth opportunities when plans fall apart.",
        "I can reframe an insulting comment as a reflection of the other person's pain rather than my worth.",
        "Changing my mental perspective is my most powerful tool for calming negative emotions.",
        "I consciously remind myself of the bigger picture whenever everyday irritations arise.",
        "I ask myself 'What can this teach me?' whenever I face acute disappointment.",
        "I reinterpret stressful challenges as exciting tests of my capabilities and resilience.",
        "I can shift my mood by deliberately directing my thoughts toward gratitude and humor.",
        "I analyze whether my initial angry reaction is based on inaccurate assumptions before acting.",
        "Reappraising a situation intellectually helps me stay composed under pressure."
      ],
      xNeg: [
        "I experience my feelings raw and direct without trying to mentally talk myself out of them.",
        "Trying to find a 'positive spin' on bad news often feels fake and invalidating to me.",
        "When I feel angry or hurt, I just sit in the feeling rather than rationalizing it away.",
        "Overthinking my emotions ruins my authentic, natural gut reactions.",
        "I accept negative emotions as they come without feeling the need to reframe them.",
        "Some events are simply terrible and cannot be dressed up in positive mental reframing.",
        "I rely on physical movement or rest rather than mental gymnastics to feel better.",
        "Reframing often feels like an intellectual excuse to avoid feeling real sorrow.",
        "My emotional reactions happen automatically and are resistant to cognitive arguments.",
        "I prefer to ride the emotional wave naturally until it subsides on its own timeline."
      ],
      crossPP: [
        "I reframe bad news into an empowering challenge while maintaining an unshakeable poker face.",
        "I re-engineer my mental thoughts for calm while keeping my external composure completely poised."
      ],
      crossPM: [
        "I reframe difficulties brilliantly in my head while laughing, crying, and gesturing openly.",
        "I see the profound wisdom in setbacks while freely sharing my passionate emotional rollercoaster."
      ],
      crossMP: [
        "I feel pure, unvarnished rage inside, but I lock my jaw and maintain absolute outward stillness.",
        "Without intellectualizing my pain, I deliberately mask my feelings so nobody detects a thing."
      ],
      crossMM: [
        "I feel things deeply and immediately display every ounce of joy or anger for all to see.",
        "My emotions flow raw and unfiltered from my heart directly to my face and voice."
      ],
      yPos: [
        "I keep my emotions strictly to myself when in professional or formal environments.",
        "When I feel angry, I make a deliberate effort not to show it in my voice or face.",
        "I pride myself on presenting an unruffled, composed exterior regardless of turmoil.",
        "I prefer not to burden others with my personal stress and keep my struggles private."
      ],
      yNeg: [
        "If I am angry or excited, everyone in the vicinity will know about it immediately.",
        "Holding back tears or bottling up laughter feels suffocating and unhealthy to me.",
        "I express what I feel in the moment rather than putting on a polite, artificial mask.",
        "Authentic vulnerability means letting people see your real, unedited emotional reactions."
      ]
    }
  },

  // -------------------------------------------------------------
  // 04.04 RESILIENCE
  // -------------------------------------------------------------
  {
    id: "resilience",
    slug: "resilience",
    code: "04.04",
    fieldId: "wellbeing",
    title: "Psychological Resilience & Tenacity",
    summary: "Assess psychological bounce-back and adaptive flexibility under severe acute challenges (CD-RISC model).",
    axes: {
      x: {
        id: "tenacity",
        name: "Tenacity & Unyielding Drive",
        negative: "Yielding Fluidity",
        positive: "Unrelenting Tenacity"
      },
      y: {
        id: "adaptability",
        name: "Cognitive Adaptability & Hope",
        negative: "Cautious Guardedness",
        positive: "Expansive Adaptability"
      }
    },
    cells: [
      { id: "steady_endurer", sector: "The Steady Endurer", label: "Quiet Stoic Striver", desc: "Pushes through hardship with stoic grit, quietly enduring pain until the storm passes." },
      { id: "resolute_anchor", sector: "The Resolute Anchor", label: "Disciplined Anchor", desc: "Combines dependable daily discipline with steadfast commitment to their core duties." },
      { id: "indomitable_champion", sector: "The Indomitable Champion", label: "Relentless Victor", desc: "Possesses fierce grit and unstoppable momentum; refuses to quit under any adversity." },
      { id: "cautious_stabilizer", sector: "The Cautious Stabilizer", label: "Careful Realist", desc: "Manages risks carefully and protects resources when facing unpredictable head-winds." },
      { id: "balanced_navigator", sector: "The Balanced Navigator", label: "Resilient Realist", desc: "Balances persistent effort with realistic flexibility when obstacles block the path." },
      { id: "agile_pioneer", sector: "The Agile Pioneer", label: "Creative Overcomer", desc: "Pivots swiftly around setbacks, finding inventive alternatives with relentless optimism." },
      { id: "fragile_hesitator", sector: "The Fragile Hesitator", label: "Sensitive Recoverer", desc: "Takes considerable time to recover from severe blows, needing gentle support to heal." },
      { id: "fluid_adapter", sector: "The Fluid Adapter", label: "Flexible Surfer", desc: "Rolls with life's punches gracefully, adapting to sudden changes without stubborn resistance." },
      { id: "dynamic_restorer", sector: "Dynamic Restorer", label: "Bouncing Catalyst", desc: "Transforms trauma into wisdom, finding profound renewal and inspiration through challenge." }
    ],
    questionThemes: {
      xPos: [
        "I push through exhaustion and difficulty until I have achieved my objective.",
        "Giving up on an important goal is simply not an option for me, no matter how hard it gets.",
        "When failure strikes, my immediate instinct is to dust myself off and attack the problem again.",
        "I have a fierce internal drive that keeps me grinding long after others have surrendered.",
        "Obstacles serve as fuel that sharpens my focus rather than deterrents that make me retreat.",
        "I hold myself to high standards of mental toughness and relentless perseverance.",
        "I take pride in my ability to endure discomfort for the sake of long-term triumph.",
        "I double down on disciplined effort when facing seemingly impossible deadlines.",
        "Quitting midway through a project feels like an unacceptable violation of my character.",
        "My willpower can overcome almost any physical or emotional barrier in my path."
      ],
      xNeg: [
        "I know when to walk away from a losing battle rather than beating my head against a wall.",
        "When obstacles become overwhelming, I step back and take a prolonged pause.",
        "I prefer a gentle, balanced pace over brutal grinding and heroic endurance.",
        "If a project causes too much chronic distress, I happily abandon it for greener pastures.",
        "I listen to my body's fatigue and yield rather than forcing myself through pain.",
        "I don't believe in forcing outcomes that clearly aren't meant to happen.",
        "Struggling against impossible resistance often causes more harm than good.",
        "I let go of ambitious plans easily when circumstances make them impractical.",
        "I value inner peace and ease far more than winning exhausting battles of attrition.",
        "I surrender to life's flow rather than trying to overpower reality with sheer willpower."
      ],
      crossPP: [
        "I combine unstoppable bulldog persistence with rapid, inventive creative adaptability.",
        "I never give up, and I joyfully rewrite the entire strategy the moment conditions change."
      ],
      crossPM: [
        "I grit my teeth and push through hardship like a bulldozer, even when the path is narrow and grim.",
        "My endurance is monumental, but I stick stubbornly to the original plan regardless of cost."
      ],
      crossMP: [
        "I yield without stubborn fighting, fluidly bending like a reed in the wind to find new joy.",
        "I let go of lost causes instantly and enthusiastically embrace whatever new door opens."
      ],
      crossMM: [
        "When severe misfortune strikes, I retreat into my shell cautiously and take a long time to heal.",
        "I feel wounded by major setbacks and struggle to find either the grit or the optimism to restart."
      ],
      yPos: [
        "I adapt quickly to unexpected disruptions and find exciting possibilities in chaos.",
        "I genuinely believe that everything happens for a reason that will eventually serve my growth.",
        "I maintain an expansive, optimistic faith in the future even during dark seasons.",
        "I bounce back from emotional heartbreak with renewed perspective and gratitude."
      ],
      yNeg: [
        "Unforeseen changes to my routine leave me feeling unsettled, anxious, and distrustful.",
        "I find it difficult to stay hopeful when life delivers an unfair, devastating blow.",
        "I tend to anticipate worst-case scenarios when facing ambiguous new challenges.",
        "Recovering my optimism after a crushing disappointment takes months of cautious recovery."
      ]
    }
  },

  // -------------------------------------------------------------
  // 04.05 PROCRASTINATION
  // -------------------------------------------------------------
  {
    id: "procrastination",
    slug: "procrastination",
    code: "04.05",
    fieldId: "wellbeing",
    title: "Procrastination & Temporal Delay",
    summary: "Analyze cognitive delay mechanisms across task aversion hesitation and temporal discounting impulsivity.",
    axes: {
      x: {
        id: "task_aversion",
        name: "Task Aversion & Hesitation",
        negative: "Intrinsic Task Engagement",
        positive: "Aversive Avoidance"
      },
      y: {
        id: "impulsive_delay",
        name: "Impulsivity & Immediate Gratification",
        negative: "Disciplined Delay of Gratification",
        positive: "Distractible Discounting"
      }
    },
    cells: [
      { id: "disciplined_executor", sector: "The Disciplined Executor", label: "Masterful Finisher", desc: "Tackles unglamorous duties immediately with disciplined focus and zero delay." },
      { id: "methodical_finisher", sector: "The Methodical Finisher", label: "Organized Completer", desc: "Schedules demanding tasks systematically and completes them well ahead of deadlines." },
      { id: "paralyzed_perfectionist", sector: "Paralyzed Perfectionist", label: "Anxious Overthinker", desc: "Delays starting because they dread producing anything less than absolute perfection." },
      { id: "steady_pacer", sector: "The Steady Pacer", label: "Balanced Pacer", desc: "Maintains a sensible workflow without succumbing to panic or chronic avoidance." },
      { id: "reactive_balancer", sector: "The Reactive Balancer", label: "Pragmatic Balancer", desc: "Balances daily productivity with occasional guilty procrastination binges." },
      { id: "pressure_prompted", sector: "The Pressure-Prompted", label: "Deadline Dependent", desc: "Relies on the adrenaline of imminent deadlines to overcome deep task hesitation." },
      { id: "focused_opportunist", sector: "The Focused Opportunist", label: "Selective Sprinter", desc: "Switches between laser focus and tempting novel diversions depending on interest." },
      { id: "spontaneous_dabbler", sector: "The Spontaneous Dabbler", label: "Novelty Chaser", desc: "Easily lured away from routine tasks by shiny new ideas and impulsive curiosities." },
      { id: "chronic_delayer", sector: "The Chronic Delayer", label: "Avoidant Drifter", desc: "Struggles with both severe task dread and endless dopamine-driven distractions." }
    ],
    questionThemes: {
      xPos: [
        "I find myself constantly putting off tasks that feel tedious, dry, or emotionally uncomfortable.",
        "The dread of doing boring administrative paperwork makes me delay it until the final hour.",
        "I invent urgent minor chores just to avoid sitting down to begin an important project.",
        "When an assignment feels intimidatingly complex, I freeze up and avoid opening the file.",
        "I experience acute psychological resistance whenever I must tackle an ambiguous task.",
        "I tell myself 'I will feel more motivated tomorrow' even though I know I will not.",
        "The fear of doing a mediocre job often prevents me from even starting a draft.",
        "I leave unpleasant emails unread in my inbox for days because responding feels draining.",
        "I spend excessive time preparing, researching, and organizing to delay actual execution.",
        "Thinking about my overdue to-do list fills me with persistent background guilt and dread."
      ],
      xNeg: [
        "I tackle unpleasant or boring tasks first thing in the morning to get them out of the way.",
        "I sit down and begin work immediately regardless of whether I feel inspired or not.",
        "I have no problem completing mundane bureaucratic tasks with calm efficiency.",
        "When an assignment is assigned, I start outlining the solution that very same day.",
        "I prefer a flawed, completed draft today over a perfect masterpiece that never gets done.",
        "I feel zero emotional dread when opening tax forms, spreadsheets, or difficult contracts.",
        "I complete projects smoothly and steadily weeks before the final deadline arrives.",
        "I handle difficult phone calls and confrontation immediately without dragging my feet.",
        "My work habits are reliable and predictable, free from emotional procrastination cycles.",
        "I enjoy the satisfaction of crossing off difficult items from my to-do list promptly."
      ],
      crossPP: [
        "I dread starting the hard project and immediately dive into social media video marathons instead.",
        "Acute task aversion combined with zero impulse control causes me to miss critical deadlines."
      ],
      crossPM: [
        "I dread the task immensely, but I sit quietly at my desk staring blankly, resisting phone distractions.",
        "I procrastinate through frozen perfectionism, refusing to do fun things while feeling guilty."
      ],
      crossMP: [
        "I have no dread of the work itself, but every ping, notification, and shiny distraction pulls me away.",
        "I gladly do the work, yet I easily get sidetracked by fascinating rabbit holes and conversations."
      ],
      crossMM: [
        "I tackle hard tasks without hesitation and ignore every tempting dopamine distraction with ease.",
        "Ironclad discipline enables me to work steadily and ignore every fleeting temptation."
      ],
      yPos: [
        "I easily succumb to sudden impulses, checking notifications instead of doing deep work.",
        "Short-term comfort and fun usually win over long-term discipline when I am working.",
        "I frequently abandon my planned schedule to pursue whatever sudden interest pops into my head.",
        "I struggle to resist snacks, gaming, or scrolling when I should be concentrating on work."
      ],
      yNeg: [
        "I can sit quietly and focus on a single task for hours without checking my phone once.",
        "I easily delay immediate gratification for the sake of future career dividends.",
        "My self-control remains steady and reliable even when surrounded by tempting distractions.",
        "I close all distracting browser tabs and silence notifications whenever I begin deep work."
      ]
    }
  },

  // -------------------------------------------------------------
  // 05.01 CAREER-PERSONALITY
  // -------------------------------------------------------------
  {
    id: "career-personality",
    slug: "career-personality",
    code: "05.01",
    fieldId: "career",
    title: "Career Personality & Occupational Anchors",
    summary: "Identify your primary vocational anchor across technical craftsmanship and entrepreneurial sovereignty (Schein framework).",
    axes: {
      x: {
        id: "technical_managerial",
        name: "Role Orientation & Mastery",
        negative: "Deep Technical Craftsmanship",
        positive: "Executive Leadership & Strategy"
      },
      y: {
        id: "autonomy_orientation",
        name: "Workplace Autonomy & Sovereignty",
        negative: "Institutional Stability & Security",
        positive: "Entrepreneurial Freedom & Autonomy"
      }
    },
    cells: [
      { id: "institutional_craftsman", sector: "Institutional Craftsman", label: "Specialized Expert", desc: "Enjoys honing deep technical mastery within the safety of an established organization." },
      { id: "corporate_director", sector: "The Corporate Director", label: "Executive Leader", desc: "Directs large institutional teams, navigating corporate hierarchies with political poise." },
      { id: "executive_titan", sector: "The Executive Titan", label: "C-Suite Commander", desc: "Drives massive institutional scale and strategic transformation from executive offices." },
      { id: "steady_specialist", sector: "The Steady Specialist", label: "Reliable Practitioner", desc: "Delivers consistent, high-quality craft while valuing stable tenure and team camaraderie." },
      { id: "balanced_professional", sector: "Balanced Professional", label: "Pragmatic Contributor", desc: "Balances domain competence with project management and healthy career progression." },
      { id: "autonomous_lead", sector: "The Autonomous Lead", label: "Decentralized Director", desc: "Leads self-directed projects and entrepreneurial units with high operational independence." },
      { id: "freelance_artisan", sector: "The Freelance Artisan", label: "Self-Sovereign Maker", desc: "Treasures the pure freedom to work on custom craft projects on their own terms." },
      { id: "independent_consultant", sector: "Independent Consultant", label: "Solo Strategist", desc: "Advises clients independently, commanding high fees without being tied to a single employer." },
      { id: "venture_innovator", sector: "The Venture Innovator", label: "Founder / Entrepreneur", desc: "Builds new companies from scratch, thriving on total creative freedom, risk, and upside." }
    ],
    questionThemes: {
      xPos: [
        "I find coordinating people, budgets, and strategic priorities more energizing than writing code or text.",
        "I aim for executive leadership roles where I can shape the overall vision of an enterprise.",
        "I would gladly delegate hands-on technical work to focus on organizational leadership.",
        "I excel at mediating across competing departments to drive unified business outcomes.",
        "Career success to me means ascending into senior management and having broad impact.",
        "I enjoy pitching stakeholders and building high-performance executive teams.",
        "General management and business strategy fascinate me more than narrow subject-matter expertise.",
        "I measure my career value by the size of the team and the financial bottom line I influence.",
        "I prefer solving high-level structural bottlenecks over troubleshooting individual technical bugs.",
        "I thrive in the role of captain steering the ship through stormy competitive markets."
      ],
      xNeg: [
        "I would hate being promoted into management if it took me away from hands-on craft.",
        "I want to be recognized as a world-class technical expert and master of my specific trade.",
        "Deep, solitary immersion in complex analytical problems is my favorite part of the workday.",
        "Corporate politicking and endless budget meetings feel like a waste of my intellectual talent.",
        "I measure my professional worth by the elegance, rigor, and craftsmanship of what I build.",
        "I prefer mentoring young specialists in the craft over managing performance reviews.",
        "Being the ultimate go-to problem solver in a specialized domain brings me deep satisfaction.",
        "I would rather master a difficult engineering or creative discipline than run a department.",
        "Hands-on execution and tangible problem solving are where my true genius lies.",
        "I protect my focus from managerial distractions to preserve my deep domain competence."
      ],
      crossPP: [
        "I founded my own company and lead the executive team with total entrepreneurial freedom.",
        "I thrive as a venture founder, directing vision and strategy with zero corporate bosses."
      ],
      crossPM: [
        "I excel as a high-ranking corporate executive in a Fortune 500 company with deep institutional roots.",
        "I climb the enterprise ladder, wielding large budgets within established corporate structures."
      ],
      crossMP: [
        "I work as an independent solo artisan or technical consultant, owning my schedule 100%.",
        "I build my own bespoke products from my laptop on a beach, answering to nobody."
      ],
      crossMM: [
        "I work happily as a senior technical specialist with a stable pension in an established institution.",
        "I enjoy dependable job security where I can polish my craft without worrying about finding clients."
      ],
      yPos: [
        "I cannot stand having someone monitor my hours or dictate my work location.",
        "Having total control over which projects I accept is essential to my happiness.",
        "I would rather earn less money as an independent freelancer than be trapped in an office.",
        "Entrepreneurial autonomy and self-sovereignty are non-negotiable career requirements for me."
      ],
      yNeg: [
        "A steady, predictable paycheck and comprehensive health benefits give me immense peace of mind.",
        "I thrive within structured organizations where roles, resources, and processes are well established.",
        "The financial unpredictability of self-employment causes me too much unnecessary stress.",
        "I appreciate having an established institutional brand backing my work in the marketplace."
      ]
    }
  },

  // -------------------------------------------------------------
  // 05.02 WORK-STYLE
  // -------------------------------------------------------------
  {
    id: "work-style",
    slug: "work-style",
    code: "05.02",
    fieldId: "career",
    title: "Workplace Rhythm & Execution Style",
    summary: "Examine your optimal working conditions across collaborative breadth and rapid iterative pacing.",
    axes: {
      x: {
        id: "collaboration_rhythm",
        name: "Collaboration Rhythm & Breadth",
        negative: "Deep Solitary Focus",
        positive: "Synergistic Collective Teamwork"
      },
      y: {
        id: "iteration_pace",
        name: "Methodological Pace & Planning",
        negative: "Deliberate Methodical Planning",
        positive: "Rapid Iterative Momentum"
      }
    },
    cells: [
      { id: "monastic_scholar", sector: "The Monastic Scholar", label: "Deep Solitary Thinker", desc: "Thrives in quiet, uninterrupted isolation, producing rigorous, highly polished intellectual work." },
      { id: "meticulous_planner", sector: "The Meticulous Planner", label: "Structured Architect", desc: "Designs comprehensive project roadmaps, ensuring every detail is nailed before launch." },
      { id: "agile_synthesizer", sector: "The Agile Synthesizer", label: "Rapid Planner", desc: "Combines thorough strategic outlines with nimble execution sprints." },
      { id: "methodical_executor", sector: "Methodical Executor", label: "Disciplined Solo Worker", desc: "Executes solitary duties with steady precision, delivering dependable output day in, day out." },
      { id: "balanced_operator", sector: "The Balanced Operator", label: "Versatile Collaborator", desc: "Smoothly shifts between collaborative brainstorms and focused independent execution." },
      { id: "collaborative_accelerator", sector: "Collaborative Accelerator", label: "Team Momentum Engine", desc: "Energizes the whole group, unblocking obstacles quickly through live conversation." },
      { id: "deliberate_craftsman", sector: "Deliberate Craftsman", label: "Solo Finisher", desc: "Prefers working quietly on one problem at a time with meticulous care and patience." },
      { id: "rapid_solo_builder", sector: "Rapid Solo Builder", label: "Independent Hacker", desc: "Moves at lightning speed alone, prototyping solutions and testing ideas in real-time." },
      { id: "dynamic_catalyst", sector: "The Dynamic Catalyst", label: "Fast-Paced Team Lead", desc: "Thrives in fast-paced war rooms, rapid hackathons, and high-energy collaborative sprints." }
    ],
    questionThemes: {
      xPos: [
        "I do my best work in vibrant brainstorms bouncing ideas off energetic colleagues.",
        "Collaborative team dialogue sparks creative breakthroughs that I could never reach alone.",
        "I feel energized and motivated after an intensive working session with a cross-functional squad.",
        "I naturally build consensus and align team members around shared working norms.",
        "Working in open, connected environments makes my workday enjoyable and dynamic.",
        "I prefer hopping on a quick call to hash things out rather than sending solitary memo drafts.",
        "Shared accountability and mutual team support bring out my highest performance.",
        "I love co-creating documents and pairing up with colleagues to solve difficult problems.",
        "Being part of a tight-knit team working toward a shared victory is deeply fulfilling.",
        "I naturally notice team morale and facilitate healthy interpersonal dynamics at work."
      ],
      xNeg: [
        "I need long, uninterrupted blocks of deep solitary focus to produce my best work.",
        "Too many meetings and Slack messages destroy my concentration and leave me frustrated.",
        "I prefer taking full ownership of a deliverable from start to finish without co-authors.",
        "Having people constantly interrupt my flow state drains my productivity and patience.",
        "I think more clearly when writing quietly alone than when speaking in group brainstorms.",
        "Group work often dilutes quality to the lowest common denominator.",
        "I prefer asynchronous written updates over live team standup meetings.",
        "Solitary research and quiet focus allow me to dive deep into underlying root causes.",
        "I produce twice as much output when working from a quiet home office than a bustling bullpen.",
        "I value autonomy over consensus; I just want clear objectives and room to run alone."
      ],
      crossPP: [
        "I thrive in high-speed, noisy war rooms where the team prototypes and ships daily updates.",
        "Fast-paced team hackathons and rapid live group iterations are my absolute dream workflow."
      ],
      crossPM: [
        "I love working closely with my team, but we build comprehensive roadmaps and plan every step meticulously.",
        "We deliberate together patiently, creating thorough documentation before taking action."
      ],
      crossMP: [
        "I work completely alone, moving at blinding speed to hack together working prototypes overnight.",
        "I write code or copy in solitary hyper-focus, deploying fast iterations without waiting for anyone."
      ],
      crossMM: [
        "I work alone in quiet contemplation, spending weeks researching and polishing a masterpiece before sharing it.",
        "Deep solitary reflection paired with meticulous, slow deliberation yields my finest work."
      ],
      yPos: [
        "I believe in shipping early, testing in production, and iterating rapidly based on feedback.",
        "Perfectionism is the enemy of progress; I prefer getting an 80% solution out the door fast.",
        "I thrive in fast-paced environments with tight, pressing turnaround times.",
        "I get restless when projects get bogged down in weeks of theoretical planning."
      ],
      yNeg: [
        "I believe in measuring twice and cutting once; thorough preparation prevents sloppy errors.",
        "Rushing a project out before it has been thoroughly tested and refined makes me cringe.",
        "I prefer working with comprehensive specifications, detailed timelines, and clear contingencies.",
        "Methodical deliberation and patient refinement always trump hasty, half-baked launches."
      ]
    }
  },

  // -------------------------------------------------------------
  // 05.04 CAREER-VALUES
  // -------------------------------------------------------------
  {
    id: "career-values",
    slug: "career-values",
    code: "05.04",
    fieldId: "career",
    title: "Career Values & Motivating Drivers",
    summary: "Identify your deepest occupational drivers across commercial mastery and holistic lifestyle equilibrium (Super's model).",
    axes: {
      x: {
        id: "commercial_mastery",
        name: "Commercial Mastery & Impact",
        negative: "Humanistic Mission & Purpose",
        positive: "Commercial Enterprise & Wealth"
      },
      y: {
        id: "lifestyle_equilibrium",
        name: "Holistic Lifestyle Equilibrium",
        negative: "High-Sacrifice Ambition",
        positive: "Balanced Lifestyle Harmony"
      }
    },
    cells: [
      { id: "altruistic_guardian", sector: "Altruistic Guardian", label: "Mission-Driven Steward", desc: "Prioritizes social good, non-profit causes, and community healing while protecting work-life balance." },
      { id: "balanced_contributor", sector: "Balanced Contributor", label: "Healthy Professional", desc: "Does good work for a fair wage while ensuring family, health, and hobbies come first." },
      { id: "balanced_pragmatist", sector: "Balanced Pragmatist", label: "Pragmatic Achiever", desc: "Builds substantial commercial success without burning out their physical or mental health." },
      { id: "devoted_servant", sector: "The Devoted Servant", label: "Missionary Reformer", desc: "Pours their heart and soul into a noble cause, willingly making personal sacrifices for others." },
      { id: "harmonious_professional", sector: "Harmonious Professional", label: "Integrated Careerist", desc: "Aligns meaningful work, fair compensation, and sustainable lifestyle boundaries gracefully." },
      { id: "commercial_achiever", sector: "Commercial Achiever", label: "Strategic Builder", desc: "Focuses on building lucrative businesses and scalable commercial assets with disciplined pacing." },
      { id: "mission_driven_reformer", sector: "Mission-Driven Reformer", label: "Passionate Crusader", desc: "Works 80-hour weeks fighting for environmental, social, or educational reform." },
      { id: "lifestyle_minimalist", sector: "Lifestyle Minimalist", label: "Simple Life Minimalist", desc: "Keeps work requirements minimal to maximize leisure, outdoor pursuits, and peaceful solitude." },
      { id: "high_yield_capitalist", sector: "High-Yield Capitalist", label: "Relentless Wealth Builder", desc: "Driven by massive financial upside, equity accumulation, and dominating market sectors." }
    ],
    questionThemes: {
      xPos: [
        "Financial compensation, equity upside, and wealth accumulation are primary career goals for me.",
        "I am drawn to competitive commercial markets where top performers reap huge financial windfalls.",
        "I evaluate career opportunities by their ability to accelerate my net worth and financial freedom.",
        "Building scalable, highly profitable enterprises excites me more than pure philanthropic work.",
        "Money is a concrete scorecard of value created in a free market economy.",
        "I want to master commercial negotiation, capital allocation, and business growth.",
        "Achieving substantial personal wealth gives you the power to shape the world effectively.",
        "I prefer working in high-margin, commercially aggressive industries over underfunded charities.",
        "I am motivated by performance bonuses, equity stakes, and clear financial incentives.",
        "A career that does not offer significant earning potential feels like a missed opportunity."
      ],
      xNeg: [
        "Having a positive social impact on human lives matters far more to me than a large paycheck.",
        "I would gladly take a significant pay cut to work on climate, education, or healthcare justice.",
        "Working for a purely profit-driven corporation without a noble mission feels soul-crushing.",
        "I measure career success by the number of people helped and communities lifted up.",
        "I want my daily work to leave the world measurably kinder, healthier, and more just.",
        "Moral integrity and social purpose are non-negotiable criteria when picking an employer.",
        "I find deeper satisfaction in mentoring disadvantaged youth than in maximizing quarterly profits.",
        "Wealth accumulation beyond comfortable security brings diminishing returns to human happiness.",
        "I prefer non-profit, artistic, or civic institutions where purpose triumphs over commercial greed.",
        "My legacy will be defined by the compassion I showed, not the bank account I accumulated."
      ],
      crossPP: [
        "I build high-profit commercial businesses while strictly maintaining an idyllic 30-hour work week.",
        "I generate substantial wealth through smart enterprise while prioritizing family dinners and health."
      ],
      crossPM: [
        "I work grueling 90-hour weeks on Wall Street or Silicon Valley to conquer the commercial market.",
        "I willingly sacrifice vacations, sleep, and relationships to build a massive financial empire."
      ],
      crossMP: [
        "I work for a humble non-profit with an idyllic, peaceful schedule, enjoying a rich, balanced life.",
        "I serve humanistic causes without stress, keeping work strictly separated from my peaceful personal life."
      ],
      crossMM: [
        "I sacrifice my sleep, personal relationships, and comfort fighting day and night for social justice.",
        "I pour every drop of sweat into humanitarian causes, willingly burning the candle at both ends."
      ],
      yPos: [
        "Leaving work at the office and having completely free evenings and weekends is essential for me.",
        "I prioritize sleep, physical fitness, friendships, and hobbies above any job promotion.",
        "No amount of money or prestige is worth experiencing chronic burnout and relationship decay.",
        "I want a sustainable, balanced lifestyle where work occupies its proper, limited proportion."
      ],
      yNeg: [
        "I am willing to make major personal sacrifices in sleep and leisure to reach the absolute summit.",
        "Great accomplishments require periods of intense, unbalanced obsession and sacrifice.",
        "I happily check emails late at night and work through weekends when pursuing a massive goal.",
        "A quiet, balanced 9-to-5 lifestyle feels uninspiring compared to high-intensity ambition."
      ]
    }
  },

  // -------------------------------------------------------------
  // 05.05 DECISION-MAKING-STYLE
  // -------------------------------------------------------------
  {
    id: "decision-making-style",
    slug: "decision-making-style",
    code: "05.05",
    fieldId: "career",
    title: "Decision-Making Style Matrix",
    summary: "Map your cognitive decision heuristics across empirical analytical rigor and rapid action pacing (Scott & Bruce GDMS).",
    axes: {
      x: {
        id: "analytic_rigor",
        name: "Cognitive Processing & Rigor",
        negative: "Heuristic Intuitive Instinct",
        positive: "Empirical Analytical Rigor"
      },
      y: {
        id: "deliberation_pace",
        name: "Deliberation & Action Horizon",
        negative: "Reflective Contemplation",
        positive: "Decisive Action Pacing"
      }
    },
    cells: [
      { id: "intuitive_contemplator", sector: "Intuitive Contemplator", label: "Patient Sensemaker", desc: "Listens to deep gut feelings and subconscious signals, allowing decisions to mature over time." },
      { id: "measured_scholar", sector: "The Measured Scholar", label: "Thorough Analyst", desc: "Studies data exhaustively, modeling risks and evaluating contingencies with meticulous care." },
      { id: "systematic_evaluator", sector: "Systematic Evaluator", label: "Analytical Strategist", desc: "Builds rigorous analytical decision trees while keeping a structured timeline for resolution." },
      { id: "instinctive_responder", sector: "Instinctive Responder", label: "Quick Instinctive Decider", desc: "Trusts first impressions and makes solid judgment calls quickly in everyday moments." },
      { id: "pragmatic_arbitrator", sector: "The Pragmatic Arbitrator", label: "Balanced Decision Maker", desc: "Blends data analysis with intuitive common sense, deciding when confidence reaches 70%." },
      { id: "data_driven_commander", sector: "Data-Driven Commander", label: "High-Velocity Analyst", desc: "Demands empirical metrics fast, making bold, rapid, numbers-backed strategic calls." },
      { id: "gut_initiator", sector: "The Gut Initiator", label: "Instinctive Catalyst", desc: "Leaps into action based on instantaneous gut conviction, learning through trial and error." },
      { id: "swift_pragmatist", sector: "The Swift Pragmatist", label: "Nimble Problem Solver", desc: "Prioritizes rapid momentum over agonizing analysis; tests hypotheses through action." },
      { id: "calculated_disruptor", sector: "Calculated Disruptor", label: "Bold Strategic Mover", desc: "Combines sharp analytical insights with lightning-fast execution to outmaneuver rivals." }
    ],
    questionThemes: {
      xPos: [
        "Before making an important decision, I gather quantitative data and analyze comparative spreadsheets.",
        "I systematically weigh the pros and cons using objective, weighted decision criteria.",
        "I distrust gut feelings until they can be substantiated with verifiable facts and figures.",
        "I look for empirical case studies and statistical evidence rather than anecdotal stories.",
        "I construct contingency plans and calculate probabilities before committing resources.",
        "I challenge assumptions with rigorous logic to avoid confirmation bias.",
        "A decision backed by thorough research gives me far greater confidence than intuitive hunch.",
        "I prefer structured analytical frameworks like decision matrices when facing complex dilemmas.",
        "I break down multifaceted problems into component variables to evaluate each objectively.",
        "When others rely on emotion, I bring the conversation back to hard evidence and metrics."
      ],
      xNeg: [
        "I trust my initial gut instinct; it usually turns out to be more accurate than spreadsheets.",
        "Too much data analysis leads to analysis paralysis and missed opportunities.",
        "I make decisions based on an intuitive holistic feel rather than dry numbers.",
        "My subconscious mind processes complex interpersonal dynamics better than formal logic.",
        "I pay close attention to bodily sensations and vibes when evaluating an opportunity.",
        "Experience and wisdom cannot be captured on a spreadsheet; intuition matters most.",
        "When a decision feels emotionally right, I move forward without needing endless proof.",
        "I rely on creative heuristics and patterns recognized from past successes.",
        "Overanalyzing choices often confuses the clear signal of what your heart already knows.",
        "I trust my moral and aesthetic sense to guide my course when facts are ambiguous."
      ],
      crossPP: [
        "I crunch complex data at lightning speed and pull the trigger on high-stakes calls without hesitation.",
        "I make fast, decisive calls backed by sharp, rigorous analytical calculations."
      ],
      crossPM: [
        "I spend months gathering every possible data point and modeling every risk before making any move.",
        "My analysis is exceptionally deep, deliberate, and exhaustive, never rushed by deadlines."
      ],
      crossMP: [
        "I make snap decisions in five seconds flat based purely on intuitive gut instinct.",
        "I act immediately on bold hunches, trusting momentum over cautious calculations."
      ],
      crossMM: [
        "I take weeks of quiet contemplation, letting my intuition slowly incubate before deciding.",
        "I avoid rushing, quietly waiting for emotional clarity and gut peace to emerge naturally."
      ],
      yPos: [
        "A good decision made quickly is far superior to a perfect decision made too late.",
        "I make up my mind swiftly and commit to action without looking back.",
        "I am comfortable making high-stakes decisions with incomplete information under tight deadlines.",
        "I prefer making a call and correcting course along the way rather than endlessly debating."
      ],
      yNeg: [
        "I prefer to sleep on major decisions and let them simmer before committing.",
        "Rushing into a choice without thorough contemplation feels reckless and stressful to me.",
        "I take my time exploring alternative options even when people press me for a quick answer.",
        "I value patient reflection, seeking counsel from multiple advisors before resolving a dilemma."
      ]
    }
  }
];

module.exports = { INSTRUMENTS_DEFINITIONS };
