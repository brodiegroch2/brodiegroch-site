'use client'

import { useEffect } from 'react';

export default function ValenceVoting() {
  useEffect(() => {
    document.title = "The Rise of Valence Voting: Why Competence and Character Now Trump Policy | Brodie Groch";
  }, []);

  return (
    <article className="prose dark:prose-invert max-w-4xl mx-auto px-4 py-12">
      <h1>The Rise of Valence Voting: Why Competence and Character Now Trump Policy</h1>
      <p className="text-gray-600 dark:text-gray-400">By Brodie Groch — May 2025</p>
      
      <hr className="my-8" />

      <h2>1. Introduction</h2>
      <p>
        In modern democracies, voters increasingly prioritize perceptions of candidate competence and integrity over detailed policy positions—a phenomenon known as valence voting. In Canada, this trend has been particularly evident in recent elections, where party platforms were often overshadowed by perceptions of leadership credibility and likability. The appeal of a candidate's personality and leadership traits now frequently outweighs their specific proposals, signaling a fundamental shift in how electoral decisions are made (Stokes, 1963; Sanders et al., 2011).
      </p>

      <hr className="my-8" />

      <h2>2. Context / Background</h2>
      <p>
        Valence issues refer to political concerns on which there is general public consensus—such as economic stability, health care access, and honest governance. Unlike position issues, which reflect ideological divides, valence issues judge whether candidates appear competent, trustworthy, and effective (Stokes, 1963). In Canadian elections, this is often reflected in voter assessments of which party leader can best "manage the economy" or "stand up for Canada," regardless of their specific policy blueprints.
      </p>
      <p>
        Donald Stokes argued that voters frequently base their decisions on perceived competence and electability over ideology (Clarke et al., 2009). In Canada, this has translated into increasingly leader-centric elections, especially since the rise of television debates and social media campaigns in the 21st century.
      </p>

      <hr className="my-8" />

      <h2>3. Thematic Analysis</h2>

      <h3>Theme A: The Decline of Ideological Voting in Canada</h3>
      <p>
        Canadian politics has seen a noticeable decline in strict ideological voting. While the Liberal and Conservative parties remain dominant, many voters—especially younger and urban Canadians—float between parties across elections (Dalton, 2013). The 2015 federal election is a case in point: Justin Trudeau's Liberals surged from third place to majority government not primarily due to bold policy distinctions, but because of Trudeau's positive image and contrast with the perceived coldness of Stephen Harper.
      </p>
      <p>
        Similarly, the NDP's failure in 2019 and 2021 was not due to unpopular policy positions—many Canadians supported their progressive stances—but rather due to doubts about Jagmeet Singh's perceived ability to lead a national government. This pattern aligns with valence theory, where leadership capability eclipses ideological alignment (Sanders et al., 2011).
      </p>

      <h3>Theme B: The Influence of Media and Personalization</h3>
      <p>
        The personalization of Canadian politics has been accelerated by media saturation and the leader-focused structure of campaign coverage. Leaders' debate performances and social media presence now carry more weight than detailed party platforms (McAllister, 2007). Trudeau's brand—youthful, empathetic, and photogenic—helped secure his 2015 and 2019 victories despite policy critiques from both left and right.
      </p>
      <p>
        On the flip side, Conservative leader Erin O'Toole's shifting positions in 2021 were less damaging than his inability to project consistent authenticity—voters struggled to define what kind of leader he was. Pierre Poilievre's current rise as Conservative leader is also grounded not in new policy innovation, but in a high-energy, confidence-heavy brand targeting economic frustration.
      </p>

      <hr className="my-8" />

      <h2>4. Strategic Patterns / Meta-Insights</h2>
      <p>
        Canadian parties are increasingly designing campaigns around the personal brands of their leaders rather than distinct ideological agendas. Platform releases are often delayed or vague, while campaign narratives emphasize trust, readiness, and values. The policy gap between the Liberals and Conservatives has narrowed in key areas such as climate action and spending, leading voters to default to perceived leadership quality (Clarke et al., 2009).
      </p>

      <hr className="my-8" />

      <h2>5. Counterarguments / Alternatives</h2>
      <p>
        It would be incorrect to say policy has become irrelevant in Canada. The 2021 election featured heated debates on mandatory vaccinations and housing affordability—issues where party positions mattered. Moreover, regionalism still plays a role; Western Canadians often support Conservatives not only for leadership appeal but also for policies reflecting economic autonomy and energy sector support.
      </p>
      <p>
        Nonetheless, research and polling show that for a large share of the electorate, especially in Ontario and Quebec swing ridings, the leader's image and communication style weigh more heavily than policy booklets (Dalton, 2013). Valence and position-based voting coexist, but the former now dominates in federal outcomes.
      </p>

      <hr className="my-8" />

      <h2>6. Conclusion</h2>
      <p>
        In Canada, as in other democracies, electoral outcomes are increasingly shaped by emotional assessments of trust, leadership, and authenticity. Valence voting explains why charismatic but vague leaders often outperform well-prepared but less engaging opponents. As Canadians grow more disillusioned with party politics and more focused on relatable leadership, political success will depend less on platforms and more on the performance of personalities.
      </p>

      <hr className="my-8" />

      <h2>7. References</h2>
      <ul>
        <li>Clarke, H. D., Sanders, D., Stewart, M. C., & Whiteley, P. (2009). Performance Politics and the British Voter. Cambridge University Press.</li>
        <li>Dalton, R. J. (2013). Citizen Politics (6th ed.). CQ Press.</li>
        <li>McAllister, I. (2007). The personalization of politics. In R. Dalton & H.-D. Klingemann (Eds.), The Oxford Handbook of Political Behavior (pp. 571–588). Oxford University Press.</li>
        <li>Sanders, D., Clarke, H. D., Stewart, M. C., & Whiteley, P. (2011). Downs, Stokes and the dynamics of electoral choice. British Journal of Political Science, 41(2), 287–314.</li>
        <li>Stokes, D. E. (1963). Spatial models of party competition. American Political Science Review, 57(2), 368–377.</li>
        <li>Strömbäck, J. (2008). Four phases of mediatization. International Journal of Press/Politics, 13(3), 228–246.</li>
      </ul>
    </article>
  );
} 