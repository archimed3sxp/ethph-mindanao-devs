import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Code } from 'lucide-react';
import CodeBlock from '../../components/shared/CodeBlock';

const Setup: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto py-8 animate-fade-in">
      <div className="mb-8">
        <div className="flex items-center text-sm text-solidity-500 dark:text-gray-400 mb-2">
          <Code className="h-4 w-4 mr-1" />
          <span>Getting Started</span>
        </div>
        <h1 className="text-3xl font-bold text-solidity-900 dark:text-white mb-4">
          Setting Up Your Development Environment
        </h1>
        <div className="flex items-center text-sm text-solidity-500 dark:text-gray-400">
          <span className="mr-4">Difficulty: Beginner</span>
          <span>Reading time: ~15 min</span>
        </div>
      </div>

      <div className="prose dark:prose-invert prose-ethereum max-w-none">
        <p className="text-lg text-solidity-700 dark:text-gray-200 leading-relaxed">
          Before you can start building smart contracts, you need to set up your development environment. This tutorial will guide you through installing the necessary tools and configuring your workspace for Solidity development.
        </p>

        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 dark:border-blue-600 p-4 my-6">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">Complete Setup Guide</h3>
              <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                <p>
                  For a comprehensive, step-by-step setup guide that covers all the tools and configurations needed for blockchain development, check out our detailed setup repository:
                </p>
                <a 
                  href="https://github.com/0xDanki/blockchain-development-setup" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center mt-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium"
                >
                  Blockchain Development Setup Guide
                  <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <h2>Development Tools Overview</h2>
        
        <p>
          Solidity development requires several tools:
        </p>
        
        <ul>
          <li><strong>Foundry</strong> - A blazing fast and modular smart contract development toolkit</li>
          <li><strong>Development Environment</strong> - An IDE or code editor with Solidity support</li>
          <li><strong>Git</strong> - For version control and dependency management</li>
        </ul>

        <h2>Option 1: Online Development Environments</h2>
        
        <p>
          If you're just starting out, online IDEs are the easiest way to begin:
        </p>

        <h3>Remix IDE</h3>
        
        <p>
          <a href="https://remix.ethereum.org/" target="_blank" rel="noopener noreferrer" className="text-ethereum-600 hover:text-ethereum-700 dark:text-ethereum-400 dark:hover:text-ethereum-300">
            Remix IDE
          </a> is a web-based integrated development environment that enables you to write, compile, deploy, and debug Solidity code directly in your browser.
        </p>
        
        <p>
          <strong>Advantages:</strong>
        </p>
        <ul>
          <li>No installation required</li>
          <li>Intuitive interface</li>
          <li>Built-in compiler and debugger</li>
          <li>Support for multiple contract files</li>
          <li>Easy deployment to test networks</li>
        </ul>

        <h2>Option 2: Local Development Setup</h2>
        
        <h3>Installing Git</h3>
        
        <p>
          First, install Git if you haven't already:
        </p>
        
        <CodeBlock
          code={`# On macOS using Homebrew
brew install git

# On Ubuntu/Debian
sudo apt update
sudo apt install git

# On Windows
# Download and install from https://git-scm.com/`}
          language="bash"
        />

        <h3>Installing Foundry</h3>
        
        <p>
          Install Foundry using the following commands:
        </p>

        <CodeBlock
          code={`# On macOS or Linux
curl -L https://foundry.paradigm.xyz | bash
foundryup

# On Windows (using Git Bash)
curl -L https://foundry.paradigm.xyz | bash
# Then restart your terminal and run:
foundryup`}
          language="bash"
        />

        <h3>Setting Up a New Foundry Project</h3>
        
        <CodeBlock
          code={`# Create a new directory for your project
mkdir my-solidity-project
cd my-solidity-project

# Initialize a new Foundry project
forge init`}
          language="bash"
        />
        
        <p>
          This creates a project with the following structure:
        </p>
        
        <pre className="bg-gray-100 dark:bg-solidity-800 p-4 rounded-md">
my-solidity-project/
├── lib/             # Dependencies (git submodules)
├── src/             # Contract source files
│   └── Counter.sol
├── test/            # Test files
│   └── Counter.t.sol
├── script/          # Deployment scripts
│   └── Counter.s.sol
└── foundry.toml     # Foundry configuration
        </pre>

        <h2>Setting Up Your Code Editor</h2>
        
        <h3>Visual Studio Code</h3>
        
        <p>
          VS Code is a popular editor for Solidity development. Install these extensions:
        </p>
        
        <ul>
          <li><strong>Solidity</strong> by Juan Blanco - Syntax highlighting and compilation</li>
          <li><strong>Solidity Visual Developer</strong> - Code completion, hover info, and diagnostics</li>
          <li><strong>Prettier</strong> - Code formatting</li>
        </ul>

        <h3>Foundry Configuration</h3>
        
        <p>
          Create or update your foundry.toml configuration file:
        </p>

        <CodeBlock
          code={`[profile.default]
src = "src"
test = "test"
out = "out"
libs = ["lib"]

[profile.default.optimizer_details]
peephole = true
inliner = true
jumpdest_remover = true
order_literals = true
deduplicate = true
cse = true
constant_optimizer = true
yul = true

[profile.default.optimizer]
enabled = true
runs = 200`}
          language="toml"
        />

        <h2>Next Steps</h2>
        
        <p>
          Now that your development environment is set up, you're ready to start coding in Solidity! In the next tutorial, we'll explore the basic syntax and structure of Solidity contracts.
        </p>

        <div className="mt-12 border-t border-gray-200 dark:border-solidity-800 pt-6">
          <div className="flex justify-between items-center">
            <Link
              to="/tutorials/introduction"
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-solidity-700 text-sm font-medium rounded-md text-solidity-700 dark:text-white bg-white dark:bg-solidity-800 hover:bg-gray-50 dark:hover:bg-solidity-700 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous: Introduction
            </Link>
            <Link
              to="/tutorials/foundry"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-ethereum-600 hover:bg-ethereum-700 transition-colors"
            >
              Next: Foundry <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setup;