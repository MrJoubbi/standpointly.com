import { ArchetypeInsight } from "./types";

export const WELLBEING_INSIGHTS: Record<string, Record<string, ArchetypeInsight>> = {
  stress: {
    anchored_flourisher: {
      strengths: [
        "Optimal psychological equilibrium: low external strain paired with exceptional self-efficacy",
        "Abundant mental reserves that allow for creative risk-taking, joyful productivity, and generosity",
        "Serves as a calming, optimistic pillar of support for colleagues and family during crises"
      ],
      blindspots: [
        "May struggle to comprehend the debilitating paralysis experienced by colleagues under acute strain",
        "Risk of taking on too many commitments out of an overestimation of infinite energy"
      ],
      communicationTips: [
        "Practice empathetic listening without immediately prescribing your own ease as a simple fix",
        "Protect your restorative routines proactively before unexpected life demands arrive"
      ]
    },
    grounded_operator: {
      strengths: [
        "Disciplined stress-management routines, steady emotional regulation, and dependable poise",
        "Handles everyday workplace friction without letting demands disrupt sleep or health",
        "Solves operational bottlenecks calmly, preventing small fires from escalating into emergencies"
      ],
      blindspots: [
        "May become impatient with peers who react emotionally to minor scheduling delays or friction",
        "Can normalize ambient strain for so long that subtle chronic physical fatigue goes unaddressed"
      ],
      communicationTips: [
        "Acknowledge the emotional impact of workload spikes before launching into pragmatic execution",
        "Take regular quarterly health retreats to ensure physical recovery matches mental stamina"
      ]
    },
    resilient_striver: {
      strengths: [
        "High psychological coping agency that enables peak performance even under intense pressure",
        "Converts acute external demands into focused energy, momentum, and tangible execution",
        "Demonstrates remarkable grit and endurance when the stakes are exceptionally high"
      ],
      blindspots: [
        "High risk of sudden physiological crash if intense demands persist indefinitely without breaks",
        "May dismiss early somatic warning signs (headaches, insomnia) as mere hurdles to power through"
      ],
      communicationTips: [
        "Schedule non-negotiable recovery windows: performance athletes must prioritize sleep and rest",
        "Communicate your workload boundaries clearly to superiors before reaching breaking points"
      ]
    },
    sheltered_steady: {
      strengths: [
        "Peaceful, orderly daily life with low environmental stressors and healthy routines",
        "Enjoys emotional calm, steady contentment, and freedom from high-pressure chaos",
        "Reliable contributor who preserves a low-friction, harmonious home and work environment"
      ],
      blindspots: [
        "May feel intensely overwhelmed when sudden, unpredictable crises disrupt comfortable routines",
        "Can hesitate to pursue promising career growth due to fear of the associated stress"
      ],
      communicationTips: [
        "Build confidence by intentionally tackling manageable, slightly stressful mini-challenges",
        "Develop contingency plans in advance so unexpected disruptions feel manageable"
      ]
    },
    balanced_regulator: {
      strengths: [
        "Healthy, adaptive equilibrium that handles normal life demands with common-sense resilience",
        "Recovers energy naturally through ordinary rest, weekends, and social connection",
        "Maintains a sustainable balance between work commitments and personal life"
      ],
      blindspots: [
        "Can experience temporary dips in motivation and focus when multiple life stressors coincide",
        "May delay setting necessary workplace boundaries until fatigue becomes noticeably uncomfortable"
      ],
      communicationTips: [
        "Conduct a monthly life audit to identify and trim non-essential energy drains",
        "Voice emerging overwhelm early rather than waiting for strain to peak"
      ]
    },
    pressured_performer: {
      strengths: [
        "Strong sense of responsibility, dedication, and capacity to deliver results under heavy load",
        "Continues to show up for others and meet critical deadlines despite depleted reserves",
        "Deep personal loyalty and commitment to seeing projects through to completion"
      ],
      blindspots: [
        "Operating on dangerous energetic debt that threatens physical and emotional health",
        "May experience cognitive fog, irritability, and diminished creative problem-solving capacity"
      ],
      communicationTips: [
        "Initiate an urgent prioritization conversation with your team: 'Which two items can we drop?'",
        "Treat restorative sleep and physical rest as professional responsibilities, not guilty luxuries"
      ]
    },
    withdrawn_quiet: {
      strengths: [
        "Protective self-awareness that honors internal limits and resists unnecessary drama",
        "Prefers quiet, simple living and peaceful boundaries over competitive rat races",
        "Deeply appreciative of calm spaces, nature, and low-pressure human connections"
      ],
      blindspots: [
        "Can become trapped in avoidance, letting fear of stress prevent engagement with the world",
        "May struggle with self-doubt regarding personal capability to handle adult responsibilities"
      ],
      communicationTips: [
        "Take small, courageous steps outside your comfort zone with trusted friends beside you",
        "Celebrate your gentle, quiet strengths while building practical self-efficacy step by step"
      ]
    },
    vulnerable_adapter: {
      strengths: [
        "High sensitivity to life's challenges, deep empathy for human fragility, and honest self-appraisal",
        "Recognizes that ongoing pressures are eroding stamina and actively seeks better ways to cope",
        "Willing to explore new habits, therapy, and mindfulness to rebuild internal reserves"
      ],
      blindspots: [
        "Can get caught in a cycle of anxiety and self-criticism over feeling stressed",
        "May struggle to enforce boundaries with demanding people, worsening internal fatigue"
      ],
      communicationTips: [
        "Practice radical self-compassion: you are carrying real burdens and deserve gentleness",
        "Enlist a supportive friend or professional to help you establish and defend daily boundaries"
      ]
    },
    depleted_struggler: {
      strengths: [
        "Incredible inner endurance having carried overwhelming burdens for an extended period",
        "Honest recognition that current conditions are unsustainable—a vital first step to healing",
        "Deep capacity for transformative renewal once true rest and support are received"
      ],
      blindspots: [
        "Severe nervous system depletion, high risk of acute clinical burnout or physical illness",
        "May feel hopeless, paralyzed, or unable to see a way out of the current storm"
      ],
      communicationTips: [
        "Urgent priority: step back from non-essential duties immediately and reach out for professional support",
        "Remember that your worth is intrinsic and does not depend on carrying impossible weights alone"
      ]
    }
  },
  burnout: {
    vital_thriver: {
      strengths: [
        "Abundant physical energy, joyful connection to mission, and high professional fulfillment",
        "Thrives on solving difficult problems, viewing challenges as stimulating growth opportunities",
        "Inspires entire teams with positive momentum, clarity of purpose, and infectious vitality"
      ],
      blindspots: [
        "May assume this high-energy state is permanent, neglecting preventative rest habits",
        "Can inadvertently make fatigued colleagues feel inadequate or judged for lacking equal stamina"
      ],
      communicationTips: [
        "Champion sustainable work practices across your organization so others don't burn out",
        "Protect restorative rest periods even when you feel capable of working through the night"
      ]
    },
    energized_realist: {
      strengths: [
        "Combines high stamina and competence with clear-eyed boundaries against institutional nonsense",
        "Protects personal energy from toxic politics, focusing strictly on high-impact, meaningful craft",
        "Maintains long-term career sustainability by pacing effort with seasoned wisdom"
      ],
      blindspots: [
        "Can develop a slightly cynical or detached edge toward organizational vision statements",
        "May pull back from inspiring leadership roles out of a desire to avoid bureaucratic headaches"
      ],
      communicationTips: [
        "Share your boundary-setting wisdom and time-management strategies with younger colleagues",
        "Balance self-protective realism with an open heart for genuine collective ideals"
      ]
    },
    strained_idealist: {
      strengths: [
        "Passionate devotion to the mission, deep ethical integrity, and immense pride in craft",
        "Willing to pour heart and soul into creating exceptional work and helping others succeed",
        "Brings soulful dedication and moral purpose to organizations and communities"
      ],
      blindspots: [
        "Physical and emotional reserves are severely depleted by the gap between ideals and reality",
        "Vulnerable to bitter heartbreak and exhaustion when institutions fail to match their dedication"
      ],
      communicationTips: [
        "Decouple your personal identity and moral worth from the flaws of the organization you work for",
        "Set strict working hours: passion must be guarded by firm operational boundaries"
      ]
    },
    steady_contributor: {
      strengths: [
        "Dependable, sustainable work rhythm that delivers consistent output day in and day out",
        "Protects evenings and weekends for family, hobbies, and personal life without guilt",
        "Provides a stabilizing, drama-free presence that anchors projects through long sprints"
      ],
      blindspots: [
        "May feel a slight lack of deep passion or excitement about the work, treating it strictly as a job",
        "Can resist taking on challenging new assignments that could accelerate career trajectory"
      ],
      communicationTips: [
        "Explore creative passion projects or learning goals within your work to rekindle engagement",
        "Acknowledge that your steady consistency is a tremendous gift to any organization"
      ]
    },
    ambivalent_grinder: {
      strengths: [
        "Reliable persistence through monotonous, unglamorous duties and everyday organizational friction",
        "Gets the job done even when motivation is low, maintaining essential operational continuity",
        "Honest appraisal of workplace trade-offs, neither naively optimistic nor entirely defeated"
      ],
      blindspots: [
        "Creeping emotional detachment and low-grade fatigue that slowly drains enthusiasm and joy",
        "Risk of drifting for years in an unfulfilling role without taking proactive steps to change"
      ],
      communicationTips: [
        "Identify specific aspects of your current role that you can reshape, delegate, or eliminate",
        "Set aside time each week to cultivate interests and skills that excite your genuine curiosity"
      ]
    },
    exhausted_striver: {
      strengths: [
        "Incredible tenacity, formidable work ethic, and refusal to let down colleagues or clients",
        "Continues to deliver high-quality work through sheer willpower and personal sacrifice",
        "Recognized by peers as an indispensable pillar of capability and effort"
      ],
      blindspots: [
        "Running on empty: physical exhaustion and cognitive fatigue are reaching alarming levels",
        "Willpower alone cannot overcome biological sleep deficits and chronic nervous system strain"
      ],
      communicationTips: [
        "Speak frankly with managers about workload redistribution before health forces an involuntary break",
        "Give yourself permission to do 'good enough' work on low-stakes tasks to conserve energy"
      ]
    },
    detached_skeptic: {
      strengths: [
        "Self-protective emotional detachment that insulates the nervous system from toxic demands",
        "Clear-eyed vision that cuts through corporate buzzwords and empty promises",
        "Refuses to sacrifice personal health for companies that treat employees as disposable"
      ],
      blindspots: [
        "Cynicism can become a permanent emotional default, eroding personal joy and creative spark",
        "May alienate well-meaning colleagues who are genuinely trying to make positive improvements"
      ],
      communicationTips: [
        "Find environments or projects that genuinely align with your core values and dignity",
        "Distinguish between healthy boundary protection and bitter, chronic cynicism"
      ]
    },
    disillusioned_survivor: {
      strengths: [
        "Deep emotional awareness of the systemic dysfunctions within their workplace or industry",
        "Has endured heavy organizational turbulence and understands how broken systems operate",
        "Ready for a transformative career pivot once the decision to leave is embraced"
      ],
      blindspots: [
        "Trapped in chronic survival mode, feeling powerless, exhausted, and deeply drained",
        "Pervasive cynicism may prevent them from believing that healthy, rewarding workplaces exist"
      ],
      communicationTips: [
        "Begin crafting an exit strategy or career transition plan with a trusted mentor or coach",
        "Remember that your skills, creativity, and worth are portable and will flourish elsewhere"
      ]
    },
    acute_burnout: {
      strengths: [
        "Reaching the definitive wake-up call that forces essential, life-saving restructuring",
        "Deep experiential understanding of the ultimate human limits of endurance",
        "The ground is cleared for rebuilding a completely authentic, sustainable way of living and working"
      ],
      blindspots: [
        "Severe physical, emotional, and cognitive depletion; basic daily tasks feel overwhelming",
        "High risk of depression, anxiety, and physical health breakdown without immediate intervention"
      ],
      communicationTips: [
        "Take immediate medical leave or time off to allow your nervous system and body to heal",
        "Prioritize radical rest, medical support, and loving human connection above all else"
      ]
    }
  },
  "emotional-regulation": {
    stoic_processor: {
      strengths: [
        "High emotional containment, serene public composure, and disciplined internal processing",
        "Prevents emotional volatility from disrupting professional meetings or family stability",
        "Processes feelings quietly with dignity, resolving issues through private contemplation"
      ],
      blindspots: [
        "May suppress emotions so thoroughly that loved ones feel shut out or unable to connect",
        "Risk of physical somatization (migraines, muscle tension) when feelings are bottled up"
      ],
      communicationTips: [
        "Practice sharing your internal process aloud with trusted companions: 'I am reflecting on this'",
        "Remember that showing appropriate vulnerability invites others into deeper trust"
      ]
    },
    calibrated_regulator: {
      strengths: [
        "Exceptional emotional tact, balanced self-control, and polite, constructive diplomacy",
        "Navigates difficult, high-tension conversations without escalating anger or shutting down",
        "Maintains harmonious relationships across diverse professional and social environments"
      ],
      blindspots: [
        "Can hold back necessary righteous indignation when confronting abusive or unethical behavior",
        "May prioritize polite harmony over direct, uncomfortable honesty"
      ],
      communicationTips: [
        "Give yourself permission to be fiercely direct when fundamental values or boundaries are crossed",
        "Check in with your raw feelings to ensure diplomacy is not turning into self-erasure"
      ]
    },
    strategic_reappraiser: {
      strengths: [
        "Mastery of cognitive reframing: swiftly finds empowering perspectives in the midst of crises",
        "Combines mental agility with outward emotional poise, turning setbacks into strategic lessons",
        "Keeps teams calm and focused on creative solutions when unforeseen disasters strike"
      ],
      blindspots: [
        "Can jump to positive reframing too fast, invalidating the necessary grieving of real losses",
        "May appear overly detached or intellectualized during moments of raw human heartbreak"
      ],
      communicationTips: [
        "Allow time to sit with and honor sorrow or disappointment before searching for silver linings",
        "Validate others' pain simply: 'This hurts deeply, and it is completely normal to feel shattered'"
      ]
    },
    quiet_internalizer: {
      strengths: [
        "Gentle, respectful disposition that never unloads raw emotional storms onto others",
        "Takes time to reflect in solitude, examining their own contributions to conflicts",
        "Values quiet spaces, thoughtful introspection, and emotional peace"
      ],
      blindspots: [
        "Can ruminate in solitary misery, turning conflicts inward into harsh self-criticism",
        "May delay expressing valid grievances until resentment has poisoned the connection"
      ],
      communicationTips: [
        "Voice your perspective within 24 hours of an incident rather than storing it away",
        "Express your needs directly: other people cannot read your mind no matter how obvious it seems"
      ]
    },
    adaptive_moderator: {
      strengths: [
        "Healthy, flexible integration of cognitive reframing and authentic emotional expression",
        "Knows when to reframe a challenge mentally and when to let tears or laughter flow freely",
        "Relatable, balanced emotional presence that fosters genuine psychological safety"
      ],
      blindspots: [
        "Can occasionally feel torn between expressing raw feelings and maintaining composure",
        "May take on the role of emotional shock absorber for friends, exhausting personal energy"
      ],
      communicationTips: [
        "Clearly signal when you are speaking from gut feeling versus when you are offering a balanced reframe",
        "Ensure your own emotional needs are reciprocated in your closest relationships"
      ]
    },
    mindful_reframer: {
      strengths: [
        "Inspirational ability to find meaning, growth, and hope in the face of profound hardship",
        "Uses cognitive reappraisal to transform bitterness into wisdom and adversity into strength",
        "Uplifts communities with genuine optimism grounded in psychological resilience"
      ],
      blindspots: [
        "Can slip into toxic positivity, pressuring others to smile before they have processed grief",
        "May deny their own anger or sadness to maintain an unbroken image of positivity"
      ],
      communicationTips: [
        "Remember that true emotional resilience embraces the full human spectrum, including darkness and rage",
        "Meet grieving friends with quiet presence rather than inspirational quotes"
      ]
    },
    raw_authentic: {
      strengths: [
        "Unfiltered honesty, total emotional transparency, and refreshing lack of pretense",
        "People always know exactly how they feel; zero hidden passive-aggression or manipulation",
        "Brings vibrant life, passion, and genuine emotional connection into every space"
      ],
      blindspots: [
        "Knee-jerk reactions can say hurtful things in anger that cause lasting relationship fractures",
        "May struggle in professional corporate environments that demand sanitized composure"
      ],
      communicationTips: [
        "Practice the 'breath bridge': take three deep breaths before reacting to provocative comments",
        "Learn the power of pause: you can always speak your mind, but timing dictates how it is received"
      ]
    },
    spontaneous_expressor: {
      strengths: [
        "Vibrant emotional warmth, infectious enthusiasm, and generous emotional sharing",
        "Comfortable expressing tears of sorrow, radiant joy, and loving affection in the moment",
        "Creates deeply bonded, intimate human connections where people feel free to be real"
      ],
      blindspots: [
        "Emotional high tides can cause them to make impulsive promises or snap decisions they later regret",
        "Can overwhelm quiet, introverted peers who need low-stimulation environments"
      ],
      communicationTips: [
        "Sleep on major decisions when experiencing heightened emotional euphoria or anger",
        "Check in on the energetic bandwidth of listeners before initiating passionate debriefs"
      ]
    },
    expressive_synthesizer: {
      strengths: [
        "Combines powerful verbal reframing with vibrant, animated emotional expression",
        "Processes complex feelings aloud with infectious energy, turning confusion into creative clarity",
        "Exceptional communicator who moves audiences through the harmonious marriage of head and heart"
      ],
      blindspots: [
        "Can monopolize group discussions with their rapid, high-energy processing style",
        "May exhaust themselves by living at a high emotional RPM without sufficient quiet downtime"
      ],
      communicationTips: [
        "Practice quiet, internal journaling as an alternative to always processing aloud",
        "Create space for slower, more contemplative thinkers to contribute their insights"
      ]
    }
  },
  resilience: {
    steady_endurer: {
      strengths: [
        "Unwavering stoic grit, physical and mental stamina, and quiet determination to weather any storm",
        "Pushes through prolonged hardship without complaining or abandoning core responsibilities",
        "Dependable rock of stability for family and team members during long, grueling battles"
      ],
      blindspots: [
        "May endure abusive or broken situations far longer than necessary out of sheer stubborn endurance",
        "Can neglect emotional healing, carrying accumulated unexpressed grief in the body"
      ],
      communicationTips: [
        "Ask yourself: 'Is enduring this situation actually productive, or is it time to pivot or walk away?'",
        "Allow yourself to seek help and lean on others; endurance does not have to be solitary"
      ]
    },
    resolute_anchor: {
      strengths: [
        "Combines consistent daily discipline with deep, principled commitment to core duties",
        "Maintains operational routines and stable leadership when chaos swirls around them",
        "Earns deep trust through steadfast follow-through and moral consistency under fire"
      ],
      blindspots: [
        "Can become overly rigid or resistant when a radically different strategy is needed",
        "May judge those who struggle with emotional overwhelm as lacking basic discipline"
      ],
      communicationTips: [
        "Balance resolute discipline with compassionate flexibility when working with diverse temperaments",
        "Embrace innovative pivots as new ways to defend and achieve your foundational goals"
      ]
    },
    indomitable_champion: {
      strengths: [
        "Fierce, unstoppable momentum, boundless grit, and refusal to surrender to any setback",
        "Views defeat as temporary feedback, bouncing back faster and stronger with every blow",
        "Rallies demoralized teams to achieve seemingly impossible turnarounds and victories"
      ],
      blindspots: [
        "Can run over personal physical limits, leading to sudden, debilitating injury or burnout",
        "May struggle to accept when a battle is truly lost and graceful withdrawal is the wiser choice"
      ],
      communicationTips: [
        "Learn the strategic wisdom of tactical retreats: stepping back preserves resources for victory",
        "Foster emotional warmth alongside your competitive drive to nurture team loyalty"
      ]
    },
    cautious_stabilizer: {
      strengths: [
        "Astute risk management, careful preservation of resources, and prudent contingency planning",
        "Anticipates headwinds well in advance, shielding families and organizations from catastrophic shocks",
        "Values long-term security over impulsive gambles, ensuring steady survival"
      ],
      blindspots: [
        "Excessive caution can prevent them from seizing extraordinary, high-upside growth opportunities",
        "May remain in defensive survival posture long after an external crisis has passed"
      ],
      communicationTips: [
        "Calculate the risk of inaction alongside the risk of action: staying still also carries danger",
        "Allocate a dedicated budget for bold, low-risk experiments that build adaptive confidence"
      ]
    },
    balanced_navigator: {
      strengths: [
        "Pragmatic, adaptable resilience that balances persistence with intelligent flexibility",
        "Assesses obstacles realistically, knowing when to push through and when to find a creative detour",
        "Maintains high morale, clear perspective, and emotional composure across changing seasons"
      ],
      blindspots: [
        "May occasionally compromise too readily when an uncompromising stand is required",
        "Can be perceived as lacking passionate fire by more extreme, aggressive competitors"
      ],
      communicationTips: [
        "Clearly communicate the strategic rationale behind your course corrections to keep teams aligned",
        "Identify your absolute non-negotiable principles where no compromise is permitted"
      ]
    },
    agile_pioneer: {
      strengths: [
        "Breakthrough creativity, rapid iterative pivoting, and boundless optimism in the face of roadblocks",
        "Thrives on solving novel, unprecedented problems that have no established playbook",
        "Transforms unexpected disasters into catalysts for revolutionary new inventions"
      ],
      blindspots: [
        "Can abandon difficult initiatives prematurely to chase exciting new pivot opportunities",
        "May exhaust teams with constant changes of direction before solutions have time to mature"
      ],
      communicationTips: [
        "Commit to a minimum validation period before executing another strategic pivot",
        "Anchor your creative agility with structured operational leads who can execute follow-through"
      ]
    },
    fragile_hesitator: {
      strengths: [
        "Deep emotional sensitivity, profound appreciation for life's delicacy, and high empathy",
        "Understands the pain of human suffering deeply, offering gentle comfort to the brokenhearted",
        "Approaches relationships and commitments with earnest, heartfelt sincerity"
      ],
      blindspots: [
        "Takes considerable time to recover from severe blows, easily paralyzed by fear of future failure",
        "May internalize setbacks as proof of fundamental inadequacy rather than ordinary learning curves"
      ],
      communicationTips: [
        "Build a daily resilience ritual: celebrate small wins, practice breathwork, and take regular walks",
        "Surround yourself with compassionate, encouraging mentors who remind you of your true strength"
      ]
    },
    fluid_adapter: {
      strengths: [
        "Graceful psychological flexibility, rolling with life's unexpected punches without breaking",
        "Releases attachments to rigid plans effortlessly, welcoming emergent circumstances with curiosity",
        "Navigates turbulent changes with a peaceful, calm disposition that eases group tension"
      ],
      blindspots: [
        "Can lack the fierce, stubborn drive needed to push through stubborn obstacles that won't yield to flow",
        "May appear indifferent or non-committal during moments that demand passionate defiance"
      ],
      communicationTips: [
        "Pair your graceful adaptability with firm, clear goals so you don't drift aimlessly",
        "Stand your ground firmly when core ethical values or boundaries are challenged"
      ]
    },
    dynamic_restorer: {
      strengths: [
        "Post-traumatic growth mastery: transforms intense pain, trauma, and hardship into profound wisdom",
        "Helps others heal by sharing their journey through the valley with authenticity and hope",
        "Possesses an indestructible inner light that shines brightest in the darkest times"
      ],
      blindspots: [
        "May unintentionally romanticize struggle, feeling restless during peaceful, calm periods",
        "Can take on too much of the world's collective suffering as a personal healing crusade"
      ],
      communicationTips: [
        "Allow yourself to experience ordinary, simple joy and peace without needing dramatic crises",
        "Protect your energetic boundaries so your healing gifts remain sustainable"
      ]
    }
  },
  procrastination: {
    disciplined_executor: {
      strengths: [
        "Ironclad executive function, zero hesitation, and immediate action on demanding tasks",
        "Tackles unglamorous duties with professional discipline, finishing work long before deadlines",
        "Creates immense personal peace of mind through proactive preparation and organization"
      ],
      blindspots: [
        "Can become impatient or judgmental toward colleagues who struggle with task delay",
        "May rush into execution on ill-conceived projects before pausing to question their true value"
      ],
      communicationTips: [
        "Schedule dedicated reflection time before immediately launching into task execution",
        "Guide procrastinating colleagues with compassionate structure rather than stern lectures"
      ]
    },
    methodical_finisher: {
      strengths: [
        "Systematic workflow planning, balanced pacing, and dependable, high-quality completion",
        "Breaks complex, intimidating projects into manageable, bite-sized milestones with ease",
        "Maintains consistent daily progress without succumbing to panic, burnout, or delay"
      ],
      blindspots: [
        "Can become frustrated when disorganized external partners disrupt their carefully planned timeline",
        "May over-plan low-priority tasks, spending too much time perfecting checklists"
      ],
      communicationTips: [
        "Build buffer margins into project schedules to absorb unexpected delays gracefully",
        "Distinguish between high-leverage strategic work and routine administrative checklists"
      ]
    },
    paralyzed_perfectionist: {
      strengths: [
        "Exceptional standards of craft, profound attention to nuance, and deep pride in work",
        "Incapable of producing sloppy or careless output; leaves no detail unpolished",
        "Capable of world-class, museum-grade achievements when projects are completed"
      ],
      blindspots: [
        "Terrified of producing anything less than absolute perfection, leading to agonizing delays in starting",
        "Suffers from intense anxiety and self-doubt during the messy, imperfect initial phases of creation"
      ],
      communicationTips: [
        "Adopt the 'shitty first draft' philosophy: give yourself full permission to write messy, rough drafts",
        "Redefine success as completing and shipping work rather than reaching unattainable perfection"
      ]
    },
    steady_pacer: {
      strengths: [
        "Healthy, realistic relationship with time and work; delivers dependable results without panic",
        "Balances productive work sessions with guilt-free rest, leisure, and personal life",
        "Rarely succumbs to all-night crisis sprints or chronic, paralyzing avoidance"
      ],
      blindspots: [
        "May struggle to tap into the high-intensity creative flow required for breakthrough innovations",
        "Can become overly comfortable with safe, predictable deadlines that lack ambitious urgency"
      ],
      communicationTips: [
        "Set occasional stretch deadlines to test your top-end speed and creative stamina",
        "Celebrate your steady, sustainable pace as a model for healthy professional life"
      ]
    },
    reactive_balancer: {
      strengths: [
        "Normal human rhythm: balances productive sprint days with occasional harmless procrastination",
        "Recognizes when brain fatigue requires a temporary pause before resuming work",
        "Gets essential commitments completed reliably without taking life too seriously"
      ],
      blindspots: [
        "Can fall into guilty procrastination binges (social media, cleaning) when facing intimidating tasks",
        "May leave tasks slightly too close to the deadline, generating unnecessary last-minute stress"
      ],
      communicationTips: [
        "Use the '5-minute rule': commit to working on the dreaded task for just 5 minutes to break the seal",
        "Remove digital temptation apps from your immediate workspace during deep work blocks"
      ]
    },
    pressure_prompted: {
      strengths: [
        "Incredible turnaround speed and sharp, adrenaline-fueled focus when the deadline clock is ticking",
        "Delivers surprisingly creative, effective solutions during eleventh-hour crisis sprints",
        "High tolerance for last-minute pressure; never freezes completely under imminent deadlines"
      ],
      blindspots: [
        "Addicted to the adrenaline of crisis mode; cannot bring themselves to start until panic sets in",
        "High chronic stress toll on the nervous system, and no margin of error if an unexpected problem strikes"
      ],
      communicationTips: [
        "Create artificial, binding intermediate milestones with external accountability partners",
        "Learn to find stimulation through curiosity and mastery rather than solely through panic adrenaline"
      ]
    },
    focused_opportunist: {
      strengths: [
        "Capable of legendary hyper-focus and immense productivity when genuinely fascinated by a topic",
        "Follows curiosity to unexpected, innovative breakthroughs that routine thinkers would miss",
        "Works with immense joy and energy when intrinsic passion is fully ignited"
      ],
      blindspots: [
        "Struggles desperately with boring, routine administrative obligations, putting them off indefinitely",
        "Work output can be feast-or-famine depending on the mercurial whims of interest"
      ],
      communicationTips: [
        "Pair boring admin tasks with enjoyable rituals (favorite cafe, ambient music, rewarding treats)",
        "Outsource, automate, or delegate repetitive tasks whenever possible to protect creative focus"
      ]
    },
    spontaneous_dabbler: {
      strengths: [
        "Wide-ranging curiosity, diverse multi-disciplinary interests, and endless creative ideas",
        "Brings fresh, cross-pollinated insights from unexpected fields into projects",
        "Enthusiastic starter of new initiatives with boundless optimism and energy"
      ],
      blindspots: [
        "Easily lured away from finishing current commitments by tempting, shiny new ideas",
        "Leaves a long trail of half-finished projects, causing guilt and frustration"
      ],
      communicationTips: [
        "Create a 'parking lot' notebook for exciting new ideas to be explored ONLY after finishing current work",
        "Celebrate the satisfying feeling of completion as being just as thrilling as the initial spark"
      ]
    },
    chronic_delayer: {
      strengths: [
        "Deep experiential understanding of the psychological roots of fear, avoidance, and dopamine loops",
        "Immense relief and transformative agency when structured support breaks the cycle of delay",
        "High empathy for anyone struggling with executive dysfunction and overwhelm"
      ],
      blindspots: [
        "Trapped in a painful cycle of task dread, escapist distraction, mounting panic, and self-recrimination",
        "Severe erosion of self-trust, professional credibility, and peace of mind"
      ],
      communicationTips: [
        "Break tasks down to embarrassingly tiny micro-steps: e.g. 'Open the document and write one sentence'",
        "Work alongside a body-double or accountability coach to anchor your focus in real time"
      ]
    }
  }
};
