import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Shield } from 'lucide-react';
import CodeBlock from '../../components/shared/CodeBlock';

const CommonAttacks: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto py-8 animate-fade-in">
      <div className="mb-8">
        <div className="flex items-center text-sm text-solidity-500 dark:text-gray-400 mb-2">
          <Shield className="h-4 w-4 mr-1" />
          <span>Security</span>
        </div>
        <h1 className="text-3xl font-bold text-solidity-900 dark:text-white mb-4">
          Common Smart Contract Attacks
        </h1>
        <div className="flex items-center text-sm text-solidity-500 dark:text-gray-400">
          <span className="mr-4">Difficulty: Advanced</span>
          <span>Reading time: ~35 min</span>
        </div>
      </div>

      <div className="prose dark:prose-invert prose-ethereum max-w-none">
        <p className="text-lg text-solidity-700 dark:text-gray-200 leading-relaxed">
          Understanding common smart contract vulnerabilities is crucial for developing secure applications. This guide covers the most frequent attack vectors and how to prevent them.
        </p>

        <h2>1. Reentrancy Attacks</h2>
        
        <p>
          Reentrancy occurs when a contract calls an external contract before updating its own state.
        </p>

        <CodeBlock
          code={`// Vulnerable contract
contract VulnerableBank {
    mapping(address => uint) public balances;
    
    function withdraw(uint amount) public {
        require(balances[msg.sender] >= amount);
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success);
        balances[msg.sender] -= amount;  // State update after external call
    }
}

// Malicious contract
contract Attacker {
    VulnerableBank public bank;
    
    constructor(address bankAddress) {
        bank = VulnerableBank(bankAddress);
    }
    
    receive() external payable {
        if (address(bank).balance >= 1 ether) {
            bank.withdraw(1 ether);
        }
    }
}

// Secure implementation
contract SecureBank {
    mapping(address => uint) public balances;
    bool private locked;
    
    modifier noReentrant() {
        require(!locked, "No reentrancy");
        locked = true;
        _;
        locked = false;
    }
    
    function withdraw(uint amount) public noReentrant {
        require(balances[msg.sender] >= amount);
        balances[msg.sender] -= amount;  // State update before external call
        (bool success, ) = msg.sender.call{value: amount}("");
        require(success);
    }
}`}
          language="solidity"
        />

        <h2>2. Integer Overflow/Underflow</h2>
        
        <p>
          Before Solidity 0.8.0, arithmetic operations could silently overflow or underflow.
        </p>

        <CodeBlock
          code={`// Vulnerable contract (Solidity < 0.8.0)
contract VulnerableToken {
    mapping(address => uint8) public balances;
    
    function transfer(address to, uint8 amount) public {
        balances[msg.sender] -= amount;  // Could underflow
        balances[to] += amount;          // Could overflow
    }
}

// Secure implementation using SafeMath
contract SecureToken {
    using SafeMath for uint256;
    mapping(address => uint256) public balances;
    
    function transfer(address to, uint256 amount) public {
        balances[msg.sender] = balances[msg.sender].sub(amount);
        balances[to] = balances[to].add(amount);
    }
}`}
          language="solidity"
        />

        <h2>3. Front-Running</h2>
        
        <p>
          Miners can see transactions in the mempool and potentially front-run them.
        </p>

        <CodeBlock
          code={`// Vulnerable implementation
contract VulnerableMarket {
    mapping(bytes32 => bool) public orders;
    uint public currentPrice;
    
    function executeOrder(bytes32 orderHash, uint price) public {
        require(!orders[orderHash], "Order already executed");
        require(price >= currentPrice, "Price too low");
        
        orders[orderHash] = true;
        // Execute order logic
    }
}

// More secure implementation using commit-reveal
contract SecureMarket {
    mapping(bytes32 => bool) public commitments;
    mapping(bytes32 => uint) public commitmentTimes;
    uint public constant REVEAL_TIMEOUT = 5 minutes;
    
    function commit(bytes32 commitment) public {
        commitments[commitment] = true;
        commitmentTimes[commitment] = block.timestamp;
    }
    
    function execute(
        bytes32 orderHash,
        uint price,
        bytes32 salt
    ) public {
        bytes32 commitment = keccak256(
            abi.encodePacked(orderHash, price, salt)
        );
        require(commitments[commitment], "Invalid commitment");
        require(
            block.timestamp >= commitmentTimes[commitment] + REVEAL_TIMEOUT,
            "Too early"
        );
        // Execute order logic
    }
}`}
          language="solidity"
        />

        <h2>4. Access Control Issues</h2>
        
        <CodeBlock
          code={`// Vulnerable implementation
contract VulnerableContract {
    address public owner;
    
    constructor() {
        owner = msg.sender;
    }
    
    function transferOwnership(address newOwner) public {
        owner = newOwner;  // No access control
    }
}

// Secure implementation
contract SecureContract {
    address public owner;
    
    constructor() {
        owner = msg.sender;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Not authorized");
        _;
    }
    
    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "Invalid address");
        owner = newOwner;
    }
}`}
          language="solidity"
        />

        <h2>5. Denial of Service (DoS)</h2>
        
        <CodeBlock
          code={`// Vulnerable implementation
contract VulnerableAuction {
    address public currentLeader;
    uint public highestBid;
    
    function bid() public payable {
        require(msg.value > highestBid);
        
        // Refund the previous leader
        payable(currentLeader).transfer(highestBid);
        
        currentLeader = msg.sender;
        highestBid = msg.value;
    }
}

// Secure implementation using pull pattern
contract SecureAuction {
    address public currentLeader;
    uint public highestBid;
    mapping(address => uint) public refunds;
    
    function bid() public payable {
        require(msg.value > highestBid);
        
        // Record refund for previous leader
        if (currentLeader != address(0)) {
            refunds[currentLeader] += highestBid;
        }
        
        currentLeader = msg.sender;
        highestBid = msg.value;
    }
    
    function withdrawRefund() public {
        uint refund = refunds[msg.sender];
        require(refund > 0);
        
        refunds[msg.sender] = 0;
        payable(msg.sender).transfer(refund);
    }
}`}
          language="solidity"
        />

        <h2>6. Oracle Manipulation</h2>
        
        <CodeBlock
          code={`// Vulnerable implementation
contract VulnerableOracle {
    uint public price;
    
    function updatePrice(uint newPrice) public {
        price = newPrice;  // Single source of truth
    }
}

// Secure implementation using multiple sources
contract SecureOracle {
    struct PriceData {
        uint price;
        uint timestamp;
        address source;
    }
    
    mapping(address => bool) public authorizedSources;
    PriceData[] public priceHistory;
    uint public constant MIN_SOURCES = 3;
    uint public constant MAX_AGE = 1 hours;
    
    function updatePrice(uint newPrice) public {
        require(authorizedSources[msg.sender], "Unauthorized source");
        
        priceHistory.push(PriceData({
            price: newPrice,
            timestamp: block.timestamp,
            source: msg.sender
        }));
    }
    
    function getMedianPrice() public view returns (uint) {
        require(priceHistory.length >= MIN_SOURCES, "Insufficient data");
        
        uint[] memory validPrices = new uint[](priceHistory.length);
        uint validCount = 0;
        
        // Collect valid prices
        for (uint i = 0; i < priceHistory.length; i++) {
            if (block.timestamp - priceHistory[i].timestamp <= MAX_AGE) {
                validPrices[validCount] = priceHistory[i].price;
                validCount++;
            }
        }
        
        require(validCount >= MIN_SOURCES, "Insufficient recent data");
        
        // Sort prices and return median
        for (uint i = 0; i < validCount - 1; i++) {
            for (uint j = 0; j < validCount - i - 1; j++) {
                if (validPrices[j] > validPrices[j + 1]) {
                    (validPrices[j], validPrices[j + 1]) = (
                        validPrices[j + 1],
                        validPrices[j]
                    );
                }
            }
        }
        
        return validPrices[validCount / 2];
    }
}`}
          language="solidity"
        />

        <div className="mt-12 border-t border-gray-200 dark:border-solidity-800 pt-6">
          <div className="flex justify-between items-center">
            <Link
              to="/tutorials/security-best-practices"
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-solidity-700 text-sm font-medium rounded-md text-solidity-700 dark:text-white bg-white dark:bg-solidity-800 hover:bg-gray-50 dark:hover:bg-solidity-700 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous: Security Best Practices
            </Link>
            <Link
              to="/tutorials/devops-security"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-ethereum-600 hover:bg-ethereum-700 transition-colors"
            >
              Next: DevOps Security <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommonAttacks;