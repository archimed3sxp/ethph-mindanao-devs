import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Link as LinkIcon } from 'lucide-react';
import CodeBlock from '../../components/shared/CodeBlock';

const ContractLinking: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto py-8 animate-fade-in">
      <div className="mb-8">
        <div className="flex items-center text-sm text-solidity-500 dark:text-gray-400 mb-2">
          <LinkIcon className="h-4 w-4 mr-1" />
          <span>Solidity Basics</span>
        </div>
        <h1 className="text-3xl font-bold text-solidity-900 dark:text-white mb-4">
          Linking Smart Contracts Together
        </h1>
        <div className="flex items-center text-sm text-solidity-500 dark:text-gray-400">
          <span className="mr-4">Difficulty: Intermediate</span>
          <span>Reading time: ~25 min</span>
        </div>
      </div>

      <div className="prose dark:prose-invert prose-ethereum max-w-none">
        <p className="text-lg text-solidity-700 dark:text-gray-200 leading-relaxed">
          Smart contracts can interact with each other, allowing you to build complex systems from simpler components. This tutorial covers different ways to link and interact between contracts.
        </p>

        <h2>Using Interfaces</h2>
        
        <p>
          Interfaces define a contract's external functions without implementation details. They're the primary way to interact with deployed contracts:
        </p>

        <CodeBlock
          code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Define the interface for the contract you want to interact with
interface IToken {
    function transfer(address to, uint256 amount) external returns (bool);
    function balanceOf(address account) external view returns (uint256);
}

contract TokenUser {
    // Store the token contract address
    IToken public token;
    
    constructor(address tokenAddress) {
        token = IToken(tokenAddress);
    }
    
    function transferTokens(address to, uint256 amount) public {
        // Call functions on the token contract through the interface
        bool success = token.transfer(to, amount);
        require(success, "Transfer failed");
    }
    
    function getBalance(address account) public view returns (uint256) {
        return token.balanceOf(account);
    }
}`}
          language="solidity"
        />

        <h2>Direct Contract Interaction</h2>
        
        <p>
          You can also interact with contracts directly if you have their source code:
        </p>

        <CodeBlock
          code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// First contract
contract Token {
    mapping(address => uint256) public balances;
    
    constructor() {
        balances[msg.sender] = 1000;
    }
    
    function transfer(address to, uint256 amount) public returns (bool) {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        balances[to] += amount;
        return true;
    }
    
    function balanceOf(address account) public view returns (uint256) {
        return balances[account];
    }
}

// Second contract that uses the first contract
contract TokenUser {
    Token public token;
    
    constructor(address tokenAddress) {
        token = Token(tokenAddress);
    }
    
    function transferTokens(address to, uint256 amount) public {
        bool success = token.transfer(to, amount);
        require(success, "Transfer failed");
    }
}`}
          language="solidity"
        />

        <h2>Low-Level Calls</h2>
        
        <p>
          For more flexibility, you can use low-level calls to interact with contracts:
        </p>

        <CodeBlock
          code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract LowLevelCaller {
    function callTransfer(
        address token,
        address to,
        uint256 amount
    ) public returns (bool) {
        // Encode the function call
        bytes memory data = abi.encodeWithSignature(
            "transfer(address,uint256)",
            to,
            amount
        );
        
        // Make the low-level call
        (bool success, bytes memory returnData) = token.call(data);
        require(success, "Call failed");
        
        // Decode the return value
        return abi.decode(returnData, (bool));
    }
    
    function callBalanceOf(
        address token,
        address account
    ) public view returns (uint256) {
        // Encode the function call
        bytes memory data = abi.encodeWithSignature(
            "balanceOf(address)",
            account
        );
        
        // Make the low-level call
        (bool success, bytes memory returnData) = token.staticcall(data);
        require(success, "Call failed");
        
        // Decode the return value
        return abi.decode(returnData, (uint256));
    }
}`}
          language="solidity"
        />

        <h2>Using Libraries</h2>
        
        <p>
          Libraries provide reusable code that can be used by multiple contracts:
        </p>

        <CodeBlock
          code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Library definition
library SafeMath {
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        require(c >= a, "SafeMath: addition overflow");
        return c;
    }
    
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        require(b <= a, "SafeMath: subtraction overflow");
        return a - b;
    }
}

// Contract using the library
contract Token {
    using SafeMath for uint256;
    mapping(address => uint256) public balances;
    
    function transfer(address to, uint256 amount) public {
        balances[msg.sender] = balances[msg.sender].sub(amount);
        balances[to] = balances[to].add(amount);
    }
}`}
          language="solidity"
        />

        <h2>Factory Pattern</h2>
        
        <p>
          The factory pattern allows one contract to create and deploy other contracts:
        </p>

        <CodeBlock
          code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Contract to be created
contract Token {
    string public name;
    address public owner;
    
    constructor(string memory _name) {
        name = _name;
        owner = msg.sender;
    }
}

// Factory contract that creates Token contracts
contract TokenFactory {
    // Array to keep track of created tokens
    Token[] public tokens;
    
    // Event emitted when new token is created
    event TokenCreated(address tokenAddress, string name);
    
    function createToken(string memory name) public returns (address) {
        // Create new Token contract
        Token token = new Token(name);
        
        // Store token address
        tokens.push(token);
        
        // Emit event
        emit TokenCreated(address(token), name);
        
        return address(token);
    }
    
    function getToken(uint256 index) public view returns (address) {
        return address(tokens[index]);
    }
    
    function getTokenCount() public view returns (uint256) {
        return tokens.length;
    }
}`}
          language="solidity"
        />

        <h2>Best Practices</h2>

        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 dark:border-blue-600 p-4 my-6">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">Contract Interaction Guidelines</h3>
              <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Always validate external contract addresses</li>
                  <li>Use interfaces for type safety and better code organization</li>
                  <li>Handle failed calls gracefully</li>
                  <li>Be aware of reentrancy risks when calling external contracts</li>
                  <li>Consider using OpenZeppelin's SafeERC20 for token interactions</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <h2>Common Patterns</h2>

        <h3>1. Proxy Pattern</h3>
        
        <CodeBlock
          code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Proxy {
    address public implementation;
    address public admin;
    
    constructor(address _implementation) {
        implementation = _implementation;
        admin = msg.sender;
    }
    
    function upgrade(address newImplementation) public {
        require(msg.sender == admin, "Not authorized");
        implementation = newImplementation;
    }
    
    fallback() external payable {
        address _impl = implementation;
        assembly {
            calldatacopy(0, 0, calldatasize())
            let result := delegatecall(gas(), _impl, 0, calldatasize(), 0, 0)
            returndatacopy(0, 0, returndatasize())
            switch result
            case 0 { revert(0, returndatasize()) }
            default { return(0, returndatasize()) }
        }
    }
}`}
          language="solidity"
        />

        <h3>2. Diamond Pattern</h3>
        
        <CodeBlock
          code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Diamond {
    mapping(bytes4 => address) public facets;
    address public owner;
    
    constructor() {
        owner = msg.sender;
    }
    
    function setFacet(bytes4 signature, address implementation) public {
        require(msg.sender == owner, "Not authorized");
        facets[signature] = implementation;
    }
    
    fallback() external payable {
        address facet = facets[msg.sig];
        require(facet != address(0), "Function not found");
        
        assembly {
            calldatacopy(0, 0, calldatasize())
            let result := delegatecall(gas(), facet, 0, calldatasize(), 0, 0)
            returndatacopy(0, 0, returndatasize())
            switch result
            case 0 { revert(0, returndatasize()) }
            default { return(0, returndatasize()) }
        }
    }
}`}
          language="solidity"
        />

        <div className="mt-12 border-t border-gray-200 dark:border-solidity-800 pt-6">
          <div className="flex justify-between items-center">
            <Link
              to="/tutorials/functions"
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-solidity-700 text-sm font-medium rounded-md text-solidity-700 dark:text-white bg-white dark:bg-solidity-800 hover:bg-gray-50 dark:hover:bg-solidity-700 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous: Functions
            </Link>
            <Link
              to="/tutorials/inheritance"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-ethereum-600 hover:bg-ethereum-700 transition-colors"
            >
              Next: Inheritance <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractLinking;