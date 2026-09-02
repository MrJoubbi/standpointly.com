export interface ArchetypeInsight {
  strengths: string[];
  blindspots: string[];
  communicationTips: string[];
}

export const ARCHETYPE_INSIGHTS: Record<string, Record<string, ArchetypeInsight>> = {
  political: {
    collectivist: {
      strengths: [
        "Unwavering commitment to universal public goods and reducing societal inequality",
        "Strong systemic thinking regarding how economic structures impact vulnerable populations",
        "Willingness to support bold public institutions that outlast individual profit cycles"
      ],
      blindspots: [
        "May underestimate the inefficiencies and bureaucratic inertia of centralized state planning",
        "Can dismiss legitimate market incentives and individual innovation as mere greed"
      ],
      communicationTips: [
        "When talking to market advocates, emphasize tangible delivery metrics and accountability rather than moral superiority",
        "Acknowledge the role of decentralized initiative alongside collective safety nets"
      ]
    },
    guardian: {
      strengths: [
        "Exceptional focus on institutional continuity, public safety, and reliable governance",
        "Pragmatic approach to economic problem-solving focused on outcomes rather than ideology",
        "Deep respect for civic responsibility and predictable rule of law"
      ],
      blindspots: [
        "May prioritize stability so heavily that necessary social reforms are delayed or suppressed",
        "Can view civil dissent or nonconformity as dangerous disorder rather than civic vitality"
      ],
      communicationTips: [
        "Frame new reforms as preserving long-term stability rather than radical disruption",
        "Listen actively to civil liberties concerns regarding executive state powers"
      ]
    },
    traditionalist: {
      strengths: [
        "Deep appreciation for cultural heritage, proven social wisdom, and local community bonds",
        "Strong belief in enterprise, personal responsibility, and intergenerational stewardship",
        "Skepticism toward untested top-down social experiments"
      ],
      blindspots: [
        "Can struggle to separate timeless core principles from historical inequities",
        "May overlook how rapid market deregulation can unintentionally erode traditional community bonds"
      ],
      communicationTips: [
        "Focus on shared underlying virtues and organic community flourishing when discussing social changes",
        "Demonstrate how supporting younger generations aligns with long-term cultural continuity"
      ]
    },
    egalitarian: {
      strengths: [
        "Strong moral defense of personal liberty combined with fair economic opportunity for all",
        "Champion of individual rights, free expression, and equitable social floors",
        "Keen awareness of how wealth imbalances can distort democratic representation"
      ],
      blindspots: [
        "Can underestimate the compliance and regulatory costs imposed on small entrepreneurs",
        "May assume good intentions in public policy automatically produce desired economic outcomes"
      ],
      communicationTips: [
        "Use concrete empirical examples of successful mixed economies when discussing redistribution",
        "Engage with fiscal feasibility questions without treating economic skepticism as ill will"
      ]
    },
    moderate: {
      strengths: [
        "High intellectual humility, flexibility, and resistance to tribal polarization",
        "Focus on evidence-based, case-by-case policy evaluations",
        "Natural bridge-builder capable of finding actionable consensus among opposing factions"
      ],
      blindspots: [
        "May default to compromise even when urgent systemic problems require decisive transformation",
        "Can be perceived as indecisive or lacking a clear overarching philosophy"
      ],
      communicationTips: [
        "Clearly articulate your positive principles rather than just framing positions as 'in-between'",
        "Explain the specific trade-offs and data that guided your middle-ground conclusions"
      ]
    },
    marketeer: {
      strengths: [
        "Clear understanding of price signals, competitive innovation, and capital efficiency",
        "Respect for consumer choice, voluntary exchange, and social permissiveness",
        "Healthy skepticism of regulatory capture and bureaucratic overreach"
      ],
      blindspots: [
        "May underestimate positive externalities (like public health) and negative externalities (like pollution)",
        "Can mistake initial market distributions as purely meritocratic outcomes"
      ],
      communicationTips: [
        "Acknowledge where market failures naturally occur and propose targeted market-based solutions",
        "Pair arguments for deregulation with robust plans for ensuring genuine competition"
      ]
    },
    communalist: {
      strengths: [
        "Visionary focus on grassroots democracy, worker co-ops, and mutual self-help",
        "Consistent defense of personal autonomy against both corporate and state domination",
        "High empathy for marginalized communities and human-scaled living"
      ],
      blindspots: [
        "Can struggle with complex governance models required for continental or global scale",
        "May underestimate the coordination speed and risk-taking enabled by formal organizational hierarchies"
      ],
      communicationTips: [
        "Share concrete working prototypes of co-ops and local mutual aid to prove feasibility",
        "Focus on decentralization and subsidiarity as shared values with anti-authoritarian peers"
      ]
    },
    individualist: {
      strengths: [
        "Fierce, principled defense of individual autonomy, privacy, and freedom of expression",
        "Practical and open-minded on economic models as long as they maximize personal liberty",
        "Immune to social conformity pressure and collective dogma"
      ],
      blindspots: [
        "May underappreciate the shared civic infrastructure that makes individual freedom possible",
        "Can overlook how collective challenges (like climate change) require coordinated action"
      ],
      communicationTips: [
        "Explain how individual freedom creates positive spillover benefits for the entire community",
        "Show how personal liberty and civic cooperation can reinforce rather than oppose each other"
      ]
    },
    libertarian: {
      strengths: [
        "Rigorous consistency regarding voluntary contracts, property rights, and personal liberty",
        "Deep vigilance against government overreach, surveillance, and crony capitalism",
        "Strong faith in human ingenuity and spontaneous social order"
      ],
      blindspots: [
        "May underestimate how private monopolies and inherited wealth asymmetries can restrict real freedom",
        "Can be overly theoretical about how emergency public crises should be resolved"
      ],
      communicationTips: [
        "Focus on practical deregulation of monopolies and occupational licensing that benefits ordinary workers",
        "Address concerns about safety nets by outlining strong voluntary mutual aid alternatives"
      ]
    }
  },
  attachment: {
    preoccupied: {
      strengths: [
        "Deep capacity for emotional warmth, romantic dedication, and empathetic attentiveness",
        "Willingness to invest high energy and care into keeping relationships close and vibrant",
        "Very quick to notice and express heartfelt affection"
      ],
      blindspots: [
        "Tendency to mistake ordinary partner silence or busyness as imminent rejection",
        "May sacrifice personal boundaries or hobbies in pursuit of constant reassurance"
      ],
      communicationTips: [
        "Practice self-soothing before sending urgent messages when feeling triggered by delayed replies",
        "Express needs using calm 'I feel' statements rather than seeking indirect tests of affection"
      ]
    },
    vigilant: {
      strengths: [
        "High emotional intelligence and sensitivity to relational atmosphere and harmony",
        "Proactive willingness to address tension and heal misunderstandings before they fester",
        "Genuine commitment to long-term relational security and openness"
      ],
      blindspots: [
        "Can over-analyze micro-expressions, shifts in texting tone, or temporary mood changes",
        "May rush to resolve conflicts before the other partner has had time to process emotions"
      ],
      communicationTips: [
        "Give partners a defined window of space to recharge before initiating deep relationship debriefs",
        "Check your assumptions by asking open questions rather than predicting worst-case scenarios"
      ]
    },
    fearful: {
      strengths: [
        "Profound capacity for empathy and emotional depth when feeling genuinely safe",
        "High self-awareness regarding vulnerability and emotional stakes",
        "Deep appreciation and loyalty for patient, trustworthy companions"
      ],
      blindspots: [
        "May send contradictory signals by pulling away abruptly just when intimacy becomes deep",
        "Can anticipate inevitable heartbreak, creating self-fulfilling distance"
      ],
      communicationTips: [
        "Name your need for a pause explicitly ('I love being close to you, but I feel slightly overwhelmed and need an hour to recharge')",
        "Celebrate small moments of mutual trust and vulnerability step by step"
      ]
    },
    open: {
      strengths: [
        "Naturally generous with vulnerability, affection, and mutual emotional support",
        "Comfortable expressing desires clearly without fear of appearing 'too much'",
        "Creates a welcoming, non-judgmental space where partners feel safe opening up"
      ],
      blindspots: [
        "May assume everyone wants rapid emotional disclosure, unintentionally overwhelming guarded partners",
        "Can occasionally overlook subtle boundaries of more private individuals"
      ],
      communicationTips: [
        "Match the pacing of more reserved partners while remaining warm and consistent",
        "Remember that emotional restraint in others does not equal a lack of affection"
      ]
    },
    balanced: {
      strengths: [
        "High relational agility and balanced comfort with both intimacy and personal independence",
        "Resilient baseline during disagreements; views conflict as workable rather than catastrophic",
        "Provides steady, calming support without becoming codependent"
      ],
      blindspots: [
        "May occasionally underestimate how intense fears of abandonment or engulfment feel to insecure partners",
        "Can appear overly measured during moments requiring passionate reassurance"
      ],
      communicationTips: [
        "Explicitly validate the emotional experiences of more anxious or avoidant loved ones",
        "Model healthy vulnerability and open dialogue during moments of friction"
      ]
    },
    guarded: {
      strengths: [
        "Steady emotional equilibrium, high reliability, and calm composure during crises",
        "Clear personal boundaries and healthy self-sufficiency",
        "Demonstrates commitment through consistent actions, loyalty, and practical support"
      ],
      blindspots: [
        "May hold back feelings or appear emotionally aloof when a partner needs verbal warmth",
        "Can dismiss partner emotional bids as 'unnecessary drama'"
      ],
      communicationTips: [
        "Offer verbal affirmations of care even when it feels obvious to you from your actions",
        "Signal your ongoing commitment explicitly when asking for personal solitude"
      ]
    },
    secure: {
      strengths: [
        "Deep foundation of relational trust, self-worth, and emotional comfort",
        "Collaborative problem-solving approach to relationship tension",
        "Empowers partners to pursue independent growth while maintaining a loving anchor"
      ],
      blindspots: [
        "May assume direct communication is easy for everyone and miss subtle unspoken needs",
        "Can stay in mismatched relationships longer due to high optimism about resolution"
      ],
      communicationTips: [
        "Create structured, gentle check-ins that encourage less confident partners to share thoughts",
        "Acknowledge and respect that others may need more explicit reassurance or time"
      ]
    },
    autonomous: {
      strengths: [
        "Exceptional independence, self-motivation, and ease with solitude",
        "Composed, non-reactive presence that provides stability in chaotic situations",
        "Respects a partner's autonomy and never imposes suffocating control"
      ],
      blindspots: [
        "Can leave loved ones feeling unneeded, shut out, or kept at an emotional distance",
        "May instinctively retreat under stress instead of leaning on shared support"
      ],
      communicationTips: [
        "Invite partners into your world by sharing small daily thoughts and internal reflections",
        "Let others support you during tough moments — mutual reliance deepens emotional connection"
      ]
    },
    dismissing: {
      strengths: [
        "Fierce self-reliance, emotional endurance, and clear boundary-setting",
        "High focus on practical achievement and resilience under external pressure",
        "Never burdens others with unnecessary emotional volatility"
      ],
      blindspots: [
        "Suppresses genuine emotional needs, which can lead to sudden burnout or emotional disconnection",
        "Can trigger intense panic in anxious partners by shutting down or stonewalling"
      ],
      communicationTips: [
        "Replace sudden withdrawal with clear communication ('I need 30 minutes alone to think, then let us talk')",
        "Recognize that vulnerability with trusted people is a sign of courage, not weakness"
      ]
    }
  },
  leadership: {
    architect: {
      strengths: [
        "Mastery of complex organizational frameworks, scalable systems, and strategic vision",
        "Combines long-term foresight with structured operational excellence",
        "Builds robust engines designed to outlast individual tenure"
      ],
      blindspots: [
        "Can become overly rigid or attached to blueprints when fast pivots are required",
        "May spend too much time perfecting architectures before testing them in the field"
      ],
      communicationTips: [
        "Translate abstract architectural concepts into tangible, incremental milestones for your team",
        "Welcome rapid iterative feedback and embrace pragmatic shortcuts when time-to-market is critical"
      ]
    },
    commander: {
      strengths: [
        "Decisive authority, rapid alignment, and calm command under high-pressure uncertainty",
        "Sets unambiguous expectations, accountability standards, and execution speed",
        "Cuts through endless deliberation to drive immediate momentum"
      ],
      blindspots: [
        "Can inadvertently stifle grassroots initiative and creative dissent",
        "May create bottleneck dependencies where teams wait for top-down approval"
      ],
      communicationTips: [
        "Ask 'What are we missing?' before announcing final decisions to invite candid frontline input",
        "Delegate decision-making autonomy for low-risk operational areas to cultivate future leaders"
      ]
    },
    strategist: {
      strengths: [
        "Exceptional market pattern recognition, resource optimization, and competitive positioning",
        "Balances disciplined execution with calculated strategic risks",
        "Prioritizes high-leverage initiatives that yield compounding impact"
      ],
      blindspots: [
        "May overlook team morale and emotional burnout while optimizing analytical metrics",
        "Can become frustrated with teams that need emotional storytelling alongside logical business cases"
      ],
      communicationTips: [
        "Pair strategic roadmaps with compelling narratives that inspire emotional buy-in",
        "Celebrate small human milestones alongside high-level KPI achievements"
      ]
    },
    catalyst: {
      strengths: [
        "Infectious vision, transformative energy, and ability to rally diverse people around bold futures",
        "Challenges legacy assumptions and sparks breakthrough innovation",
        "Empowers team members to think bigger and exceed their own expectations"
      ],
      blindspots: [
        "May launch too many visionary initiatives without completing the operational follow-through",
        "Can exhaust teams with frequent pivots and shifting strategic priorities"
      ],
      communicationTips: [
        "Partner with strong operational leads who can anchor your big ideas into disciplined execution",
        "Clearly distinguish between creative brainstorms and firm strategic directives"
      ]
    },
    integrator: {
      strengths: [
        "Exceptional cross-functional alignment, emotional intelligence, and coalition building",
        "Harmonizes competing agendas and creates psychological safety across teams",
        "Maintains a balanced equilibrium between visionary ambition and practical execution"
      ],
      blindspots: [
        "May over-index on consensus, slowing down difficult decisions when swift action is required",
        "Can avoid necessary constructive confrontation to preserve team harmony"
      ],
      communicationTips: [
        "Set clear deadlines for deliberation: 'We will gather perspectives until Friday, then make the call'",
        "Frame tough feedback and unpopular decisions as acts of care for the organization's mission"
      ]
    },
    operator: {
      strengths: [
        "Flawless execution, process precision, quality control, and dependable delivery",
        "Builds predictable, low-waste workflows that scale smoothly",
        "Earns deep trust through operational consistency and follow-through"
      ],
      blindspots: [
        "May resist disruptive innovations that threaten established operational routines",
        "Can optimize existing processes at the expense of exploring entirely new opportunities"
      ],
      communicationTips: [
        "Dedicate intentional time each quarter to explore experimental, non-standard projects",
        "Communicate the 'why' behind operational processes so teams understand the bigger mission"
      ]
    },
    pioneer: {
      strengths: [
        "Fearless experimentation, breakthrough thinking, and comfort in uncharted territory",
        "Champions decentralized autonomy, rapid prototyping, and high agency",
        "Thrives on solving novel, ambiguous problems that have no playbook"
      ],
      blindspots: [
        "Can become bored once a concept moves from exploration to repeatable maintenance",
        "May ignore useful standard governance practices in pursuit of creative freedom"
      ],
      communicationTips: [
        "Establish clean handoff mechanisms so exploratory successes can be scaled by operations specialists",
        "Document discoveries so the broader organization can learn from your experiments"
      ]
    },
    empowerer: {
      strengths: [
        "Servant leadership ethos, exceptional talent mentorship, and deep trust in people",
        "Removes organizational roadblocks and creates environments where individuals do their best work",
        "Cultivates resilient, self-managing teams with high loyalty and retention"
      ],
      blindspots: [
        "May hesitate to replace underperforming team members out of empathy",
        "Can occasionally lack a sharp, directive presence when firm top-down guidance is needed"
      ],
      communicationTips: [
        "Remember that holding people to high performance standards is part of true empowerment",
        "Step forward decisively during organizational crises to provide clear directional anchors"
      ]
    },
    specialist: {
      strengths: [
        "Deep domain expertise, intellectual rigor, and uncompromising standards of craft",
        "Leads through technical excellence and grounded problem-solving",
        "Guards against superficial hype by insisting on verifiable substance"
      ],
      blindspots: [
        "May struggle to delegate nuanced work, creating personal bottlenecks",
        "Can prioritize technical perfection over practical business timeliness"
      ],
      communicationTips: [
        "Focus on 'good enough for this phase' criteria when managing deadlines",
        "Invest time in coaching team members to duplicate your craft standards rather than doing it yourself"
      ]
    }
  }
};

export function getArchetypeInsights(testId: string, cellId: string): ArchetypeInsight | null {
  return ARCHETYPE_INSIGHTS[testId]?.[cellId] || null;
}
