import { Github, Search, Command } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="fixed w-full bg-white/80 backdrop-blur-sm border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <img src="/logo.svg" alt="ConnextJS" className="h-8 w-8" />
              <span className="text-xl font-semibold bg-gradient-to-r from-blue-600 via-blue-500 to-purple-500 bg-clip-text text-transparent">
                ConnextJS
              </span>
              <span className="text-xs px-2 py-1 rounded-full bg-blue-100 text-blue-700 ml-2">
                v1.0.0
              </span>
            </div>
            
            <div className="hidden md:flex items-center gap-6">
              <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
              <a href="#docs" className="text-gray-600 hover:text-gray-900">Documentation</a>
              <a href="https://github.com" className="text-gray-600 hover:text-gray-900">GitHub</a>
              
              <div className="relative ml-4">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search docs..."
                  className="pl-10 pr-4 py-2 w-64 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <kbd className="absolute right-3 top-2.5 px-2 py-1 text-xs font-sans font-semibold text-gray-500 bg-white border border-gray-200 rounded">
                  <span className="sr-only">Keyboard shortcut: </span>
                  <Command className="inline-block h-3 w-3 mr-1" />L
                </kbd>
              </div>
            </div>
            
            <div className="md:hidden">
              <button className="p-2 rounded-lg bg-gray-50 text-gray-600 hover:bg-gray-100">
                <Search className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl font-bold bg-gradient-to-r from-blue-600 via-blue-500 to-purple-500 bg-clip-text text-transparent mb-6">
              The Next Generation JavaScript Framework
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
              Build blazing fast web applications with ConnextJS. Simple, powerful, and flexible framework designed for modern web development.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#docs"
                className="px-8 py-4 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
              >
                Get Started
              </a>
              <a
                href="https://github.com"
                className="px-8 py-4 rounded-lg bg-gray-100 text-gray-900 font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
              >
                <Github className="h-5 w-5" />
                View on GitHub
              </a>
            </div>
          </div>

          {/* Features Grid */}
          <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-6 rounded-xl bg-white border border-gray-100 hover:border-blue-500 transition-colors"
              >
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <img src="/logo.svg" alt="ConnextJS" className="h-8 w-8" />
              <span className="text-xl font-semibold text-gray-900">ConnextJS</span>
            </div>
            <div className="flex gap-6 text-gray-600">
              <a href="#" className="hover:text-gray-900">About</a>
              <a href="#" className="hover:text-gray-900">Blog</a>
              <a href="#" className="hover:text-gray-900">Docs</a>
              <a href="#" className="hover:text-gray-900">GitHub</a>
            </div>
            <div className="text-sm text-gray-500">
              © {new Date().getFullYear()} ConnextJS. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

const features = [
  {
    title: 'Lightning Fast',
    description: 'Built with performance in mind, ConnextJS delivers blazing fast page loads and smooth interactions.',
    icon: <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  },
  {
    title: 'Developer Friendly',
    description: 'Intuitive APIs and excellent documentation make development a breeze.',
    icon: <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
    </svg>
  },
  {
    title: 'Modern Architecture',
    description: 'Built on modern web standards with a focus on modularity and scalability.',
    icon: <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
    </svg>
  }
];

export default App;