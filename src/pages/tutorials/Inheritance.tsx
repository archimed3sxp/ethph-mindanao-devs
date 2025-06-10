import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Code } from 'lucide-react';
import CodeBlock from '../../components/shared/CodeBlock';

const Inheritance: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto py-8 animate-fade-in">
      <div className="mb-8">
        <div className="flex items-center text-sm text-solidity-500 dark:text-gray-400 mb-2">
          <Code className="h-4 w-4 mr-1" />
          <span>Solidity Basics</span>
        </div>
        <h1 className="text-3xl font-bold text-solidity-900 dark:text-white mb-4">
          Inheritance & Interfaces
        </h1>
        <div className="flex items-center text-sm text-solidity-500 dark:text-gray-400">
          <span className="mr-4">Difficulty: Intermediate</span>
          <span>Reading time: ~25 min</span>
        </div>
      </div>

      <div className="prose dark:prose-invert prose-ethereum max-w-none">
        <p className="text-lg text-solidity-700 dark:text-gray-200 leading-relaxed">
          Solidity supports multiple inheritance and polymorphism through interfaces and abstract contracts. Understanding these concepts is crucial for writing modular and reusable smart contracts.
        </p>

        <h2>Contract Inheritance</h2>
        
        <p>
          Solidity uses the <code>is</code> keyword for inheritance:
        </p>

        <CodeBlock
          code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// Base contract
contract Animal {
    string public name;
    
    constructor(string memory _name) {
        name = _name;
    }
    
    function makeSound() public virtual returns (string memory) {
        return "...";
    }
}

// Derived contract
contract Dog is Animal {
    constructor(string memory _name) Animal(_name) {}
    
    function makeSound() public pure virtual override returns (string memory) {
        return "Woof!";
    }
}`}
          language="solidity"
        />

        <h2>Multiple Inheritance</h2>

        <CodeBlock
          code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Ownable {
    address public owner;
    
    constructor() {
        owner = msg.sender;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }
}

contract Pausable {
    bool public paused;
    
    modifier whenNotPaused() {
        require(!paused, "Contract is paused");
        _;
    }
    
    function pause() public virtual {
        paused = true;
    }
}

// Multiple inheritance
contract Token is Ownable, Pausable {
    mapping(address => uint256) public balances;
    
    function transfer(address to, uint256 amount) public whenNotPaused {
        require(balances[msg.sender] >= amount, "Insufficient balance");
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }
    
    // Only owner can pause
    function pause() public override onlyOwner {
        super.pause();
    }
}`}
          language="solidity"
        />

        <h2>Abstract Contracts</h2>
        
        <p>
          Abstract contracts contain at least one function without implementation:
        </p>

        <CodeBlock
          code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

abstract contract BaseContract {
    // Function without implementation
    function getValue() public virtual returns (uint256);
    
    // Function with implementation
    function getDoubleValue() public virtual returns (uint256) {
        return getValue() * 2;
    }
}

contract Implementation is BaseContract {
    uint256 private value;
    
    constructor(uint256 _value) {
        value = _value;
    }
    
    // Must implement getValue
    function getValue() public view override returns (uint256) {
        return value;
    }
}`}
          language="solidity"
        />

        <h2>Interfaces</h2>
        
        <p>
          Interfaces define a contract's external functions without implementation:
        </p>

        <CodeBlock
          code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address to, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address from, address to, uint256 amount) external returns (bool);
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}

contract MyToken is IERC20 {
    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowances;
    uint256 private _totalSupply;
    
    function totalSupply() external view override returns (uint256) {
        return _totalSupply;
    }
    
    function balanceOf(address account) external view override returns (uint256) {
        return _balances[account];
    }
    
    // Implement other required functions...
}`}
          language="solidity"
        />

        <h2>Virtual and Override Keywords</h2>
        
        <p>
          <code>virtual</code> and <code>override</code> keywords manage function inheritance:
        </p>

        <CodeBlock
          code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Base {
    // Virtual function can be overridden
    function foo() public virtual returns (string memory) {
        return "Base";
    }
}

contract Middle is Base {
    // Override base and make it virtual again
    function foo() public virtual override returns (string memory) {
        return "Middle";
    }
}

contract Derived is Middle {
    // Final override
    function foo() public override returns (string memory) {
        // Call parent implementation
        return string(abi.encodePacked(super.foo(), " & Derived"));
    }
}`}
          language="solidity"
        />

        <h2>Using Call for Dynamic Contract Interaction</h2>

        <CodeBlock
          code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Caller {
    function callContract(address target, bytes memory data) public returns (bool, bytes memory) {
        // Low-level call
        (bool success, bytes memory returnData) = target.call(data);
        require(success, "Call failed");
        return (success, returnData);
    }
    
    function callWithValue(address payable target, bytes memory data) public payable returns (bool, bytes memory) {
        // Call with ETH
        (bool success, bytes memory returnData) = target.call{value: msg.value}(data);
        require(success, "Call failed");
        return (success, returnData);
    }
    
    function callFunction(address target, string memory signature, uint256 value) public returns (bool, bytes memory) {
        // Create function call data
        bytes memory data = abi.encodeWithSignature(signature, value);
        return callContract(target, data);
    }
}`}
          language="solidity"
        />

        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 dark:border-blue-600 p-4 my-6">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">Best Practices</h3>
              <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Use interfaces to define clear contract boundaries</li>
                  <li>Keep inheritance chains shallow</li>
                  <li>Be careful with multiple inheritance and the order of base contracts</li>
                  <li>Always use override keyword when overriding functions</li>
                  <li>Use super to call parent implementations when needed</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 dark:border-solidity-800 pt-6">
          <div className="flex justify-between items-center">
            <Link
              to="/tutorials/contract-linking"
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-solidity-700 text-sm font-medium rounded-md text-solidity-700 dark:text-white bg-white dark:bg-solidity-800 hover:bg-gray-50 dark:hover:bg-solidity-700 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous: Contract Linking
            </Link>
            <Link
              to="/tutorials/deployment-errors"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-ethereum-600 hover:bg-ethereum-700 transition-colors"
            >
              Next: Deployment Errors <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inheritance;