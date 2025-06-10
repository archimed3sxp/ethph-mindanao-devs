import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Wallet } from 'lucide-react';
import CodeBlock from '../../components/shared/CodeBlock';
import { 
  useAccount, 
  useConnect, 
  useDisconnect, 
  useBalance,
  useChainId,
  useChains,
  useSwitchChain
} from 'wagmi';
import { injected } from 'wagmi/connectors';

const WalletActions: React.FC = () => {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: injected(),
  });
  const { disconnect } = useDisconnect();
  const chainId = useChainId();
  const chains = useChains();
  const chain = chains.find(c => c.id === chainId);
  const { switchChain } = useSwitchChain();
  const { data: balance } = useBalance({
    address,
  });

  return (
    <div className="max-w-3xl mx-auto py-8 animate-fade-in">
      <div className="mb-8">
        <div className="flex items-center text-sm text-solidity-500 dark:text-gray-400 mb-2">
          <Wallet className="h-4 w-4 mr-1" />
          <span>WAGMI</span>
        </div>
        <h1 className="text-3xl font-bold text-solidity-900 dark:text-white mb-4">
          Wallet Actions & Network Management
        </h1>
        <div className="flex items-center text-sm text-solidity-500 dark:text-gray-400">
          <span className="mr-4">Difficulty: Intermediate</span>
          <span>Reading time: ~20 min</span>
        </div>
      </div>

      <div className="prose dark:prose-invert prose-ethereum max-w-none">
        <p className="text-lg text-solidity-700 dark:text-gray-200 leading-relaxed">
          Managing wallet connections, network switching, and displaying wallet information are essential features of any dApp. Let's explore how to implement these using WAGMI.
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
              <div className="space-y-4">
                <div>
                  <p className="font-medium">Connected Address:</p>
                  <p className="font-mono text-sm">{address}</p>
                </div>
                
                <div>
                  <p className="font-medium">Current Network:</p>
                  <p>{chain?.name || 'Unknown'}</p>
                </div>
                
                <div>
                  <p className="font-medium">Balance:</p>
                  <p>{balance?.formatted} {balance?.symbol}</p>
                </div>
                
                <div>
                  <p className="font-medium">Switch Network:</p>
                  <div className="flex gap-2 mt-2">
                    {chains?.map((x) => (
                      <button
                        key={x.id}
                        onClick={() => switchChain({ chainId: x.id })}
                        className="px-3 py-1 bg-ethereum-100 dark:bg-ethereum-900 text-ethereum-600 dark:text-ethereum-400 rounded hover:bg-ethereum-200 dark:hover:bg-ethereum-800"
                      >
                        {x.name}
                      </button>
                    ))}
                  </div>
                </div>
                
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

        <h2>Wallet Connection</h2>

        <CodeBlock
          code={`import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { injected, walletConnect } from 'wagmi/connectors';

function WalletConnection() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, error, isLoading, pendingConnector } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <div>
        <div>Connected to {address}</div>
        <button onClick={() => disconnect()}>Disconnect</button>
      </div>
    );
  }

  return (
    <div>
      {connectors.map((connector) => (
        <button
          key={connector.id}
          onClick={() => connect({ connector })}
          disabled={!connector.ready || isLoading}
        >
          Connect with {connector.name}
          {isLoading && connector.id === pendingConnector?.id && ' (connecting)'}
        </button>
      ))}

      {error && <div>{error.message}</div>}
    </div>
  );
}`}
          language="typescript"
        />

        <h2>Network Management</h2>

        <CodeBlock
          code={`import { useChainId, useChains, useSwitchChain } from 'wagmi';

function NetworkSwitcher() {
  const chainId = useChainId();
  const chains = useChains();
  const chain = chains.find(c => c.id === chainId);
  const { error, isLoading, switchChain } = useSwitchChain();

  return (
    <div>
      <div>Connected to {chain?.name ?? 'unknown network'}</div>

      {chains.map((x) => (
        <button
          key={x.id}
          onClick={() => switchChain({ chainId: x.id })}
          disabled={!switchChain || x.id === chainId}
        >
          {x.name}
          {isLoading && x.id === chainId && ' (switching)'}
        </button>
      ))}

      {error && <div>{error.message}</div>}
    </div>
  );
}`}
          language="typescript"
        />

        <h2>Balance Display</h2>

        <CodeBlock
          code={`import { useBalance, useAccount } from 'wagmi';

function WalletBalance() {
  const { address } = useAccount();
  const { data, isError, isLoading } = useBalance({
    address,
    watch: true,
  });

  if (isLoading) return <div>Loading balance...</div>;
  if (isError) return <div>Error loading balance</div>;

  return (
    <div>
      Balance: {data?.formatted} {data?.symbol}
    </div>
  );
}`}
          language="typescript"
        />

        <h2>ENS Resolution</h2>

        <CodeBlock
          code={`import { useEnsName, useEnsAddress, useEnsAvatar } from 'wagmi';

function EnsDisplay({ address }: { address: \`0x\${string}\` }) {
  const { data: ensName } = useEnsName({ address });
  const { data: ensAvatar } = useEnsAvatar({ name: ensName });

  return (
    <div className="flex items-center space-x-2">
      {ensAvatar && (
        <img
          src={ensAvatar}
          alt="ENS Avatar"
          className="w-8 h-8 rounded-full"
        />
      )}
      <span>{ensName || address}</span>
    </div>
  );
}

function EnsLookup() {
  const [name, setName] = useState('');
  const { data: address } = useEnsAddress({
    name,
    enabled: name.length > 0,
  });

  return (
    <div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Enter ENS name"
      />
      {address && <div>Address: {address}</div>}
    </div>
  );
}`}
          language="typescript"
        />

        <h2>Sign Message</h2>

        <CodeBlock
          code={`import { useSignMessage } from 'wagmi';

function MessageSigner() {
  const [message, setMessage] = useState('');
  const { data, error, isLoading, signMessage } = useSignMessage();

  return (
    <div>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter message to sign"
      />
      <button
        disabled={isLoading}
        onClick={() => signMessage({ message })}
      >
        {isLoading ? 'Signing...' : 'Sign Message'}
      </button>

      {data && <div>Signature: {data}</div>}
      {error && <div>Error: {error.message}</div>}
    </div>
  );
}`}
          language="typescript"
        />

        <h2>Complete Wallet Interface</h2>

        <CodeBlock
          code={`import { 
  useAccount, 
  useConnect, 
  useDisconnect, 
  useBalance,
  useChainId,
  useChains,
  useSwitchChain,
  useEnsName,
  useSignMessage
} from 'wagmi';
import { injected } from 'wagmi/connectors';

function WalletInterface() {
  const { address, isConnected } = useAccount();
  const { connect } = useConnect({
    connector: injected(),
  });
  const { disconnect } = useDisconnect();
  const chainId = useChainId();
  const chains = useChains();
  const chain = chains.find(c => c.id === chainId);
  const { switchChain } = useSwitchChain();
  const { data: balance } = useBalance({ address });
  const { data: ensName } = useEnsName({ address });
  const { signMessage } = useSignMessage();

  if (!isConnected) {
    return (
      <button
        onClick={() => connect()}
        className="px-4 py-2 bg-ethereum-600 text-white rounded-md"
      >
        Connect Wallet
      </button>
    );
  }

  return (
    <div className="space-y-6 p-6 bg-white dark:bg-solidity-900 rounded-lg shadow">
      <div>
        <h2 className="text-lg font-semibold mb-2">Wallet Info</h2>
        <div className="space-y-2">
          <p>Address: {ensName || address}</p>
          <p>Network: {chain?.name}</p>
          <p>Balance: {balance?.formatted} {balance?.symbol}</p>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Network Switch</h2>
        <div className="flex gap-2">
          {chains?.map((x) => (
            <button
              key={x.id}
              onClick={() => switchChain({ chainId: x.id })}
              className={\`px-3 py-1 rounded \${
                chainId === x.id
                  ? 'bg-ethereum-600 text-white'
                  : 'bg-gray-100 dark:bg-solidity-800'
              }\`}
            >
              {x.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">Actions</h2>
        <div className="space-x-2">
          <button
            onClick={() => signMessage({ message: 'Hello World' })}
            className="px-4 py-2 bg-ethereum-600 text-white rounded-md"
          >
            Sign Message
          </button>
          <button
            onClick={() => disconnect()}
            className="px-4 py-2 bg-red-600 text-white rounded-md"
          >
            Disconnect
          </button>
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
                  <li>Always handle loading and error states</li>
                  <li>Provide clear feedback for user actions</li>
                  <li>Support multiple wallet providers</li>
                  <li>Handle network switching gracefully</li>
                  <li>Use ENS names when available</li>
                  <li>Implement proper error handling</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 dark:border-solidity-800 pt-6">
          <div className="flex justify-between items-center">
            <Link
              to="/tutorials/transaction-status"
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-solidity-700 text-sm font-medium rounded-md text-solidity-700 dark:text-white bg-white dark:bg-solidity-800 hover:bg-gray-50 dark:hover:bg-solidity-700 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous: Transaction Status
            </Link>
            <Link
              to="/tutorials/contract-interactions"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-ethereum-600 hover:bg-ethereum-700 transition-colors"
            >
              Next: Contract Interactions <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WalletActions;