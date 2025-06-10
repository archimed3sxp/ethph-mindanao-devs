import React from 'react';
import { Book, ExternalLink, Globe, Github, FileText, Shield, Code } from 'lucide-react';

interface Resource {
  title: string;
  description: string;
  url: string;
  icon: React.ReactNode;
  category: 'documentation' | 'tutorial' | 'tool' | 'community' | 'security' | 'book';
}

const Resources: React.FC = () => {
  const resources: Resource[] = [
    {
      title: "Solidity Documentation",
      description: "Official documentation for the Solidity programming language",
      url: "https://docs.soliditylang.org/",
      icon: <Book className="h-5 w-5" />,
      category: "documentation",
    },
    {
      title: "Foundry Documentation",
      description: "Official documentation for the Foundry development toolkit",
      url: "https://book.getfoundry.sh/",
      icon: <Book className="h-5 w-5" />,
      category: "documentation",
    },
    {
      title: "WAGMI Documentation",
      description: "Collection of React Hooks for Ethereum development",
      url: "https://wagmi.sh/",
      icon: <Book className="h-5 w-5" />,
      category: "documentation",
    },
    {
      title: "Solidity by Example",
      description: "Learn Solidity with simple, practical examples",
      url: "https://solidity-by-example.org/",
      icon: <Code className="h-5 w-5" />,
      category: "tutorial",
    },
    {
      title: "Alchemy University",
      description: "Learn blockchain development with interactive courses",
      url: "https://university.alchemy.com/",
      icon: <Book className="h-5 w-5" />,
      category: "tutorial",
    },
    {
      title: "Cyfrin Updraft",
      description: "Advanced smart contract security and development courses",
      url: "https://updraft.cyfrin.io/",
      icon: <Book className="h-5 w-5" />,
      category: "tutorial",
    },
    {
      title: "SpeedRunEthereum",
      description: "Learn Ethereum development through hands-on challenges",
      url: "https://speedrunethereum.com/",
      icon: <Code className="h-5 w-5" />,
      category: "tutorial",
    },
    {
      title: "Chainlink",
      description: "Decentralized oracle network for smart contracts",
      url: "https://chain.link/",
      icon: <Globe className="h-5 w-5" />,
      category: "tool",
    },
    {
      title: "QuickNode",
      description: "Blockchain infrastructure and node provider",
      url: "https://www.quicknode.com/",
      icon: <Globe className="h-5 w-5" />,
      category: "tool",
    },
    {
      title: "Infura",
      description: "Web3 development platform and infrastructure",
      url: "https://www.infura.io/",
      icon: <Globe className="h-5 w-5" />,
      category: "tool",
    },
    {
      title: "RainbowKit",
      description: "The best way to connect a wallet",
      url: "https://www.rainbowkit.com/",
      icon: <Code className="h-5 w-5" />,
      category: "tool",
    },
    {
      title: "Sepolia Faucet",
      description: "Get testnet ETH for development",
      url: "https://sepolia-faucet.pk910.de/",
      icon: <Globe className="h-5 w-5" />,
      category: "tool",
    },
    {
      title: "Ethereum Stack Exchange",
      description: "Q&A platform for Ethereum developers",
      url: "https://ethereum.stackexchange.com/",
      icon: <Globe className="h-5 w-5" />,
      category: "community",
    },
    {
      title: "ETH PH",
      description: "Philippine Ethereum Community",
      url: "https://eth63.org",
      icon: <Globe className="h-5 w-5" />,
      category: "community",
    },
    {
      title: "Ethernaut",
      description: "Learn Ethereum security through gamified challenges",
      url: "https://ethernaut.openzeppelin.com/",
      icon: <Shield className="h-5 w-5" />,
      category: "security",
    },
    {
      title: "Damn Vulnerable DeFi",
      description: "Learn DeFi security through challenges",
      url: "https://www.damnvulnerabledefi.xyz/",
      icon: <Shield className="h-5 w-5" />,
      category: "security",
    },
    {
      title: "ETH Tech Tree",
      description: "Comprehensive guide to Ethereum development resources",
      url: "https://www.ethtechtree.com/",
      icon: <Shield className="h-5 w-5" />,
      category: "security",
    },
    {
      title: "BuidlGuidl CTF",
      description: "Capture The Flag challenges for Ethereum developers",
      url: "https://ctf.buidlguidl.com/",
      icon: <Shield className="h-5 w-5" />,
      category: "security",
    },
    {
      title: "Mastering Ethereum",
      description: "Comprehensive book by Andreas M. Antonopoulos and Gavin Wood",
      url: "https://github.com/ethereumbook/ethereumbook",
      icon: <FileText className="h-5 w-5" />,
      category: "book",
    },
  ];

  const categoryLabels = {
    documentation: "Documentation",
    tutorial: "Tutorials",
    tool: "Tools",
    community: "Community",
    security: "Security",
    book: "Books & Publications"
  };

  const categoryColors = {
    documentation: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    tutorial: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
    tool: "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300",
    community: "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
    security: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
    book: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
  };

  const categories = ['documentation', 'tutorial', 'tool', 'community', 'security', 'book'] as const;
  
  return (
    <div className="max-w-6xl mx-auto py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-solidity-900 dark:text-white mb-4">
          Solidity Learning Resources
        </h1>
        <p className="text-solidity-600 dark:text-gray-300">
          A curated list of the best resources to help you master Solidity and smart contract development.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {categories.map((category) => (
          <div 
            key={category}
            className="flex items-center p-3 rounded-lg bg-white dark:bg-solidity-900 shadow-sm"
          >
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${categoryColors[category]}`}>
              {categoryLabels[category]}
            </span>
          </div>
        ))}
      </div>

      {categories.map((category) => (
        <div key={category} className="mb-12">
          <h2 className="text-2xl font-bold text-solidity-900 dark:text-white mb-4">
            {categoryLabels[category]}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resources
              .filter(resource => resource.category === category)
              .map((resource, index) => (
                <a
                  key={index}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex bg-white dark:bg-solidity-900 p-5 rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 dark:border-solidity-800"
                >
                  <div className="flex-shrink-0 mr-4 text-ethereum-600 dark:text-ethereum-500">
                    {resource.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-solidity-900 dark:text-white mb-1 flex items-center">
                      {resource.title}
                      <ExternalLink className="ml-2 h-3.5 w-3.5 text-solidity-400 dark:text-gray-500" />
                    </h3>
                    <p className="text-sm text-solidity-600 dark:text-gray-300">
                      {resource.description}
                    </p>
                  </div>
                </a>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Resources;