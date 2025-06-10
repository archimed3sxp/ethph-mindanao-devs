import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Zap } from 'lucide-react';
import CodeBlock from '../../components/shared/CodeBlock';
import { 
  useAccount, 
  useConnect, 
  useDisconnect, 
  useBalance,
  useWriteContract,
  useReadContract,
  useWaitForTransactionReceipt
} from 'wagmi';
import { injected } from 'wagmi/connectors';

const WagmiIntegration: React.FC = () => {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: injected(),
  });
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({
    address,
  });

  return (
    <div className="max-w-3xl mx-auto py-8 animate-fade-in">
      <div className="mb-8">
        <div className="flex items-center text-sm text-solidity-500 dark:text-gray-400 mb-2">
          <Zap className="h-4 w-4 mr-1" />
          <span>Advanced Topics</span>
        </div>
        <h1 className="text-3xl font-bold text-solidity-900 dark:text-white mb-4">
          WAGMI Integration with Foundry
        </h1>
        <div className="flex items-center text-sm text-solidity-500 dark:text-gray-400">
          <span className="mr-4">Difficulty: Advanced</span>
          <span>Reading time: ~25 min</span>
        </div>
      </div>

      <div className="prose dark:prose-invert prose-ethereum max-w-none">
        <p className="text-lg text-solidity-700 dark:text-gray-200 leading-relaxed">
          WAGMI is a collection of React Hooks for working with Ethereum. It makes it easy to "Connect Wallet", display ENS and balance information, sign messages, interact with contracts, and much more.
        </p>

        <div className="bg-gray-50 dark:bg-solidity-800 rounded-lg p-6 my-8">
          <h3 className="text-lg font-semibold mb-4">Live Demo</h3>
          <div className="space-y-4">
            {!isConnected ? (
              <button
                onClick={() => connect()}
                className="px-4 py-2 bg-ethereum-600 text-white rounded-md hover:bg-ethereum-700 transition-colors"
              >
                Connect Wallet
              </button>
            ) : (
              <div className="space-y-2">
                <p>Connected to: {address}</p>
                <p>Balance: {balance?.formatted} {balance?.symbol}</p>
                <button
                  onClick={() => disconnect()}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                >
                  Disconnect
                </button>
              </div>
            )}
          </div>
        </div>

        <h2>Setting Up WAGMI</h2>

        <p>First, install the required dependencies:</p>

        <CodeBlock
          code={`npm install wagmi viem @tanstack/react-query`}
          language="bash"
        />

        <p>Configure WAGMI in your app:</p>

        <CodeBlock
          code={`import { WagmiProvider, createConfig, http } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});

const queryClient = new QueryClient();

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {/* Your app content */}
      </QueryClientProvider>
    </WagmiProvider>
  );
}`}
          language="typescript"
        />

        <h2>Basic Wallet Connection</h2>

        <CodeBlock
          code={`import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected } from 'wagmi/connectors';

function WalletConnect() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: injected(),
  });
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <div>
        Connected to {address}
        <button onClick={() => disconnect()}>
          Disconnect
        </button>
      </div>
    );
  }

  return <button onClick={() => connect()}>Connect Wallet</button>;
}`}
          language="typescript"
        />

        <h2>Reading Contract Data</h2>

        <CodeBlock
          code={`import { useContractRead } from 'wagmi';

function TokenBalance() {
  const { data, isError, isLoading } = useContractRead({
    address: '0x...',
    abi: [{
      name: 'balanceOf',
      type: 'function',
      inputs: [{ name: 'owner', type: 'address' }],
      outputs: [{ name: 'balance', type: 'uint256' }],
      stateMutability: 'view'
    }],
    functionName: 'balanceOf',
    args: ['0x...'],
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching balance</div>;
  return <div>Balance: {data?.toString()}</div>;
}`}
          language="typescript"
        />

        <h2>Writing to Contracts</h2>

        <CodeBlock
          code={`import { useContractWrite, useWaitForTransaction } from 'wagmi';

function MintNFT() {
  const { write, data, isLoading, isError } = useContractWrite({
    address: '0x...',
    abi: [{
      name: 'mint',
      type: 'function',
      inputs: [],
      outputs: [],
      stateMutability: 'nonpayable'
    }],
    functionName: 'mint',
  });

  const { isLoading: isConfirming, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  return (
    <div>
      <button
        disabled={isLoading || isConfirming}
        onClick={() => write()}
      >
        {isLoading ? 'Waiting for approval' :
         isConfirming ? 'Confirming...' :
         'Mint NFT'}
      </button>
      {isSuccess && <div>Successfully minted!</div>}
      {isError && <div>Error minting NFT</div>}
    </div>
  );
}`}
          language="typescript"
        />

        <h2>Integrating with Foundry</h2>

        <p>
          When using WAGMI with Foundry-built contracts, you can easily import the ABI:
        </p>

        <CodeBlock
          code={`// Import ABI from Foundry artifacts
import { abi } from '../out/Contract.sol/Contract.json';

function ContractInteraction() {
  const { data } = useContractRead({
    address: '0x...',
    abi,
    functionName: 'someFunction',
  });
}`}
          language="typescript"
        />

        <h2>Testing Contract Interactions</h2>

        <CodeBlock
          code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Test.sol";
import "../src/Contract.sol";

contract ContractTest is Test {
    Contract public myContract;
    address public user = address(1);

    function setUp() public {
        myContract = new Contract();
        vm.deal(user, 100 ether);
    }

    function testContractInteraction() public {
        vm.startPrank(user);
        
        // Test the interaction that will be called via wagmi
        myContract.someFunction();
        
        vm.stopPrank();
    }
}`}
          language="solidity"
        />

        <h2>Best Practices</h2>

        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 dark:border-blue-600 p-4 my-6">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">WAGMI Integration Tips</h3>
              <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Always handle loading and error states</li>
                  <li>Use TypeScript for better type safety</li>
                  <li>Implement proper error handling for failed transactions</li>
                  <li>Cache contract reads when possible</li>
                  <li>Use appropriate chain configurations</li>
                  <li>Test thoroughly with Foundry before deploying</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 dark:border-solidity-800 pt-6">
          <div className="flex justify-between items-center">
            <Link
              to="/tutorials/design-patterns"
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-solidity-700 text-sm font-medium rounded-md text-solidity-700 dark:text-white bg-white dark:bg-solidity-800 hover:bg-gray-50 dark:hover:bg-solidity-700 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous: Design Patterns
            </Link>
            <Link
              to="/tutorials/chainlink-vrf"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-ethereum-600 hover:bg-ethereum-700 transition-colors"
            >
              Next: Chainlink VRF <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WagmiIntegration;