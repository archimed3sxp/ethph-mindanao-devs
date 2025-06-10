import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Code } from 'lucide-react';
import CodeBlock from '../../components/shared/CodeBlock';

const DesignPatterns: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto py-8 animate-fade-in">
      <div className="mb-8">
        <div className="flex items-center text-sm text-solidity-500 dark:text-gray-400 mb-2">
          <Code className="h-4 w-4 mr-1" />
          <span>Advanced Topics</span>
        </div>
        <h1 className="text-3xl font-bold text-solidity-900 dark:text-white mb-4">
          Smart Contract Design Patterns
        </h1>
        <div className="flex items-center text-sm text-solidity-500 dark:text-gray-400">
          <span className="mr-4">Difficulty: Advanced</span>
          <span>Reading time: ~30 min</span>
        </div>
      </div>

      <div className="prose dark:prose-invert prose-ethereum max-w-none">
        <p className="text-lg text-solidity-700 dark:text-gray-200 leading-relaxed">
          Design patterns in smart contracts help solve common problems and improve code quality, security, and maintainability. Let's explore some essential patterns used in Solidity development.
        </p>

        <h2>1. Factory Pattern</h2>
        
        <p>
          The Factory pattern allows for the creation of contract instances from a main factory contract.
        </p>

        <CodeBlock
          code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Token {
    string public name;
    address public owner;
    
    constructor(string memory _name) {
        name = _name;
        owner = msg.sender;
    }
}

contract TokenFactory {
    mapping(address => address[]) public createdTokens;
    event TokenCreated(address tokenAddress, string name);
    
    function createToken(string memory name) public returns (address) {
        Token token = new Token(name);
        createdTokens[msg.sender].push(address(token));
        emit TokenCreated(address(token), name);
        return address(token);
    }
    
    function getTokens() public view returns (address[] memory) {
        return createdTokens[msg.sender];
    }
}`}
          language="solidity"
        />

        <h2>2. Proxy Pattern</h2>
        
        <p>
          The Proxy pattern enables upgradeable contracts by separating logic and storage.
        </p>

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

        <h2>3. Guard Check Pattern</h2>
        
        <p>
          The Guard Check pattern validates conditions before executing code.
        </p>

        <CodeBlock
          code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GuardCheck {
    mapping(address => uint256) public balances;
    
    modifier validateAmount(uint256 amount) {
        require(amount > 0, "Amount must be greater than 0");
        require(amount <= balances[msg.sender], "Insufficient balance");
        _;
    }
    
    function withdraw(uint256 amount) public validateAmount(amount) {
        balances[msg.sender] -= amount;
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");
    }
}`}
          language="solidity"
        />

        <h2>4. State Machine Pattern</h2>
        
        <p>
          The State Machine pattern manages contract states and transitions.
        </p>

        <CodeBlock
          code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Auction {
    enum State { Created, Started, Ended }
    State public currentState;
    
    uint public startTime;
    uint public endTime;
    address public highestBidder;
    uint public highestBid;
    
    modifier inState(State state) {
        require(currentState == state, "Invalid state");
        _;
    }
    
    constructor() {
        currentState = State.Created;
    }
    
    function start() public inState(State.Created) {
        currentState = State.Started;
        startTime = block.timestamp;
        endTime = startTime + 7 days;
    }
    
    function bid() public payable inState(State.Started) {
        require(block.timestamp <= endTime, "Auction ended");
        require(msg.value > highestBid, "Bid too low");
        
        highestBidder = msg.sender;
        highestBid = msg.value;
    }
    
    function end() public inState(State.Started) {
        require(block.timestamp > endTime, "Auction not yet ended");
        currentState = State.Ended;
    }
}`}
          language="solidity"
        />

        <h2>5. Withdrawal Pattern</h2>
        
        <p>
          The Withdrawal pattern separates transfer logic from business logic to prevent reentrancy attacks.
        </p>

        <CodeBlock
          code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract WithdrawalPattern {
    mapping(address => uint256) public balances;
    
    function deposit() public payable {
        balances[msg.sender] += msg.value;
    }
    
    function withdraw() public {
        uint256 amount = balances[msg.sender];
        require(amount > 0, "No balance to withdraw");
        
        // Update state before transfer
        balances[msg.sender] = 0;
        
        // Transfer funds
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success, "Transfer failed");
    }
}`}
          language="solidity"
        />

        <h2>6. Access Restriction Pattern</h2>
        
        <p>
          The Access Restriction pattern manages contract access through modifiers.
        </p>

        <CodeBlock
          code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AccessControl {
    address public owner;
    mapping(address => bool) public admins;
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Not owner");
        _;
    }
    
    modifier onlyAdmin() {
        require(admins[msg.sender], "Not admin");
        _;
    }
    
    constructor() {
        owner = msg.sender;
        admins[msg.sender] = true;
    }
    
    function addAdmin(address admin) public onlyOwner {
        admins[admin] = true;
    }
    
    function removeAdmin(address admin) public onlyOwner {
        admins[admin] = false;
    }
    
    function sensitiveOperation() public onlyAdmin {
        // Only admins can execute this
    }
}`}
          language="solidity"
        />

        <h2>7. Emergency Stop Pattern</h2>
        
        <p>
          The Emergency Stop pattern allows pausing contract functionality in case of emergencies.
        </p>

        <CodeBlock
          code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract EmergencyStop {
    bool public stopped;
    address public owner;
    
    modifier stopInEmergency {
        require(!stopped, "Contract is paused");
        _;
    }
    
    modifier onlyInEmergency {
        require(stopped, "Contract is not paused");
        _;
    }
    
    modifier onlyOwner {
        require(msg.sender == owner, "Not owner");
        _;
    }
    
    constructor() {
        owner = msg.sender;
        stopped = false;
    }
    
    function toggleContractActive() public onlyOwner {
        stopped = !stopped;
    }
    
    function deposit() public payable stopInEmergency {
        // Normal operation
    }
    
    function emergencyWithdraw() public onlyOwner onlyInEmergency {
        // Emergency functions
    }
}`}
          language="solidity"
        />

        <h2>8. Memory Array Building Pattern</h2>
        
        <p>
          The Memory Array Building pattern efficiently builds arrays in memory.
        </p>

        <CodeBlock
          code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract MemoryArrayBuilding {
    struct User {
        uint256 id;
        string name;
    }
    
    mapping(uint256 => User) public users;
    uint256[] public activeUserIds;
    
    function getActiveUsers() public view returns (User[] memory) {
        // Create fixed-size array in memory
        User[] memory activeUsers = new User[](activeUserIds.length);
        
        // Fill array efficiently
        for (uint256 i = 0; i < activeUserIds.length; i++) {
            activeUsers[i] = users[activeUserIds[i]];
        }
        
        return activeUsers;
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
                  <li>Choose patterns based on your specific use case</li>
                  <li>Combine patterns when appropriate</li>
                  <li>Consider gas costs when implementing patterns</li>
                  <li>Always prioritize security over optimization</li>
                  <li>Document pattern usage in your code</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 dark:border-solidity-800 pt-6">
          <div className="flex justify-between items-center">
            <Link
              to="/tutorials/gas-optimization"
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-solidity-700 text-sm font-medium rounded-md text-solidity-700 dark:text-white bg-white dark:bg-solidity-800 hover:bg-gray-50 dark:hover:bg-solidity-700 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous: Gas Optimization
            </Link>
            <Link
              to="/tutorials/erc-standards"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-ethereum-600 hover:bg-ethereum-700 transition-colors"
            >
              Next: ERC Standards <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignPatterns;