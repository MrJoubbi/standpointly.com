import { ArchetypeInsight } from "./types";

export const CAREER_INSIGHTS: Record<string, Record<string, ArchetypeInsight>> = {
  "career-personality": {
    institutional_craftsman: {
      strengths: [
        "Exceptional technical mastery, dedication to quality, and pride in domain excellence",
        "Thrives within stable organizational environments, providing dependable, expert execution",
        "Loyal custodian of institutional knowledge and technical standards"
      ],
      blindspots: [
        "May resist taking on management responsibilities, preferring to stay close to technical tools",
        "Can become vulnerable if the host institution restructures or pivots technological stacks"
      ],
      communicationTips: [
        "Translate technical considerations into high-level business impact when speaking to leadership",
        "Continuously update your core technical toolset to remain resilient against industry changes"
      ]
    },
    corporate_director: {
      strengths: [
        "Mastery of institutional politics, stakeholder alignment, and organizational leadership",
        "Excels at directing large cross-functional teams and steering complex projects to completion",
        "Bridges executive strategic vision with ground-level operational reality"
      ],
      blindspots: [
        "Can spend excessive time managing upward and navigating bureaucracy at the expense of frontline truth",
        "May prioritize organizational consensus over necessary, uncomfortable disruptions"
      ],
      communicationTips: [
        "Maintain direct, unvarnished communication channels with frontline workers and junior engineers",
        "Champion bold, merit-based decisions even when they ruffle political feathers"
      ]
    },
    executive_titan: {
      strengths: [
        "Formidable strategic command, massive organizational scale, and bold market positioning",
        "Inspires entire enterprises with ambitious north stars and high execution standards",
        "Thrives in high-stakes environments where decisions carry multi-million dollar consequences"
      ],
      blindspots: [
        "Can become isolated in an executive bubble, receiving only filtered, sanitized reports",
        "Risk of treating human talent purely as abstract FTE numbers on an operational balance sheet"
      ],
      communicationTips: [
        "Practice 'management by walking around' to stay grounded in the human reality of your workforce",
        "Invite candid, dissent-friendly feedback from trusted advisors before finalizing strategic pivots"
      ]
    },
    steady_specialist: {
      strengths: [
        "Rock-solid dependability, thorough competence, and supportive team camaraderie",
        "Delivers high-quality work consistently without drama, political maneuvering, or ego battles",
        "Values long-term tenure, healthy work-life balance, and trusted workplace friendships"
      ],
      blindspots: [
        "May hesitate to volunteer for high-visibility leadership roles due to modest comfort with current duties",
        "Can be caught off-guard during aggressive organizational reorganizations"
      ],
      communicationTips: [
        "Document and advocate for your accomplishments during annual reviews with quiet confidence",
        "Take on targeted stretch assignments that expand your professional visibility"
      ]
    },
    balanced_professional: {
      strengths: [
        "Versatile competence balancing domain knowledge, project coordination, and interpersonal tact",
        "Adapts easily between hands-on execution and team leadership as business needs require",
        "Maintains healthy professional boundaries that support sustainable, long-term career growth"
      ],
      blindspots: [
        "May lack a single, razor-sharp defining specialty, making positioning for niche roles ambiguous",
        "Can plateau in middle management without a decisive push toward either executive leadership or deep craft"
      ],
      communicationTips: [
        "Define your unique value proposition: the specific intersection where your skills produce compounding results",
        "Actively seek executive sponsorship to propel your transition into senior leadership tiers"
      ]
    },
    autonomous_lead: {
      strengths: [
        "High agency, entrepreneurial initiative, and capacity to run self-directed units with minimal supervision",
        "Combines hands-on problem-solving with strategic vision and team empowerment",
        "Acts as an agile intrapreneur, launching new ventures or capabilities within broader organizations"
      ],
      blindspots: [
        "Can become frustrated with standard corporate red tape, compliance checks, and slow approvals",
        "May build internal fiefdoms that drift away from the central enterprise strategy"
      ],
      communicationTips: [
        "Keep executive leadership closely informed of your unit's ROI to maintain political air cover",
        "Demonstrate how your autonomous innovations can be packaged and scaled for the wider organization"
      ]
    },
    freelance_artisan: {
      strengths: [
        "Pure sovereignty, bespoke craftsmanship, and freedom to choose meaningful client engagements",
        "Takes total personal responsibility for the quality and delivery of every project",
        "Values creative autonomy and intellectual freedom above corporate titles and prestige"
      ],
      blindspots: [
        "Vulnerable to income volatility, feast-or-famine cycles, and business development fatigue",
        "Must wear every single hat (accounting, marketing, sales, client management) alongside craft"
      ],
      communicationTips: [
        "Build a multi-month financial runway to avoid taking on desperate, underpaid client work",
        "Position yourself as a specialized expert rather than a generalist to command premium rates"
      ]
    },
    independent_consultant: {
      strengths: [
        "High-level strategic expertise, objective analytical distance, and intellectual authority",
        "Solves high-value problems for diverse clients without getting trapped in internal politics",
        "Commands premium market rates and enjoys flexible control over professional workload"
      ],
      blindspots: [
        "Lacks ownership over final implementation; ideas can be shelved by uncommitted clients",
        "Can experience loneliness and lack of belonging from not having a permanent home team"
      ],
      communicationTips: [
        "Structure engagements to include implementation oversight and accountability checkpoints",
        "Cultivate a tight peer mastermind group of fellow independent practitioners for mutual support"
      ]
    },
    venture_innovator: {
      strengths: [
        "Fearless entrepreneurial courage, high tolerance for risk, and visionary problem-solving",
        "Thrives on building disruptive companies from scratch and creating new economic value",
        "Inspires investors, co-founders, and early hires with transformative conviction"
      ],
      blindspots: [
        "Risk of severe burnout, financial instability, and immense personal stress during startup winters",
        "Can become so enamored with visionary ideas that operational discipline and unit economics are neglected"
      ],
      communicationTips: [
        "Surround yourself with disciplined operational co-founders who keep financial books grounded",
        "Validate market demand with paying customers before investing months building complex products"
      ]
    }
  },
  "work-style": {
    monastic_scholar: {
      strengths: [
        "Exceptional deep work stamina, intellectual rigor, and ability to solve difficult conceptual problems",
        "Produces meticulously researched, flawless deliverables when given quiet, uninterrupted isolation",
        "Immune to superficial workplace chatter, office politics, and time-wasting meetings"
      ],
      blindspots: [
        "Can become completely cut off from team communication, causing misalignment on project direction",
        "May struggle in fast-paced, open-office environments with frequent slack notifications and calls"
      ],
      communicationTips: [
        "Block out dedicated 'deep work' windows on your public calendar and communicate availability hours clearly",
        "Summarize your solitary discoveries in concise, scannable executive memos for collaborators"
      ]
    },
    meticulous_planner: {
      strengths: [
        "Mastery of project architecture, risk mitigation, and comprehensive timeline roadmapping",
        "Ensures every dependency is anticipated and every edge case accounted for before execution begins",
        "Prevents costly project disasters through thorough preparation and structural discipline"
      ],
      blindspots: [
        "Can delay launches through excessive planning and perfectionism when rapid testing is needed",
        "May struggle to adapt when dynamic market realities require tossing out the carefully made plan"
      ],
      communicationTips: [
        "Embrace iterative planning: design the macro blueprint, then test hypotheses in agile sprints",
        "Remember that in volatile environments, shipping early provides the data needed to plan accurately"
      ]
    },
    agile_synthesizer: {
      strengths: [
        "Combines structured strategic foresight with nimble, iterative sprint execution",
        "Comfortable balancing high-level architectural outlines with rapid ground-level experimentation",
        "Keeps projects organized while remaining responsive to customer feedback and changes"
      ],
      blindspots: [
        "Can be caught in the middle between rigid traditional managers and chaotic hackers",
        "May take on too much cognitive load trying to maintain both detailed plans and rapid pivots"
      ],
      communicationTips: [
        "Establish clear 'pivot criteria' with stakeholders so everyone agrees on when to alter the roadmap",
        "Protect team focus by limiting the number of active work-in-progress items per sprint"
      ]
    },
    methodical_executor: {
      strengths: [
        "Dependable work ethic, process adherence, and steady, high-precision delivery",
        "Executes complex, repetitive, or solitary tasks with unwavering focus and high quality",
        "Earns deep organizational trust through predictable follow-through and zero drama"
      ],
      blindspots: [
        "May hesitate to challenge inefficient legacy procedures out of deference to established workflows",
        "Can feel uncomfortable when ambiguous, open-ended tasks lack clear step-by-step instructions"
      ],
      communicationTips: [
        "Proactively propose optimizations to existing workflows based on your hands-on experience",
        "Ask for clear definition of the desired outcome when facing unstructured, ambiguous projects"
      ]
    },
    balanced_operator: {
      strengths: [
        "Versatile work rhythm that switches smoothly between collaborative sessions and focused solo execution",
        "Maintains steady productivity without burning out, managing time and energy with seasoned maturity",
        "Natural team player who contributes actively in brainstorms and follows through independently"
      ],
      blindspots: [
        "Can have calendar fragmented by too many context switches between meetings and deep work",
        "May struggle to carve out large multi-day blocks for deep, complex breakthrough projects"
      ],
      communicationTips: [
        "Batch collaborative meetings into specific days or afternoons to preserve contiguous deep work mornings",
        "Clearly signal when you are heads-down in execution mode so teammates respect focus blocks"
      ]
    },
    collaborative_accelerator: {
      strengths: [
        "High interpersonal energy, quick unblocking of obstacles, and infectious team momentum",
        "Excels at live workshops, cross-functional alignment, and turning stalled projects into active sprints",
        "Brings enthusiasm, camaraderie, and clarity to group problem-solving sessions"
      ],
      blindspots: [
        "Can schedule too many meetings when a simple asynchronous message or memo would suffice",
        "May struggle to sit alone in silence to write detailed documentation or technical code"
      ],
      communicationTips: [
        "Adopt an 'async-first' communication rule for status updates to protect team focus",
        "Partner with methodical solo executors who can complete the detailed documentation after live sessions"
      ]
    },
    deliberate_craftsman: {
      strengths: [
        "Deep patience, uncompromising standards of craft, and dedication to elegant, enduring solutions",
        "Refuses to ship hasty, technical-debt-laden shortcuts that degrade system integrity over time",
        "Produces work of profound beauty, reliability, and architectural soundness"
      ],
      blindspots: [
        "Can frustrate commercial managers who prioritize speed-to-market over perfect craft elegance",
        "May get bogged down in microscopic details that have negligible impact on end-user experience"
      ],
      communicationTips: [
        "Agree on 'minimum viable craftsmanship' standards for early prototypes versus production systems",
        "Explain the long-term cost savings of quality craftsmanship in clear financial terms to leaders"
      ]
    },
    rapid_solo_builder: {
      strengths: [
        "Lightning-fast prototyping speed, immense autonomous agency, and bias for immediate action",
        "Can build working proofs-of-concept overnight while larger committees are still writing agendas",
        "Thrives on turning ideas into functional software, prototypes, or content at record velocity"
      ],
      blindspots: [
        "Can leave behind disorganized code, messy documentation, and operational debt for others to clean up",
        "May resist collaborating with larger teams once a prototype needs scalable maintenance"
      ],
      communicationTips: [
        "Build a clean handoff checklist so maintenance teams can adopt and scale your prototypes smoothly",
        "Slow down periodically to document critical architecture choices for future team members"
      ]
    },
    dynamic_catalyst: {
      strengths: [
        "Thrives in fast-paced hackathons, high-energy war rooms, and turbulent crisis turnarounds",
        "Galvanizes teams to deliver impossible results under tight deadlines through sheer enthusiasm",
        "Excels at rapid-fire brainstorming, rapid execution, and exhilarating group sprints"
      ],
      blindspots: [
        "Can burn out teams if every week is treated as a five-alarm emergency sprint",
        "May lose interest once the initial adrenaline fades and boring, repeatable maintenance begins"
      ],
      communicationTips: [
        "Establish calm, sustainable baseline operations between intense, high-energy sprints",
        "Celebrate the quiet maintenance heroes who keep the system running long after launch day"
      ]
    }
  },
  "career-values": {
    altruistic_guardian: {
      strengths: [
        "Profound dedication to social good, human healing, ethical integrity, and community uplift",
        "Protects healthy work-life balance to ensure long-term sustainability in helping professions",
        "Brings genuine heart and purpose to work, inspiring trust and gratitude from those served"
      ],
      blindspots: [
        "May accept lower compensation out of guilt, letting mission-driven organizations underpay them",
        "Can struggle with feelings of secondary trauma or moral distress in broken social systems"
      ],
      communicationTips: [
        "Advocate unapologetically for fair compensation: doing good work deserves equitable pay",
        "Establish firm emotional boundaries between client struggles and your personal home life"
      ]
    },
    balanced_contributor: {
      strengths: [
        "Healthy, grounded approach to employment: does conscientious work while prioritizing family, health, and life",
        "Refuses to sacrifice physical or mental well-being for corporate prestige or empty workaholism",
        "Provides dependable, stable contributions without generating workplace drama"
      ],
      blindspots: [
        "May be passed over for promotions in hustle-culture organizations that reward workaholic sacrifices",
        "Can feel modest stagnation if they do not intentionally pursue personal growth outside work"
      ],
      communicationTips: [
        "Highlight your high efficiency and low-error rate during work hours to justify boundaries",
        "Seek out forward-thinking employers whose culture genuinely respects family and lifestyle balance"
      ]
    },
    balanced_pragmatist: {
      strengths: [
        "Achieves substantial commercial success and career advancement without sacrificing personal life or health",
        "Prioritizes high-leverage business opportunities that deliver strong financial returns sustainably",
        "Master of efficiency, delegating low-value tasks to maintain lifestyle equilibrium"
      ],
      blindspots: [
        "Can be viewed with envy or skepticism by workaholic peers who equate suffering with dedication",
        "May hesitate to take massive, all-in entrepreneurial bets that require temporary extreme sacrifice"
      ],
      communicationTips: [
        "Share your productivity frameworks and delegation systems to mentor rising colleagues",
        "Recognize that temporary sprints can be accommodated if bounded by clear end dates"
      ]
    },
    devoted_servant: {
      strengths: [
        "Selfless dedication, moral courage, and boundless willingness to sacrifice for a noble cause",
        "Finds profound spiritual or existential meaning in alleviating human suffering or advancing justice",
        "Leaves an unforgettable legacy of love, service, and positive community transformation"
      ],
      blindspots: [
        "High risk of total physical and emotional depletion; often neglects basic personal health and financial security",
        "Can feel resentful if colleagues or community members do not match their level of sacrifice"
      ],
      communicationTips: [
        "Remember that you cannot pour from an empty cup: caring for yourself is a duty to your mission",
        "Accept financial support and fair compensation with gratitude rather than ascetic pride"
      ]
    },
    harmonious_professional: {
      strengths: [
        "Gracefully balances meaningful work, fair commercial compensation, and sustainable lifestyle boundaries",
        "Navigates career choices with long-term wisdom, avoiding both cynical greed and self-sacrificing poverty",
        "Models an enviable, holistic definition of professional and personal success"
      ],
      blindspots: [
        "Can feel conflicted when forced to choose between a high-paying lucrative offer and a deeply meaningful cause",
        "May struggle in hyper-competitive industries that demand 80-hour work weeks"
      ],
      communicationTips: [
        "Define your personal 'enough' number for finances to guide career choices with confidence",
        "Choose industries and organizations whose core mission aligns naturally with commercial viability"
      ]
    },
    commercial_achiever: {
      strengths: [
        "Strategic acumen, commercial focus, and disciplined drive to build lucrative, scalable assets",
        "Understands market economics, pricing power, capital allocation, and business growth",
        "Delivers measurable enterprise value, building wealth with steady, calculated pacing"
      ],
      blindspots: [
        "Can evaluate professional endeavors purely through financial metrics, missing deeper human fulfillment",
        "May neglect personal relationships and physical health during intense deal-making phases"
      ],
      communicationTips: [
        "Integrate philanthropic or community mentorship into your commercial journey early on",
        "Ensure your financial goals are tied to meaningful life experiences rather than mere accumulation"
      ]
    },
    mission_driven_reformer: {
      strengths: [
        "Unstoppable crusade energy, fierce ethical passion, and willingness to work 80-hour weeks for change",
        "Spearheads major social, environmental, or technological reforms against formidable odds",
        "Inspires entire generations to stand up for justice, sustainability, and human rights"
      ],
      blindspots: [
        "Extreme risk of burnout, chronic stress, and strained family and personal relationships",
        "Can become self-righteous or unforgiving toward anyone whose dedication appears less intense"
      ],
      communicationTips: [
        "Pace yourself for a marathon, not a sprint: systemic change takes decades of sustained effort",
        "Nurture tender, playful personal relationships that are completely insulated from your crusade"
      ]
    },
    lifestyle_minimalist: {
      strengths: [
        "Freedom from materialistic consumer rat races, high contentment, and profound appreciation for leisure",
        "Keeps financial overhead low to maximize personal autonomy, outdoor adventures, and creative play",
        "Enjoys an enviable quality of life rich in time, peace, nature, and restful solitude"
      ],
      blindspots: [
        "Vulnerable to sudden economic shocks, healthcare emergencies, or inflation without financial buffers",
        "May underutilize significant latent intellectual gifts out of a preference for easy comfort"
      ],
      communicationTips: [
        "Build a robust emergency fund and maintain marketable skills that can be tapped when needed",
        "Consider channeling your free time into creative or community contributions that leave a legacy"
      ]
    },
    high_yield_capitalist: {
      strengths: [
        "Relentless commercial ambition, mastery of high finance, and formidable drive to dominate market sectors",
        "Willing to endure extreme pressure and long hours to achieve generational wealth and influence",
        "Builds massive corporate enterprises that generate significant employment and economic growth"
      ],
      blindspots: [
        "Risk of profound spiritual emptiness, alienation from family, and burnout if money becomes an end in itself",
        "Can view human interactions transactionally, struggling with genuine, non-strategic intimacy"
      ],
      communicationTips: [
        "Ask yourself what legacy you want to leave behind beyond a bank balance or stock valuation",
        "Invest deeply in personal health, genuine friendships, and unconditional family love"
      ]
    }
  },
  "decision-making-style": {
    intuitive_contemplator: {
      strengths: [
        "Deep subconscious pattern recognition, holistic sensing, and wise, patient contemplation",
        "Allows complex, ambiguous decisions to mature naturally rather than rushing to premature judgment",
        "Possesses exceptional emotional intelligence and ethical instinct in human matters"
      ],
      blindspots: [
        "Can be frustratingly slow to decide in fast-paced commercial settings that demand immediate calls",
        "May struggle to explain the logical basis of their intuitive conviction to analytical colleagues"
      ],
      communicationTips: [
        "Translate gut feelings into observable patterns or proxy metrics when presenting to data-driven peers",
        "Agree on clear deadlines: 'I will let my subconscious process this until Thursday, then decide'"
      ]
    },
    measured_scholar: {
      strengths: [
        "Exhaustive empirical research, rigorous risk modeling, and meticulous evaluation of contingencies",
        "Uncovers hidden flaws, unstated assumptions, and dangerous edge cases that others overlook",
        "Produces bulletproof, data-backed strategic decisions that stand up to the harshest scrutiny"
      ],
      blindspots: [
        "Prone to analysis paralysis, endlessly gathering more data while opportunities slip away",
        "May struggle when making decisions in novel, uncharted environments where historical data does not exist"
      ],
      communicationTips: [
        "Adopt the 70% rule: when you have 70% of the information, make the call and iterate",
        "Recognize that the cost of delay often far exceeds the cost of a minor analytical error"
      ]
    },
    systematic_evaluator: {
      strengths: [
        "Structured decision frameworks, weighted decision matrices, and disciplined timelines",
        "Brings clarity and order to complex multi-stakeholder decisions, removing subjective bias",
        "Maintains consistent, transparent, and auditable reasoning across all corporate choices"
      ],
      blindspots: [
        "Can over-engineer simple, low-stakes decisions that could be resolved with a quick coin toss",
        "May discount genuine intuitive red flags that cannot be easily scored on a spreadsheet"
      ],
      communicationTips: [
        "Use lightweight decision tools for reversible decisions and save heavy matrices for irreversible ones",
        "Include a qualitative 'gut check' row in your scoring matrix to honor subconscious wisdom"
      ]
    },
    instinctive_responder: {
      strengths: [
        "Fast, reliable common sense, rapid situational awareness, and comfort in daily tactical calls",
        "Trusts first impressions and makes solid judgment calls quickly without getting bogged down",
        "Keeps operations flowing smoothly by resolving everyday bottlenecks with pragmatic speed"
      ],
      blindspots: [
        "Can jump to conclusions prematurely on complex, multi-layered strategic problems",
        "May rely on heuristic biases or cognitive shortcuts that fail in counter-intuitive scenarios"
      ],
      communicationTips: [
        "Pause and conduct a pre-mortem on major irreversible decisions: 'Assume this fails, why did it?'",
        "Seek out contrasting viewpoints before locking in decisions with high financial stakes"
      ]
    },
    pragmatic_arbitrator: {
      strengths: [
        "Balanced integration of data analysis and intuitive wisdom, knowing when 'good enough' is reached",
        "Decides with high confidence when roughly 70% of facts are known, preserving velocity",
        "Pragmatic, flexible, and skilled at synthesizing opposing viewpoints into workable compromises"
      ],
      blindspots: [
        "Can default to middle-ground compromise even when a bold, extreme course is necessary",
        "May struggle when dealing with purists who demand total ideological or analytical perfection"
      ],
      communicationTips: [
        "Clearly state the trade-offs and rationale that led to your chosen pragmatic course",
        "Be willing to champion radical, non-middle positions when data decisively supports them"
      ]
    },
    data_driven_commander: {
      strengths: [
        "Demands hard empirical metrics fast, making bold, rapid, numbers-backed strategic decisions",
        "Cuts through endless emotional debate with quantitative rigor and decisive authority",
        "Drives high execution velocity in fast-moving, competitive technology and finance markets"
      ],
      blindspots: [
        "Can dismiss vital qualitative, human, or cultural factors because they cannot be tracked in a KPI",
        "May intimidate team members who need time to articulate nuanced, non-quantitative concerns"
      ],
      communicationTips: [
        "Acknowledge that not everything that counts can be counted, and not everything that can be counted counts",
        "Create space for qualitative storytelling alongside your executive dashboards"
      ]
    },
    gut_initiator: {
      strengths: [
        "Lightning-fast intuition, audacious courage, and willingness to leap into action on instinct",
        "Thrives in high-uncertainty environments where speed and momentum matter more than theory",
        "Learns rapidly through real-world trial and error, adjusting course on the fly"
      ],
      blindspots: [
        "High rate of avoidable blunders that could have been prevented with five minutes of basic research",
        "Can leave teams dizzy trying to keep up with sudden, impulsive changes of direction"
      ],
      communicationTips: [
        "Implement a mandatory 24-hour cooling-off period for major capital expenditures or life pivots",
        "Pair with an analytical partner who can sanity-check your bold intuitive leaps"
      ]
    },
    swift_pragmatist: {
      strengths: [
        "Prioritizes rapid real-world testing over agonizing debate; tests hypotheses through direct action",
        "Understands that real-world customer feedback is worth more than a thousand boardroom opinions",
        "Moves projects forward with relentless, practical momentum and adaptive problem-solving"
      ],
      blindspots: [
        "Can accumulate operational debt and messy prototypes by skipping foundational planning",
        "May move so quickly that long-term strategic vision is lost in a flurry of tactical actions"
      ],
      communicationTips: [
        "Schedule periodic strategic retreats to ensure rapid experiments are aligning with the long-term mission",
        "Clean up and refactor successful experiments before declaring them fully completed"
      ]
    },
    calculated_disruptor: {
      strengths: [
        "Combines sharp analytical insights with lightning-fast execution to outmaneuver competitors",
        "Identifies asymmetric market opportunities and strikes decisively before rivals wake up",
        "Master of strategic agility, calculated risk-taking, and game-theoretic advantage"
      ],
      blindspots: [
        "Can take on excessive risk, betting too much on a single bold, analytical gambit",
        "May burn out team members who cannot sustain continuous high-speed disruption"
      ],
      communicationTips: [
        "Ensure your risk-management guardrails and stop-loss limits are strictly defined in advance",
        "Celebrate team stamina and build in restorative cooldown periods between bold disruptive campaigns"
      ]
    }
  }
};
