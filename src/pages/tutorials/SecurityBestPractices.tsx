import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Shield } from 'lucide-react';
import CodeBlock from '../../components/shared/CodeBlock';

const SecurityBestPractices: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto py-8 animate-fade-in">
      <div className="mb-8">
        <div className="flex items-center text-sm text-solidity-500 dark:text-gray-400 mb-2">
          <Shield className="h-4 w-4 mr-1" />
          <span>Security</span>
        </div>
        <h1 className="text-3xl font-bold text-solidity-900 dark:text-white mb-4">
          Security Best Practices
        </h1>
        <div className="flex items-center text-sm text-solidity-500 dark:text-gray-400">
          <span className="mr-4">Difficulty: Advanced</span>
          <span>Reading time: ~30 min</span>
        </div>
      </div>

      <div className="prose dark:prose-invert prose-ethereum max-w-none">
        <p className="text-lg text-solidity-700 dark:text-gray-200 leading-relaxed">
          Security is paramount in blockchain development. This guide covers essential security practices for smart contract development and private key management.
        </p>

        <h2>Private Key Security</h2>
        
        <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 dark:border-red-600 p-4 my-6">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800 dark:text-red-200">Critical Security Warning</h3>
              <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                <ul className="list-disc pl-5 space-y-1">
                  <li>NEVER share your private key with anyone</li>
                  <li>NEVER commit private keys to version control</li>
                  <li>NEVER store private keys in plain text</li>
                  <li>NEVER use production private keys in development</li>
                  <li>NEVER respond to requests for your private key or seed phrase</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <h3>Secure Private Key Management</h3>
        
        <ul>
          <li>Use environment variables for private keys</li>
          <li>Implement proper key rotation procedures</li>
          <li>Use hardware wallets for production deployments</li>
          <li>Maintain separate keys for development and production</li>
          <li>Use multi-signature wallets for high-value contracts</li>
        </ul>

        <h2>Smart Contract Security Best Practices</h2>

        <h3>1. Access Control</h3>
        
        <CodeBlock
          code={`// Bad practice
function withdraw() public {
    payable(msg.sender).transfer(address(this).balance);
}

// Good practice
modifier onlyOwner {
    require(msg.sender == owner, "Not authorized");
    _;
}

function withdraw() public onlyOwner {
    payable(msg.sender).transfer(address(this).balance);
}`}
          language="solidity"
        />

        <h3>2. Input Validation</h3>
        
        <CodeBlock
          code={`// Bad practice
function transfer(address to, uint256 amount) public {
    balances[msg.sender] -= amount;
    balances[to] += amount;
}

// Good practice
function transfer(address to, uint256 amount) public {
    require(to != address(0), "Invalid recipient");
    require(amount <= balances[msg.sender], "Insufficient balance");
    require(amount > 0, "Amount must be positive");
    
    balances[msg.sender] -= amount;
    balances[to] += amount;
}`}
          language="solidity"
        />

        <h3>3. Reentrancy Protection</h3>
        
        <CodeBlock
          code={`// Bad practice
function withdraw(uint256 amount) public {
    require(balances[msg.sender] >= amount);
    (bool success, ) = msg.sender.call{value: amount}("");
    require(success);
    balances[msg.sender] -= amount;
}

// Good practice
bool private locked;

modifier noReentrant() {
    require(!locked, "No reentrancy");
    locked = true;
    _;
    locked = false;
}

function withdraw(uint256 amount) public noReentrant {
    require(balances[msg.sender] >= amount);
    balances[msg.sender] -= amount;
    (bool success, ) = msg.sender.call{value: amount}("");
    require(success);
}`}
          language="solidity"
        />

        <h3>4. Integer Overflow Protection</h3>
        
        <CodeBlock
          code={`// Safe math is built into Solidity 0.8.0+
// But for earlier versions:
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
}`}
          language="solidity"
        />

        <h3>5. Gas Optimization</h3>
        
        <CodeBlock
          code={`// Bad practice - expensive storage reads
function sumBalances(address[] memory users) public view returns (uint256) {
    uint256 sum = 0;
    for(uint256 i = 0; i < users.length; i++) {
        sum += balances[users[i]];
    }
    return sum;
}

// Good practice - cache storage reads
function sumBalances(address[] memory users) public view returns (uint256) {
    uint256 sum = 0;
    uint256 length = users.length;
    for(uint256 i = 0; i < length; i++) {
        sum += balances[users[i]];
    }
    return sum;
}`}
          language="solidity"
        />

        <h2>Development Best Practices</h2>

        <h3>1. Testing</h3>
        <ul>
          <li>Write comprehensive unit tests</li>
          <li>Implement integration tests</li>
          <li>Use property-based testing</li>
          <li>Test edge cases thoroughly</li>
          <li>Simulate attack scenarios</li>
        </ul>

        <h3>2. Code Quality</h3>
        <ul>
          <li>Follow style guides (e.g., Solidity style guide)</li>
          <li>Use meaningful variable and function names</li>
          <li>Document code with NatSpec comments</li>
          <li>Keep functions small and focused</li>
          <li>Use design patterns appropriately</li>
        </ul>

        <h3>3. Deployment</h3>
        <ul>
          <li>Use a deployment checklist</li>
          <li>Test on testnets first</li>
          <li>Verify contract source code</li>
          <li>Monitor contract events</li>
          <li>Have an upgrade strategy</li>
        </ul>

        <div className="mt-12 border-t border-gray-200 dark:border-solidity-800 pt-6">
          <div className="flex justify-between items-center">
            <Link
              to="/tutorials/erc1155"
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-solidity-700 text-sm font-medium rounded-md text-solidity-700 dark:text-white bg-white dark:bg-solidity-800 hover:bg-gray-50 dark:hover:bg-solidity-700 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous: ERC1155
            </Link>
            <Link
              to="/tutorials/common-attacks"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-ethereum-600 hover:bg-ethereum-700 transition-colors"
            >
              Next: Common Attacks <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityBestPractices;