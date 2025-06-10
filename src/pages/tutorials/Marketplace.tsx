import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, ShoppingCart } from 'lucide-react';
import CodeBlock from '../../components/shared/CodeBlock';

const Marketplace: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto py-8 animate-fade-in">
      <div className="mb-8">
        <div className="flex items-center text-sm text-solidity-500 dark:text-gray-400 mb-2">
          <ShoppingCart className="h-4 w-4 mr-1" />
          <span>WAGMI Integration</span>
        </div>
        <h1 className="text-3xl font-bold text-solidity-900 dark:text-white mb-4">
          Building a Web3 Marketplace
        </h1>
        <div className="flex items-center text-sm text-solidity-500 dark:text-gray-400">
          <span className="mr-4">Difficulty: Advanced</span>
          <span>Reading time: ~45 min</span>
        </div>
      </div>

      <div className="prose dark:prose-invert prose-ethereum max-w-none">
        <p className="text-lg text-solidity-700 dark:text-gray-200 leading-relaxed">
          In this tutorial, we'll build a full-stack decentralized marketplace where users can list and purchase items using cryptocurrency. We'll integrate wallet connectivity, display transaction history, and handle network switching.
        </p>

        <h2>Project Overview</h2>
        
        <p>
          Our marketplace will include these features:
        </p>
        
        <ul>
          <li>Wallet connection with network switching</li>
          <li>Product listing and purchasing</li>
          <li>Transaction history</li>
          <li>Real-time price conversion</li>
          <li>Order tracking</li>
        </ul>

        <h2>Smart Contract</h2>
        
        <p>
          First, let's create our marketplace contract:
        </p>

        <CodeBlock
          code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Marketplace {
    struct Product {
        uint256 id;
        address seller;
        string name;
        string description;
        uint256 price;
        bool active;
    }
    
    struct Order {
        uint256 productId;
        address buyer;
        uint256 timestamp;
        bool fulfilled;
    }
    
    mapping(uint256 => Product) public products;
    mapping(uint256 => Order[]) public productOrders;
    uint256 public productCount;
    
    event ProductListed(uint256 indexed id, address seller, string name, uint256 price);
    event ProductSold(uint256 indexed id, address seller, address buyer, uint256 price);
    event OrderFulfilled(uint256 indexed id, address buyer);
    
    function listProduct(string memory name, string memory description, uint256 price) public returns (uint256) {
        require(price > 0, "Price must be greater than zero");
        
        productCount++;
        products[productCount] = Product(
            productCount,
            msg.sender,
            name,
            description,
            price,
            true
        );
        
        emit ProductListed(productCount, msg.sender, name, price);
        return productCount;
    }
    
    function buyProduct(uint256 productId) public payable {
        Product storage product = products[productId];
        require(product.active, "Product is not available");
        require(msg.value >= product.price, "Insufficient payment");
        
        product.active = false;
        productOrders[productId].push(Order(
            productId,
            msg.sender,
            block.timestamp,
            false
        ));
        
        payable(product.seller).transfer(msg.value);
        emit ProductSold(productId, product.seller, msg.sender, msg.value);
    }
    
    function fulfillOrder(uint256 productId, uint256 orderIndex) public {
        require(products[productId].seller == msg.sender, "Only seller can fulfill orders");
        require(orderIndex < productOrders[productId].length, "Invalid order index");
        
        Order storage order = productOrders[productId][orderIndex];
        require(!order.fulfilled, "Order already fulfilled");
        
        order.fulfilled = true;
        emit OrderFulfilled(productId, order.buyer);
    }
    
    function getProduct(uint256 productId) public view returns (Product memory) {
        return products[productId];
    }
    
    function getOrders(uint256 productId) public view returns (Order[] memory) {
        return productOrders[productId];
    }
}`}
          language="solidity"
        />

        <h2>Frontend Implementation</h2>

        <h3>Product Listing Component</h3>

        <CodeBlock
          code={`import { useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { parseEther } from 'viem';

function ListProduct() {
  const { writeContract, data: hash } = useWriteContract();

  const { isLoading, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    writeContract({
      address: MARKETPLACE_ADDRESS,
      abi: MARKETPLACE_ABI,
      functionName: 'listProduct',
      args: [
        formData.get('name'),
        formData.get('description'),
        parseEther(formData.get('price') as string),
      ],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="name"
        placeholder="Product Name"
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        name="description"
        placeholder="Description"
        className="w-full p-2 border rounded"
        required
      />
      <input
        name="price"
        type="number"
        step="0.01"
        placeholder="Price in ETH"
        className="w-full p-2 border rounded"
        required
      />
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-ethereum-600 text-white p-2 rounded hover:bg-ethereum-700"
      >
        {isLoading ? 'Listing...' : 'List Product'}
      </button>
      {isSuccess && (
        <div className="text-green-600">Product listed successfully!</div>
      )}
    </form>
  );
}`}
          language="typescript"
        />

        <h3>Product Display Component</h3>

        <CodeBlock
          code={`import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { formatEther } from 'viem';

function ProductList() {
  const { data: productCount } = useReadContract({
    address: MARKETPLACE_ADDRESS,
    abi: MARKETPLACE_ABI,
    functionName: 'productCount',
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: Number(productCount || 0) }, (_, i) => (
        <ProductCard key={i} productId={i + 1} />
      ))}
    </div>
  );
}

function ProductCard({ productId }: { productId: number }) {
  const { data: product } = useReadContract({
    address: MARKETPLACE_ADDRESS,
    abi: MARKETPLACE_ABI,
    functionName: 'getProduct',
    args: [productId],
  });

  const { writeContract, data: hash } = useWriteContract();

  const { isLoading, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  if (!product || !product.active) return null;

  return (
    <div className="border rounded-lg p-4 space-y-4">
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-600 dark:text-gray-300">{product.description}</p>
      <p className="text-ethereum-600 font-semibold">
        {formatEther(product.price)} ETH
      </p>
      <button
        onClick={() => writeContract({
          address: MARKETPLACE_ADDRESS,
          abi: MARKETPLACE_ABI,
          functionName: 'buyProduct',
          args: [productId],
          value: product.price
        })}
        disabled={isLoading}
        className="w-full bg-ethereum-600 text-white p-2 rounded hover:bg-ethereum-700"
      >
        {isLoading ? 'Buying...' : 'Buy Now'}
      </button>
      {isSuccess && (
        <div className="text-green-600">Purchase successful!</div>
      )}
    </div>
  );
}`}
          language="typescript"
        />

        <h3>Transaction History Component</h3>

        <CodeBlock
          code={`import { useWatchContractEvent } from 'wagmi';
import { useEffect, useState } from 'react';

interface Transaction {
  type: 'listing' | 'purchase' | 'fulfillment';
  productId: number;
  timestamp: number;
  data: any;
}

function TransactionHistory() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useWatchContractEvent({
    address: MARKETPLACE_ADDRESS,
    abi: MARKETPLACE_ABI,
    eventName: 'ProductListed',
    onLogs(logs) {
      setTransactions(prev => [{
        type: 'listing',
        productId: logs[0].args.id,
        timestamp: Date.now(),
        data: logs[0].args
      }, ...prev]);
    },
  });

  useWatchContractEvent({
    address: MARKETPLACE_ADDRESS,
    abi: MARKETPLACE_ABI,
    eventName: 'ProductSold',
    onLogs(logs) {
      setTransactions(prev => [{
        type: 'purchase',
        productId: logs[0].args.id,
        timestamp: Date.now(),
        data: logs[0].args
      }, ...prev]);
    },
  });

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Transaction History</h2>
      <div className="space-y-2">
        {transactions.map((tx, i) => (
          <div key={i} className="border rounded p-4">
            <div className="flex justify-between">
              <span className="font-semibold">
                {tx.type === 'listing' ? 'Product Listed' : 'Product Purchased'}
              </span>
              <span className="text-gray-500">
                {new Date(tx.timestamp).toLocaleString()}
              </span>
            </div>
            <div className="mt-2">
              <p>Product ID: {tx.productId}</p>
              {tx.type === 'purchase' && (
                <p>Buyer: {tx.data.buyer}</p>
              )}
              <p>Price: {formatEther(tx.data.price)} ETH</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}`}
          language="typescript"
        />

        <h2>Putting It All Together</h2>

        <p>
          Now let's combine all components into our main marketplace page:
        </p>

        <CodeBlock
          code={`import { useAccount, useChainId, useChains, useSwitchChain } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';

function MarketplacePage() {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const chains = useChains();
  const chain = chains.find(c => c.id === chainId);
  const { switchChain } = useSwitchChain();

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-3xl font-bold mb-8">Welcome to the Web3 Marketplace</h1>
        <ConnectButton />
      </div>
    );
  }

  if (chain?.id !== SUPPORTED_CHAIN_ID) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-xl font-bold mb-4">Please switch to the supported network</h1>
        <button
          onClick={() => switchChain({ chainId: SUPPORTED_CHAIN_ID })}
          className="bg-ethereum-600 text-white px-4 py-2 rounded"
        >
          Switch Network
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Web3 Marketplace</h1>
        <ConnectButton />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-2xl font-bold mb-4">Products</h2>
          <ProductList />
        </div>

        <div>
          <div className="sticky top-8">
            <h2 className="text-2xl font-bold mb-4">List a Product</h2>
            <ListProduct />
            
            <div className="mt-8">
              <TransactionHistory />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}`}
          language="typescript"
        />

        <div className="mt-12 border-t border-gray-200 dark:border-solidity-800 pt-6">
          <div className="flex justify-between items-center">
            <Link
              to="/tutorials/nft-minter"
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-solidity-700 text-sm font-medium rounded-md text-solidity-700 dark:text-white bg-white dark:bg-solidity-800 hover:bg-gray-50 dark:hover:bg-solidity-700 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous: NFT Minter
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

export default Marketplace;