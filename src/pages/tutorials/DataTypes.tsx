import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Code } from 'lucide-react';
import CodeBlock from '../../components/shared/CodeBlock';

const DataTypes: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto py-8 animate-fade-in">
      <div className="mb-8">
        <div className="flex items-center text-sm text-solidity-500 dark:text-gray-400 mb-2">
          <Code className="h-4 w-4 mr-1" />
          <span>Solidity Basics</span>
        </div>
        <h1 className="text-3xl font-bold text-solidity-900 dark:text-white mb-4">
          Data Types in Solidity
        </h1>
        <div className="flex items-center text-sm text-solidity-500 dark:text-gray-400">
          <span className="mr-4">Difficulty: Beginner</span>
          <span>Reading time: ~25 min</span>
        </div>
      </div>

      <div className="prose dark:prose-invert prose-ethereum max-w-none">
        <p className="text-lg text-solidity-700 dark:text-gray-200 leading-relaxed">
          Understanding data types is crucial for writing efficient and secure smart contracts. In this tutorial, we'll explore all the data types available in Solidity and how to use them effectively.
        </p>

        <h2>Value Types</h2>
        
        <p>
          Value types are copied when they are used as function arguments or in assignments.
        </p>

        <h3>Boolean</h3>
        
        <CodeBlock
          code={`bool public isActive = true;
bool public isComplete = false;

function toggleActive() public {
    isActive = !isActive;
}`}
          language="solidity"
        />

        <h3>Integers</h3>
        
        <p>
          Solidity provides signed and unsigned integers of various sizes:
        </p>

        <CodeBlock
          code={`// Unsigned integers (positive numbers only)
uint8 public smallNumber = 255;    // 8 bits, range: 0 to 2^8-1
uint16 public mediumNumber = 65535; // 16 bits, range: 0 to 2^16-1
uint32 public largerNumber = 4294967295; // 32 bits
uint256 public bigNumber = 115792089237316195423570985008687907853269984665640564039457584007913129639935; // 256 bits (default)
uint public defaultUint = 123; // uint is an alias for uint256

// Signed integers (positive and negative numbers)
int8 public smallSignedNumber = -128; // 8 bits, range: -2^7 to 2^7-1
int16 public mediumSignedNumber = 32767; // 16 bits
int256 public bigSignedNumber = -57896044618658097711785492504343953926634992332820282019728792003956564819968; // 256 bits
int public defaultInt = -456; // int is an alias for int256`}
          language="solidity"
        />
        
        <p>
          Common operations on integers:
        </p>

        <CodeBlock
          code={`function arithmeticOperations(uint a, uint b) public pure returns (uint, uint, uint, uint, uint) {
    uint addition = a + b;
    uint subtraction = a - b; // Caution: will revert if b > a
    uint multiplication = a * b;
    uint division = a / b; // Caution: will revert if b = 0
    uint modulo = a % b; // Remainder after division
    
    return (addition, subtraction, multiplication, division, modulo);
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
              <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Integer Overflow/Underflow</h3>
              <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
                <p>
                  Before Solidity 0.8.0, integer operations would silently overflow/underflow. Now, they cause a revert by default, which is safer.
                </p>
              </div>
            </div>
          </div>
        </div>

        <h3>Address</h3>
        
        <p>
          Addresses hold a 20-byte value (size of an Ethereum address):
        </p>

        <CodeBlock
          code={`address public owner = 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4;
address payable public payableAddress = payable(0x5B38Da6a701c568545dCfcB03FcB875f56beddC4);

function getBalance(address account) public view returns (uint256) {
    return account.balance;
}

function transfer(address payable recipient, uint256 amount) public {
    recipient.transfer(amount); // Automatically reverts on failure
}

function send(address payable recipient, uint256 amount) public returns (bool) {
    return recipient.send(amount); // Returns false on failure
}

function call(address payable recipient, uint256 amount) public returns (bool, bytes memory) {
    return recipient.call{value: amount}(""); // Returns success status and return data
}`}
          language="solidity"
        />

        <h3>Fixed-size Byte Arrays</h3>
        
        <CodeBlock
          code={`bytes1 public singleByte = 0x61; // Stores a single byte
bytes2 public twoByte = 0x6162; // Stores two bytes
bytes32 public hash = 0x1234567890123456789012345678901234567890123456789012345678901234; // Often used for hashes

function compareBytes(bytes32 a, bytes32 b) public pure returns (bool) {
    return a == b;
}`}
          language="solidity"
        />

        <h3>Enums</h3>
        
        <p>
          Enums allow you to create custom types with a finite set of values:
        </p>

        <CodeBlock
          code={`enum Status { Pending, Active, Completed, Cancelled }

Status public currentStatus = Status.Pending;

function activate() public {
    currentStatus = Status.Active;
}

function complete() public {
    currentStatus = Status.Completed;
}

function cancel() public {
    currentStatus = Status.Cancelled;
}

function getStatusName() public view returns (string memory) {
    if (currentStatus == Status.Pending) return "Pending";
    if (currentStatus == Status.Active) return "Active";
    if (currentStatus == Status.Completed) return "Completed";
    if (currentStatus == Status.Cancelled) return "Cancelled";
    return "Unknown";
}`}
          language="solidity"
        />

        <h2>Reference Types</h2>
        
        <p>
          Reference types can be modified through multiple variable names (references).
        </p>

        <h3>Arrays</h3>
        
        <p>
          Arrays can have a fixed or dynamic size:
        </p>

        <CodeBlock
          code={`// Fixed-size array
uint[5] public fixedArray = [1, 2, 3, 4, 5];

// Dynamic-size array
uint[] public dynamicArray;

function addToDynamicArray(uint value) public {
    dynamicArray.push(value);
}

function getArrayLength() public view returns (uint) {
    return dynamicArray.length;
}

function getArrayElement(uint index) public view returns (uint) {
    require(index < dynamicArray.length, "Index out of bounds");
    return dynamicArray[index];
}

function removeLastElement() public {
    require(dynamicArray.length > 0, "Array is empty");
    dynamicArray.pop();
}`}
          language="solidity"
        />

        <h3>Strings</h3>
        
        <p>
          Strings are dynamic arrays of bytes, used for text:
        </p>

        <CodeBlock
          code={`string public message = "Hello, Solidity!";

function setMessage(string memory newMessage) public {
    message = newMessage;
}

function getMessageLength() public view returns (uint) {
    return bytes(message).length;
}

function concatenate(string memory a, string memory b) public pure returns (string memory) {
    return string(abi.encodePacked(a, b));
}`}
          language="solidity"
        />

        <h3>Structs</h3>
        
        <p>
          Structs allow you to define custom data structures:
        </p>

        <CodeBlock
          code={`struct Person {
    string name;
    uint age;
    address wallet;
    bool isActive;
}

Person public person1;
Person[] public people;

function addPerson(string memory name, uint age) public {
    Person memory newPerson = Person({
        name: name,
        age: age,
        wallet: msg.sender,
        isActive: true
    });
    
    people.push(newPerson);
}

function setPerson1(string memory name, uint age) public {
    person1 = Person(name, age, msg.sender, true);
}

function togglePersonStatus(uint index) public {
    require(index < people.length, "Person does not exist");
    people[index].isActive = !people[index].isActive;
}`}
          language="solidity"
        />

        <h3>Mappings</h3>
        
        <p>
          Mappings are hash tables, which map keys to values:
        </p>

        <CodeBlock
          code={`mapping(address => uint) public balances;
mapping(address => mapping(address => bool)) public isApproved;

function deposit() public payable {
    balances[msg.sender] += msg.value;
}

function checkBalance(address account) public view returns (uint) {
    return balances[account];
}

function approve(address spender) public {
    isApproved[msg.sender][spender] = true;
}

function transferFrom(address from, address to, uint amount) public {
    require(isApproved[from][msg.sender], "Not approved");
    require(balances[from] >= amount, "Insufficient balance");
    
    balances[from] -= amount;
    balances[to] += amount;
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
              <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">Mapping Characteristics</h3>
              <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Keys are not stored (only their keccak256 hashes)</li>
                  <li>You cannot iterate over all keys</li>
                  <li>All values exist by default (initialized to the zero value of the value type)</li>
                  <li>Mappings can only be stored in storage, not in memory</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <h2>Special Types</h2>

        <h3>Function Types</h3>
        
        <p>
          Functions can be stored in variables and passed as arguments:
        </p>

        <CodeBlock
          code={`function add(uint a, uint b) public pure returns (uint) {
    return a + b;
}

function multiply(uint a, uint b) public pure returns (uint) {
    return a * b;
}

function calculate(
    function(uint, uint) pure returns (uint) operation,
    uint a,
    uint b
) public pure returns (uint) {
    return operation(a, b);
}

function testCalculate() public pure returns (uint, uint) {
    uint addResult = calculate(add, 5, 3);     // Returns 8
    uint multiplyResult = calculate(multiply, 5, 3); // Returns 15
    
    return (addResult, multiplyResult);
}`}
          language="solidity"
        />

        <div className="mt-12 border-t border-gray-200 dark:border-solidity-800 pt-6">
          <div className="flex justify-between items-center">
            <Link
              to="/tutorials/basic-syntax"
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-solidity-700 text-sm font-medium rounded-md text-solidity-700 dark:text-white bg-white dark:bg-solidity-800 hover:bg-gray-50 dark:hover:bg-solidity-700 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous: Basic Syntax
            </Link>
            <Link
              to="/tutorials/functions"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-ethereum-600 hover:bg-ethereum-700 transition-colors"
            >
              Next: Functions <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataTypes;