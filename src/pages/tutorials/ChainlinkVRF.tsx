import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Zap } from 'lucide-react';
import CodeBlock from '../../components/shared/CodeBlock';

const ChainlinkVRF: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto py-8 animate-fade-in">
      <div className="mb-8">
        <div className="flex items-center text-sm text-solidity-500 dark:text-gray-400 mb-2">
          <Zap className="h-4 w-4 mr-1" />
          <span>Advanced Topics</span>
        </div>
        <h1 className="text-3xl font-bold text-solidity-900 dark:text-white mb-4">
          Chainlink VRF: Verifiable Random Numbers
        </h1>
        <div className="flex items-center text-sm text-solidity-500 dark:text-gray-400">
          <span className="mr-4">Difficulty: Advanced</span>
          <span>Reading time: ~30 min</span>
        </div>
      </div>

      <div className="prose dark:prose-invert prose-ethereum max-w-none">
        <p className="text-lg text-solidity-700 dark:text-gray-200 leading-relaxed">
          Chainlink VRF (Verifiable Random Function) provides cryptographically secure random numbers for your smart contracts. This is essential for applications like gaming, NFT distribution, and random selection processes.
        </p>

        <h2>Understanding Chainlink VRF</h2>
        
        <p>
          Chainlink VRF works by combining block data with the oracle's private key to generate both a random number and a cryptographic proof. The proof is verified on-chain before any consuming contract can use the random number.
        </p>

        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 dark:border-blue-600 p-4 my-6">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">Why Not Use Block Variables?</h3>
              <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                <p>
                  Using block.timestamp or block.difficulty for randomness is vulnerable to manipulation by miners/validators. Chainlink VRF provides a secure, verifiable source of randomness that cannot be manipulated by any single party.
                </p>
              </div>
            </div>
          </div>
        </div>

        <h2>Implementation Steps</h2>

        <h3>1. Install Dependencies</h3>
        
        <CodeBlock
          code={`// Install Chainlink contracts
forge install smartcontractkit/chainlink --no-commit`}
          language="bash"
        />

        <h3>2. Basic Implementation</h3>
        
        <CodeBlock
          code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";

contract RandomNumberConsumer is VRFConsumerBaseV2 {
    VRFCoordinatorV2Interface COORDINATOR;

    // Your subscription ID.
    uint64 s_subscriptionId;

    // Goerli coordinator. For other networks,
    // see https://docs.chain.link/docs/vrf-contracts/#configurations
    address vrfCoordinator = 0x2Ca8E0C643bDe4C2E08ab1fA0da3401AdAD7734D;

    // The gas lane to use, which specifies the maximum gas price to bump to.
    bytes32 keyHash = 0x79d3d8832d904592c0bf9818b621522c988bb8b0c05cdc3b15aea1b6e8db0c15;

    // Depends on the number of requested values that you want sent to the
    // fulfillRandomWords() function. Test and adjust this limit based on the
    // network that you select, the size of the request, and the processing
    // of the callback request in the fulfillRandomWords() function.
    uint32 callbackGasLimit = 100000;

    // The default is 3, but you can set this higher.
    uint16 requestConfirmations = 3;

    // For this example, retrieve 2 random values in one request.
    // Cannot exceed VRFCoordinatorV2.MAX_NUM_WORDS.
    uint32 numWords =  2;

    uint256[] public s_randomWords;
    uint256 public s_requestId;
    address s_owner;

    constructor(uint64 subscriptionId) VRFConsumerBaseV2(vrfCoordinator) {
        COORDINATOR = VRFCoordinatorV2Interface(vrfCoordinator);
        s_owner = msg.sender;
        s_subscriptionId = subscriptionId;
    }

    // Assumes the subscription is funded sufficiently.
    function requestRandomWords() external onlyOwner {
        // Will revert if subscription is not set and funded.
        s_requestId = COORDINATOR.requestRandomWords(
            keyHash,
            s_subscriptionId,
            requestConfirmations,
            callbackGasLimit,
            numWords
        );
    }

    function fulfillRandomWords(
        uint256, /* requestId */
        uint256[] memory randomWords
    ) internal override {
        s_randomWords = randomWords;
    }

    modifier onlyOwner() {
        require(msg.sender == s_owner);
        _;
    }
}`}
          language="solidity"
        />

        <h3>3. Advanced Implementation with Multiple Consumers</h3>
        
        <CodeBlock
          code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RandomNumberManager is VRFConsumerBaseV2, Ownable {
    VRFCoordinatorV2Interface COORDINATOR;
    
    uint64 private s_subscriptionId;
    bytes32 private s_keyHash;
    uint32 private s_callbackGasLimit;
    uint16 private s_requestConfirmations;
    
    // Mapping from requestId to consumer address
    mapping(uint256 => address) private s_consumers;
    
    // Interface that consumers must implement
    interface IRandomNumberConsumer {
        function fulfillRandomness(uint256[] memory randomWords) external;
    }
    
    event RandomWordsRequested(
        uint256 indexed requestId,
        address indexed consumer
    );
    
    event RandomWordsFulfilled(
        uint256 indexed requestId,
        uint256[] randomWords
    );
    
    constructor(
        address vrfCoordinator,
        uint64 subscriptionId,
        bytes32 keyHash
    ) VRFConsumerBaseV2(vrfCoordinator) {
        COORDINATOR = VRFCoordinatorV2Interface(vrfCoordinator);
        s_subscriptionId = subscriptionId;
        s_keyHash = keyHash;
        s_callbackGasLimit = 100000;
        s_requestConfirmations = 3;
    }
    
    function requestRandomWords(
        uint32 numWords,
        address consumer
    ) external returns (uint256) {
        require(numWords > 0, "Must request at least 1 word");
        
        uint256 requestId = COORDINATOR.requestRandomWords(
            s_keyHash,
            s_subscriptionId,
            s_requestConfirmations,
            s_callbackGasLimit,
            numWords
        );
        
        s_consumers[requestId] = consumer;
        emit RandomWordsRequested(requestId, consumer);
        
        return requestId;
    }
    
    function fulfillRandomWords(
        uint256 requestId,
        uint256[] memory randomWords
    ) internal override {
        address consumer = s_consumers[requestId];
        require(consumer != address(0), "No consumer found for requestId");
        
        IRandomNumberConsumer(consumer).fulfillRandomness(randomWords);
        emit RandomWordsFulfilled(requestId, randomWords);
        
        delete s_consumers[requestId];
    }
    
    // Admin functions
    function setCallbackGasLimit(uint32 callbackGasLimit) external onlyOwner {
        s_callbackGasLimit = callbackGasLimit;
    }
    
    function setRequestConfirmations(uint16 requestConfirmations) external onlyOwner {
        s_requestConfirmations = requestConfirmations;
    }
}`}
          language="solidity"
        />

        <h3>4. Example Consumer Contract</h3>
        
        <CodeBlock
          code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract RandomNFTMint {
    RandomNumberManager private s_randomManager;
    uint256[] private s_availableTokenIds;
    mapping(uint256 => bool) private s_tokenMinted;
    uint256 private s_totalSupply;
    
    event NFTMinted(address indexed to, uint256 tokenId);
    
    constructor(address randomManager, uint256 maxSupply) {
        s_randomManager = RandomNumberManager(randomManager);
        s_totalSupply = maxSupply;
        
        // Initialize available token IDs
        for(uint256 i = 1; i <= maxSupply; i++) {
            s_availableTokenIds.push(i);
        }
    }
    
    function requestMint() external payable {
        require(msg.value >= mintPrice, "Insufficient payment");
        require(s_availableTokenIds.length > 0, "No tokens available");
        
        // Request random number for selecting token ID
        s_randomManager.requestRandomWords(1, address(this));
    }
    
    function fulfillRandomness(uint256[] memory randomWords) external {
        require(msg.sender == address(s_randomManager), "Only VRF manager");
        
        // Use random number to select token ID
        uint256 index = randomWords[0] % s_availableTokenIds.length;
        uint256 tokenId = s_availableTokenIds[index];
        
        // Remove selected token ID from available list
        s_availableTokenIds[index] = s_availableTokenIds[s_availableTokenIds.length - 1];
        s_availableTokenIds.pop();
        
        // Mint NFT
        _mint(msg.sender, tokenId);
        emit NFTMinted(msg.sender, tokenId);
    }
}`}
          language="solidity"
        />

        <h2>Best Practices</h2>

        <ul>
          <li><strong>Request Management</strong>: Keep track of pending requests and their associated data</li>
          <li><strong>Gas Optimization</strong>: Adjust callback gas limits based on your contract's needs</li>
          <li><strong>Error Handling</strong>: Implement proper error handling for failed random number requests</li>
          <li><strong>Testing</strong>: Test thoroughly on testnets before mainnet deployment</li>
          <li><strong>Subscription Management</strong>: Keep your subscription funded to avoid request failures</li>
        </ul>

        <h2>Common Use Cases</h2>

        <h3>1. Gaming</h3>
        <ul>
          <li>Random loot drops</li>
          <li>Card dealing</li>
          <li>Critical hit calculations</li>
          <li>Random map generation</li>
        </ul>

        <h3>2. NFTs</h3>
        <ul>
          <li>Random trait assignment</li>
          <li>Fair distribution mechanisms</li>
          <li>Randomized reveal mechanics</li>
        </ul>

        <h3>3. DeFi</h3>
        <ul>
          <li>Random winner selection</li>
          <li>Lottery systems</li>
          <li>Random validator selection</li>
        </ul>

        <div className="mt-12 border-t border-gray-200 dark:border-solidity-800 pt-6">
          <div className="flex justify-between items-center">
            <Link
              to="/tutorials/devops-security"
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-solidity-700 text-sm font-medium rounded-md text-solidity-700 dark:text-white bg-white dark:bg-solidity-800 hover:bg-gray-50 dark:hover:bg-solidity-700 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous: DevOps Security
            </Link>
            <Link
              to="/tutorials/oracle-integration"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-ethereum-600 hover:bg-ethereum-700 transition-colors"
            >
              Next: Oracle Integration <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChainlinkVRF;