import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            Brodie Groch
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Software Engineer & Full Stack Developer
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/projects"
              className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            >
              View Projects
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 border border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors"
            >
              Contact Me
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="container mx-auto px-4 py-20 bg-white dark:bg-gray-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">About Me</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <p className="text-gray-600 dark:text-gray-300">
                I'm a passionate software engineer with expertise in full-stack development.
                I love creating elegant solutions to complex problems and building
                user-friendly applications that make a difference.
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                My tech stack includes modern frameworks and tools like React, Next.js,
                Node.js, and more. I'm always eager to learn new technologies and
                best practices.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h3 className="font-semibold mb-2">Frontend</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  React, Next.js, Tailwind CSS
                </p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h3 className="font-semibold mb-2">Backend</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Node.js, Express, MongoDB
                </p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h3 className="font-semibold mb-2">Tools</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Git, Docker, AWS
                </p>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h3 className="font-semibold mb-2">Languages</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  JavaScript, TypeScript, Python
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Let's Connect</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            I'm always open to discussing new projects, creative ideas, or
            opportunities to be part of your vision.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
