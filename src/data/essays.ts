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