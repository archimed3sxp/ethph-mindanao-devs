import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Code } from 'lucide-react';
import CodeBlock from '../../components/shared/CodeBlock';

const BasicSyntax: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto py-8 animate-fade-in">
      <div className="mb-8">
        <div className="flex items-center text-sm text-solidity-500 dark:text-gray-400 mb-2">
          <Code className="h-4 w-4 mr-1" />
          <span>Solidity Basics</span>
        </div>
        <h1 className="text-3xl font-bold text-solidity-900 dark:text-white mb-4">
          Basic Syntax in Solidity
        </h1>
        <div className="flex items-center text-sm text-solidity-500 dark:text-gray-400">
          <span className="mr-4">Difficulty: Beginner</span>
          <span>Reading time: ~30 min</span>
        </div>
      </div>

      <div className="prose dark:prose-invert prose-ethereum max-w-none">
        <p className="text-lg text-solidity-700 dark:text-gray-200 leading-relaxed">
          In this tutorial, we'll cover the basic syntax and structure of Solidity code. Understanding these fundamentals is essential before diving into more complex concepts.
        </p>

        <h2>Contract Structure</h2>
        
        <p>
          A Solidity file can contain multiple contracts, but typically follows this structure:
        </p>

        <CodeBlock
          code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Import statements (if any)
import "./AnotherContract.sol";

// Interface definitions (if any)
interface Token {
    function transfer(address to, uint256 amount) external returns (bool);
}

// Library definitions (if any)
library SafeMath {
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "SafeMath: addition overflow");
        return c;
    }
}

// The main contract
contract MyContract {
    // State variables
    uint256 public value;
    address public owner;
    
    // Events
    event ValueChanged(uint256 newValue);
    
    // Modifiers
    modifier onlyOwner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }
    
    // Constructor
    constructor() {
        owner = msg.sender;
    }
    
    // Functions
    function setValue(uint256 newValue) public onlyOwner {
        value = newValue;
        emit ValueChanged(newValue);
    }
}`}
          language="solidity"
        />

        <h3>Key Elements:</h3>
        
        <ol>
          <li><strong>License Identifier</strong>: Specifies the license for the source code</li>
          <li><strong>Pragma Directive</strong>: Indicates the compiler version to use</li>
          <li><strong>Imports</strong>: Include code from other files</li>
          <li><strong>Interfaces</strong>: Define required functions without implementation</li>
          <li><strong>Libraries</strong>: Reusable code that can be called by contracts</li>
          <li><strong>Contract</strong>: The main code unit, similar to a class</li>
          <li><strong>State Variables</strong>: Persistent values stored in contract storage</li>
          <li><strong>Events</strong>: Notifications that can be monitored by external applications</li>
          <li><strong>Modifiers</strong>: Reusable code that changes the behavior of functions</li>
          <li><strong>Constructor</strong>: Executed once during contract deployment</li>
          <li><strong>Functions</strong>: Executable units of code</li>
        </ol>

        <h2>Comments</h2>
        
        <p>
          Solidity supports single-line and multi-line comments:
        </p>

        <CodeBlock
          code={`// This is a single-line comment

/*
 * This is a multi-line comment
 * It can span multiple lines
 */`}
          language="solidity"
        />

        <h2>Data Location</h2>
        
        <p>
          Variables in Solidity can be stored in three locations:
        </p>
        
        <ul>
          <li><strong>Storage</strong>: Persistent between function calls, expensive</li>
          <li><strong>Memory</strong>: Temporary during function execution, cheaper</li>
          <li><strong>Calldata</strong>: Non-modifiable, external function parameters</li>
        </ul>

        <CodeBlock
          code={`function processArray(uint256[] calldata _input) external pure returns (uint256[] memory) {
    uint256[] memory result = new uint256[](_input.length);
    for (uint256 i = 0; i < _input.length; i++) {
        result[i] = _input[i] * 2;
    }
    return result;
}`}
          language="solidity"
        />

        <h2>Function Visibility</h2>
        
        <p>
          Solidity has four levels of function visibility:
        </p>
        
        <ul>
          <li><strong>public</strong>: Accessible from within the contract, derived contracts, and externally</li>
          <li><strong>private</strong>: Only accessible from within the current contract</li>
          <li><strong>internal</strong>: Accessible from within the contract and all derived contracts</li>
          <li><strong>external</strong>: Only accessible externally (from other contracts or transactions)</li>
        </ul>

        <CodeBlock
          code={`// Public function - accessible from anywhere
function publicFunction() public pure returns (string memory) {
    return "This is public";
}

// External function - only accessible externally
function externalFunction() external pure returns (string memory) {
    return "This is external";
}

// Internal function - accessible within this contract and derived contracts
function internalFunction() internal pure returns (string memory) {
    return "This is internal";
}

// Private function - only accessible within this contract
function privateFunction() private pure returns (string memory) {
    return "This is private";
}`}
          language="solidity"
        />

        <h2>Function Modifiers</h2>
        
        <p>
          Function modifiers in Solidity change function behavior:
        </p>
        
        <ul>
          <li><strong>view</strong>: Promises not to modify state (read-only)</li>
          <li><strong>pure</strong>: Promises not to modify or read state</li>
          <li><strong>payable</strong>: Can receive Ether</li>
        </ul>

        <CodeBlock
          code={`// View function - reads state but doesn't modify it
function getBalance() public view returns (uint256) {
    return address(this).balance;
}

// Pure function - doesn't read or modify state
function add(uint256 a, uint256 b) public pure returns (uint256) {
    return a + b;
}

// Payable function - can receive Ether
function deposit() public payable {
    // Function body
}`}
          language="solidity"
        />

        <h2>Events</h2>
        
        <p>
          Events in Solidity provide a way to log information on the blockchain that can be monitored externally:
        </p>

        <CodeBlock
          code={`// Define an event
event Transfer(address indexed from, address indexed to, uint256 amount);

// Emit an event
function transfer(address to, uint256 amount) public {
    // Transfer logic
    emit Transfer(msg.sender, to, amount);
}`}
          language="solidity"
        />
        
        <p>
          The <code>indexed</code> keyword makes it possible to filter events by the marked parameters.
        </p>

        <h2>Error Handling</h2>
        
        <p>
          Solidity provides several ways to handle errors:
        </p>

        <CodeBlock
          code={`// Using require
function withdraw(uint256 amount) public {
    require(amount <= address(this).balance, "Insufficient balance");
    // Withdraw logic
}

// Using assert
function safeOperation() public {
    uint256 a = 100;
    uint256 b = 50;
    uint256 c = a - b;
    assert(c <= a); // Should never fail
}

// Using revert
function complexOperation(uint256 param) public {
    if (param > 100) {
        revert("Parameter too high");
    }
    // Function logic
}`}
          language="solidity"
        />
        
        <ul>
          <li><strong>require</strong>: Used for input validation, refunds unused gas</li>
          <li><strong>assert</strong>: Used for invariant checking, consumes all gas</li>
          <li><strong>revert</strong>: Used for complex conditions, refunds unused gas</li>
        </ul>

        <h2>Built-in Variables</h2>
        
        <p>
          Solidity provides several built-in global variables:
        </p>

        <CodeBlock
          code={`function getTransactionInfo() public view returns (
    address sender,
    uint256 value,
    uint256 blockNumber,
    uint256 timestamp,
    uint256 gasLimit,
    uint256 gasPrice,
    bytes memory data,
    address origin,
    uint256 chainId,
    address coinbase,
    uint256 difficulty,
    bytes32 blockHash,
    uint256 gasLeft
) {
    return (
        msg.sender,      // Address that called the function
        msg.value,       // Amount of Ether sent
        block.number,    // Current block number
        block.timestamp, // Current block timestamp
        block.gaslimit,  // Current block gas limit
        tx.gasprice,     // Gas price of the transaction
        msg.data,        // Complete calldata
        tx.origin,       // Original sender of the transaction
        block.chainid,   // Current chain ID
        block.coinbase,  // Current block miner's address
        block.difficulty,// Current block difficulty
        blockhash(block.number - 1), // Hash of the previous block
        gasleft()       // Remaining gas
    );
}

function getContractInfo() public view returns (
    address contractAddress,
    uint256 balance,
    bytes memory code
) {
    return (
        address(this),   // Address of current contract
        address(this).balance, // Contract's balance in Wei
        address(this).code    // Contract's bytecode
    );
}`}
          language="solidity"
        />

        <div className="mt-12 border-t border-gray-200 dark:border-solidity-800 pt-6">
          <div className="flex justify-between items-center">
            <Link
              to="/tutorials/setup"
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-solidity-700 text-sm font-medium rounded-md text-solidity-700 dark:text-white bg-white dark:bg-solidity-800 hover:bg-gray-50 dark:hover:bg-solidity-700 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous: Setup
            </Link>
            <Link
              to="/tutorials/data-types"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-ethereum-600 hover:bg-ethereum-700 transition-colors"
            >
              Next: Data Types <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicSyntax;