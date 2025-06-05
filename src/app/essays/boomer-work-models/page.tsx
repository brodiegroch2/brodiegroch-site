'use client'

import React from 'react'
import Link from 'next/link'
import { essays } from '@/data/essays'

export default function EssayPage() {
  // Find this specific essay
  const essay = essays.find(e => e.slug === 'boomer-work-models')

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link
              href="/essays"
              className="text-blue-600 dark:text-blue-400 hover:underline font-inter"
            >
              ← Back to Content
            </Link>
          </div>

          <article className="prose prose-lg max-w-none dark:prose-invert">
            <h1 className="text-4xl font-bold mb-4 font-inter">
              {essay?.title}
            </h1>
            
            <div className="text-gray-600 dark:text-gray-300 mb-8 font-source-serif">
              {essay?.description}
            </div>

            <div className="prose prose-lg max-w-none dark:prose-invert">
              <p>
                In today's Canadian workforce, an uncomfortable truth lingers beneath the surface: many recent graduates are objectively more capable of delivering higher-impact work faster, cheaper, and more creatively than many of their senior counterparts. But instead of being rewarded for this, they're shut out, underpaid, or chronically overlooked. Meanwhile, aging professionals collect bloated salaries for outdated processes, protected by an outdated cultural model of "experience" that no longer holds up.
              </p>

              <p>
                This isn't just a generational gripe—it's a systemic flaw rooted in a historical anomaly unique to the Boomer generation. Every generation before Boomers earned prestige through credentials or labour value. But Boomers benefited from a rare economic climate: exploding GDP, cheap housing, stable jobs, and rapid institutional expansion. They rose to power without needing credentials or optimization. Time served became synonymous with value—not because it should have, but because it worked back then.
              </p>

              <p>
                That logic no longer holds.
              </p>

              <h2>Case Study: Gary vs. Aisha</h2>

              <p>
                <strong>Company:</strong> Mid-sized municipal infrastructure firm in Calgary<br />
                <strong>Role:</strong> Project Analyst<br />
                <strong>Gary:</strong> 61-year-old Boomer, Senior Analyst, 30 years of experience<br />
                <strong>Aisha:</strong> 24-year-old graduate, just finished university, fluent in AI tools, Python, automation, and analytics platforms
              </p>

              <h3>The Task:</h3>

              <p>
                "Analyze our last year's field work to find bottlenecks in service delivery, and recommend improvements."
              </p>

              <h3>Gary's Method:</h3>
              <ul>
                <li>Manually requests data from 3 departments</li>
                <li>Uses Excel and paper notes</li>
                <li>Interviews field staff and writes a 12-page Word doc</li>
                <li>Takes 3 weeks (105 hours)</li>
                <li>Produces vague insights and general recommendations</li>
                <li>Cost to company: $5,460 (@ $52/hr)</li>
              </ul>

              <h3>Aisha's Method:</h3>
              <ul>
                <li>Pulls datasets via API</li>
                <li>Cleans and analyzes using Python in 2 hours</li>
                <li>Uses ChatGPT and Power BI to visualize trends</li>
                <li>Designs a Notion-based live dashboard for accountability</li>
                <li>Finishes in 1 day (8 hours)</li>
                <li>Cost to company: $224 (@ $28/hr)</li>
                <li>Delivers precise, implementable changes with direct ROI</li>
              </ul>

              <p>
                Who delivered more value? The answer is obvious. But here's what actually happens:
              </p>

              <p>
                Gary gets praised. Aisha doesn't get hired.
              </p>

              <p>
                Why? Because the hiring manager says:
              </p>
              <ul>
                <li>"She hasn't paid her dues."</li>
                <li>"We're not sure her process is proven."</li>
                <li>"We respect experience."</li>
              </ul>

              <p>
                This is the flaw. Our economy pretends to be meritocratic but clings to a broken metric: time-in-seat. The model worked in the 1980s, but it's actively anti-productive in the 2020s.
              </p>

              <h2>The Truth We Don't Say</h2>

              <p>
                We're living through the most powerful era of personal leverage in human history. AI tools, data analytics, and open-source infrastructure have collapsed the time it takes to produce meaningful results. A task that took 8 hours a decade ago now takes 30 seconds with the right tools. But our systems haven't caught up.
              </p>

              <p>
                They still reward:
              </p>
              <ul>
                <li>Tenure over outcome</li>
                <li>Process over speed</li>
                <li>Familiarity over boldness</li>
              </ul>

              <p>
                Millennials and Gen Z are punished for doing more with less. Boomers are rewarded for surviving systems they themselves helped ossify.
              </p>

              <h2>The Cost to Canada</h2>

              <p>
                This isn't just unfair—it's economically devastating.
              </p>
              <ul>
                <li>Public sector bloats as productivity stagnates</li>
                <li>Younger workers disengage and seek opportunity abroad or online</li>
                <li>Housing and opportunity gaps widen, further entrenching class divides</li>
                <li>Institutional decay accelerates, because innovation is locked out</li>
              </ul>

              <p>
                Canada is cannibalizing its future to preserve the egos of its past.
              </p>

              <h2>So What Do We Do?</h2>

              <p>
                We need to decouple time from value.
              </p>

              <p>
                I propose a new metric for performance:
              </p>

              <p>
                <strong>Civic Impact Score = (Outcome Quality × Societal Relevance × Speed) / Tool Leverage Factor</strong>
              </p>

              <p>
                We should reward those who:
              </p>
              <ul>
                <li>Use tools to deliver faster, more relevant solutions</li>
                <li>Create systems that scale and adapt</li>
                <li>Share their knowledge to uplift others</li>
              </ul>

              <p>
                We must shift prestige from "time served" to "value delivered."
              </p>

              <p>
                If we don't? We'll keep hemorrhaging talent, productivity, and relevance.
              </p>

              <p>
                And the brightest people of our generation—the ones who can do in a day what it used to take a team a month—will keep being told: "Come back when you have more experience."
              </p>

              <p>
                It's time to flip the script.
              </p>

              <p>
                Not out of rebellion.<br />
                Out of necessity.
              </p>

              <p>
                Canada doesn't need more experience.<br />
                It needs more execution.
              </p>
            </div>
          </article>
        </div>
      </div>
    </div>
  )
} 