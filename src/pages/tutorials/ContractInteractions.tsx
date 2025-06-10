import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Wallet } from 'lucide-react';
import CodeBlock from '../../components/shared/CodeBlock';
import { useContractRead, useContractWrite, useWaitForTransaction } from 'wagmi';

const ContractInteractions: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto py-8 animate-fade-in">
      <div className="mb-8">
        <div className="flex items-center text-sm text-solidity-500 dark:text-gray-400 mb-2">
          <Wallet className="h-4 w-4 mr-1" />
          <span>WAGMI</span>
        </div>
        <h1 className="text-3xl font-bold text-solidity-900 dark:text-white mb-4">
          Smart Contract Interactions
        </h1>
        <div className="flex items-center text-sm text-solidity-500 dark:text-gray-400">
          <span className="mr-4">Difficulty: Intermediate</span>
          <span>Reading time: ~25 min</span>
        </div>
      </div>

      <div className="prose dark:prose-invert prose-ethereum max-w-none">
        <p className="text-lg text-solidity-700 dark:text-gray-200 leading-relaxed">
          Learn how to interact with smart contracts using WAGMI hooks. We'll cover reading from and writing to contracts, handling events, and managing contract state.
        </p>

        <h2>Reading from Contracts</h2>

        <CodeBlock
          code={`import { useContractRead } from 'wagmi';

// ERC20 ABI (minimal)
const erc20ABI = [
  {
    name: 'balanceOf',
    type: 'function',
    inputs: [{ name: 'owner', type: 'address' }],
    outputs: [{ name: 'balance', type: 'uint256' }],
    stateMutability: 'view'
  }
] as const;

function TokenBalance({ address, tokenAddress }: { 
  address: \`0x\${string}\`,
  tokenAddress: \`0x\${string}\`
}) {
  const { data, isError, isLoading } = useContractRead({
    address: tokenAddress,
    abi: erc20ABI,
    functionName: 'balanceOf',
    args: [address],
    watch: true,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading balance</div>;

  return <div>Balance: {data?.toString()}</div>;
}`}
          language="typescript"
        />

        <h2>Writing to Contracts</h2>

        <CodeBlock
          code={`import { useContractWrite, useWaitForTransaction } from 'wagmi';

function TokenTransfer({ tokenAddress }: { tokenAddress: \`0x\${string}\` }) {
  const { 
    write, 
    data: hash,
    isLoading: isWritePending,
    error: writeError
  } = useContractWrite({
    address: tokenAddress,
    abi: [
      {
        name: 'transfer',
        type: 'function',
        inputs: [
          { name: 'to', type: 'address' },
          { name: 'amount', type: 'uint256' }
        ],
        outputs: [{ name: 'success', type: 'bool' }]
      }
    ],
    functionName: 'transfer',
  });

  const {
    data: receipt,
    isLoading: isConfirming,
    isSuccess,
    error: confirmError
  } = useWaitForTransaction({ hash });

  const handleTransfer = async () => {
    write({
      args: [
        '0x...', // recipient
        BigInt('1000000000000000000') // 1 token (18 decimals)
      ]
    });
  };

  return (
    <div>
      <button
        onClick={handleTransfer}
        disabled={isWritePending || isConfirming}
      >
        {isWritePending ? 'Waiting for approval' :
         isConfirming ? 'Confirming...' :
         'Transfer'}
      </button>

      {isSuccess && (
        <div>
          Transfer successful!
          <a
            href={\`https://etherscan.io/tx/\${hash}\`}
            target="_blank"
            rel="noopener noreferrer"
          >
            View on Etherscan
          </a>
        </div>
      )}

      {(writeError || confirmError) && (
        <div>Error: {writeError?.message || confirmError?.message}</div>
      )}
    </div>
  );
}`}
          language="typescript"
        />

        <h2>Contract Events</h2>

        <CodeBlock
          code={`import { useContractEvent } from 'wagmi';

function TransferEvents({ tokenAddress }: { tokenAddress: \`0x\${string}\` }) {
  const [events, setEvents] = useState<any[]>([]);

  useContractEvent({
    address: tokenAddress,
    abi: [
      {
        name: 'Transfer',
        type: 'event',
        inputs: [
          { name: 'from', type: 'address', indexed: true },
          { name: 'to', type: 'address', indexed: true },
          { name: 'value', type: 'uint256', indexed: false }
        ]
      }
    ],
    eventName: 'Transfer',
    listener(log) {
      setEvents((prev) => [...prev, log]);
    },
  });

  return (
    <div>
      <h3>Recent Transfers</h3>
      <div className="space-y-2">
        {events.map((event, index) => (
          <div key={index} className="p-4 bg-gray-50 dark:bg-solidity-800 rounded">
            <p>From: {event.args.from}</p>
            <p>To: {event.args.to}</p>
            <p>Value: {event.args.value.toString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}`}
          language="typescript"
        />

        <h2>Complete Contract Interface</h2>

        <CodeBlock
          code={`import {
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
  useContractEvent
} from 'wagmi';
import { parseEther, formatEther } from 'viem';

interface TokenInterfaceProps {
  address: \`0x\${string}\`;
  tokenAddress: \`0x\${string}\`;
}

function TokenInterface({ address, tokenAddress }: TokenInterfaceProps) {
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [events, setEvents] = useState<any[]>([]);

  // Read balance
  const { data: balance, refetch: refetchBalance } = useContractRead({
    address: tokenAddress,
    abi: [
      {
        name: 'balanceOf',
        type: 'function',
        inputs: [{ name: 'owner', type: 'address' }],
        outputs: [{ name: 'balance', type: 'uint256' }],
        stateMutability: 'view'
      }
    ],
    functionName: 'balanceOf',
    args: [address],
    watch: true,
  });

  // Write transfer
  const { 
    write: transfer,
    data: transferHash,
    isLoading: isTransferPending,
    error: transferError
  } = useContractWrite({
    address: tokenAddress,
    abi: [
      {
        name: 'transfer',
        type: 'function',
        inputs: [
          { name: 'to', type: 'address' },
          { name: 'amount', type: 'uint256' }
        ],
        outputs: [{ name: 'success', type: 'bool' }]
      }
    ],
    functionName: 'transfer',
  });

  // Wait for transaction
  const {
    isLoading: isConfirming,
    isSuccess,
    error: confirmError
  } = useWaitForTransaction({
    hash: transferHash,
    onSuccess: () => {
      refetchBalance();
      setRecipient('');
      setAmount('');
    },
  });

  // Listen for events
  useContractEvent({
    address: tokenAddress,
    abi: [
      {
        name: 'Transfer',
        type: 'event',
        inputs: [
          { name: 'from', type: 'address', indexed: true },
          { name: 'to', type: 'address', indexed: true },
          { name: 'value', type: 'uint256', indexed: false }
        ]
      }
    ],
    eventName: 'Transfer',
    listener(log) {
      setEvents((prev) => [log, ...prev].slice(0, 5));
    },
  });

  const handleTransfer = () => {
    if (!recipient || !amount) return;

    try {
      transfer({
        args: [recipient, parseEther(amount)]
      });
    } catch (error) {
      console.error('Transfer error:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Balance Display */}
      <div className="p-4 bg-gray-50 dark:bg-solidity-800 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Your Balance</h3>
        <p className="text-2xl font-mono">
          {balance ? formatEther(balance) : '0.00'} Tokens
        </p>
      </div>

      {/* Transfer Form */}
      <div className="p-4 bg-white dark:bg-solidity-900 rounded-lg border dark:border-solidity-800">
        <h3 className="text-lg font-semibold mb-4">Transfer Tokens</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Recipient Address
            </label>
            <input
              type="text"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="w-full p-2 border rounded dark:bg-solidity-800 dark:border-solidity-700"
              placeholder="0x..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">
              Amount
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full p-2 border rounded dark:bg-solidity-800 dark:border-solidity-700"
              placeholder="0.00"
            />
          </div>

          <button
            onClick={handleTransfer}
            disabled={isTransferPending || isConfirming}
            className="w-full px-4 py-2 bg-ethereum-600 text-white rounded-md hover:bg-ethereum-700 disabled:bg-gray-400"
          >
            {isTransferPending ? 'Waiting for approval...' :
             isConfirming ? 'Confirming...' :
             'Transfer Tokens'}
          </button>

          {(transferError || confirmError) && (
            <div className="text-red-600 text-sm">
              {transferError?.message || confirmError?.message}
            </div>
          )}

          {isSuccess && (
            <div className="text-green-600 text-sm">
              Transfer successful!
            </div>
          )}
        </div>
      </div>

      {/* Recent Events */}
      <div className="p-4 bg-white dark:bg-solidity-900 rounded-lg border dark:border-solidity-800">
        <h3 className="text-lg font-semibold mb-4">Recent Transfers</h3>
        <div className="space-y-2">
          {events.map((event, index) => (
            <div
              key={index}
              className="p-3 bg-gray-50 dark:bg-solidity-800 rounded text-sm"
            >
              <div className="flex justify-between">
                <span>From: {event.args.from.slice(0, 6)}...{event.args.from.slice(-4)}</span>
                <span>To: {event.args.to.slice(0, 6)}...{event.args.to.slice(-4)}</span>
              </div>
              <div className="mt-1 font-mono">
                Amount: {formatEther(event.args.value)} Tokens
              </div>
            </div>
          ))}
          {events.length === 0 && (
            <p className="text-gray-500 text-center">No recent transfers</p>
          )}
        </div>
      </div>
    </div>
  );
}`}
          language="typescript"
        />

        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 dark:border-blue-600 p-4 my-6">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">Best Practices</h3>
              <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Always validate user input before sending transactions</li>
                  <li>Handle loading and error states appropriately</li>
                  <li>Use proper type safety with TypeScript</li>
                  <li>Implement proper error handling</li>
                  <li>Consider gas estimation before transactions</li>
                  <li>Cache read results when appropriate</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 dark:border-solidity-800 pt-6">
          <div className="flex justify-between items-center">
            <Link
              to="/tutorials/wallet-actions"
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-solidity-700 text-sm font-medium rounded-md text-solidity-700 dark:text-white bg-white dark:bg-solidity-800 hover:bg-gray-50 dark:hover:bg-solidity-700 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous: Wallet Actions
            </Link>
            <Link
              to="/tutorials/nft-minter"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-ethereum-600 hover:bg-ethereum-700 transition-colors"
            >
              Next: NFT Minter <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractInteractions;