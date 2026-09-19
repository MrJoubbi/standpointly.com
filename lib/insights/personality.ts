import { ArchetypeInsight } from "./types";

export const PERSONALITY_INSIGHTS: Record<string, Record<string, ArchetypeInsight>> = {
  "big-five": {
    sage: {
      strengths: [
        "Unflappable emotional equilibrium and deep contemplative wisdom under high stress",
        "Ability to examine complex ideas thoroughly without succumbing to impulsive haste or crowd fever",
        "Provides an anchor of steady, objective reassurance to teams and loved ones"
      ],
      blindspots: [
        "May appear aloof, slow to act, or emotionally unexpressive during fast-moving social events",
        "Can become so comfortable in solitary contemplation that valuable external opportunities pass by"
      ],
      communicationTips: [
        "Signal your engagement early by verbally affirming others before retreating to evaluate",
        "Proactively share your internal thought processes so colleagues understand the basis of your composure"
      ]
    },
    anchor: {
      strengths: [
        "Rock-solid consistency, unwavering reliability, and disciplined habit formation",
        "Exceptional capacity to maintain institutional stability and ground volatile projects",
        "High resistance to anxiety, panic, and disruptive distractions"
      ],
      blindspots: [
        "Can exhibit stubborn resistance to necessary organizational or technological changes",
        "May dismiss creative disruptions or unconventional ideas as reckless or disorderly"
      ],
      communicationTips: [
        "Frame new experiments as risk-managed evolutions of existing stable foundations",
        "Acknowledge the value of proactive exploration alongside operational predictability"
      ]
    },
    catalyst: {
      strengths: [
        "High exploratory curiosity combined with resilient emotional optimism and drive",
        "Fearless willingness to venture into uncharted domains and spark transformative change",
        "Infectious enthusiasm that mobilizes people to embrace bold possibilities"
      ],
      blindspots: [
        "Can overwhelm steadier peers with an excessive volume of new ideas and pivots",
        "May underestimate the repetitive, unglamorous maintenance work required to finish initiatives"
      ],
      communicationTips: [
        "Partner closely with methodical colleagues to anchor your visionary sparks into operational steps",
        "Allow ideas to breathe before demanding immediate team-wide adoption"
      ]
    },
    deliberator: {
      strengths: [
        "Incisive analytical depth, intellectual caution, and thorough risk calculation",
        "Immunity to superficial groupthink, hype cycles, and premature consensus",
        "Uncovers subtle logical fallacies and structural vulnerabilities before they cause harm"
      ],
      blindspots: [
        "Can fall victim to analysis paralysis, delaying decisions until optimal certainty is reached",
        "May be perceived as overly critical or unenthusiastic by action-oriented collaborators"
      ],
      communicationTips: [
        "Clarify that your critical questions come from a desire to strengthen the plan, not defeat it",
        "Commit to a 'disagree and commit' timeline when business needs require swift forward momentum"
      ]
    },
    synthesizer: {
      strengths: [
        "Extraordinary psychological versatility and balanced adaptability across varied environments",
        "Comfortable moving between deep solitary focus and high-energy collaborative teamwork",
        "Natural mediator who understands both conservative caution and radical exploration"
      ],
      blindspots: [
        "May lack a strong single defining edge, blending in rather than asserting an unmistakable stance",
        "Can exhaust personal energy by trying to accommodate too many contradictory roles"
      ],
      communicationTips: [
        "State your own personal convictions clearly rather than merely reflecting the room's balance",
        "Define distinct boundaries for when you are in creative exploration mode versus focused consolidation"
      ]
    },
    dynamo: {
      strengths: [
        "Vibrant social energy, immediate action-orientation, and spontaneous charisma",
        "Excels at breaking deadlocks and generating rapid, palpable external momentum",
        "Thrives in open, dynamic environments where rapid networking and pitching are essential"
      ],
      blindspots: [
        "May struggle with extended periods of quiet, solitary, methodical detail work",
        "Can unintentionally dominate conversations and crowd out more reflective contributors"
      ],
      communicationTips: [
        "Practice intentional silence and active listening to draw out quieter team members",
        "Build deliberate reflection checkpoints into your calendar to evaluate long-term direction"
      ]
    },
    skeptic: {
      strengths: [
        "High sensitivity to potential risks, moral hazards, and subtle systemic flaws",
        "Deep emotional authenticity, refusing to accept sanitized platitudes or false optimism",
        "Protects communities and organizations from hubristic blind spots"
      ],
      blindspots: [
        "Can become trapped in pessimistic rumination, viewing challenges as catastrophic barriers",
        "May project personal anxiety onto neutral situations or well-meaning colleagues"
      ],
      communicationTips: [
        "Pair every identified risk with at least one viable, constructive alternative solution",
        "Check emotional assumptions with objective data before voicing worst-case interpretations"
      ]
    },
    sentinel: {
      strengths: [
        "Passionate emotional investment, unwavering vigilance, and relentless dedication to duty",
        "Acts as an early-warning radar, detecting relational and operational fractures instantly",
        "Fiercely loyal protector of values, teams, and vulnerable commitments"
      ],
      blindspots: [
        "Vulnerable to emotional exhaustion from carrying the weight of continuous worry",
        "Can react defensively to benign feedback, interpreting suggestions as attacks on competence"
      ],
      communicationTips: [
        "Cultivate intentional stress-decompression practices outside of work or duty",
        "Ask for specific, clarifying examples before reacting to critical feedback"
      ]
    },
    provocateur: {
      strengths: [
        "Electrifying intensity, courage to challenge complacent orthodoxies, and relentless drive",
        "Thrives in high-stakes crises that shatter routine procedures",
        "Refuses to accept mediocrity, pushing systems and individuals beyond self-imposed boundaries"
      ],
      blindspots: [
        "Can leave a trail of interpersonal friction and emotional volatility in their wake",
        "May provoke confrontation for stimulation rather than constructive transformation"
      ],
      communicationTips: [
        "Gauge the psychological safety and emotional readiness of others before applying pressure",
        "Separate the critique of flawed systems from the dignity of the human beings working within them"
      ]
    }
  },
  "dark-triad": {
    humble_empath: {
      strengths: [
        "Pure interpersonal integrity, deep empathetic benevolence, and freedom from ego games",
        "Creates profound psychological safety, inspiring transparent trust and lasting loyalty",
        "Never exploits the vulnerabilities of others for personal status or leverage"
      ],
      blindspots: [
        "Can be vulnerable to exploitation by ruthless political operators in competitive arenas",
        "May hesitate to assert legitimate self-interest or negotiate firmly for deserved rewards"
      ],
      communicationTips: [
        "Establish non-negotiable boundaries and enforce consequences when boundaries are crossed",
        "Recognize that asserting your rights and claiming credit is an act of fairness, not selfish pride"
      ]
    },
    grounded_realist: {
      strengths: [
        "Clean, straightforward transparency combined with practical common-sense awareness",
        "Navigates workplace dynamics without engaging in deceit or succumbing to naive idealism",
        "Communicates expectations with refreshing honesty and grounded decency"
      ],
      blindspots: [
        "May underestimate the subtlety and patience of covert political maneuvering around them",
        "Can be caught off guard when adversaries operate outside written or informal ethical codes"
      ],
      communicationTips: [
        "Keep written documentation of critical agreements when dealing with ambiguous stakeholders",
        "Balance candid openness with strategic discretion when proprietary stakes are high"
      ]
    },
    dominant_visionary: {
      strengths: [
        "High self-belief, commanding presence, and clear ambitious direction",
        "Wins respect through visible capability and courageous initiative rather than stealthy plotting",
        "Sets high standards that elevate collective achievement when channeled constructively"
      ],
      blindspots: [
        "Can mistake honest dissent or feedback for personal disloyalty or lack of vision",
        "May struggle to share the limelight or credit with behind-the-scenes contributors"
      ],
      communicationTips: [
        "Actively showcase and celebrate the specific contributions of your team in public settings",
        "Solicit contrary viewpoints specifically: 'Tell me where my confidence might be blinding me'"
      ]
    },
    honest_collaborator: {
      strengths: [
        "Builds enduring trust through predictable, equitable, and transparent interactions",
        "Refuses to withhold information or use asymmetric knowledge to disarm partners",
        "Fosters genuine reciprocity and high social capital in networks"
      ],
      blindspots: [
        "May struggle to adapt when negotiating in zero-sum, adversarial environments",
        "Can assume others operate on the same ethical plane, leading to disappointment"
      ],
      communicationTips: [
        "Test reciprocity in small increments before extending full vulnerability in new partnerships",
        "Learn the tactical vocabulary of negotiation to protect your team against aggressive counter-parties"
      ]
    },
    tempered_pragmatist: {
      strengths: [
        "Astute awareness of political and organizational realities balanced with personal ethical red lines",
        "Understands how power and leverage operate without becoming corrupted by cynicism",
        "Able to protect noble initiatives using realistic, sophisticated coalition diplomacy"
      ],
      blindspots: [
        "Can experience moral fatigue from constantly navigating between ethical ideals and practical compromise",
        "May appear overly guarded or calculated to colleagues who value raw spontaneous emotion"
      ],
      communicationTips: [
        "Clearly state your foundational values so partners know what you will never compromise on",
        "Practice transparent vulnerability in safe, high-trust peer relationships"
      ]
    },
    shrewd_operator: {
      strengths: [
        "Mastery of social dynamics, stakeholder incentives, and strategic timing",
        "Exceptional ability to read unstated agendas and maneuver complex bureaucracies",
        "Secures ambitious objectives through patience, leverage, and diplomatic finesse"
      ],
      blindspots: [
        "Can prioritize tactical positioning over genuine human connection, eroding long-term trust",
        "May default to Machiavellian framing even in simple situations where transparency would work better"
      ],
      communicationTips: [
        "Invest in unconditional goodwill where you ask for nothing in return",
        "Remember that long-term reputation is the ultimate strategic asset; never trade it for short-term wins"
      ]
    },
    detached_cynic: {
      strengths: [
        "Clear-eyed immunity to flattery, organizational propaganda, and naive hype",
        "Deep emotional self-containment and self-sufficiency under pressure",
        "Accurately diagnoses the selfish motivations driving institutional theater"
      ],
      blindspots: [
        "Can become paralyzed by pervasive mistrust, missing genuine opportunities for alliance",
        "May alienate earnest, warm collaborators through sarcastic detachment or cold aloofness"
      ],
      communicationTips: [
        "Give sincere efforts the benefit of the doubt until proven otherwise",
        "Allow yourself to be pleasantly surprised by human generosity without immediately seeking the catch"
      ]
    },
    opportunistic_tactician: {
      strengths: [
        "Lightning-fast situational awareness and agility in seizing sudden competitive openings",
        "Thinks several moves ahead, turning ambiguous chaos to decisive advantage",
        "Unsentimental focus on tangible leverage and bottom-line outcomes"
      ],
      blindspots: [
        "Can burn relational bridges through transactional, short-horizon calculations",
        "May be perceived as untrustworthy if loyalties shift too rapidly with prevailing winds"
      ],
      communicationTips: [
        "Prioritize long-term relational compounding over transient transactional gains",
        "Be explicit about mutual upside so counterparts feel like partners rather than chess pieces"
      ]
    },
    machiavellian_maverick: {
      strengths: [
        "Unflinching strategic resolve, formidable command under fire, and high ambition",
        "Willingness to execute painful, high-consequence decisions that others shy away from",
        "Immune to social guilt and emotional blackmail when pursuing sovereign objectives"
      ],
      blindspots: [
        "High risk of isolating oneself in a fortress of suspicion and transactional hostility",
        "Can provoke intense backlash from peers who unite against perceived ruthlessness"
      ],
      communicationTips: [
        "Recognize that genuine empathy and shared ownership are far more powerful than forced compliance",
        "Examine whether the goals you are sacrificing relationships for will bring lasting fulfillment"
      ]
    }
  },
  empathy: {
    compassionate_sage: {
      strengths: [
        "Profound ability to hold emotional space for others without losing personal boundaries",
        "Translates deep heartfelt compassion into grounded, wise, and non-reactive counsel",
        "Provides an oasis of psychological safety in times of acute collective distress"
      ],
      blindspots: [
        "Can become a magnet for emotional dumping from individuals who refuse to help themselves",
        "May neglect personal physical rest while nurturing everyone else's emotional health"
      ],
      communicationTips: [
        "Set gentle but firm time boundaries when counseling peers: 'I have 30 minutes to focus completely on you'",
        "Remind yourself that allowing others to experience their own consequences is an act of compassion"
      ]
    },
    attuned_counselor: {
      strengths: [
        "Intuitive grasp of unspoken feelings paired with disciplined cognitive perspective-taking",
        "Helps others untangle complicated emotional knots with patience and structured clarity",
        "Maintains emotional warmth without being swept away by the client's or partner's storm"
      ],
      blindspots: [
        "Can over-intellectualize visceral emotional outbursts when raw presence is what's needed",
        "May slip into 'therapist mode' in personal friendships, creating an uneven dynamic"
      ],
      communicationTips: [
        "Ask loved ones: 'Do you want comfort, problem-solving, or just someone to listen right now?'",
        "Allow yourself to be messy, imperfect, and in need of care in your personal relationships"
      ]
    },
    resonant_feeler: {
      strengths: [
        "Extraordinary emotional bandwidth, visceral resonance with the human condition, and boundless warmth",
        "Makes others feel truly seen, validated, and physically accompanied in their sorrow or joy",
        "Brings soulful authenticity and deep humanity into dry institutional spaces"
      ],
      blindspots: [
        "Vulnerable to rapid empathetic distress, somatic fatigue, and vicarious trauma",
        "May struggle to make tough, objective decisions that cause short-term discomfort to someone"
      ],
      communicationTips: [
        "Establish daily energetic cleansing routines to distinguish your feelings from absorbed emotions",
        "Anchor your empathy in cognitive perspective-taking so you don't drown in the other person's ocean"
      ]
    },
    objective_analyst: {
      strengths: [
        "Crystal-clear intellectual perspective-taking without emotional contagion or clouded bias",
        "Able to reconstruct how opponents think and anticipate moves with clinical precision",
        "Remains rational, composed, and constructive during explosive emotional crises"
      ],
      blindspots: [
        "Can appear cold, robotic, or dismissive to individuals who need immediate emotional validation",
        "May underestimate the decisive role that raw emotions play in driving human behavior"
      ],
      communicationTips: [
        "Acknowledge the validity of someone's feelings before diving into logical analysis and advice",
        "Use warm vocal tone and relaxed posture to soften the delivery of analytical insights"
      ]
    },
    integrated_empath: {
      strengths: [
        "Mastery of both affective resonance and cognitive perspective-taking",
        "Can feel what others feel while simultaneously mapping the systemic roots of the situation",
        "Natural bridge-builder who communicates across cultural, generational, and political divides"
      ],
      blindspots: [
        "Can be paralyzed by seeing every viewpoint so vividly that decisive choices feel painful",
        "May exhaust mental reserves trying to harmonize irreconcilable interpersonal tensions"
      ],
      communicationTips: [
        "Accept that not every conflict can be peacefully harmonized; some boundaries must be enforced",
        "Take regular periods of solitude to re-center on your own standalone voice"
      ]
    },
    intuitive_connector: {
      strengths: [
        "Effortless ability to sense room dynamics, social subtext, and unspoken interpersonal currents",
        "Creates instant rapport and warmth across diverse personality types",
        "Bridges disparate social circles through generous emotional translation"
      ],
      blindspots: [
        "May rely too heavily on intuitive impressions without verifying facts through direct inquiry",
        "Can alter their persona too fluidly to mirror others, losing track of core personal desires"
      ],
      communicationTips: [
        "Check intuitive hunches with explicit questions: 'I sensed some hesitation earlier—am I reading that right?'",
        "Maintain a core set of personal tastes and opinions that do not bend to mirror the room"
      ]
    },
    stoic_observer: {
      strengths: [
        "Unshakeable emotional autonomy, high focus on personal duty, and clear self-containment",
        "Immune to manipulative guilt trips and manufactured emotional hysteria",
        "Handles emergencies with calm competence when everyone else is panicking"
      ],
      blindspots: [
        "Can be perceived as uncaring, indifferent, or walled-off by emotionally expressive partners",
        "May fail to realize when a team member is silently drowning and needs proactive outreach"
      ],
      communicationTips: [
        "Offer practical assistance as your natural form of care: 'Tell me one concrete thing I can take off your plate'",
        "Explicitly tell loved ones that your calm exterior does not mean you lack devotion"
      ]
    },
    pragmatic_supporter: {
      strengths: [
        "Converts cognitive understanding of distress into rapid, practical, and effective assistance",
        "Does not waste time wallowing in sorrow; focuses immediately on what can be fixed",
        "Reliable crisis manager who brings groceries, pays bills, and fixes logistics when tragedy strikes"
      ],
      blindspots: [
        "May rush to 'fix' a problem when the grieving or upset person simply needs silent companionship",
        "Can become frustrated by people who dwell in emotional expression rather than taking action"
      ],
      communicationTips: [
        "Practice sitting in supportive silence for five minutes before suggesting solutions",
        "Validate feelings explicitly: 'That sounds completely exhausting and unfair'"
      ]
    },
    unfiltered_sponge: {
      strengths: [
        "Pure, raw receptivity to the emotional pulse of environments and human beings",
        "Intense aesthetic and sensory appreciation for art, music, and interpersonal beauty",
        "Zero artificial pretense; what they feel is completely transparent and immediate"
      ],
      blindspots: [
        "Prone to sensory overload, emotional volatility, and sudden crashes in noisy or toxic settings",
        "Struggles to discern where another person's mood ends and their own identity begins"
      ],
      communicationTips: [
        "Learn somatic grounding techniques (breathwork, cold water, nature immersion) to reset your nervous system",
        "Be fiercely selective about the media, environments, and people you allow into your daily orbit"
      ]
    }
  },
  "emotional-intelligence": {
    stoic_anchor: {
      strengths: [
        "High impulse control, disciplined emotional regulation, and serene composure under pressure",
        "Provides an unshakeable foundation during institutional panic or volatile disputes",
        "Responds to insults and provocations with measured dignity rather than reactive anger"
      ],
      blindspots: [
        "May suppress internal emotional signals so thoroughly that underlying stress manifests somatically",
        "Can struggle to articulate nuanced feelings, leading partners to perceive emotional unavailability"
      ],
      communicationTips: [
        "Dedicate time to privately naming subtle feelings before they calcify into bodily tension",
        "Share your inner thoughts verbally with loved ones so they feel connected to your calm world"
      ]
    },
    grounded_harmonizer: {
      strengths: [
        "Balances emotional self-control with genuine sensitivity to interpersonal harmony",
        "Addresses tensions gently before they escalate into destructive confrontations",
        "Maintains pleasant, constructive working relationships even with difficult personalities"
      ],
      blindspots: [
        "May soften legitimate criticisms so much that important performance issues go uncorrected",
        "Can internalize distress to preserve peace, risking delayed resentment"
      ],
      communicationTips: [
        "Remember that clear, constructive confrontation is an act of respect for the relationship",
        "Express your preferences with firm directness rather than always waiting for others to ask"
      ]
    },
    mindful_master: {
      strengths: [
        "Exceptional granular emotional awareness paired with conscious, intentional self-regulation",
        "Can identify exact affective triggers in real time and choose the optimal behavioral response",
        "Models emotional maturity, self-reflection, and psychological flexibility"
      ],
      blindspots: [
        "Can become overly clinical in analyzing ordinary emotional reactions, reducing romance to psychology",
        "May set unrealistically high standards of emotional self-mastery for colleagues and friends"
      ],
      communicationTips: [
        "Allow space for raw, messy, unanalyzed human moments without trying to coach or diagnose",
        "Meet others at their current level of emotional literacy with warmth and humility"
      ]
    },
    quiet_observer: {
      strengths: [
        "Thoughtful internal processing, modest self-reflection, and resistance to theatrical drama",
        "Takes time to understand their own feelings before offering premature reactions",
        "Observes social environments with quiet insight and respectful discretion"
      ],
      blindspots: [
        "Can take so long to process emotions that opportunities for timely feedback or connection are lost",
        "May keep valuable self-insights private, leaving colleagues in the dark about their standpoint"
      ],
      communicationTips: [
        "Say: 'I need an hour to process my thoughts on this, and then I want to discuss it with you'",
        "Practice speaking up earlier in meetings before your insights feel overly rehearsed"
      ]
    },
    adaptive_synthesizer: {
      strengths: [
        "Fluid emotional calibration that adapts seamlessly to diverse social contexts and cultures",
        "Blends analytical awareness with appropriate situational expression",
        "Navigates ambiguous interpersonal terrain with diplomatic agility and high tact"
      ],
      blindspots: [
        "May become so skilled at contextual adaptation that they feel disconnected from their core baseline",
        "Can be perceived as calculating by people who equate emotional maturity with blunt unfiltered disclosure"
      ],
      communicationTips: [
        "Identify core personal values that remain invariant across every room and role",
        "Allow trusted friends to see your unvarnished, imperfect reactions"
      ]
    },
    dynamic_coach: {
      strengths: [
        "Rich emotional vocabulary, infectious energy, and natural motivational leadership",
        "Helps others recognize, name, and channel their passions toward constructive personal growth",
        "Creates inspiring team cultures where vulnerability is embraced as a catalyst for excellence"
      ],
      blindspots: [
        "Can inadvertently overwhelm individuals who prefer quiet contemplation over dynamic debriefs",
        "May push people to transform their emotions faster than their natural processing speed allows"
      ],
      communicationTips: [
        "Tailor your coaching energy to the receiver's temperament, meeting quiet introspectives with stillness",
        "Listen without immediately seeking a transformative takeaway or action step"
      ]
    },
    raw_expressive: {
      strengths: [
        "Unfiltered honesty, vibrant vitality, and immediate emotional transparency",
        "People always know exactly where they stand with you; zero hidden agendas or political deception",
        "Brings infectious passion, humor, and genuine humanity to every interaction"
      ],
      blindspots: [
        "Prone to knee-jerk emotional reactions that can damage relationships before logic catches up",
        "May mistake lack of self-regulation for 'authenticity', justifying hurtful outbursts"
      ],
      communicationTips: [
        "Practice the 10-second breath pause before responding when your pulse spikes in a debate",
        "Recognize that thoughtful containment can be an expression of love and respect for others"
      ]
    },
    reactive_sensor: {
      strengths: [
        "High sensitivity to emotional shifts, environmental tensions, and relational vibes",
        "Passionate commitment to causes and relationships that stir their inner compass",
        "Quick to sound the alarm when something feels fundamentally wrong or unfair"
      ],
      blindspots: [
        "Vulnerable to emotional exhaustion from frequent internal weather storms",
        "May project temporary emotional surges onto external reality, mistaking mood for fact"
      ],
      communicationTips: [
        "Ask yourself: 'Is this an objective emergency, or is my nervous system simply overstimulated right now?'",
        "Separate immediate feelings from the actions you choose to take based on them"
      ]
    },
    charismatic_spark: {
      strengths: [
        "High expressive power, magnetic storytelling, and vivid affective communication",
        "Commands attention effortlessly and rallies collective excitement behind bold visions",
        "Transforms dry concepts into emotionally resonant, unforgettable experiences"
      ],
      blindspots: [
        "Can become dependent on external audience applause and emotional mirroring for self-worth",
        "May minimize or gloss over difficult, unglamorous emotional realities to keep the energy high"
      ],
      communicationTips: [
        "Cultivate comfort with quiet, unglamorous stillness where no audience is present",
        "Check in with team members on a quiet one-on-one basis to hear candid, unpolished concerns"
      ]
    }
  },
  "self-esteem": {
    serene_anchor: {
      strengths: [
        "Unshakeable sense of unconditional inherent self-worth independent of external achievements",
        "Free from the exhausting hamster wheel of proving oneself to critics or superiors",
        "Radiates calm self-acceptance that makes others feel instantly safe and unjudged"
      ],
      blindspots: [
        "May lack the competitive fire or urgency required in high-intensity commercial races",
        "Can sometimes be perceived as too content or lacking aggressive personal ambition"
      ],
      communicationTips: [
        "Channel your inner peace into courageous service and ambitious creative exploration",
        "Clearly explain the difference between healthy self-acceptance and passive resignation"
      ]
    },
    grounded_realist: {
      strengths: [
        "Clear-eyed, humble assessment of personal capabilities without self-delusion or self-loathing",
        "Handles failure as practical data to learn from rather than an existential indictment of worth",
        "Maintains consistent self-respect through life's inevitable peaks and valleys"
      ],
      blindspots: [
        "May set self-limiting ceilings on ambitious goals out of an overly cautious appraisal",
        "Can overlook latent, untried talents that need bold self-belief to awaken"
      ],
      communicationTips: [
        "Allow yourself to attempt high-upside challenges where the probability of initial failure is high",
        "Celebrate small milestones with genuine pride rather than just checking them off"
      ]
    },
    radiant_sovereign: {
      strengths: [
        "Harmonious integration of high competence, active self-efficacy, and indestructible inner worth",
        "Inspires others through courageous leadership, high agency, and generous mentorship",
        "Pursues mastery with joy rather than out of a desperate need to soothe insecurity"
      ],
      blindspots: [
        "Can inadvertently make others feel intimidated by your effortless poise and capability",
        "May struggle to relate to individuals who are paralyzed by deep chronic self-doubt"
      ],
      communicationTips: [
        "Share your past struggles, failures, and moments of self-doubt openly to make your path relatable",
        "Use your strong agency to empower and build up the confidence of quieter peers"
      ]
    },
    quiet_evaluator: {
      strengths: [
        "Disciplined pursuit of personal growth and thoughtful self-examination",
        "Resistant to superficial flattery; measures self-worth by private integrity and craft improvement",
        "Dependable, modest contributor who lets results speak louder than self-promotional words"
      ],
      blindspots: [
        "Can fall into subtle, persistent self-critique that dims joy and spontaneous celebration",
        "May hesitate to step into public recognition even when their work clearly deserves it"
      ],
      communicationTips: [
        "Treat yourself with the same gentle grace and forgiveness that you offer to dear friends",
        "Practice accepting compliments with a gracious 'Thank you' rather than deflecting them"
      ]
    },
    resilient_striver: {
      strengths: [
        "Maintains a balanced, pragmatic self-appraisal while constantly working to expand capabilities",
        "Recovers quickly from setbacks by focusing on practical, iterative adjustments",
        "Reliable colleague who balances personal accountability with healthy self-advocacy"
      ],
      blindspots: [
        "Can tie mood somewhat too closely to recent performance trends and weekly productivity metrics",
        "May push through fatigue without realizing that self-care is a prerequisite for sustained effort"
      ],
      communicationTips: [
        "Schedule regular days where worth is not measured by output, tasks, or metrics",
        "Cultivate hobbies where you are intentionally amateurish just for the fun of it"
      ]
    },
    driven_achiever: {
      strengths: [
        "Formidable work ethic, high standards of craft, and continuous drive for excellence",
        "Converts self-efficacy into extraordinary tangible results and high performance",
        "Thrives when tackling formidable challenges that demand high competence and grit"
      ],
      blindspots: [
        "Vulnerable to devastating crashes in self-worth if a major project or venture fails",
        "Can become addicted to external praise, credentials, and achievements to validate inner value"
      ],
      communicationTips: [
        "Decouple your identity as a human being from your professional role or scoreboard",
        "Ask yourself: 'Who am I when I am not producing, achieving, or winning?'"
      ]
    },
    vulnerable_critic: {
      strengths: [
        "Deep humility, high empathy for the struggles of others, and freedom from arrogance",
        "Keen sensitivity to personal flaws that motivates continuous searching and learning",
        "Deeply appreciative and loyal toward people who treat them with patience and respect"
      ],
      blindspots: [
        "Paralyzed by an unrelenting internal critic that magnifies minor missteps into fatal flaws",
        "May decline promising opportunities due to acute imposter syndrome and fear of exposure"
      ],
      communicationTips: [
        "Externalize your inner critic: when self-attacks arise, ask if you would ever say that to a child",
        "Keep a concrete 'evidence file' of past wins, kind notes, and proven capabilities"
      ]
    },
    strained_performer: {
      strengths: [
        "Capable of tremendous bursts of effort and dedication to meet external expectations",
        "Attentive to detail and highly motivated to deliver quality work for mentors and leaders",
        "Deep desire to be of value and contribute meaningfully to shared missions"
      ],
      blindspots: [
        "Self-worth is entirely contingent on the latest feedback, making emotional life a rollercoaster",
        "Prone to severe burnout from overcommitting in an endless bid to secure approval"
      ],
      communicationTips: [
        "Practice saying 'No' to non-essential requests as a radical act of self-preservation",
        "Anchor your worth in your character, values, and existence, not in being endlessly useful"
      ]
    },
    defensive_perfectionist: {
      strengths: [
        "Uncompromising standards of quality, formidable technical rigor, and flawless execution",
        "Leaves nothing to chance, anticipating criticisms before opponents can voice them",
        "Achieves elite levels of craft in high-stakes environments where errors cannot be tolerated"
      ],
      blindspots: [
        "Uses perfectionism as an armor against deep-seated terror of inadequacy and rejection",
        "Can alienate collaborators by demanding impossible perfection and reacting defensively to edits"
      ],
      communicationTips: [
        "Recognize that vulnerability and admitting mistakes builds far more genuine trust than forced perfection",
        "Intentionally share 80%-finished drafts to practice receiving early collaborative input"
      ]
    }
  }
};
