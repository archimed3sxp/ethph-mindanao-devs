import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Image } from 'lucide-react';
import CodeBlock from '../../components/shared/CodeBlock';
import { 
  useAccount, 
  useContractRead,
  useContractWrite,
  useWaitForTransaction
} from 'wagmi';

const NFTMinter: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto py-8 animate-fade-in">
      <div className="mb-8">
        <div className="flex items-center text-sm text-solidity-500 dark:text-gray-400 mb-2">
          <Image className="h-4 w-4 mr-1" />
          <span>WAGMI</span>
        </div>
        <h1 className="text-3xl font-bold text-solidity-900 dark:text-white mb-4">
          Building an NFT Minter
        </h1>
        <div className="flex items-center text-sm text-solidity-500 dark:text-gray-400">
          <span className="mr-4">Difficulty: Intermediate</span>
          <span>Reading time: ~25 min</span>
        </div>
      </div>

      <div className="prose dark:prose-invert prose-ethereum max-w-none">
        <p className="text-lg text-solidity-700 dark:text-gray-200 leading-relaxed">
          Learn how to create a full-featured NFT minting page that displays collection information, minting progress, and handles the minting process using WAGMI and Foundry.
        </p>

        <h2>Smart Contract</h2>

        <p>First, let's look at our NFT contract built with OpenZeppelin:</p>

        <CodeBlock
          code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MyNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    uint256 public constant MINT_PRICE = 0.05 ether;
    uint256 public constant MAX_SUPPLY = 1000;
    
    string private _baseTokenURI;

    constructor() ERC721("MyNFT", "MNFT") {
        _baseTokenURI = "ipfs://YOUR_CID/";
    }

    function mint() public payable {
        require(msg.value >= MINT_PRICE, "Insufficient payment");
        require(_tokenIds.current() < MAX_SUPPLY, "Max supply reached");

        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        _safeMint(msg.sender, newTokenId);
    }

    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }

    function setBaseURI(string memory baseURI) public onlyOwner {
        _baseTokenURI = baseURI;
    }

    function withdraw() public onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }

    function totalSupply() public view returns (uint256) {
        return _tokenIds.current();
    }
}`}
          language="solidity"
        />

        <h2>Frontend Implementation</h2>

        <p>Now let's create the minting interface using WAGMI hooks:</p>

        <CodeBlock
          code={`import { 
  useAccount, 
  useContractRead, 
  useContractWrite, 
  useWaitForTransaction,
  useBalance
} from 'wagmi';

const CONTRACT_ADDRESS = '0x...'; // Your deployed contract address
const ABI = [...]; // Your contract ABI

function NFTMinter() {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });

  // Read total supply
  const { data: totalSupply } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: 'totalSupply',
    watch: true,
  });

  // Read max supply
  const { data: maxSupply } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: 'MAX_SUPPLY',
  });

  // Read mint price
  const { data: mintPrice } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: 'MINT_PRICE',
  });

  // Write mint function
  const { write: mint, data: mintData } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: 'mint',
    value: mintPrice,
  });

  // Wait for transaction
  const { isLoading: isMinting, isSuccess: isMinted } = useWaitForTransaction({
    hash: mintData?.hash,
  });

  return (
    <div className="max-w-lg mx-auto p-6 bg-white dark:bg-solidity-900 rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">MyNFT Collection</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Mint your unique NFT from our collection
        </p>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between">
          <span>Total Minted</span>
          <span>{totalSupply?.toString() || '0'} / {maxSupply?.toString() || '1000'}</span>
        </div>

        <div className="w-full bg-gray-200 dark:bg-solidity-800 rounded-full h-2.5">
          <div 
            className="bg-ethereum-600 h-2.5 rounded-full"
            style={{ 
              width: \`\${((totalSupply || 0) / (maxSupply || 1000)) * 100}%\` 
            }}
          ></div>
        </div>

        <div className="flex justify-between">
          <span>Mint Price</span>
          <span>{mintPrice ? (Number(mintPrice) / 1e18).toString() : '0.05'} ETH</span>
        </div>
      </div>

      {!isConnected ? (
        <div className="text-center p-4 bg-gray-100 dark:bg-solidity-800 rounded">
          Please connect your wallet to mint
        </div>
      ) : (
        <button
          onClick={() => mint()}
          disabled={isMinting || isMinted || !mint}
          className={\`w-full py-3 px-4 rounded-lg font-medium transition-colors \${
            isMinting || isMinted
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-ethereum-600 hover:bg-ethereum-700 text-white'
          }\`}
        >
          {isMinting ? 'Minting...' : isMinted ? 'Minted!' : 'Mint NFT'}
        </button>
      )}

      {isMinted && (
        <div className="mt-4 p-4 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded">
          Successfully minted your NFT! View on{' '}
          <a 
            href={\`https://etherscan.io/tx/\${mintData?.hash}\`}
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            Etherscan
          </a>
        </div>
      )}
    </div>
  );
}`}
          language="typescript"
        />

        <h2>Complete Implementation</h2>

        <p>Here's how to put it all together with proper configuration and error handling:</p>

        <CodeBlock
          code={`import React, { useState } from 'react';
import { 
  useAccount, 
  useContractRead, 
  useContractWrite, 
  useWaitForTransaction,
  useBalance,
  useNetwork
} from 'wagmi';
import { parseEther } from 'viem';

const CONTRACT_ADDRESS = '0x...'; // Your deployed contract address
const ABI = [...]; // Your contract ABI

function NFTMinter() {
  const [error, setError] = useState<string | null>(null);
  const { address, isConnected } = useAccount();
  const { chain } = useNetwork();
  const { data: balance } = useBalance({ address });

  // Contract reads
  const { data: totalSupply } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: 'totalSupply',
    watch: true,
  });

  const { data: maxSupply } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: 'MAX_SUPPLY',
  });

  const { data: mintPrice } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: 'MINT_PRICE',
  });

  // Contract writes
  const { write: mint, data: mintData, error: mintError } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: ABI,
    functionName: 'mint',
    value: mintPrice,
    onError(error) {
      setError(error.message);
    },
  });

  // Transaction status
  const { isLoading: isMinting, isSuccess: isMinted } = useWaitForTransaction({
    hash: mintData?.hash,
  });

  // Check if user has enough balance
  const hasEnoughBalance = balance && mintPrice 
    ? BigInt(balance.value) >= BigInt(mintPrice.toString())
    : false;

  // Handle mint
  const handleMint = () => {
    setError(null);
    if (!hasEnoughBalance) {
      setError('Insufficient balance to mint');
      return;
    }
    mint?.();
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white dark:bg-solidity-900 rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-2">MyNFT Collection</h2>
        <p className="text-gray-600 dark:text-gray-300">
          Mint your unique NFT from our exclusive collection
        </p>
      </div>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between">
          <span>Minting Progress</span>
          <span className="font-mono">
            {totalSupply?.toString() || '0'} / {maxSupply?.toString() || '1000'}
          </span>
        </div>

        <div className="w-full bg-gray-200 dark:bg-solidity-800 rounded-full h-2.5">
          <div 
            className="bg-ethereum-600 h-2.5 rounded-full transition-all duration-500"
            style={{ 
              width: \`\${((Number(totalSupply) || 0) / (Number(maxSupply) || 1000)) * 100}%\` 
            }}
          ></div>
        </div>

        <div className="flex justify-between">
          <span>Mint Price</span>
          <span className="font-mono">
            {mintPrice ? (Number(mintPrice) / 1e18).toString() : '0.05'} ETH
          </span>
        </div>

        <div className="flex justify-between">
          <span>Your Balance</span>
          <span className="font-mono">
            {balance?.formatted || '0'} {balance?.symbol}
          </span>
        </div>
      </div>

      {!isConnected ? (
        <div className="text-center p-4 bg-gray-100 dark:bg-solidity-800 rounded">
          Please connect your wallet to mint
        </div>
      ) : chain?.id !== 1 ? ( // Assuming mainnet
        <div className="text-center p-4 bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 rounded">
          Please switch to Ethereum mainnet
        </div>
      ) : (
        <button
          onClick={handleMint}
          disabled={isMinting || isMinted || !mint || !hasEnoughBalance}
          className={\`w-full py-3 px-4 rounded-lg font-medium transition-colors \${
            isMinting || isMinted || !hasEnoughBalance
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-ethereum-600 hover:bg-ethereum-700 text-white'
          }\`}
        >
          {isMinting ? 'Minting...' : 
           isMinted ? 'Minted!' : 
           !hasEnoughBalance ? 'Insufficient Balance' : 
           'Mint NFT'}
        </button>
      )}

      {error && (
        <div className="mt-4 p-4 bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300 rounded">
          {error}
        </div>
      )}

      {isMinted && (
        <div className="mt-4 space-y-4">
          <div className="p-4 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300 rounded">
            Successfully minted your NFT!
          </div>
          
          <div className="flex space-x-2">
            <a 
              href={\`https://etherscan.io/tx/\${mintData?.hash}\`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center py-2 bg-solidity-100 dark:bg-solidity-800 hover:bg-solidity-200 dark:hover:bg-solidity-700 rounded transition-colors"
            >
              View on Etherscan
            </a>
            <a 
              href={\`https://opensea.io/assets/\${CONTRACT_ADDRESS}/\${totalSupply?.toString()}\`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center py-2 bg-solidity-100 dark:bg-solidity-800 hover:bg-solidity-200 dark:hover:bg-solidity-700 rounded transition-colors"
            >
              View on OpenSea
            </a>
          </div>
        </div>
      )}
    </div>
  );
}`}
          language="typescript"
        />

        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 dark:border-blue-600 p-4 my-6">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">Implementation Notes</h3>
              <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Always validate user's balance before minting</li>
                  <li>Show clear feedback for all states (minting, success, error)</li>
                  <li>Include links to view the NFT after minting</li>
                  <li>Watch for network changes and total supply updates</li>
                  <li>Handle errors gracefully with user-friendly messages</li>
                  <li>Show minting progress with a visual indicator</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 dark:border-solidity-800 pt-6">
          <div className="flex justify-between items-center">
            <Link
              to="/tutorials/contract-interactions"
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-solidity-700 text-sm font-medium rounded-md text-solidity-700 dark:text-white bg-white dark:bg-solidity-800 hover:bg-gray-50 dark:hover:bg-solidity-700 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous: Contract Interactions
            </Link>
            <Link
              to="/tutorials/marketplace"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-ethereum-600 hover:bg-ethereum-700 transition-colors"
            >
              Next: Marketplace <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTMinter;