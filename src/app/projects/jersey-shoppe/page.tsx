'use client'

import { useEffect } from 'react';

export default function JerseyShoppe() {
  useEffect(() => {
    document.title = "The Jersey Shoppe – Project Overview | Brodie Groch";
  }, []);

  return (
    <article className="prose dark:prose-invert max-w-4xl mx-auto px-4 py-12">
      <h1>The Jersey Shoppe – Project Overview</h1>
      
      <hr className="my-8" />

      <h2>What is The Jersey Shoppe?</h2>
      <p>
        The Jersey Shoppe is a comprehensive business workflow system built to manage the design, customization, and production of custom sports jerseys. It integrates AI-enhanced tooling, a structured business logic layer, and a visual design platform to support the full lifecycle of jersey production—from customer order to delivery.
      </p>

      <hr className="my-8" />

      <h2>Core Components and Completion Status</h2>

      <h3>1. Main Business Workflow (Partially Complete)</h3>
      <p>Handles the core production pipeline and customer process:</p>
      <ul>
        <li>✅ Order Processing: Basic structure implemented</li>
        <li>✅ Design Management: Core design handling functional</li>
        <li>⚠️ Production Tracking: Logic in progress</li>
        <li>⚠️ Customer Communication: Framework in place</li>
        <li>❌ Quality Control: Not started</li>
      </ul>

      <h3>2. AI Tools Suite (Electron Desktop App) (In Development)</h3>
      <p>Enhances productivity and automation:</p>
      <ul>
        <li>✅ Basic Application Structure: Electron base app functional</li>
        <li>✅ Menu System: Navigation system implemented</li>
        <li>⚠️ Design Automation: Initial scripts being integrated</li>
        <li>❌ Order Management: Planned module</li>
        <li>❌ Production Optimization: Planned</li>
        <li>❌ Customer Service Support: Planned</li>
      </ul>

      <h3>3. Product Maker (Partially Complete)</h3>
      <p>Interface for users to design and customize jerseys:</p>
      <ul>
        <li>✅ Basic Image Processing: Active features implemented</li>
        <li>✅ Background Removal Tool: Operational</li>
        <li>✅ Template Management: Base layer in place</li>
        <li>⚠️ Design Customization: Midway development</li>
        <li>❌ Color Scheme Selection: Not started</li>
        <li>❌ Size and Fit Specifications: Planned</li>
      </ul>

      <hr className="my-8" />

      <h2>Technical Stack</h2>
      <ul>
        <li>Frontend: HTML5, CSS3, JavaScript</li>
        <li>Desktop App: Electron + Node.js</li>
        <li>Design System: Canvas/DOM rendering, dynamic asset layers</li>
        <li>Development Tools: Node.js, local storage, possible future REST API</li>
        <li>Design Principles: Modular UI, responsive layouts, intuitive interactions</li>
      </ul>

      <hr className="my-8" />

      <h2>Key Features and Current Status</h2>

      <h3>Workflow Management</h3>
      <ul>
        <li>✅ Structured process architecture</li>
        <li>✅ Phase-based task flow</li>
        <li>⚠️ Detailed step-by-step procedures</li>
      </ul>

      <h3>Design Tools</h3>
      <ul>
        <li>✅ Template and image processing basics</li>
        <li>⚠️ Style customization</li>
        <li>❌ Color/style selection refinements</li>
      </ul>

      <h3>Business Operations</h3>
      <ul>
        <li>⚠️ Basic order tracking</li>
        <li>⚠️ Customer data framework</li>
        <li>❌ Scheduling logic for production</li>
        <li>❌ Quality control automation</li>
      </ul>

      <h3>AI Integration</h3>
      <ul>
        <li>✅ Initial scaffolding for AI tools</li>
        <li>⚠️ Early-stage automation tools</li>
        <li>❌ Optimization algorithms</li>
        <li>❌ Smart system flow logic</li>
      </ul>

      <hr className="my-8" />

      <h2>Project Directory Structure</h2>
      <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto">
{`TheJerseyShoppe/
├── CoreWorkflow/                   # Main business operations
├── AIToolsDesktopApp/             # Electron-based AI tooling
├── ProductMaker/                  # Design and customization engine
├── JerseyIdeas/                   # Template & inspiration repository
├── assets/                        # Logos, base templates
└── docs/                          # Documentation and setup guides`}
      </pre>

      <hr className="my-8" />

      <h2>Current Development Status</h2>
      <ul>
        <li>✅ Core architecture in place</li>
        <li>✅ Desktop app base running</li>
        <li>✅ Visual design tooling (basic)</li>
        <li>⚠️ Business logic modules evolving</li>
        <li>❌ Advanced AI and production capabilities pending</li>
      </ul>

      <hr className="my-8" />

      <h2>Future Development Priorities</h2>
      <ol>
        <li>✅ Finalize production tracking module</li>
        <li>⚠️ Advance AI toolset for design logic</li>
        <li>❌ Build full-featured order and client management system</li>
        <li>❌ Develop loyalty/repeat-order features</li>
        <li>❌ Integrate analytics/dashboard reporting tools</li>
        <li>⚠️ Complete design customization workflows</li>
        <li>❌ Launch robust quality assurance systems</li>
      </ol>

      <hr className="my-8" />

      <h2>Legend</h2>
      <ul>
        <li>✅ Completed</li>
        <li>⚠️ In Progress</li>
        <li>❌ Planned / Not Started</li>
      </ul>

      <hr className="my-8" />

      <p className="text-sm text-gray-600 dark:text-gray-400">
        Note: This document reflects the current codebase and development plans as of May 2025. It will evolve as functionality matures and priorities shift.
      </p>
    </article>
  );
} 