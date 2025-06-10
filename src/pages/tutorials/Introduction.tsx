import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, BookOpen } from 'lucide-react';
import CodeBlock from '../../components/shared/CodeBlock';

const Introduction: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto py-8 animate-fade-in">
      <div className="mb-8">
        <div className="flex items-center text-sm text-solidity-500 dark:text-gray-400 mb-2">
          <BookOpen className="h-4 w-4 mr-1" />
          <span>Getting Started</span>
        </div>
        <h1 className="text-3xl font-bold text-solidity-900 dark:text-white mb-4">
          Introduction to Solidity
        </h1>
        <div className="flex items-center text-sm text-solidity-500 dark:text-gray-400">
          <span className="mr-4">Difficulty: Beginner</span>
          <span>Reading time: ~20 min</span>
        </div>
      </div>

      <div className="prose dark:prose-invert prose-ethereum max-w-none">
        <p className="text-lg text-solidity-700 dark:text-gray-200 leading-relaxed">
          Solidity is a statically-typed programming language designed for developing smart contracts that run on the Ethereum Virtual Machine (EVM). Created by the Ethereum team, it's influenced by C++, Python, and JavaScript, and is designed to target the EVM.
        </p>

        <h2>What are Smart Contracts?</h2>
        
        <p>
          Smart contracts are self-executing programs that run on a blockchain. They automatically enforce and execute the terms of an agreement when predetermined conditions are met. Smart contracts allow for trustless transactions without the need for intermediaries.
        </p>
        
        <p>
          Think of smart contracts as "digital vending machines" that execute automatically when specific conditions are met. They are:
        </p>
        
        <ul>
          <li><strong>Immutable</strong> - Once deployed, code cannot be changed</li>
          <li><strong>Deterministic</strong> - Same inputs always produce the same outputs</li>
          <li><strong>Distributed</strong> - Outcome is verified by everyone on the network</li>
          <li><strong>Transparent</strong> - Code is visible to all participants</li>
        </ul>

        <h2>Your First Solidity Contract</h2>
        
        <p>
          Let's look at a simple "Hello World" smart contract in Solidity:
        </p>

        <CodeBlock
          title="HelloWorld.sol"
          code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HelloWorld {
    string private greeting;
    
    constructor() {
        greeting = "Hello, World!";
    }
    
    function getGreeting() public view returns (string memory) {
        return greeting;
    }
    
    function setGreeting(string memory _greeting) public {
        greeting = _greeting;
    }
}`}
          language="solidity"
        />

        <p>
          Let's break down this simple contract:
        </p>

        <ol>
          <li>
            <strong>SPDX License Identifier</strong>: A comment that specifies the license under which the code is released.
          </li>
          <li>
            <strong>Pragma Directive</strong>: Specifies the compiler version to use. In this case, any 0.8.x version.
          </li>
          <li>
            <strong>Contract Declaration</strong>: Similar to a class in object-oriented programming.
          </li>
          <li>
            <strong>State Variable</strong>: <code>greeting</code> is a state variable stored permanently in contract storage.
          </li>
          <li>
            <strong>Constructor</strong>: Executed once when the contract is deployed, initializing the greeting.
          </li>
          <li>
            <strong>Functions</strong>: Methods to interact with the contract:
            <ul>
              <li><code>getGreeting()</code>: A read-only function that returns the greeting.</li>
              <li><code>setGreeting()</code>: A function that changes the state by updating the greeting.</li>
            </ul>
          </li>
        </ol>

        <h2>Key Concepts in Solidity</h2>

        <h3>1. State Variables</h3>
        <p>
          State variables are values permanently stored in contract storage. They represent the state of the contract.
        </p>

        <h3>2. Functions</h3>
        <p>
          Functions are executable units of code. They can be:
        </p>
        <ul>
          <li><strong>Public</strong>: Callable from inside and outside the contract</li>
          <li><strong>Private</strong>: Only callable from inside the contract</li>
          <li><strong>Internal</strong>: Callable from inside the contract and derived contracts</li>
          <li><strong>External</strong>: Only callable from outside the contract</li>
        </ul>
        
        <p>
          Functions can also be:
        </p>
        <ul>
          <li><strong>View</strong>: Promises not to modify the state</li>
          <li><strong>Pure</strong>: Promises not to modify or read the state</li>
          <li><strong>Payable</strong>: Can receive Ether</li>
        </ul>

        <h3>3. Events</h3>
        <p>
          Events allow contracts to log information that can be processed by external applications.
        </p>

        <CodeBlock
          code={`event Transfer(address indexed from, address indexed to, uint256 value);

function transfer(address to, uint256 value) public returns (bool) {
    // Transfer logic here
    emit Transfer(msg.sender, to, value);
    return true;
}`}
          language="solidity"
        />

        <h2>Why Solidity Matters</h2>
        
        <p>
          Solidity enables developers to create:
        </p>
        
        <ul>
          <li>Decentralized finance (DeFi) applications</li>
          <li>Non-fungible tokens (NFTs)</li>
          <li>Decentralized autonomous organizations (DAOs)</li>
          <li>Governance systems</li>
          <li>Supply chain tracking</li>
          <li>And much more</li>
        </ul>

        <p>
          By learning Solidity, you're taking the first step toward participating in the blockchain revolution and building the future of decentralized applications.
        </p>

        <div className="mt-12 border-t border-gray-200 dark:border-solidity-800 pt-6">
          <div className="flex justify-between items-center">
            <div>
              {/* Empty div for spacing */}
            </div>
            <Link
              to="/tutorials/setup"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-ethereum-600 hover:bg-ethereum-700 transition-colors"
            >
              Next: Development Environment <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Introduction;