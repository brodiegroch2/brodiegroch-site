'use client'

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";

interface Project {
  title: string;
  description: string;
  technologies: string[];
  link: string;
}

const projects: Project[] = [
  {
    title: "The Jersey Shoppe",
    description: "A comprehensive business workflow system for managing custom sports jersey design, customization, and production. Features include AI-enhanced tooling, a structured business logic layer, and a visual design platform. The system integrates Electron-based desktop tools, automated design processes, and production tracking capabilities.",
    technologies: [
      "Electron",
      "Node.js",
      "HTML5",
      "CSS3",
      "JavaScript",
      "Canvas/DOM",
      "AI Integration",
      "Business Logic"
    ],
    link: "/projects/jersey-shoppe",
  },
  {
    title: "AI Content Studio",
    description: "A comprehensive web application for AI-powered content creation and management. Features include user authentication, document processing (PDF and Word), course management, and analytics. Built with Next.js 15.3.1, React 18, and TypeScript, featuring Stripe payments, NextAuth authentication, and OpenAI integration. The platform offers a modern dashboard interface with content management, analytics, and settings management capabilities.",
    technologies: [
      "Next.js 15.3.1",
      "React 18",
      "TypeScript",
      "Tailwind CSS",
      "NextAuth",
      "Stripe",
      "OpenAI API",
      "PDF Processing",
      "Headless UI"
    ],
    link: "https://aicontentstudio.ca",
  },
  {
    title: "Personal Portfolio",
    description: "My personal website brodiegroch.ca showcasing my work, essays, and projects. Features a modern, responsive design with dark mode support, interactive project cards, and a clean user interface. The site includes sections for projects, essays, and contact information, all built with a focus on performance and user experience.",
    technologies: ["Next.js", "Tailwind CSS", "TypeScript", "React", "Dark Mode"],
    link: "https://brodiegroch.ca",
  }
];

const techBadgeClass = "px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm";

interface TechBadgeProps {
  technology: string;
}

function TechBadge({ technology }: TechBadgeProps) {
  return <span className={techBadgeClass}>{technology}</span>;
}

interface ProjectCardProps {
  project: Project;
  onSelect: (project: Project) => void;
}

function ProjectCard({ project, onSelect }: ProjectCardProps) {
  return (
    <div
      className="card hover:shadow-xl transition-shadow cursor-pointer"
      onClick={() => onSelect(project)}
    >
      <div className="p-0">
        <h2 className="text-2xl font-semibold mb-3">{project.title}</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.technologies.map((tech, techIndex) => (
            <TechBadge key={techIndex} technology={tech} />
          ))}
        </div>
        <Link
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          View Project
        </Link>
      </div>
    </div>
  );
}

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

function ProjectModal({ project, onClose }: ProjectModalProps) {
  const handleEscape = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [handleEscape]);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{project.title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((tech, techIndex) => (
            <TechBadge key={techIndex} technology={tech} />
          ))}
        </div>
        <div className="flex justify-end">
          <Link
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            View Project
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            My Projects
          </h1>
          
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <ProjectCard
                key={project.title}
                project={project}
                onSelect={setSelectedProject}
              />
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              href="/"
              className="inline-block px-6 py-3 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
} 