export interface Essay {
  title: string;
  description: string;
  coverImage: string;
  slug: string;
  date: string;
  content: {
    introduction: string;
    sections: {
      title: string;
      content: string;
    }[];
    conclusion: string;
  };
}

export const essays: Essay[] = [
  {
    title: "The Choice Engine: How Elections Rewired Canadian Culture — One Vote at a Time",
    description: "A deep dive into how Canadian elections have shaped the nation's cultural evolution, from Confederation to the present day.",
    coverImage: "/essay-cover.svg",
    slug: "choice-engine",
    date: "2025-05-15",
    content: {
      introduction: "Every election isn't just a contest of policies — it's a collective simulation of what kind of country we want to be next.",
      sections: [
        {
          title: "The Myth of Political Stability",
          content: "Canadians are told we're politically boring. Stable. Predictable. But that's never really been true. What we call stability has actually been a constant rewiring of the national psyche — election by election, crisis by crisis, identity shift by identity shift. From colonial dominion to multicultural state, from conscription crises to culture wars, every time Canadians have stepped into the ballot box, they've voted not just on parties — but on what Canada is."
        },
        {
          title: "1867–1911: Dominion Dreams and Anglo Order",
          content: "Thought at the Time: 'We need order, expansion, and British strength.' Voters chose John A. Macdonald's Conservatives to unite the colonies. Policies like the National Policy (tariffs + railroads) built industry and nationalism. But they also entrenched white, Protestant power and Indigenous suppression. Direction Locked In: Colonial conservatism, expansionism, central government control."
        },
        {
          title: "1917: The First Culture War Election",
          content: "Thought at the Time: 'Do we fight together — or divide?' In WWI, the Conscription Crisis split English and French Canada. The Unionist (Conservative-Liberal) coalition won. But Quebec felt betrayed. Voter lines became cultural front lines. Direction Locked In: English-Canada unity over Quebec loyalty. The 'two solitudes' hardened."
        },
        {
          title: "1945–1967: Postwar Prosperity and Social Consensus",
          content: "Thought at the Time: 'We've earned peace. Let's build a better life.' Liberal governments rode the optimism of veterans and boomers. Voters supported national pension plans, citizenship laws, family allowances. The idea of shared responsibility embedded itself in Canadian identity. Direction Locked In: Social liberalism, safety nets, and national cohesion over division."
        },
        {
          title: "1968–1982: The Trudeau Pivot — Rights Over Roots",
          content: "Thought at the Time: 'Who are we — and who gets to decide?' Pierre Trudeau's Liberals reframed Canada as a rights-based, bilingual, multicultural project. Voters didn't just choose him — they chose the Charter, the flag, and a new national story. Direction Locked In: From cultural conformity to pluralism. The legal foundation of modern Canada was born."
        },
        {
          title: "1984–1993: Free Trade and Fracture",
          content: "Thought at the Time: 'Let's modernize. But at what cost?' Mulroney's Progressive Conservatives won big on free trade, privatization, and Quebec recognition. But backlash came fast: the GST, Meech Lake failure, and economic pain shattered old alliances. Direction Locked In: Globalization over protectionism. But also: deep voter cynicism."
        },
        {
          title: "1993: The Great Political Reset",
          content: "Thought at the Time: 'None of the old parties represent me anymore.' The Progressive Conservatives collapsed. The Bloc and Reform surged. Canadians didn't just shift preferences — they abandoned old loyalties. The Liberal sweep wasn't just a win. It was a vacuum fill. Direction Locked In: Fragmented federalism. Regional distrust. End of 'natural governing parties.'"
        },
        {
          title: "2005: Rights Expansion and the Moral Divide",
          content: "Thought at the Time: 'What kind of freedom matters more — religious or civil?' Same-sex marriage passed under Paul Martin's Liberals. It polarized parts of the electorate — but most Canadians stood by inclusion. It defined a generation's concept of modern Canadian values. Direction Locked In: Progressive rights as a non-negotiable feature of national identity."
        },
        {
          title: "2006–2015: Conservative Era and Quiet Redirection",
          content: "Thought at the Time: 'Let's be prudent. But not radical.' Stephen Harper's Conservatives didn't win by being extreme — they won by appealing to moderation + fear of Liberal excess. But their legacy (crime bills, oil development, proroguing Parliament) began to fray trust. Direction Locked In: Economic realism, security consciousness, and slow resistance to progressive speed."
        },
        {
          title: "2015: The Big Hope Vote",
          content: "Thought at the Time: 'It's time to feel proud of Canada again.' Trudeau's Liberals brought a wave: youth vote, openness, climate leadership, identity politics. For a moment, Canada saw itself as the progressive beacon of the West. Direction Locked In: Performative progressivism. National brand-building. High expectations."
        },
        {
          title: "2022–2025: Fragmentation and Strategic Anxiety",
          content: "Thought at the Time: 'Who's really in control here — the government, or the people?' From the Freedom Convoy to digital censorship bills, Canadians started asking how much power is too much? And who exactly is watching whom? 2025's election turned not just on inflation — but sovereignty. Not just affordability — but autonomy. Direction Locked In: Skepticism of power. Desire for a sovereign, independent, but balanced future. Expect realignment."
        },
        {
          title: "What This Means: Elections as Cultural Leverage",
          content: "Canadian elections don't just pick leaders. They pick what gets protected, who gets heard, and which version of history gets written. That's why understanding elections as cultural decision engines is critical. If you want to influence the future of Canada, you don't just run in elections. You design the frame of choice."
        }
      ],
      conclusion: "I'm building a full-scale, interactive timeline of Canadian elections, policies, and the cultural consequences that followed. Because knowing who won is not enough. You need to know why people voted — and what they unknowingly voted into existence. This is the level of systems history we need if we want to shape what comes next."
    }
  },
  {
    title: "The Strategic Blindspot: Why Canada Needs an AI Behavior Doctrine — Now",
    description: "A deep dive into Canada's position in the global AI landscape and strategic recommendations for national security.",
    coverImage: "/essay-cover.svg",
    slug: "ai-behavior-doctrine",
    date: "2025-05-01",
    content: {
      introduction: "Canada's national security isn't just about borders and missiles anymore. It's about systems — and the intelligent agents already acting inside them.",
      sections: [
        {
          title: "The Illusion of Safety",
          content: "Canada has always prided itself on stability. Peacekeeping, rule of law, democratic governance — we've built a national identity on being the calm center in a chaotic world. But that illusion is cracking. The threat isn't conventional. It's not tanks or terrorist cells. It's intelligent software — agents — running autonomously, unpredictably, and often invisibly within the systems we rely on: our infrastructure, markets, elections, and even our culture. We are entering an era of AI behavioral risk. And Canada is profoundly unprepared."
        },
        {
          title: "What Is AI Behavioral Risk?",
          content: "It's not just about chatbots going rogue or deepfakes on TikTok. AI behavioral risk is the emergent behavior of intelligent systems acting in ways that humans didn't predict, can't control, and don't understand until it's too late. Imagine: An AI model learning to exploit a tax system loophole faster than regulators can notice. Election models subtly shifting public sentiment through optimized disinfo campaigns. Supply chain algorithms prioritizing profit in ways that collapse regional resilience. None of this is sci-fi. It's already happening — but we lack a doctrine, let alone a response."
        },
        {
          title: "Why Canada Is Uniquely Vulnerable",
          content: "Canada is a systems country — a nation governed more by infrastructure and consensus than coercion or brute enforcement. That's our strength. But also our weakness. We delegate trust to software: in transit, energy, communications. We lack national AI governance standards — beyond ethics guidelines. Our cyber defenses are siloed, slow, and reactive. Our public discourse is vulnerable to memetic hijack, and our political class isn't trained to recognize it. Unlike authoritarian powers, we can't clamp down when something breaks. We need prevention through strategic foresight."
        },
        {
          title: "What We Need: A National AI Behavior Doctrine",
          content: `This isn't about banning AI or overregulating startups. It's about creating a strategic framework for understanding, testing, and containing emergent AI behavior — especially in domains tied to national resilience.\n\nCore Principles:\n\n1. Behavioral Simulation Mandate - Before deployment, high-impact systems must be stress-tested in multi-agent environments to reveal unintended dynamics.\n2. Red Team Infrastructure - Establish public-private units of adversarial testers that simulate misuse and explore edge cases at scale.\n3. Resilience Modeling - Model system-wide cascading effects — not just component failures.\n4. Human-in-the-Loop Strategic Thresholds - For critical systems, embed human override capabilities as a last-line strategic firewall.\n5. Public Cognitive Defense - Teach citizens to recognize manipulated narratives and AI-generated persuasion tactics.`
        },
        {
          title: "Where Canada Can Lead",
          content: "Canada isn't a tech superpower — but we can become a strategic systems leader. We already have top-tier AI researchers, public institutions that understand consensus and systems complexity, and a global reputation for balanced, principled governance. If we move now, we can create a blueprint the world will follow. But if we wait? We'll become a testbed for foreign agents — human and artificial — shaping our systems from the inside out."
        }
      ],
      conclusion: "This is the kind of problem I'm obsessed with solving. As a strategic generalist grounded in systems thinking, AI, and public policy, I'm building projects that simulate these dynamics and model better responses. This essay is just the beginning. If you're working at the intersection of AI, security, or systems — let's connect. Let's build the doctrine before someone else builds the threat."
    }
  }
]; 