import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Code } from 'lucide-react';
import CodeBlock from '../../components/shared/CodeBlock';

const GitHubBasics: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto py-8 animate-fade-in">
      <div className="mb-8">
        <div className="flex items-center text-sm text-solidity-500 dark:text-gray-400 mb-2">
          <Code className="h-4 w-4 mr-1" />
          <span>Getting Started</span>
        </div>
        <h1 className="text-3xl font-bold text-solidity-900 dark:text-white mb-4">
          GitHub Basics & Project Setup
        </h1>
        <div className="flex items-center text-sm text-solidity-500 dark:text-gray-400">
          <span className="mr-4">Difficulty: Beginner</span>
          <span>Reading time: ~35 min</span>
        </div>
      </div>

      <div className="prose dark:prose-invert prose-ethereum max-w-none">
        <p className="text-lg text-solidity-700 dark:text-gray-200 leading-relaxed">
          Learn how to set up GitHub for your blockchain projects, manage version control, handle sensitive data securely using environment variables, configure SSH keys for seamless authentication, and collaborate effectively with your team.
        </p>

        <h2>1. Creating a GitHub Account</h2>
        
        <ol>
          <li>Visit <a href="https://github.com" target="_blank" rel="noopener noreferrer">github.com</a></li>
          <li>Click "Sign up" and follow the registration process</li>
          <li>Choose a free plan for your personal account</li>
          <li>Verify your email address</li>
        </ol>

        <h2>2. Installing Git</h2>

        <CodeBlock
          code={`# On macOS (using Homebrew)
brew install git

# On Ubuntu/Debian
sudo apt update
sudo apt install git

# On Windows
# Download Git from https://git-scm.com/download/win`}
          language="bash"
        />

        <h2>3. Configuring Git</h2>

        <p>
          Before you can start using Git, you need to configure it with your identity:
        </p>

        <CodeBlock
          code={`# Set your username (use your GitHub username)
git config --global user.name "Your Name"

# Set your email (use your GitHub email)
git config --global user.email "your.email@example.com"

# Optional: Set default branch to main
git config --global init.defaultBranch main

# Verify your configuration
git config --global --list`}
          language="bash"
        />

        <h2>4. Setting Up SSH Keys for Secure Authentication</h2>

        <p>
          SSH keys allow you to authenticate with GitHub without entering your password every time you push or pull code. This is more secure and convenient than using HTTPS with username/password.
        </p>

        <h3>Step 1: Check for Existing SSH Keys</h3>

        <CodeBlock
          code={`# Check if you already have SSH keys
ls -la ~/.ssh

# Look for files like:
# id_rsa.pub
# id_ed25519.pub
# id_ecdsa.pub`}
          language="bash"
        />

        <h3>Step 2: Generate a New SSH Key</h3>

        <p>
          If you don't have an SSH key or want to create a new one:
        </p>

        <CodeBlock
          code={`# Generate a new SSH key (replace with your GitHub email)
ssh-keygen -t ed25519 -C "your.email@example.com"

# If your system doesn't support ed25519, use RSA:
ssh-keygen -t rsa -b 4096 -C "your.email@example.com"

# When prompted:
# - Press Enter to accept the default file location
# - Enter a secure passphrase (optional but recommended)
# - Confirm the passphrase`}
          language="bash"
        />

        <h3>Step 3: Add SSH Key to SSH Agent</h3>

        <CodeBlock
          code={`# Start the SSH agent
eval "$(ssh-agent -s)"

# Add your SSH private key to the ssh-agent
ssh-add ~/.ssh/id_ed25519

# If you used RSA:
ssh-add ~/.ssh/id_rsa`}
          language="bash"
        />

        <h3>Step 4: Copy Your Public Key</h3>

        <CodeBlock
          code={`# Copy the SSH public key to your clipboard
# On macOS:
pbcopy < ~/.ssh/id_ed25519.pub

# On Linux:
cat ~/.ssh/id_ed25519.pub | xclip -selection clipboard

# On Windows (Git Bash):
cat ~/.ssh/id_ed25519.pub | clip

# If the above don't work, just display and manually copy:
cat ~/.ssh/id_ed25519.pub`}
          language="bash"
        />

        <h3>Step 5: Add SSH Key to GitHub</h3>

        <ol>
          <li>Go to <a href="https://github.com/settings/keys" target="_blank" rel="noopener noreferrer">GitHub SSH Settings</a></li>
          <li>Click "New SSH key"</li>
          <li>Give your key a descriptive title (e.g., "My Laptop")</li>
          <li>Paste your public key into the "Key" field</li>
          <li>Click "Add SSH key"</li>
          <li>Confirm with your GitHub password if prompted</li>
        </ol>

        <h3>Step 6: Test Your SSH Connection</h3>

        <CodeBlock
          code={`# Test your SSH connection to GitHub
ssh -T git@github.com

# You should see a message like:
# Hi username! You've successfully authenticated, but GitHub does not provide shell access.`}
          language="bash"
        />

        <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-400 dark:border-green-600 p-4 my-6">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800 dark:text-green-200">Success!</h3>
              <div className="mt-2 text-sm text-green-700 dark:text-green-300">
                <p>
                  If you see the authentication success message, you're all set! You can now push and pull from GitHub repositories without entering your password.
                </p>
              </div>
            </div>
          </div>
        </div>

        <h2>5. Basic Git Commands</h2>

        <p>
          Now that you have Git configured and SSH set up, let's learn the essential Git commands:
        </p>

        <CodeBlock
          code={`# Initialize a new repository
git init

# Clone a repository using SSH (recommended)
git clone git@github.com:username/repository.git

# Check repository status
git status

# Add files to staging area
git add filename.txt        # Add specific file
git add .                   # Add all files

# Commit changes with a message
git commit -m "Your descriptive commit message"

# Create and switch to a new branch
git checkout -b feature-branch

# Switch between branches
git checkout main
git checkout feature-branch

# Pull latest changes from remote
git pull origin main

# Push changes to remote repository
git push origin main
git push origin feature-branch

# View commit history
git log --oneline`}
          language="bash"
        />

        <h3>Converting Existing Repository to SSH</h3>

        <p>
          If you already have a repository cloned with HTTPS, you can switch it to SSH:
        </p>

        <CodeBlock
          code={`# Check current remote URL
git remote -v

# Change remote URL to SSH
git remote set-url origin git@github.com:username/repository.git

# Verify the change
git remote -v`}
          language="bash"
        />

        <h2>6. Setting Up Environment Variables</h2>

        <p>
          Environment variables are crucial for keeping sensitive information like private keys and API keys secure:
        </p>

        <h3>Create Environment Files</h3>

        <p>Create a <code>.env</code> file in your project root:</p>

        <CodeBlock
          code={`# .env
PRIVATE_KEY=your_private_key_here
ETHERSCAN_API_KEY=your_api_key_here
ALCHEMY_API_KEY=your_api_key_here
RPC_URL=your_rpc_url_here`}
          language="bash"
        />

        <p>Create a <code>.env.example</code> file to show required variables:</p>

        <CodeBlock
          code={`# .env.example
PRIVATE_KEY=your_private_key
ETHERSCAN_API_KEY=your_etherscan_api_key
ALCHEMY_API_KEY=your_alchemy_api_key
RPC_URL=your_rpc_url`}
          language="bash"
        />

        <h3>Setting Up .gitignore</h3>

        <p>Create a <code>.gitignore</code> file to exclude sensitive files from version control:</p>

        <CodeBlock
          code={`# Dependencies
node_modules
.pnp
.pnp.js

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Build files
dist
build
out

# Coverage
coverage
coverage.json

# Hardhat
cache
artifacts

# Foundry
cache/
out/

# IDE
.vscode
.idea
*.swp
*.swo

# Misc
.DS_Store
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*`}
          language="text"
        />

        <h3>Using Environment Variables in Code</h3>

        <p>In your JavaScript/TypeScript code:</p>

        <CodeBlock
          code={`import { config } from 'dotenv';
config();

const PRIVATE_KEY = process.env.PRIVATE_KEY;
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

if (!PRIVATE_KEY || !ETHERSCAN_API_KEY) {
  throw new Error('Missing environment variables');
}`}
          language="typescript"
        />

        <p>In your deployment scripts:</p>

        <CodeBlock
          code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Script.sol";

contract DeployScript is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);
        
        // Deployment logic here
        
        vm.stopBroadcast();
    }
}`}
          language="solidity"
        />

        <h2>7. Repository Collaboration Workflow</h2>

        <p>
          Working with a team on GitHub requires understanding the collaboration workflow. Here's how teams typically work together on projects:
        </p>

        <h3>Repository Permissions and Roles</h3>

        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 dark:border-blue-600 p-4 my-6">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">GitHub Repository Roles</h3>
              <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Owner:</strong> Full access, can delete repository, manage settings</li>
                  <li><strong>Admin:</strong> Can manage repository settings, add collaborators</li>
                  <li><strong>Write:</strong> Can push to repository, create branches, merge PRs</li>
                  <li><strong>Triage:</strong> Can manage issues and pull requests</li>
                  <li><strong>Read:</strong> Can view and clone repository</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <h3>Branch Protection and Pull Request Workflow</h3>

        <p>
          Most teams protect the main branch and require pull requests for changes:
        </p>

        <CodeBlock
          code={`# 1. Start by updating your main branch
git checkout main
git pull origin main

# 2. Create a new feature branch
git checkout -b feature/add-new-tutorial

# 3. Make your changes and commit them
git add .
git commit -m "Add new Solidity tutorial on inheritance"

# 4. Push your branch to GitHub
git push origin feature/add-new-tutorial

# 5. Create a Pull Request on GitHub
# - Go to your repository on GitHub
# - Click "Compare & pull request"
# - Add clear title and description
# - Request specific reviewers
# - Submit the pull request`}
          language="bash"
        />

        <h3>Code Review Process</h3>

        <p>
          Pull requests enable code review before changes are merged:
        </p>

        <div className="bg-gray-50 dark:bg-solidity-800 p-6 rounded-lg my-6">
          <h4 className="font-semibold mb-4">Typical Review Process:</h4>
          <ol className="list-decimal list-inside space-y-2">
            <li><strong>Developer creates PR:</strong> Submits pull request with clear description</li>
            <li><strong>Reviewers assigned:</strong> Team members or maintainers review the code</li>
            <li><strong>Feedback provided:</strong> Reviewers leave comments, suggestions, or approve</li>
            <li><strong>Changes requested:</strong> Developer makes requested changes if needed</li>
            <li><strong>Approval received:</strong> Reviewers approve the changes</li>
            <li><strong>Merge to main:</strong> PR is merged into the main branch</li>
            <li><strong>Deployment:</strong> Changes are automatically deployed (if configured)</li>
          </ol>
        </div>

        <h3>Who Approves Pull Requests?</h3>

        <p>
          PR approval depends on the repository's settings and team structure:
        </p>

        <ul>
          <li><strong>Repository Owner/Admin:</strong> Can always approve and merge</li>
          <li><strong>Designated Reviewers:</strong> Team members with write access</li>
          <li><strong>Code Owners:</strong> Specific people responsible for certain files/directories</li>
          <li><strong>Required Reviews:</strong> Some repos require 1-2 approvals before merging</li>
        </ul>

        <h3>Automatic Deployment</h3>

        <p>
          Many projects use Continuous Integration/Continuous Deployment (CI/CD):
        </p>

        <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-400 dark:border-green-600 p-4 my-6">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800 dark:text-green-200">Deployment Process</h3>
              <div className="mt-2 text-sm text-green-700 dark:text-green-300">
                <ol className="list-decimal pl-5 space-y-1">
                  <li>PR is merged to main branch</li>
                  <li>GitHub Actions or other CI/CD tools detect the change</li>
                  <li>Automated tests run to ensure code quality</li>
                  <li>If tests pass, the application is automatically deployed</li>
                  <li>Changes are live on the website within minutes</li>
                  <li><strong>No manual redeployment needed!</strong></li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <h2>8. Handling Merge Conflicts</h2>

        <p>
          When multiple people work on the same files, conflicts can occur:
        </p>

        <CodeBlock
          code={`# When pulling changes results in conflicts
git pull origin main

# Git will show conflict markers in files like:
# <<<<<<< HEAD
# Your changes
# =======
# Other person's changes
# >>>>>>> branch-name

# 1. Open the conflicted files and resolve manually
# 2. Remove conflict markers and choose the correct code
# 3. Add the resolved files
git add conflicted-file.js

# 4. Commit the resolution
git commit -m "Resolve merge conflict in conflicted-file.js"

# 5. Push the resolution
git push origin your-branch`}
          language="bash"
        />

        <h2>9. Keeping Your Fork Updated</h2>

        <p>
          If you're working on a forked repository, keep it synchronized with the original:
        </p>

        <CodeBlock
          code={`# Add the original repository as upstream
git remote add upstream git@github.com:original-owner/repository.git

# Fetch changes from upstream
git fetch upstream

# Switch to your main branch
git checkout main

# Merge upstream changes
git merge upstream/main

# Push updated main to your fork
git push origin main`}
          language="bash"
        />

        <h2>10. Example Daily Collaboration Workflow</h2>

        <CodeBlock
          code={`# Daily workflow for a team member:

# 1. Start your day by updating main branch
git checkout main
git pull origin main

# 2. Create a new branch for your task
git checkout -b feature/improve-homepage

# 3. Work on your changes
# Edit files, test locally, etc.

# 4. Commit your work regularly
git add .
git commit -m "Update homepage hero section with new design"

# 5. Push your branch when ready for review
git push origin feature/improve-homepage

# 6. Create Pull Request on GitHub
# - Add clear title and description
# - Request specific reviewers
# - Link to any related issues

# 7. Address review feedback
# Make changes based on reviewer comments
git add .
git commit -m "Address review feedback: improve mobile responsiveness"
git push origin feature/improve-homepage

# 8. After approval, merge is handled by maintainer
# Your changes are now live automatically!`}
          language="bash"
        />

        <h2>11. Troubleshooting SSH Issues</h2>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 dark:border-yellow-600 p-4 my-6">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Common SSH Issues</h3>
              <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Permission denied:</strong> Make sure your SSH key is added to GitHub and ssh-agent</li>
                  <li><strong>Host key verification failed:</strong> Run <code>ssh-keyscan github.com &gt;&gt; ~/.ssh/known_hosts</code></li>
                  <li><strong>Agent has no identities:</strong> Run <code>ssh-add ~/.ssh/id_ed25519</code></li>
                  <li><strong>Bad permissions:</strong> Run <code>chmod 600 ~/.ssh/id_ed25519</code></li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <h2>12. Best Practices</h2>

        <ul>
          <li><strong>Security:</strong> Never commit private keys or API keys</li>
          <li><strong>Authentication:</strong> Use SSH keys for secure, password-free authentication</li>
          <li><strong>Environment Variables:</strong> Always use environment variables for sensitive data</li>
          <li><strong>Documentation:</strong> Keep your .env.example file updated for team reference</li>
          <li><strong>Commits:</strong> Use meaningful commit messages that describe what and why</li>
          <li><strong>Pull Requests:</strong> Create small, focused pull requests for easier review</li>
          <li><strong>Communication:</strong> Communicate with your team about major changes</li>
          <li><strong>Code Quality:</strong> Follow your team's coding standards and conventions</li>
          <li><strong>Regular Updates:</strong> Keep your SSH keys updated and remove old ones</li>
          <li><strong>Organization:</strong> Keep repositories organized and well-documented</li>
        </ul>

        <div className="mt-12 border-t border-gray-200 dark:border-solidity-800 pt-6">
          <div className="flex justify-between items-center">
            <Link
              to="/tutorials/setup"
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-solidity-700 text-sm font-medium rounded-md text-solidity-700 dark:text-white bg-white dark:bg-solidity-800 hover:bg-gray-50 dark:hover:bg-solidity-700 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous: Setup
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

export default GitHubBasics;