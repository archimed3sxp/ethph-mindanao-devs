import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Code2, Github, BookOpen } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white dark:bg-solidity-900 shadow-md dark:shadow-black/20 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <Code2 className="h-8 w-8 text-ethereum-600" />
              <span className="ml-2 text-xl font-bold text-solidity-900 dark:text-white">
                ETHPH Academy
              </span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link 
              to="/tutorials/introduction" 
              className="px-3 py-2 rounded-md text-sm font-medium text-solidity-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-solidity-800 transition-colors"
            >
              Tutorials
            </Link>
            <Link 
              to="/projects" 
              className="px-3 py-2 rounded-md text-sm font-medium text-solidity-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-solidity-800 transition-colors"
            >
              Projects
            </Link>
            <Link 
              to="/playground" 
              className="px-3 py-2 rounded-md text-sm font-medium text-solidity-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-solidity-800 transition-colors"
            >
              Playground
            </Link>
            <Link 
              to="/resources" 
              className="px-3 py-2 rounded-md text-sm font-medium text-solidity-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-solidity-800 transition-colors"
            >
              Resources
            </Link>
            <a 
              href="https://github.com/0xdanki/ethph-academy" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="ml-4 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-ethereum-600 hover:bg-ethereum-700 transition-colors"
            >
              <Github className="h-4 w-4 mr-1" />
              GitHub
            </a>
          </div>
          
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-solidity-600 dark:text-gray-400 hover:text-solidity-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-solidity-800 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6\" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6\" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-solidity-900 shadow-lg">
          <Link 
            to="/tutorials/introduction" 
            className="block px-3 py-2 rounded-md text-base font-medium text-solidity-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-solidity-800"
            onClick={() => setIsMenuOpen(false)}
          >
            Tutorials
          </Link>
          <Link 
            to="/projects" 
            className="block px-3 py-2 rounded-md text-base font-medium text-solidity-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-solidity-800"
            onClick={() => setIsMenuOpen(false)}
          >
            Projects
          </Link>
          <Link 
            to="/playground" 
            className="block px-3 py-2 rounded-md text-base font-medium text-solidity-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-solidity-800"
            onClick={() => setIsMenuOpen(false)}
          >
            Playground
          </Link>
          <Link 
            to="/resources" 
            className="block px-3 py-2 rounded-md text-base font-medium text-solidity-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-solidity-800"
            onClick={() => setIsMenuOpen(false)}
          >
            Resources
          </Link>
          <a 
            href="https://github.com/ethereum/solidity" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="block px-3 py-2 rounded-md text-base font-medium text-solidity-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-solidity-800"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="flex items-center">
              <Github className="h-5 w-5 mr-2" />
              GitHub
            </div>
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;