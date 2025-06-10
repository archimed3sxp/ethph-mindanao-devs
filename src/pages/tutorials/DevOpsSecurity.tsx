import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Shield } from 'lucide-react';
import CodeBlock from '../../components/shared/CodeBlock';

const DevOpsSecurity: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto py-8 animate-fade-in">
      <div className="mb-8">
        <div className="flex items-center text-sm text-solidity-500 dark:text-gray-400 mb-2">
          <Shield className="h-4 w-4 mr-1" />
          <span>Security</span>
        </div>
        <h1 className="text-3xl font-bold text-solidity-900 dark:text-white mb-4">
          DevOps Security Best Practices
        </h1>
        <div className="flex items-center text-sm text-solidity-500 dark:text-gray-400">
          <span className="mr-4">Difficulty: Advanced</span>
          <span>Reading time: ~25 min</span>
        </div>
      </div>

      <div className="prose dark:prose-invert prose-ethereum max-w-none">
        <p className="text-lg text-solidity-700 dark:text-gray-200 leading-relaxed">
          Secure DevOps practices are essential for blockchain development. This guide covers best practices for development, testing, deployment, and monitoring of smart contracts.
        </p>

        <h2>Development Environment Security</h2>

        <h3>1. Version Control</h3>
        
        <CodeBlock
          code={`# .gitignore
.env
.env.*
node_modules/
coverage/
artifacts/
cache/
typechain/
.DS_Store

# Sample .env.example
ETHERSCAN_API_KEY=your_api_key_here
ALCHEMY_API_KEY=your_api_key_here
PRIVATE_KEY=your_private_key_here  # Never commit actual private keys!`}
          language="bash"
        />

        <ul>
          <li>Use .gitignore to prevent sensitive data commits</li>
          <li>Never commit private keys or API keys</li>
          <li>Use environment variables for sensitive data</li>
          <li>Implement branch protection rules</li>
          <li>Require code reviews before merging</li>
        </ul>

        <h3>2. Dependency Management</h3>
        
        <CodeBlock
          code={`// package.json
{
  "name": "my-contract",
  "version": "1.0.0",
  "scripts": {
    "audit": "npm audit",
    "audit:fix": "npm audit fix",
    "outdated": "npm outdated"
  }
}

// foundry.toml
[profile.default]
optimizer = true
optimizer_runs = 200
verbosity = 3
gas_reports = ["*"]
via_ir = false

[profile.ci]
fuzz_runs = 1000
verbosity = 4
via_ir = true`}
          language="json"
        />

        <ul>
          <li>Regularly update dependencies</li>
          <li>Use lock files (package-lock.json, yarn.lock)</li>
          <li>Audit dependencies for vulnerabilities</li>
          <li>Pin dependency versions</li>
          <li>Use trusted package sources</li>
        </ul>

        <h2>Testing and Quality Assurance</h2>

        <h3>1. Automated Testing</h3>
        
        <CodeBlock
          code={`// Test configuration
// foundry.toml
[profile.default.fuzz]
runs = 1000
max_test_rejects = 65536
seed = '0x3e8'
max_local_rejects = 1024
fail_on_revert = true

// Comprehensive test example
contract TokenTest is Test {
    Token token;
    address alice = address(1);
    address bob = address(2);
    
    function setUp() public {
        token = new Token();
        token.mint(alice, 1000);
    }
    
    function testFuzz_Transfer(uint256 amount) public {
        vm.assume(amount <= 1000);
        
        vm.startPrank(alice);
        token.transfer(bob, amount);
        vm.stopPrank();
        
        assertEq(token.balanceOf(bob), amount);
        assertEq(token.balanceOf(alice), 1000 - amount);
    }
    
    function invariant_TotalSupply() public {
        assertEq(
            token.totalSupply(),
            token.balanceOf(alice) + token.balanceOf(bob)
        );
    }
}`}
          language="solidity"
        />

        <h3>2. Code Coverage</h3>
        
        <CodeBlock
          code={`# Run coverage analysis
forge coverage --report lcov

# Generate HTML report
genhtml lcov.info -o coverage/

# Coverage configuration
# foundry.toml
[profile.default]
coverage = true
coverage_report_lines = true
coverage_report_statements = true`}
          language="bash"
        />

        <h2>Deployment Security</h2>

        <h3>1. Deployment Scripts</h3>
        
        <CodeBlock
          code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/Token.sol";

contract DeployToken is Script {
    function run() external {
        // Load environment variables
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        string memory name = vm.envString("TOKEN_NAME");
        string memory symbol = vm.envString("TOKEN_SYMBOL");
        
        // Pre-deployment checks
        require(bytes(name).length > 0, "Invalid token name");
        require(bytes(symbol).length > 0, "Invalid token symbol");
        
        vm.startBroadcast(deployerPrivateKey);
        
        // Deploy with timelock
        TimelockController timelock = new TimelockController(
            2 days,    // Minimum delay
            admins,    // Proposers
            admins     // Executors
        );
        
        Token token = new Token(
            name,
            symbol,
            address(timelock)  // Owner
        );
        
        vm.stopBroadcast();
        
        // Post-deployment verification
        require(
            token.name() == name,
            "Token name mismatch"
        );
        require(
            token.symbol() == symbol,
            "Token symbol mismatch"
        );
        require(
            token.owner() == address(timelock),
            "Owner mismatch"
        );
    }
}`}
          language="solidity"
        />

        <h3>2. Deployment Checklist</h3>
        
        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 dark:border-blue-600 p-4 my-6">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">Pre-deployment Checklist</h3>
              <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                <ul className="list-disc pl-5 space-y-1">
                  <li>All tests passing (unit, integration, fuzz)</li>
                  <li>Code coverage &gt; 95%</li>
                  <li>External audit completed</li>
                  <li>Gas optimization performed</li>
                  <li>Documentation updated</li>
                  <li>Emergency procedures documented</li>
                  <li>Timelock controls implemented</li>
                  <li>Multi-sig wallets configured</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <h2>Monitoring and Maintenance</h2>

        <h3>1. Event Monitoring</h3>
        
        <CodeBlock
          code={`// Event monitoring setup
interface IMonitor {
    event CriticalEvent(
        address indexed contract,
        string eventType,
        uint256 severity
    );
    
    event ThresholdExceeded(
        address indexed contract,
        string metric,
        uint256 value,
        uint256 threshold
    );
}

contract SecurityMonitor is IMonitor {
    struct Threshold {
        uint256 value;
        uint256 timeWindow;
        uint256 lastReset;
        uint256 currentCount;
    }
    
    mapping(bytes32 => Threshold) public thresholds;
    
    function checkThreshold(
        string memory metric,
        uint256 value
    ) external {
        bytes32 key = keccak256(abi.encodePacked(metric));
        Threshold storage t = thresholds[key];
        
        if (block.timestamp - t.lastReset > t.timeWindow) {
            t.currentCount = 0;
            t.lastReset = block.timestamp;
        }
        
        t.currentCount += value;
        
        if (t.currentCount > t.value) {
            emit ThresholdExceeded(
                msg.sender,
                metric,
                t.currentCount,
                t.value
            );
        }
    }
}`}
          language="solidity"
        />

        <h3>2. Automated Alerts</h3>
        
        <CodeBlock
          code={`// Alert configuration example
{
  "alerts": [
    {
      "name": "Large Transfer",
      "condition": "value > 100000",
      "severity": "high",
      "notification": {
        "type": "webhook",
        "url": "https://api.monitoring.com/alerts"
      }
    },
    {
      "name": "Failed Transactions",
      "condition": "status == 0",
      "threshold": {
        "count": 5,
        "timeWindow": "5m"
      },
      "severity": "critical",
      "notification": {
        "type": "pager",
        "service": "PagerDuty"
      }
    }
  ]
}`}
          language="json"
        />

        <h2>Incident Response</h2>

        <h3>1. Emergency Procedures</h3>
        
        <CodeBlock
          code={`// Emergency pause functionality
contract EmergencyControl {
    bool public paused;
    address public guardian;
    
    modifier whenNotPaused() {
        require(!paused, "Contract is paused");
        _;
    }
    
    modifier onlyGuardian() {
        require(msg.sender == guardian, "Not authorized");
        _;
    }
    
    function pause() external onlyGuardian {
        paused = true;
        emit Paused(msg.sender);
    }
    
    function unpause() external onlyGuardian {
        paused = false;
        emit Unpaused(msg.sender);
    }
}`}
          language="solidity"
        
        />

        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 dark:border-yellow-600 p-4 my-6">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Incident Response Plan</h3>
              <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
                <ol className="list-decimal pl-5 space-y-1">
                  <li>Detect incident through monitoring</li>
                  <li>Assess severity and impact</li>
                  <li>Pause contract if necessary</li>
                  <li>Notify stakeholders</li>
                  <li>Investigate root cause</li>
                  <li>Implement fixes</li>
                  <li>Test fixes thoroughly</li>
                  <li>Deploy fixes through timelock</li>
                  <li>Resume operations</li>
                  <li>Document and review incident</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 dark:border-solidity-800 pt-6">
          <div className="flex justify-between items-center">
            <Link
              to="/tutorials/common-attacks"
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-solidity-700 text-sm font-medium rounded-md text-solidity-700 dark:text-white bg-white dark:bg-solidity-800 hover:bg-gray-50 dark:hover:bg-solidity-700 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous: Common Attacks
            </Link>
            <Link
              to="/tutorials/foundry"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-ethereum-600 hover:bg-ethereum-700 transition-colors"
            >
              Next: Foundry <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevOpsSecurity;