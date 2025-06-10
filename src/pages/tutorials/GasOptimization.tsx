import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Zap } from 'lucide-react';
import CodeBlock from '../../components/shared/CodeBlock';

const GasOptimization: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto py-8 animate-fade-in">
      <div className="mb-8">
        <div className="flex items-center text-sm text-solidity-500 dark:text-gray-400 mb-2">
          <Zap className="h-4 w-4 mr-1" />
          <span>Advanced Topics</span>
        </div>
        <h1 className="text-3xl font-bold text-solidity-900 dark:text-white mb-4">
          Gas Optimization Techniques
        </h1>
        <div className="flex items-center text-sm text-solidity-500 dark:text-gray-400">
          <span className="mr-4">Difficulty: Advanced</span>
          <span>Reading time: ~25 min</span>
        </div>
      </div>

      <div className="prose dark:prose-invert prose-ethereum max-w-none">
        <p className="text-lg text-solidity-700 dark:text-gray-200 leading-relaxed">
          Gas optimization is crucial for making smart contracts cost-effective. This guide covers techniques to reduce gas consumption and make your contracts more efficient.
        </p>

        <h2>Storage Optimization</h2>
        
        <h3>1. Variable Packing</h3>
        
        <CodeBlock
          code={`// Bad: Inefficient storage layout
contract Inefficient {
    uint128 a;    // Slot 0
    uint256 b;    // Slot 1
    uint128 c;    // Slot 2
}

// Good: Optimized storage layout
contract Efficient {
    uint128 a;    // Slot 0
    uint128 c;    // Slot 0 (packed with a)
    uint256 b;    // Slot 1
}`}
          language="solidity"
        />

        <h3>2. Use Appropriate Variable Sizes</h3>
        
        <CodeBlock
          code={`// Bad: Oversized variables
contract Oversized {
    uint256 smallNumber; // Wastes storage for small values
    
    function setValue() external {
        smallNumber = 100; // Only needs uint8
    }
}

// Good: Right-sized variables
contract RightSized {
    uint8 smallNumber; // Perfect for values 0-255
    
    function setValue() external {
        smallNumber = 100;
    }
}`}
          language="solidity"
        />

        <h2>Computation Optimization</h2>

        <h3>1. Caching Storage Variables</h3>
        
        <CodeBlock
          code={`// Bad: Multiple storage reads
contract Inefficient {
    uint256[] numbers;
    
    function sumArray() public view returns (uint256) {
        uint256 sum = 0;
        for(uint256 i = 0; i < numbers.length; i++) {
            sum += numbers[i];
        }
        return sum;
    }
}

// Good: Cache storage variables
contract Efficient {
    uint256[] numbers;
    
    function sumArray() public view returns (uint256) {
        uint256[] memory nums = numbers; // Cache array in memory
        uint256 length = nums.length;    // Cache length
        uint256 sum = 0;
        for(uint256 i = 0; i < length; i++) {
            sum += nums[i];
        }
        return sum;
    }
}`}
          language="solidity"
        />

        <h3>2. Short-circuit Conditions</h3>
        
        <CodeBlock
          code={`// Bad: Evaluates all conditions
function badCheck(uint256 a, uint256 b) public pure returns (bool) {
    return complexOperation(a) && simpleCheck(b) && a > b;
}

// Good: Short-circuit with simple checks first
function goodCheck(uint256 a, uint256 b) public pure returns (bool) {
    return a > b && simpleCheck(b) && complexOperation(a);
}`}
          language="solidity"
        />

        <h2>Loop Optimization</h2>

        <h3>1. Unchecked Math</h3>
        
        <CodeBlock
          code={`// Bad: Unnecessary overflow checks in loops
function sumArray(uint256[] memory arr) public pure returns (uint256) {
    uint256 sum = 0;
    for(uint256 i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
    return sum;
}

// Good: Use unchecked for loop counters
function sumArrayOptimized(uint256[] memory arr) public pure returns (uint256) {
    uint256 sum = 0;
    uint256 length = arr.length;
    for(uint256 i = 0; i < length;) {
        sum += arr[i];
        unchecked { i++; }
    }
    return sum;
}`}
          language="solidity"
        />

        <h3>2. Break Early</h3>
        
        <CodeBlock
          code={`// Bad: Always iterates through entire array
function findFirst(uint256[] memory arr, uint256 value) public pure returns (uint256) {
    uint256 index = type(uint256).max;
    for(uint256 i = 0; i < arr.length; i++) {
        if(arr[i] == value) {
            index = i;
        }
    }
    return index;
}

// Good: Breaks early when found
function findFirstOptimized(uint256[] memory arr, uint256 value) public pure returns (uint256) {
    for(uint256 i = 0; i < arr.length; i++) {
        if(arr[i] == value) {
            return i;
        }
    }
    return type(uint256).max;
}`}
          language="solidity"
        />

        <h2>Function Optimization</h2>

        <h3>1. Function Modifiers</h3>
        
        <CodeBlock
          code={`// Bad: No visibility specified (defaults to public)
function doSomething() {
    // Function body
}

// Good: Explicit visibility and modifiers
function doSomething() external pure {
    // Function body
}

// Better: Use view when possible instead of pure
function getValue() external view returns (uint256) {
    return someValue;
}`}
          language="solidity"
        />

        <h3>2. Function Input Validation</h3>
        
        <CodeBlock
          code={`// Bad: Late validation wastes gas
function processLargeArray(uint256[] memory arr) public {
    uint256 length = arr.length;
    uint256[] memory result = new uint256[](length);
    
    for(uint256 i = 0; i < length; i++) {
        require(arr[i] < 100, "Value too large");
        result[i] = arr[i] * 2;
    }
}

// Good: Early validation saves gas
function processLargeArray(uint256[] memory arr) public {
    uint256 length = arr.length;
    require(length <= 1000, "Array too long");
    
    uint256[] memory result = new uint256[](length);
    for(uint256 i = 0; i < length;) {
        uint256 value = arr[i];
        require(value < 100, "Value too large");
        result[i] = value * 2;
        unchecked { i++; }
    }
}`}
          language="solidity"
        />

        <h2>Event Optimization</h2>
        
        <CodeBlock
          code={`// Bad: Too many indexed parameters
event Transfer(
    address indexed from,
    address indexed to,
    address indexed token,
    uint256 indexed amount  // Error: Too many indexed parameters
);

// Good: Maximum 3 indexed parameters
event Transfer(
    address indexed from,
    address indexed to,
    address indexed token,
    uint256 amount  // Not indexed
);

// Bad: Emitting events in loops
function multiTransfer(address[] memory recipients, uint256[] memory amounts) public {
    for(uint256 i = 0; i < recipients.length; i++) {
        // ... transfer logic ...
        emit Transfer(msg.sender, recipients[i], amounts[i]);
    }
}

// Good: Batch events
event BatchTransfer(
    address indexed from,
    address[] recipients,
    uint256[] amounts
);

function multiTransfer(address[] memory recipients, uint256[] memory amounts) public {
    for(uint256 i = 0; i < recipients.length; i++) {
        // ... transfer logic ...
    }
    emit BatchTransfer(msg.sender, recipients, amounts);
}`}
          language="solidity"
        />

        <h2>Advanced Optimization Techniques</h2>

        <h3>1. Bitmap for Boolean Storage</h3>
        
        <CodeBlock
          code={`// Bad: Multiple boolean storage
contract Inefficient {
    mapping(address => bool) public isOperator;
    mapping(address => bool) public isWhitelisted;
    mapping(address => bool) public isFrozen;
}

// Good: Bitmap storage
contract Efficient {
    mapping(address => uint256) public flags;
    
    uint256 constant OPERATOR_FLAG = 1;
    uint256 constant WHITELIST_FLAG = 1 << 1;
    uint256 constant FROZEN_FLAG = 1 << 2;
    
    function setOperator(address account, bool status) external {
        if(status) {
            flags[account] |= OPERATOR_FLAG;
        } else {
            flags[account] &= ~OPERATOR_FLAG;
        }
    }
    
    function isOperator(address account) public view returns (bool) {
        return flags[account] & OPERATOR_FLAG != 0;
    }
}`}
          language="solidity"
        />

        <h3>2. Assembly for Complex Operations</h3>
        
        <CodeBlock
          code={`// Bad: Regular Solidity implementation
function arraySum(uint256[] memory arr) public pure returns (uint256 sum) {
    for(uint256 i = 0; i < arr.length; i++) {
        sum += arr[i];
    }
}

// Good: Assembly implementation
function arraySumAssembly(uint256[] memory arr) public pure returns (uint256 sum) {
    assembly {
        let len := mload(arr)
        let data := add(arr, 0x20)
        
        for { let i := 0 } lt(i, len) { i := add(i, 1) } {
            sum := add(sum, mload(add(data, mul(i, 0x20))))
        }
    }
}`}
          language="solidity"
        />

        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 dark:border-blue-600 p-4 my-6">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">Gas Optimization Tips</h3>
              <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Use calldata instead of memory for read-only function parameters</li>
                  <li>Pack structs and state variables efficiently</li>
                  <li>Cache frequently accessed storage variables in memory</li>
                  <li>Use events instead of storage for historical data</li>
                  <li>Implement batch operations when possible</li>
                  <li>Consider using assembly for complex operations</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 dark:border-solidity-800 pt-6">
          <div className="flex justify-between items-center">
            <Link
              to="/tutorials/oracle-integration"
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-solidity-700 text-sm font-medium rounded-md text-solidity-700 dark:text-white bg-white dark:bg-solidity-800 hover:bg-gray-50 dark:hover:bg-solidity-700 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous: Oracle Integration
            </Link>
            <Link
              to="/tutorials/design-patterns"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-ethereum-600 hover:bg-ethereum-700 transition-colors"
            >
              Next: Design Patterns <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GasOptimization;