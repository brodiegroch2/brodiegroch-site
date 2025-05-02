'use client'

import Link from "next/link";

export default function ChoiceEngineEssayPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <article className="card max-w-4xl mx-auto px-4 py-12">
        {/* Essay Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            The Choice Engine: How Elections Rewired Canadian Culture — One Vote at a Time
          </h1>
          <div className="text-gray-600 dark:text-gray-400 space-y-2">
            <p>By Brodie Groch | May 2025 | 7-minute read</p>
          </div>
        </header>

        {/* Essay Content */}
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <hr className="my-8 border-gray-200 dark:border-gray-700" />

          <blockquote className="text-xl italic font-medium border-l-4 pl-4 border-blue-600 dark:border-blue-400">
            "Every election isn't just a contest of policies — it's a collective simulation of what kind of country we want to be next."
          </blockquote>

          <hr className="my-8 border-gray-200 dark:border-gray-700" />

          <section>
            <h2 className="text-2xl font-bold mb-6">🇨🇦 The Myth of Political Stability</h2>
            <p>
              Canadians are told we're politically boring. Stable. Predictable. But that's never really been true.
            </p>
            <p>
              What we call stability has actually been a constant rewiring of the national psyche — election by election, crisis by crisis, identity shift by identity shift.
            </p>
            <p>
              From colonial dominion to multicultural state, from conscription crises to culture wars, every time Canadians have stepped into the ballot box, they've voted not just on parties — but on what Canada is.
            </p>
          </section>

          <hr className="my-8 border-gray-200 dark:border-gray-700" />

          <section>
            <h2 className="text-2xl font-bold mb-6">📜 1867–1911: Dominion Dreams and Anglo Order</h2>
            <p><strong>Thought at the Time:</strong> "We need order, expansion, and British strength."</p>
            <p>
              Voters chose John A. Macdonald's Conservatives to unite the colonies. Policies like the National Policy (tariffs + railroads) built industry and nationalism. But they also entrenched white, Protestant power and Indigenous suppression.
            </p>
            <p><strong>Direction Locked In:</strong> Colonial conservatism, expansionism, central government control.</p>
          </section>

          <hr className="my-8 border-gray-200 dark:border-gray-700" />

          <section>
            <h2 className="text-2xl font-bold mb-6">🗳 1917: The First Culture War Election</h2>
            <p><strong>Thought at the Time:</strong> "Do we fight together — or divide?"</p>
            <p>
              In WWI, the Conscription Crisis split English and French Canada. The Unionist (Conservative-Liberal) coalition won. But Quebec felt betrayed. Voter lines became cultural front lines.
            </p>
            <p><strong>Direction Locked In:</strong> English-Canada unity over Quebec loyalty. The "two solitudes" hardened.</p>
          </section>

          <hr className="my-8 border-gray-200 dark:border-gray-700" />

          <section>
            <h2 className="text-2xl font-bold mb-6">⚙️ 1945–1967: Postwar Prosperity and Social Consensus</h2>
            <p><strong>Thought at the Time:</strong> "We've earned peace. Let's build a better life."</p>
            <p>
              Liberal governments rode the optimism of veterans and boomers. Voters supported national pension plans, citizenship laws, family allowances. The idea of shared responsibility embedded itself in Canadian identity.
            </p>
            <p><strong>Direction Locked In:</strong> Social liberalism, safety nets, and national cohesion over division.</p>
          </section>

          <hr className="my-8 border-gray-200 dark:border-gray-700" />

          <section>
            <h2 className="text-2xl font-bold mb-6">🍁 1968–1982: The Trudeau Pivot — Rights Over Roots</h2>
            <p><strong>Thought at the Time:</strong> "Who are we — and who gets to decide?"</p>
            <p>
              Pierre Trudeau's Liberals reframed Canada as a rights-based, bilingual, multicultural project. Voters didn't just choose him — they chose the Charter, the flag, and a new national story.
            </p>
            <p><strong>Direction Locked In:</strong> From cultural conformity to pluralism. The legal foundation of modern Canada was born.</p>
          </section>

          <hr className="my-8 border-gray-200 dark:border-gray-700" />

          <section>
            <h2 className="text-2xl font-bold mb-6">📉 1984–1993: Free Trade and Fracture</h2>
            <p><strong>Thought at the Time:</strong> "Let's modernize. But at what cost?"</p>
            <p>
              Mulroney's Progressive Conservatives won big on free trade, privatization, and Quebec recognition. But backlash came fast: the GST, Meech Lake failure, and economic pain shattered old alliances.
            </p>
            <p><strong>Direction Locked In:</strong> Globalization over protectionism. But also: deep voter cynicism.</p>
          </section>

          <hr className="my-8 border-gray-200 dark:border-gray-700" />

          <section>
            <h2 className="text-2xl font-bold mb-6">🚨 1993: The Great Political Reset</h2>
            <p><strong>Thought at the Time:</strong> "None of the old parties represent me anymore."</p>
            <p>
              The Progressive Conservatives collapsed. The Bloc and Reform surged. Canadians didn't just shift preferences — they abandoned old loyalties. The Liberal sweep wasn't just a win. It was a vacuum fill.
            </p>
            <p><strong>Direction Locked In:</strong> Fragmented federalism. Regional distrust. End of "natural governing parties."</p>
          </section>

          <hr className="my-8 border-gray-200 dark:border-gray-700" />

          <section>
            <h2 className="text-2xl font-bold mb-6">🏳️‍🌈 2005: Rights Expansion and the Moral Divide</h2>
            <p><strong>Thought at the Time:</strong> "What kind of freedom matters more — religious or civil?"</p>
            <p>
              Same-sex marriage passed under Paul Martin's Liberals. It polarized parts of the electorate — but most Canadians stood by inclusion. It defined a generation's concept of modern Canadian values.
            </p>
            <p><strong>Direction Locked In:</strong> Progressive rights as a non-negotiable feature of national identity.</p>
          </section>

          <hr className="my-8 border-gray-200 dark:border-gray-700" />

          <section>
            <h2 className="text-2xl font-bold mb-6">📉 2006–2015: Conservative Era and Quiet Redirection</h2>
            <p><strong>Thought at the Time:</strong> "Let's be prudent. But not radical."</p>
            <p>
              Stephen Harper's Conservatives didn't win by being extreme — they won by appealing to moderation + fear of Liberal excess. But their legacy (crime bills, oil development, proroguing Parliament) began to fray trust.
            </p>
            <p><strong>Direction Locked In:</strong> Economic realism, security consciousness, and slow resistance to progressive speed.</p>
          </section>

          <hr className="my-8 border-gray-200 dark:border-gray-700" />

          <section>
            <h2 className="text-2xl font-bold mb-6">📢 2015: The Big Hope Vote</h2>
            <p><strong>Thought at the Time:</strong> "It's time to feel proud of Canada again."</p>
            <p>
              Trudeau's Liberals brought a wave: youth vote, openness, climate leadership, identity politics. For a moment, Canada saw itself as the progressive beacon of the West.
            </p>
            <p><strong>Direction Locked In:</strong> Performative progressivism. National brand-building. High expectations.</p>
          </section>

          <hr className="my-8 border-gray-200 dark:border-gray-700" />

          <section>
            <h2 className="text-2xl font-bold mb-6">🧯 2022–2025: Fragmentation and Strategic Anxiety</h2>
            <p><strong>Thought at the Time:</strong> "Who's really in control here — the government, or the people?"</p>
            <p>
              From the Freedom Convoy to digital censorship bills, Canadians started asking how much power is too much? And who exactly is watching whom?
            </p>
            <p>
              2025's election turned not just on inflation — but sovereignty. Not just affordability — but autonomy.
            </p>
            <p><strong>Direction Locked In:</strong> Skepticism of power. Desire for a sovereign, independent, but balanced future. Expect realignment.</p>
          </section>

          <hr className="my-8 border-gray-200 dark:border-gray-700" />

          <section>
            <h2 className="text-2xl font-bold mb-6">📊 What This Means: Elections as Cultural Leverage</h2>
            <p>Canadian elections don't just pick leaders. They pick:</p>
            <ul>
              <li>What gets protected</li>
              <li>Who gets heard</li>
              <li>Which version of history gets written</li>
            </ul>
            <p>That's why understanding elections as cultural decision engines is critical.</p>
            <p>If you want to influence the future of Canada, you don't just run in elections. You design the frame of choice.</p>
          </section>

          <hr className="my-8 border-gray-200 dark:border-gray-700" />

          <section>
            <h2 className="text-2xl font-bold mb-6">🧭 My Mission</h2>
            <p>
              I'm building a full-scale, interactive timeline of Canadian elections, policies, and the cultural consequences that followed.
            </p>
            <p>
              Because knowing who won is not enough.
            </p>
            <p>
              You need to know why people voted — and what they unknowingly voted into existence.
            </p>
            <p>
              This is the level of systems history we need if we want to shape what comes next.
            </p>
          </section>

          <hr className="my-8 border-gray-200 dark:border-gray-700" />

          <section className="bg-gray-50 dark:bg-gray-800 p-6 rounded-xl">
            <p className="mb-0">
              Want to collaborate, explore the model, or challenge my framing? Reach me at{' '}
              <a href="mailto:brodie@brodiegroch.ca" className="text-blue-600 dark:text-blue-400 hover:underline">
                brodie@brodiegroch.ca
              </a>{' '}
              or follow the upcoming tools at{' '}
              <Link href="/" className="text-blue-600 dark:text-blue-400 hover:underline">
                brodiegroch.ca
              </Link>
            </p>
          </section>
        </div>

        {/* Navigation */}
        <div className="mt-12 flex gap-4 justify-center">
          <Link
            href="/essays"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Essays
          </Link>
          <Link
            href="/contact"
            className="px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </article>
    </main>
  );
} 