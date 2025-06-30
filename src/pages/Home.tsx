import React from 'react';
import { Link } from 'react-router-dom';
import { Code, BookOpen, Cpu, ArrowRight, Github, Shield, Zap, GitFork, Globe, Settings } from 'lucide-react';
import TutorialCard from '../components/shared/TutorialCard';

const Home: React.FC = () => {
  return (
    <div className="space-y-12 pb-12 animate-fade-in">
      {/* Hero Section */}
      <section className="text-center py-12 px-4 sm:py-20">
        <h1 className="text-4xl sm:text-5xl font-bold text-solidity-900 dark:text-white mb-4">
          <span className="text-ethereum-600">ETH PH MINDANAO</span> Developer Track
        </h1>
        <p className="max-w-2xl mx-auto text-xl text-solidity-600 dark:text-gray-300 mb-8">
          Learn Solidity and Smart Contract Development. This tutorial is created by ETH PH to help Davaoenos to master blockchain programming with interactive tutorials, practical examples, and hands-on projects
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
          <Link
            to="/tutorials/introduction"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-ethereum-600 hover:bg-ethereum-700 transition-colors"
          >
            Start Learning <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <Link
            to="/playground"
            className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-solidity-700 text-base font-medium rounded-md shadow-sm text-solidity-700 dark:text-white bg-white dark:bg-solidity-800 hover:bg-gray-50 dark:hover:bg-solidity-700 transition-colors"
          >
            Try Playground <Code className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Featured Tutorials */}
      <section className="py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-solidity-900 dark:text-white mb-2">
            Featured Tutorials
          </h2>
          <p className="text-solidity-600 dark:text-gray-300">
            Learn Solidity step-by-step with our comprehensive tutorials
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <TutorialCard
            title="Introduction to Solidity"
            description="Learn about Solidity and its role in Ethereum smart contract development"
            icon={<BookOpen className="h-6 w-6" />}
            difficulty="Beginner"
            duration="20 min"
            path="/tutorials/introduction"
          />
          <TutorialCard
            title="Setting Up Your Environment"
            description="Configure your development environment for Solidity programming"
            icon={<Code className="h-6 w-6" />}
            difficulty="Beginner"
            duration="15 min"
            path="/tutorials/setup"
          />
          <TutorialCard
            title="Solidity Basics"
            description="Learn the fundamental syntax and structure of Solidity code"
            icon={<Cpu className="h-6 w-6" />}
            difficulty="Beginner"
            duration="30 min"
            path="/tutorials/basic-syntax"
          />
          <TutorialCard
            title="Data Types in Solidity"
            description="Explore the various data types available in Solidity"
            icon={<Code className="h-6 w-6" />}
            difficulty="Beginner"
            duration="25 min"
            path="/tutorials/data-types"
          />
          <TutorialCard
            title="Functions & Modifiers"
            description="Learn how to create and use functions and modifiers in Solidity"
            icon={<Zap className="h-6 w-6" />}
            difficulty="Intermediate"
            duration="35 min"
            path="/tutorials/functions"
          />
          <TutorialCard
            title="Smart Contract Design Patterns"
            description="Understand common vulnerabilities and how to secure your contracts"
            icon={<Shield className="h-6 w-6" />}
            difficulty="Advanced"
            duration="45 min"
            path="/tutorials/design-patterns"
          />
        </div>
        
        <div className="mt-8 text-center">
          <Link
            to="/tutorials/introduction"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-ethereum-600 dark:text-ethereum-400 hover:text-ethereum-800 dark:hover:text-ethereum-300 transition-colors"
          >
            View All Tutorials <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* What is this for? */}
      <section className="py-8 bg-gray-50 dark:bg-solidity-800 rounded-lg p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-solidity-900 dark:text-white mb-2">
            What is this for?
          </h2>
          <p className="text-solidity-600 dark:text-gray-300">
            This platform is designed to help the ETH PH developer community learn and master blockchain development
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-solidity-900 p-6 rounded-lg shadow-sm">
            <div className="text-ethereum-600 mb-4">
              <Zap className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold text-solidity-900 dark:text-white mb-2">
              Interactive Learning
            </h3>
            <p className="text-solidity-600 dark:text-gray-300">
              Practice Solidity programming directly in your browser with our interactive playground and tutorials
            </p>
          </div>
          
          <div className="bg-white dark:bg-solidity-900 p-6 rounded-lg shadow-sm">
            <div className="text-ethereum-600 mb-4">
              <Cpu className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold text-solidity-900 dark:text-white mb-2">
              Community Projects
            </h3>
            <p className="text-solidity-600 dark:text-gray-300">
              Showcase your blockchain projects and collaborate with other developers in the community
            </p>
          </div>
          
          <div className="bg-white dark:bg-solidity-900 p-6 rounded-lg shadow-sm">
            <div className="text-ethereum-600 mb-4">
              <Github className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold text-solidity-900 dark:text-white mb-2">
              Local Support
            </h3>
            <p className="text-solidity-600 dark:text-gray-300">
              Find and connect with fellow Filipino developers
            </p>
          </div>
        </div>
      </section>

      {/* Fork and Deploy Section */}
      <section className="py-12 bg-gradient-to-br from-ethereum-50 to-blue-50 dark:from-solidity-900 dark:to-solidity-800 rounded-lg p-8">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-solidity-900 dark:text-white mb-4">
            Deploy for Your Community
          </h2>
          <p className="text-lg text-solidity-600 dark:text-gray-300 max-w-3xl mx-auto">
            This platform is open sourced by Danki and designed to be forked by different ETHPH communities. 
            Follow these steps to create your own customized version for your local developer community.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="bg-white dark:bg-solidity-900 p-6 rounded-lg shadow-sm">
            <div className="text-ethereum-600 mb-4">
              <GitFork className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold text-solidity-900 dark:text-white mb-2">
              Fork Repository
            </h3>
            <p className="text-solidity-600 dark:text-gray-300">
              Create your own copy of the codebase and customize it for your community
            </p>
          </div>
          
          <div className="bg-white dark:bg-solidity-900 p-6 rounded-lg shadow-sm">
            <div className="text-ethereum-600 mb-4">
              <Settings className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold text-solidity-900 dark:text-white mb-2">
              Customize Content
            </h3>
            <p className="text-solidity-600 dark:text-gray-300">
              Update branding, content, and tutorials to match your community's needs
            </p>
          </div>
          
          <div className="bg-white dark:bg-solidity-900 p-6 rounded-lg shadow-sm">
            <div className="text-ethereum-600 mb-4">
              <Globe className="h-8 w-8" />
            </div>
            <h3 className="text-lg font-semibold text-solidity-900 dark:text-white mb-2">
              Deploy & Share
            </h3>
            <p className="text-solidity-600 dark:text-gray-300">
              Deploy to Netlify with your custom domain and share with your community
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-solidity-900 rounded-lg p-8 shadow-sm">
          <h3 className="text-xl font-bold text-solidity-900 dark:text-white mb-6">
            Step-by-Step Deployment Guide
          </h3>
          
          <div className="space-y-8">
            {/* Step 1 */}
            <div className="flex">
              <div className="flex-shrink-0 w-8 h-8 bg-ethereum-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                1
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-solidity-900 dark:text-white mb-2">
                  Fork the Repository
                </h4>
                <p className="text-solidity-600 dark:text-gray-300 mb-3">
                  Create your own copy of the repository on GitHub:
                </p>
                <div className="bg-gray-50 dark:bg-solidity-800 p-4 rounded-lg">
                  <ol className="list-decimal list-inside space-y-2 text-sm">
                    <li>Visit the <a href="https://github.com/0xdanki/ethph-academy" target="_blank" rel="noopener noreferrer" className="text-ethereum-600 hover:text-ethereum-700 underline">original repository</a></li>
                    <li>Click the "Fork" button in the top-right corner</li>
                    <li>Choose your GitHub account as the destination</li>
                    <li>Optionally rename the repository (e.g., "ethph-mindanao-devs")</li>
                  </ol>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex">
              <div className="flex-shrink-0 w-8 h-8 bg-ethereum-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                2
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-solidity-900 dark:text-white mb-2">
                  Clone and Customize
                </h4>
                <p className="text-solidity-600 dark:text-gray-300 mb-3">
                  Clone your fork locally and customize the content:
                </p>
                <div className="bg-gray-50 dark:bg-solidity-800 p-4 rounded-lg">
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="font-medium mb-1">Clone your repository:</p>
                      <code className="bg-gray-200 dark:bg-solidity-700 px-2 py-1 rounded text-xs">
                        git clone git@github.com:yourusername/your-repo-name.git
                      </code>
                    </div>
                    <div>
                      <p className="font-medium mb-1">Key files to customize:</p>
                      <ul className="list-disc list-inside space-y-1 ml-4">
                        <li><code>src/pages/Home.tsx</code> - Update hero section and community name</li>
                        <li><code>src/components/layout/Navbar.tsx</code> - Change branding and links</li>
                        <li><code>src/components/layout/Footer.tsx</code> - Update footer information</li>
                        <li><code>index.html</code> - Update page title and meta description</li>
                        <li><code>public/ethereum-icon.svg</code> - Replace with your community logo</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex">
              <div className="flex-shrink-0 w-8 h-8 bg-ethereum-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                3
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-solidity-900 dark:text-white mb-2">
                  Deploy to Netlify
                </h4>
                <p className="text-solidity-600 dark:text-gray-300 mb-3">
                  Deploy your customized site to Netlify for free hosting:
                </p>
                <div className="bg-gray-50 dark:bg-solidity-800 p-4 rounded-lg">
                  <ol className="list-decimal list-inside space-y-2 text-sm">
                    <li>Push your changes to your GitHub repository</li>
                    <li>Visit <a href="https://netlify.com" target="_blank" rel="noopener noreferrer" className="text-ethereum-600 hover:text-ethereum-700 underline">netlify.com</a> and sign up/login</li>
                    <li>Click "New site from Git" and connect your GitHub account</li>
                    <li>Select your forked repository</li>
                    <li>Set build command: <code className="bg-gray-200 dark:bg-solidity-700 px-1 rounded">npm run build</code></li>
                    <li>Set publish directory: <code className="bg-gray-200 dark:bg-solidity-700 px-1 rounded">dist</code></li>
                    <li>Click "Deploy site"</li>
                  </ol>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex">
              <div className="flex-shrink-0 w-8 h-8 bg-ethereum-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                4
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-solidity-900 dark:text-white mb-2">
                  Set Up Custom Domain (Optional)
                </h4>
                <p className="text-solidity-600 dark:text-gray-300 mb-3">
                  Use your own domain name for a professional look:
                </p>
                <div className="bg-gray-50 dark:bg-solidity-800 p-4 rounded-lg">
                  <ol className="list-decimal list-inside space-y-2 text-sm">
                    <li>Purchase a domain from a registrar (e.g., Namecheap, GoDaddy)</li>
                    <li>In Netlify, go to Site settings → Domain management</li>
                    <li>Click "Add custom domain" and enter your domain</li>
                    <li>Update your domain's DNS settings with the provided records</li>
                    <li>Enable HTTPS (Netlify provides free SSL certificates)</li>
                  </ol>
                </div>
              </div>
            </div>

            {/* Step 5 */}
            <div className="flex">
              <div className="flex-shrink-0 w-8 h-8 bg-ethereum-600 text-white rounded-full flex items-center justify-center font-bold mr-4">
                5
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-solidity-900 dark:text-white mb-2">
                  Continuous Deployment
                </h4>
                <p className="text-solidity-600 dark:text-gray-300 mb-3">
                  Set up automatic deployments for easy updates:
                </p>
                <div className="bg-gray-50 dark:bg-solidity-800 p-4 rounded-lg">
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    <li>Netlify automatically deploys when you push to your main branch</li>
                    <li>Create a <code className="bg-gray-200 dark:bg-solidity-700 px-1 rounded">netlify.toml</code> file for advanced build settings</li>
                    <li>Set up branch deploys for testing changes before going live</li>
                    <li>Use environment variables for any sensitive configuration</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border-l-4 border-blue-400">
            <h4 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">
              💡 Customization Ideas
            </h4>
            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <li>• Update the hero section with your city/community name</li>
              <li>• Add local meetup information and events</li>
              <li>• Include community-specific resources and links</li>
              <li>• Add content in your local language</li>
              <li>• Let community members add tutorials and information to the knowledgebase</li>
              <li>• Include local developer exercises and projects</li>
            </ul>
          </div>

          <div className="mt-6 p-6 bg-green-50 dark:bg-green-900/20 rounded-lg border-l-4 border-green-400">
            <h4 className="text-lg font-semibold text-green-800 dark:text-green-200 mb-2">
              🚀 Need Help?
            </h4>
            <p className="text-sm text-green-700 dark:text-green-300">
              Join our community on Facebook or create an issue on GitHub if you need assistance with deployment or customization. 
              The whole ETHPH community is cheering for you!
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 text-center">
        <h2 className="text-2xl font-bold text-solidity-900 dark:text-white mb-4">
          Ready to Start Your Blockchain Journey?
        </h2>
        <p className="max-w-2xl mx-auto text-solidity-600 dark:text-gray-300 mb-8">
          Join the ETHPH developer community and start building decentralized applications today
        </p>
        <Link
          to="/tutorials/introduction"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-ethereum-600 hover:bg-ethereum-700 transition-colors"
        >
          Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </section>
    </div>
  );
};

export default Home;
