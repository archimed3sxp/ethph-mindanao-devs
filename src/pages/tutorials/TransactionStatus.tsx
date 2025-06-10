import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Wallet } from 'lucide-react';
import CodeBlock from '../../components/shared/CodeBlock';
import { useWaitForTransactionReceipt, useChainId, useChains } from 'wagmi';

const TransactionStatus: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto py-8 animate-fade-in">
      <div className="mb-8">
        <div className="flex items-center text-sm text-solidity-500 dark:text-gray-400 mb-2">
          <Wallet className="h-4 w-4 mr-1" />
          <span>WAGMI</span>
        </div>
        <h1 className="text-3xl font-bold text-solidity-900 dark:text-white mb-4">
          Showing Transaction Status
        </h1>
        <div className="flex items-center text-sm text-solidity-500 dark:text-gray-400">
          <span className="mr-4">Difficulty: Intermediate</span>
          <span>Reading time: ~20 min</span>
        </div>
      </div>

      <div className="prose dark:prose-invert prose-ethereum max-w-none">
        <p className="text-lg text-solidity-700 dark:text-gray-200 leading-relaxed">
          Providing real-time transaction status updates is crucial for a good user experience. Let's explore how to implement this using WAGMI hooks.
        </p>

        <h2>Basic Transaction Status</h2>

        <CodeBlock
          code={`import { useWaitForTransactionReceipt } from 'wagmi';

function TransactionStatus({ hash }: { hash?: string }) {
  const { data, isError, isLoading, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  if (!hash) {
    return null;
  }

  if (isLoading) {
    return <div>Transaction pending...</div>;
  }

  if (isSuccess) {
    return (
      <div>
        Transaction confirmed! View on Etherscan:
        <a href={\`https://etherscan.io/tx/\${hash}\`}>
          {hash}
        </a>
      </div>
    );
  }

  if (isError) {
    return <div>Error confirming transaction</div>;
  }

  return null;
}`}
          language="typescript"
        />

        <h2>Advanced Transaction Status</h2>

        <CodeBlock
          code={`import { useWaitForTransactionReceipt, useChainId, useChains } from 'wagmi';

interface TransactionStatusProps {
  hash?: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

function TransactionStatus({ 
  hash,
  onSuccess,
  onError 
}: TransactionStatusProps) {
  const chainId = useChainId();
  const chains = useChains();
  const chain = chains.find(c => c.id === chainId);
  
  const { 
    data,
    isError,
    isLoading,
    isSuccess,
    error
  } = useWaitForTransactionReceipt({
    hash,
    onSuccess,
    onError,
  });

  const getExplorerLink = (hash: string) => {
    if (!chain) return '';
    return \`\${chain.blockExplorers?.default.url}/tx/\${hash}\`;
  };

  const getConfirmations = () => {
    if (!data?.confirmations) return 0;
    return data.confirmations;
  };

  if (!hash) return null;

  return (
    <div className="rounded-lg border p-4 space-y-2">
      <h3 className="font-medium">Transaction Status</h3>
      
      <div className="space-y-1">
        <p>Hash: {hash.slice(0, 6)}...{hash.slice(-4)}</p>
        
        {isLoading && (
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-ethereum-600 border-t-transparent" />
            <span>Waiting for confirmation...</span>
          </div>
        )}
        
        {isSuccess && (
          <div className="space-y-1">
            <p className="text-green-600">
              Transaction confirmed! ({getConfirmations()} confirmations)
            </p>
            <a
              href={getExplorerLink(hash)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-ethereum-600 hover:text-ethereum-700"
            >
              View on Explorer →
            </a>
          </div>
        )}
        
        {isError && (
          <div className="text-red-600">
            Error: {error?.message || 'Transaction failed'}
          </div>
        )}
      </div>
    </div>
  );
}`}
          language="typescript"
        />

        <h2>Transaction Queue Management</h2>

        <CodeBlock
          code={`import { create } from 'zustand';

interface Transaction {
  hash: string;
  description: string;
  status: 'pending' | 'success' | 'error';
  timestamp: number;
}

interface TransactionStore {
  transactions: Transaction[];
  addTransaction: (tx: Omit<Transaction, 'status' | 'timestamp'>) => void;
  updateTransaction: (hash: string, status: Transaction['status']) => void;
  clearTransaction: (hash: string) => void;
}

const useTransactionStore = create<TransactionStore>((set) => ({
  transactions: [],
  addTransaction: (tx) => 
    set((state) => ({
      transactions: [
        ...state.transactions,
        { ...tx, status: 'pending', timestamp: Date.now() }
      ]
    })),
  updateTransaction: (hash, status) =>
    set((state) => ({
      transactions: state.transactions.map((tx) =>
        tx.hash === hash ? { ...tx, status } : tx
      )
    })),
  clearTransaction: (hash) =>
    set((state) => ({
      transactions: state.transactions.filter((tx) => tx.hash !== hash)
    })),
}));

function TransactionList() {
  const transactions = useTransactionStore((state) => state.transactions);
  const clearTransaction = useTransactionStore((state) => state.clearTransaction);

  return (
    <div className="space-y-2">
      {transactions.map((tx) => (
        <div
          key={tx.hash}
          className="flex items-center justify-between p-4 bg-white dark:bg-solidity-900 rounded-lg shadow"
        >
          <div>
            <p className="font-medium">{tx.description}</p>
            <p className="text-sm text-gray-500">
              {tx.hash.slice(0, 6)}...{tx.hash.slice(-4)}
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            {tx.status === 'pending' && (
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-ethereum-600 border-t-transparent" />
            )}
            {tx.status === 'success' && (
              <span className="text-green-600">✓</span>
            )}
            {tx.status === 'error' && (
              <span className="text-red-600">✕</span>
            )}
            
            <button
              onClick={() => clearTransaction(tx.hash)}
              className="text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}`}
          language="typescript"
        />

        <h2>Using with Contract Interactions</h2>

        <CodeBlock
          code={`function ContractInteraction() {
  const { writeContract, data: hash } = useWriteContract();

  const {
    data: txData,
    isError,
    isLoading,
    isSuccess
  } = useWaitForTransactionReceipt({
    hash,
    onSuccess: () => {
      // Update UI or trigger callbacks
      toast.success('Transaction confirmed!');
    },
    onError: (error) => {
      toast.error(\`Transaction failed: \${error.message}\`);
    },
  });

  return (
    <div>
      <button
        onClick={() => writeContract({
          address: '0x...',
          abi: [...],
          functionName: 'mint'
        })}
        disabled={isLoading}
        className="px-4 py-2 bg-ethereum-600 text-white rounded-md"
      >
        {isLoading ? 'Confirming...' : 'Mint NFT'}
      </button>

      {hash && (
        <TransactionStatus
          hash={hash}
          onSuccess={() => {
            // Handle success
          }}
          onError={(error) => {
            // Handle error
          }}
        />
      )}
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
                  <li>Always show transaction hash for reference</li>
                  <li>Provide clear status updates</li>
                  <li>Include links to block explorers</li>
                  <li>Handle errors gracefully</li>
                  <li>Consider implementing a transaction queue for multiple transactions</li>
                  <li>Show confirmation count when available</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 dark:border-solidity-800 pt-6">
          <div className="flex justify-between items-center">
            <Link
              to="/tutorials/wagmi-integration"
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-solidity-700 text-sm font-medium rounded-md text-solidity-700 dark:text-white bg-white dark:bg-solidity-800 hover:bg-gray-50 dark:hover:bg-solidity-700 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous: WAGMI Integration
            </Link>
            <Link
              to="/tutorials/wallet-actions"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-ethereum-600 hover:bg-ethereum-700 transition-colors"
            >
              Next: Wallet Actions <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionStatus;