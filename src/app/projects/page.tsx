import Link from 'next/link'

const projects = [
  {
    title: 'AI Research',
    description: 'Research and development in artificial intelligence and machine learning.',
    link: 'https://github.com/yourusername/ai-research'
  },
  {
    title: 'Web Development',
    description: 'Modern web applications built with React and Next.js.',
    link: 'https://github.com/yourusername/web-dev'
  },
  {
    title: 'Data Analysis',
    description: 'Data analysis and visualization projects.',
    link: 'https://github.com/yourusername/data-analysis'
  }
]

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-8 text-center">Projects</h1>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <a
              key={index}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="p-6 border rounded-lg hover:border-gray-300 transition-colors">
                <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-600">
                  {project.title}
                </h2>
                <p className="text-gray-600">{project.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </main>
  )
} 