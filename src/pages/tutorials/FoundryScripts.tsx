import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Terminal } from 'lucide-react';
import CodeBlock from '../../components/shared/CodeBlock';

const FoundryScripts: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto py-8 animate-fade-in">
      <div className="mb-8">
        <div className="flex items-center text-sm text-solidity-500 dark:text-gray-400 mb-2">
          <Terminal className="h-4 w-4 mr-1" />
          <span>Getting Started</span>
        </div>
        <h1 className="text-3xl font-bold text-solidity-900 dark:text-white mb-4">
          Common Foundry Scripts
        </h1>
        <div className="flex items-center text-sm text-solidity-500 dark:text-gray-400">
          <span className="mr-4">Difficulty: Intermediate</span>
          <span>Reading time: ~20 min</span>
        </div>
      </div>

      <div className="prose dark:prose-invert prose-ethereum max-w-none">
        <p className="text-lg text-solidity-700 dark:text-gray-200 leading-relaxed">
          This guide covers common scripts and commands you'll use frequently when developing with Foundry. These scripts will help you streamline your development workflow and make common tasks easier.
        </p>

        <h2>Project Management Scripts</h2>

        <CodeBlock
          code={`# Update Foundry
foundryup

# Create new project
forge init my-project

# Install dependencies
forge install OpenZeppelin/openzeppelin-contracts

# Update dependencies
forge update

# Remove dependency
forge remove OpenZeppelin/openzeppelin-contracts

# Build project
forge build

# Clean build artifacts
forge clean`}
          language="bash"
        />

        <h2>Compiling Contracts</h2>

        <CodeBlock
          code={`# Compile all contracts
forge build

# Compile a single contract
forge build --contracts src/MyContract.sol

# Compile with optimizer enabled
forge build --optimize

# Compile with specific EVM version
forge build --evm-version paris

# Compile and show size of contracts
forge build --sizes

# Compile with extra output
forge build -vvv

# Compile and show gas estimates
forge build --gas-report`}
          language="bash"
        />

        <h2>Testing Scripts</h2>

        <CodeBlock
          code={`# Run all tests
forge test

# Run tests with more verbosity (vvv = trace)
forge test -vvv

# Run specific test
forge test --match-test testFunctionName

# Run tests in a specific contract
forge test --match-contract ContractName

# Run tests with gas reporting
forge test --gas-report

# Run tests with coverage reporting
forge coverage

# Run tests with specific fork
forge test --fork-url $RPC_URL

# Run tests with specific block number
forge test --fork-url $RPC_URL --fork-block-number 1234567`}
          language="bash"
        />

        <h2>Sample Test Script</h2>

        <CodeBlock
          code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/Token.sol";

contract TokenTest is Test {
    Token token;
    address alice = address(1);
    address bob = address(2);
    
    function setUp() public {
        // Deploy token with initial supply
        token = new Token("Test Token", "TEST", 18, 1000000 * 10**18);
        
        // Give Alice some tokens
        token.transfer(alice, 1000 * 10**18);
    }
    
    function testTransfer() public {
        // Test normal transfer
        vm.startPrank(alice);
        token.transfer(bob, 100 * 10**18);
        assertEq(token.balanceOf(bob), 100 * 10**18);
        assertEq(token.balanceOf(alice), 900 * 10**18);
    }
    
    function testFailInsufficientBalance() public {
        // This should fail
        vm.startPrank(alice);
        token.transfer(bob, 2000 * 10**18);
    }
    
    function testFuzz_Transfer(uint256 amount) public {
        // Fuzz testing with random amounts
        vm.assume(amount <= 1000 * 10**18);
        vm.startPrank(alice);
        token.transfer(bob, amount);
        assertEq(token.balanceOf(bob), amount);
        assertEq(token.balanceOf(alice), 1000 * 10**18 - amount);
    }
    
    function testFork_RealNetwork() public {
        // Fork mainnet and test with real contracts
        vm.createSelectFork(vm.envString("ETH_RPC_URL"));
        
        // Test with real USDC contract
        address USDC = 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48;
        address holder = 0x47ac0Fb4F2D84898e4D9E7b4DaB3C24507a6D503;
        
        vm.startPrank(holder);
        IERC20(USDC).transfer(address(this), 1000000);
        assertGt(IERC20(USDC).balanceOf(address(this)), 0);
    }
}`}
          language="solidity"
        />

        <h2>Deployment Scripts</h2>

        <CodeBlock
          code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/Token.sol";

contract DeployToken is Script {
    function run() public {
        // Get deployment parameters from environment
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        string memory name = vm.envString("TOKEN_NAME");
        string memory symbol = vm.envString("TOKEN_SYMBOL");
        uint8 decimals = uint8(vm.envUint("TOKEN_DECIMALS"));
        uint256 initialSupply = vm.envUint("INITIAL_SUPPLY");
        
        // Start broadcasting transactions
        vm.startBroadcast(deployerPrivateKey);
        
        // Deploy token
        Token token = new Token(name, symbol, decimals, initialSupply);
        
        // Optional: Set up initial token distribution
        address treasury = vm.envAddress("TREASURY_ADDRESS");
        token.transfer(treasury, initialSupply / 2);
        
        vm.stopBroadcast();
        
        // Log deployment info
        console.log("Token deployed at:", address(token));
        console.log("Name:", token.name());
        console.log("Symbol:", token.symbol());
        console.log("Total Supply:", token.totalSupply());
    }
}`}
          language="solidity"
        />

        <h2>Contract Interaction Scripts</h2>

        <CodeBlock
          code={`# Call view/pure function (read)
cast call $CONTRACT_ADDRESS "balanceOf(address)(uint256)" $ADDRESS

# Call view function with multiple parameters
cast call $CONTRACT_ADDRESS "allowance(address,address)(uint256)" $OWNER_ADDRESS $SPENDER_ADDRESS

# Format output as decimal
cast call $CONTRACT_ADDRESS "totalSupply()(uint256)" --from-wei

# Call state-changing function (write)
cast send $CONTRACT_ADDRESS "transfer(address,uint256)" $TO_ADDRESS 1000000000000000000 --private-key $PRIVATE_KEY

# Call function with ETH value
cast send $CONTRACT_ADDRESS "deposit()" --value 1ether --private-key $PRIVATE_KEY

# Call function with constructor arguments
cast send $CONTRACT_ADDRESS "initialize(string,string,uint256)" "MyToken" "MTK" 1000000 --private-key $PRIVATE_KEY

# Estimate gas for a transaction
cast estimate $CONTRACT_ADDRESS "transfer(address,uint256)" $TO_ADDRESS 1000000000000000000

# Get transaction receipt
cast receipt $TX_HASH

# Get block information
cast block latest

# Get nonce
cast nonce $ADDRESS`}
          language="bash"
        />

        <h2>Local Network Scripts</h2>

        <CodeBlock
          code={`# Start local node
anvil

# Start with custom port
anvil --port 8545

# Start with custom chain ID
anvil --chain-id 1337

# Start with specific accounts
anvil --accounts 20

# Fork mainnet
anvil --fork-url $MAINNET_RPC_URL

# Fork specific block
anvil --fork-url $MAINNET_RPC_URL --fork-block-number 1234567`}
          language="bash"
        />

        <h2>Debug and Analysis Scripts</h2>

        <CodeBlock
          code={`# Show detailed transaction trace
cast run $TX_HASH

# Get storage at slot
cast storage $CONTRACT_ADDRESS $SLOT

# Get contract code
cast code $CONTRACT_ADDRESS

# Get ABI-encoded calldata
cast calldata "transfer(address,uint256)" $TO_ADDRESS 1000000000000000000

# Decode calldata
cast --calldata-decode "transfer(address,uint256)" $CALLDATA

# Get event topics
cast keccak "Transfer(address,address,uint256)"`}
          language="bash"
        />

        <h2>Configuration Scripts</h2>

        <p>
          Common configurations in foundry.toml:
        </p>

        <CodeBlock
          code={`[profile.default]
src = "src"
test = "test"
out = "out"
libs = ["lib"]
remappings = [
    "@openzeppelin/=lib/openzeppelin-contracts/"
]

[profile.default.optimizer_details]
peephole = true
inliner = true
jumpdest_remover = true
order_literals = true
deduplicate = true
cse = true
constant_optimizer = true
yul = true

[profile.default.optimizer]
enabled = true
runs = 200

[etherscan]
mainnet = { key = "YOUR_ETHERSCAN_API_KEY" }
goerli = { key = "YOUR_ETHERSCAN_API_KEY" }

[rpc_endpoints]
mainnet = "YOUR_MAINNET_RPC_URL"
goerli = "YOUR_GOERLI_RPC_URL"`}
          language="toml"
        />

        <h2>Useful Shell Aliases</h2>

        <p>
          Add these to your shell configuration file (.bashrc, .zshrc, etc.):
        </p>

        <CodeBlock
          code={`# Foundry aliases
alias f='forge'
alias fb='forge build'
alias ft='forge test'
alias ftr='forge test -vvv'
alias fc='forge clean'
alias fu='forge update'
alias fs='forge script'
alias cast='cast'
alias anvil='anvil'

# Common test commands
alias ftg='forge test --gas-report'
alias ftc='forge coverage'
alias ftw='forge test --watch'

# Deployment commands
alias fd='forge script script/Deploy.s.sol --rpc-url localhost --broadcast'
alias fdv='forge script script/Deploy.s.sol --rpc-url localhost --broadcast --verify'`}
          language="bash"
        />

        <div className="mt-12 border-t border-gray-200 dark:border-solidity-800 pt-6">
          <div className="flex justify-between items-center">
            <Link
              to="/tutorials/foundry"
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-solidity-700 text-sm font-medium rounded-md text-solidity-700 dark:text-white bg-white dark:bg-solidity-800 hover:bg-gray-50 dark:hover:bg-solidity-700 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous: Foundry
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

export default FoundryScripts;