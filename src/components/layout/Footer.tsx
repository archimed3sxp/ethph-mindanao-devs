import React from 'react';
import { Github, Twitter, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-solidity-900 border-t border-gray-200 dark:border-solidity-800 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-solidity-600 dark:text-gray-400">
              © {new Date().getFullYear()} <a href="https://mirror.xyz/donkadonk.eth" target="_blank" rel="noopener noreferrer" className="hover:text-ethereum-600 dark:hover:text-ethereum-400 transition-colors">Tin Erispe</a>. All rights reserved.
            </p>
          </div>
          
          <div className="flex items-center space-x-6">
            <a 
              href="https://github.com/0xdanki" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-solidity-600 dark:text-gray-400 hover:text-ethereum-600 dark:hover:text-ethereum-400 transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
            <a 
              href="https://twitter.com/0xdankiii" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-solidity-600 dark:text-gray-400 hover:text-ethereum-600 dark:hover:text-ethereum-400 transition-colors"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <div className="text-xs text-solidity-500 dark:text-gray-500 flex items-center">
              Made with <Heart className="h-3 w-3 mx-1 text-red-500" /> for the Ethereum community in the Philippines
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;