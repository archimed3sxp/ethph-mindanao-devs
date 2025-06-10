import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, ChevronDown, BookOpen, Code, Cpu, Shield, Zap, Lightbulb, Wrench, Wallet } from 'lucide-react';

interface MenuSection {
  title: string;
  icon: React.ReactNode;
  items: {
    title: string;
    path: string;
  }[];
  isOpen?: boolean;
}

const Sidebar: React.FC = () => {
  const location = useLocation();
  
  const [menuSections, setMenuSections] = useState<MenuSection[]>([
    {
      title: 'Getting Started',
      icon: <BookOpen className="h-5 w-5" />,
      isOpen: true,
      items: [
        { title: 'Introduction to Solidity', path: '/tutorials/introduction' },
        { title: 'Development Environment', path: '/tutorials/setup' },
        { title: 'GitHub Basics', path: '/tutorials/github-basics' },
      ],
    },
    {
      title: 'Solidity Basics',
      icon: <Code className="h-5 w-5" />,
      isOpen: false,
      items: [
        { title: 'Basic Syntax', path: '/tutorials/basic-syntax' },
        { title: 'Data Types', path: '/tutorials/data-types' },
        { title: 'Functions', path: '/tutorials/functions' },
        { title: 'Contract Linking', path: '/tutorials/contract-linking' },
        { title: 'Inheritance & Interfaces', path: '/tutorials/inheritance' },
      ],
    },
    {
      title: 'Smart Contracts',
      icon: <Cpu className="h-5 w-5" />,
      isOpen: false,
      items: [
        { title: 'ERC20 Tokens', path: '/tutorials/erc20' },
        { title: 'ERC721 NFTs', path: '/tutorials/erc721' },
        { title: 'ERC1155 Multi-Token', path: '/tutorials/erc1155' },
      ],
    },
    {
      title: 'Foundry',
      icon: <Wrench className="h-5 w-5" />,
      isOpen: false,
      items: [
        { title: 'Getting Started with Foundry', path: '/tutorials/foundry' },
        { title: 'Common Scripts & Commands', path: '/tutorials/foundry-scripts' },
      ],
    },
    {
      title: 'Security',
      icon: <Shield className="h-5 w-5" />,
      isOpen: false,
      items: [
        { title: 'Best Practices', path: '/tutorials/security-best-practices' },
        { title: 'Common Attacks', path: '/tutorials/common-attacks' },
        { title: 'DevOps Security', path: '/tutorials/devops-security' },
      ],
    },
    {
      title: 'Advanced Topics',
      icon: <Zap className="h-5 w-5" />,
      isOpen: false,
      items: [
        { title: 'Chainlink VRF', path: '/tutorials/chainlink-vrf' },
        { title: 'Oracle Integration', path: '/tutorials/oracle-integration' },
        { title: 'Gas Optimization', path: '/tutorials/gas-optimization' },
        { title: 'Design Patterns', path: '/tutorials/design-patterns' },
      ],
    },
    {
      title: 'WAGMI',
      icon: <Wallet className="h-5 w-5" />,
      isOpen: false,
      items: [
        { title: 'WAGMI Integration', path: '/tutorials/wagmi-integration' },
        { title: 'Transaction Status', path: '/tutorials/transaction-status' },
        { title: 'Wallet Actions', path: '/tutorials/wallet-actions' },
        { title: 'Contract Interactions', path: '/tutorials/contract-interactions' },
        { title: 'NFT Minter', path: '/tutorials/nft-minter' },
        { title: 'Marketplace', path: '/tutorials/marketplace' },
        { title: 'USDC Payment Widget', path: '/tutorials/usdc-payment' },
      ],
    },
  ]);

  const toggleSection = (index: number) => {
    const updatedSections = [...menuSections];
    updatedSections[index].isOpen = !updatedSections[index].isOpen;
    setMenuSections(updatedSections);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="hidden md:block w-64 bg-gray-50 dark:bg-solidity-900 border-r border-gray-200 dark:border-solidity-800 overflow-y-auto">
      <div className="py-4">
        <div className="px-4 py-2">
          <div className="flex items-center">
            <Lightbulb className="h-5 w-5 text-ethereum-500" />
            <span className="ml-2 text-sm font-semibold text-solidity-700 dark:text-gray-200">
              Learning Path
            </span>
          </div>
        </div>
        
        <nav className="mt-2">
          {menuSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-2">
              <button
                onClick={() => toggleSection(sectionIndex)}
                className="w-full flex items-center justify-between px-4 py-2 text-left text-sm font-medium text-solidity-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-solidity-800 transition-colors"
              >
                <div className="flex items-center">
                  {section.icon}
                  <span className="ml-2">{section.title}</span>
                </div>
                {section.isOpen ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>
              
              {section.isOpen && (
                <div className="pl-6 pr-2">
                  {section.items.map((item, itemIndex) => (
                    <Link
                      key={itemIndex}
                      to={item.path}
                      className={`block px-4 py-2 text-sm rounded-md ${
                        isActive(item.path)
                          ? 'bg-ethereum-100 dark:bg-solidity-800 text-ethereum-800 dark:text-ethereum-400 font-medium'
                          : 'text-solidity-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-solidity-800 transition-colors'
                      }`}
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;