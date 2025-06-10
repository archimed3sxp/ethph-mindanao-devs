import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, PenTool as Tool } from 'lucide-react';
import CodeBlock from '../../components/shared/CodeBlock';

const Foundry: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto py-8 animate-fade-in">
      <div className="mb-8">
        <div className="flex items-center text-sm text-solidity-500 dark:text-gray-400 mb-2">
          <Tool className="h-4 w-4 mr-1" />
          <span>Getting Started</span>
        </div>
        <h1 className="text-3xl font-bold text-solidity-900 dark:text-white mb-4">
          Foundry: Modern Smart Contract Development
        </h1>
        <div className="flex items-center text-sm text-solidity-500 dark:text-gray-400">
          <span className="mr-4">Difficulty: Intermediate</span>
          <span>Reading time: ~25 min</span>
        </div>
      </div>

      <div className="prose dark:prose-invert prose-ethereum max-w-none">
        <p className="text-lg text-solidity-700 dark:text-gray-200 leading-relaxed">
          Foundry is a blazing fast, portable, and modular toolkit for Ethereum application development written in Rust. It's designed to make smart contract development more efficient and testing more robust.
        </p>

        <h2>Why Foundry?</h2>
        
        <ul>
          <li><strong>Fast Testing</strong> - Tests are written in Solidity and run directly against the EVM</li>
          <li><strong>Debugging</strong> - Powerful debugging capabilities with stack traces and gas reports</li>
          <li><strong>Forge</strong> - A command-line tool for testing, building, and deploying</li>
          <li><strong>Cast</strong> - A command-line tool for interacting with smart contracts</li>
          <li><strong>Anvil</strong> - A local Ethereum node designed for development</li>
        </ul>

        <h2>Installation</h2>
        
        <p>
          Install Foundry using the following commands:
        </p>

        <CodeBlock
          code={`# On macOS or Linux
curl -L https://foundry.paradigm.xyz | bash
foundryup

# On Windows (using Git Bash)
curl -L https://foundry.paradigm.xyz | bash
# Then restart your terminal and run:
foundryup`}
          language="bash"
        />

        <h2>Creating a New Project</h2>
        
        <p>
          Initialize a new Foundry project:
        </p>

        <CodeBlock
          code={`forge init my-project
cd my-project`}
          language="bash"
        />

        <p>
          This creates a project with the following structure:
        </p>

        <pre className="bg-gray-100 dark:bg-solidity-800 p-4 rounded-md">
my-project/
├── lib/             # Dependencies (git submodules)
├── src/             # Contract source files
│   └── Counter.sol
├── test/            # Test files
│   └── Counter.t.sol
├── script/          # Deployment scripts
│   └── Counter.s.sol
└── foundry.toml     # Foundry configuration
        </pre>

        <h2>Writing Tests</h2>
        
        <p>
          Foundry tests are written in Solidity. Here's an example test file:
        </p>

        <CodeBlock
          code={`// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/Counter.sol";

contract CounterTest is Test {
    Counter public counter;

    function setUp() public {
        counter = new Counter();
        counter.setNumber(0);
    }

    function testIncrement() public {
        counter.increment();
        assertEq(counter.number(), 1);
    }

    function testSetNumber(uint256 x) public {
        counter.setNumber(x);
        assertEq(counter.number(), x);
    }

    function testFailSubtractUnderflow() public {
        counter.decrement();
    }
}`}
          language="solidity"
        />

        <h3>Key Testing Features</h3>
        
        <ul>
          <li><strong>setUp()</strong> - Runs before each test</li>
          <li><strong>assertEq()</strong> - Assertion for equality</li>
          <li><strong>testFail</strong> prefix - Test expected to revert</li>
          <li><strong>Fuzz Testing</strong> - Automatically test with random inputs</li>
        </ul>

        <h2>Running Tests</h2>
        
        <CodeBlock
          code={`# Run all tests
forge test

# Run with verbosity level
forge test -vv

# Run specific test
forge test --match-test testIncrement

# Run with gas report
forge test --gas-report`}
          language="bash"
        />

        <h2>Deploying Contracts</h2>
        
        <p>
          Create a deployment script in the <code>script</code> directory:
        </p>

        <CodeBlock
          code={`// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/Counter.sol";

contract CounterScript is Script {
    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        
        vm.startBroadcast(deployerPrivateKey);
        
        Counter counter = new Counter();
        counter.setNumber(0);
        
        vm.stopBroadcast();
    }
}`}
          language="solidity"
        />

        <p>
          Deploy using forge:
        </p>

        <CodeBlock
          code={`# Deploy to local network
forge script script/Counter.s.sol --fork-url http://localhost:8545 --broadcast

# Deploy to testnet
forge script script/Counter.s.sol --rpc-url $RPC_URL --broadcast --verify`}
          language="bash"
        />

        <h2>Using Cast</h2>
        
        <p>
          Cast is a command-line tool for interacting with smart contracts:
        </p>

        <CodeBlock
          code={`# Get the balance of an address
cast balance 0x742d35Cc6634C0532925a3b844Bc454e4438f44e

# Call a contract function
cast call 0x742d35Cc6634C0532925a3b844Bc454e4438f44e "balanceOf(address)(uint256)" 0x742d35Cc6634C0532925a3b844Bc454e4438f44e

# Send a transaction
cast send 0x742d35Cc6634C0532925a3b844Bc454e4438f44e "transfer(address,uint256)" 0x742d35Cc6634C0532925a3b844Bc454e4438f44e 100 --private-key $PRIVATE_KEY`}
          language="bash"
        />

        <h2>Using Anvil</h2>
        
        <p>
          Anvil is a local Ethereum node for development:
        </p>

        <CodeBlock
          code={`# Start a local node
anvil

# Start with specific configuration
anvil --port 8545 --block-time 5

# Start with fork of mainnet
anvil --fork-url $MAINNET_RPC_URL`}
          language="bash"
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
              to="/tutorials/basic-syntax"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-ethereum-600 hover:bg-ethereum-700 transition-colors"
            >
              Next: Basic Syntax <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Foundry;