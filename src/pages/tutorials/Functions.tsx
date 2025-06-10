import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Zap } from 'lucide-react';
import CodeBlock from '../../components/shared/CodeBlock';

const Functions: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto py-8 animate-fade-in">
      <div className="mb-8">
        <div className="flex items-center text-sm text-solidity-500 dark:text-gray-400 mb-2">
          <Zap className="h-4 w-4 mr-1" />
          <span>Solidity Basics</span>
        </div>
        <h1 className="text-3xl font-bold text-solidity-900 dark:text-white mb-4">
          Functions in Solidity
        </h1>
        <div className="flex items-center text-sm text-solidity-500 dark:text-gray-400">
          <span className="mr-4">Difficulty: Intermediate</span>
          <span>Reading time: ~35 min</span>
        </div>
      </div>

      <div className="prose dark:prose-invert prose-ethereum max-w-none">
        <p className="text-lg text-solidity-700 dark:text-gray-200 leading-relaxed">
          Functions are the building blocks of smart contracts. They define the behavior and operations that your contract can perform. In this tutorial, we'll explore the different types of functions in Solidity and how to use them effectively.
        </p>

        <h2>Function Basics</h2>
        
        <p>
          A function in Solidity is defined with the <code>function</code> keyword:
        </p>

        <CodeBlock
          code={`function functionName(parameterType parameterName) visibility modifiers returns (returnTypes) {
    // Function body
}`}
          language="solidity"
        />

        <h3>Function Parameters and Return Values</h3>

        <CodeBlock
          code={`// Function with no parameters and no return value
function simpleFunction() public {
    // Function body
}

// Function with parameters
function add(uint a, uint b) public pure returns (uint) {
    return a + b;
}

// Function with multiple return values
function divide(uint a, uint b) public pure returns (uint quotient, uint remainder) {
    quotient = a / b;
    remainder = a % b;
}

// Alternative way to return multiple values
function getMinMax(uint a, uint b) public pure returns (uint, uint) {
    if (a < b) {
        return (a, b);
    } else {
        return (b, a);
    }
}`}
          language="solidity"
        />

        <h2>Function Visibility</h2>
        
        <p>
          Solidity provides four visibility specifiers for functions:
        </p>

        <CodeBlock
          code={`// Public function - can be called internally and externally
function publicFunction() public {
    // Any contract or account can call this function
}

// External function - can only be called from outside the contract
function externalFunction() external {
    // Only other contracts or accounts can call this function
    // This cannot be called internally (i.e., this.externalFunction() would work, but externalFunction() would not)
}

// Internal function - can only be called from within the contract or derived contracts
function internalFunction() internal {
    // Only this contract and derived contracts can call this function
}

// Private function - can only be called from within the contract
function privateFunction() private {
    // Only this contract can call this function
}`}
          language="solidity"
        />

        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 dark:border-blue-600 p-4 my-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400 dark:text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">Best Practice: Use External for Public Functions</h3>
              <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                <p>
                  For functions that are only called from outside the contract and never internally, use <code>external</code> instead of <code>public</code>. This can save gas because <code>external</code> functions can access their parameters directly from calldata rather than copying them to memory.
                </p>
              </div>
            </div>
          </div>
        </div>

        <h2>Function Modifiers</h2>
        
        <h3>State Mutability</h3>
        
        <p>
          Functions can declare their relationship with the contract's state:
        </p>

        <CodeBlock
          code={`// Pure function - doesn't read or modify state
function add(uint a, uint b) public pure returns (uint) {
    return a + b;
}

// View function - reads but doesn't modify state
function getBalance() public view returns (uint) {
    return address(this).balance;
}

// Function that modifies state (no special modifier needed)
function setNumber(uint newNumber) public {
    storedNumber = newNumber;
}

// Payable function - can receive Ether
function deposit() public payable {
    // The function can receive Ether
    // msg.value contains the amount of Wei sent
}`}
          language="solidity"
        />

        <h3>Custom Function Modifiers</h3>
        
        <p>
          You can create custom modifiers to add reusable checks to your functions:
        </p>

        <CodeBlock
          code={`// State variable
address public owner;

// Constructor sets the owner
constructor() {
    owner = msg.sender;
}

// Custom modifier definition
modifier onlyOwner() {
    require(msg.sender == owner, "Not the contract owner");
    _; // This represents the function body
}

// Using the modifier
function setNumber(uint newNumber) public onlyOwner {
    // Only the owner can call this function
    storedNumber = newNumber;
}

// Modifier with parameters
modifier costs(uint price) {
    require(msg.value >= price, "Not enough Ether provided");
    _;
    // You can even run code after the function body
    if (msg.value > price) {
        payable(msg.sender).transfer(msg.value - price);
    }
}

// Using the parameterized modifier
function purchaseItem() public payable costs(0.1 ether) {
    // This function requires at least 0.1 ETH to be sent
    // Excess ETH will be refunded
}`}
          language="solidity"
        />

        <h2>Function Overloading</h2>
        
        <p>
          Solidity supports function overloading, which allows you to have multiple functions with the same name but different parameter types:
        </p>

        <CodeBlock
          code={`// These functions have the same name but different parameters
function getValue(uint id) public view returns (uint) {
    // Return a value based on id
    return id * 10;
}

function getValue(string memory name) public view returns (uint) {
    // Return a value based on name
    return bytes(name).length;
}

function getValue(uint id, address user) public view returns (uint) {
    // Return a value based on id and user
    return id + uint(uint160(user));
}`}
          language="solidity"
        />

        <p>
          The correct function is selected based on the arguments you provide when calling it.
        </p>

        <h2>Constructor Function</h2>
        
        <p>
          The constructor is a special function that is executed once when the contract is deployed:
        </p>

        <CodeBlock
          code={`contract MyContract {
    address public owner;
    string public name;
    uint public creationTime;
    
    // Constructor with parameters
    constructor(string memory _name) {
        owner = msg.sender;
        name = _name;
        creationTime = block.timestamp;
    }
}`}
          language="solidity"
        />

        <h2>Fallback and Receive Functions</h2>
        
        <p>
          Solidity provides special functions to handle Ether transfers and calls with no matching function signature:
        </p>

        <CodeBlock
          code={`// Receive function - called when Ether is sent to the contract with empty calldata
receive() external payable {
    // Logic to handle direct Ether transfers
    emit Received(msg.sender, msg.value);
}

// Fallback function - called when no other function matches the called function signature
fallback() external payable {
    // Logic to handle unknown function calls
    emit FallbackCalled(msg.sender, msg.value, msg.data);
}

// Events for logging
event Received(address sender, uint amount);
event FallbackCalled(address sender, uint amount, bytes data);`}
          language="solidity"
        />

        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 dark:border-blue-600 p-4 my-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400 dark:text-blue-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">Receive vs Fallback</h3>
              <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                <p>
                  <strong>receive()</strong> is called when:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li><code>msg.data</code> is empty and Ether is sent</li>
                </ul>
                <p className="mt-2">
                  <strong>fallback()</strong> is called when:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>No function matches the function signature</li>
                  <li><code>msg.data</code> is not empty and no function matches</li>
                  <li>Ether is sent to the contract but <code>receive()</code> doesn't exist</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <h2>Function Calling</h2>
        
        <h3>Internal Function Calls</h3>

        <CodeBlock
          code={`function processData(uint data) public {
    // Direct internal call
    uint result = multiplyByTwo(data);
    
    // Do something with result
}

function multiplyByTwo(uint value) internal pure returns (uint) {
    return value * 2;
}`}
          language="solidity"
        />

        <h3>External Function Calls</h3>

        <CodeBlock
          code={`// Interface for the external contract
interface IExternalContract {
    function processValue(uint value) external returns (bool);
}

// Function to call an external contract
function callExternalContract(address externalContract, uint value) public returns (bool) {
    // Creating an interface instance
    IExternalContract extContract = IExternalContract(externalContract);
    
    // Calling the external function
    return extContract.processValue(value);
}

// Low-level external call using call()
function lowLevelCall(address destination, bytes memory data) public returns (bool success, bytes memory returnData) {
    // Using call to make an external function call
    (success, returnData) = destination.call(data);
}`}
          language="solidity"
        />

        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 dark:border-yellow-600 p-4 my-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400 dark:text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Security Warning: External Calls</h3>
              <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
                <p>
                  When making external calls to untrusted contracts, be aware of potential security risks:
                </p>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Re-entrancy attacks</li>
                  <li>Unexpected reverts</li>
                  <li>Gas limits</li>
                </ul>
                <p className="mt-2">
                  Always follow the Checks-Effects-Interactions pattern and consider using OpenZeppelin's ReentrancyGuard.
                </p>
              </div>
            </div>
          </div>
        </div>

        <h2>Function Selector</h2>
        
        <p>
          Each function has a unique selector, which is the first 4 bytes of the keccak256 hash of the function signature:
        </p>

        <CodeBlock
          code={`// Getting a function selector
function getSelector() public pure returns (bytes4) {
    // This returns the selector for "transfer(address,uint256)"
    return bytes4(keccak256("transfer(address,uint256)"));
}`}
          language="solidity"
        />

        <div className="mt-12 border-t border-gray-200 dark:border-solidity-800 pt-6">
          <div className="flex justify-between items-center">
            <Link
              to="/tutorials/data-types"
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-solidity-700 text-sm font-medium rounded-md text-solidity-700 dark:text-white bg-white dark:bg-solidity-800 hover:bg-gray-50 dark:hover:bg-solidity-700 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous: Data Types
            </Link>
            <Link
              to="/tutorials/contract-structure"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-ethereum-600 hover:bg-ethereum-700 transition-colors"
            >
              Next: Contract Structure <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Functions;