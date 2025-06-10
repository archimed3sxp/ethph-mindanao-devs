import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Zap } from 'lucide-react';
import CodeBlock from '../../components/shared/CodeBlock';

const OracleIntegration: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto py-8 animate-fade-in">
      <div className="mb-8">
        <div className="flex items-center text-sm text-solidity-500 dark:text-gray-400 mb-2">
          <Zap className="h-4 w-4 mr-1" />
          <span>Advanced Topics</span>
        </div>
        <h1 className="text-3xl font-bold text-solidity-900 dark:text-white mb-4">
          Oracle Integration: Using External Data
        </h1>
        <div className="flex items-center text-sm text-solidity-500 dark:text-gray-400">
          <span className="mr-4">Difficulty: Advanced</span>
          <span>Reading time: ~30 min</span>
        </div>
      </div>

      <div className="prose dark:prose-invert prose-ethereum max-w-none">
        <p className="text-lg text-solidity-700 dark:text-gray-200 leading-relaxed">
          Oracles provide smart contracts with external data, enabling them to interact with real-world information. This tutorial covers how to integrate and use oracles effectively in your smart contracts.
        </p>

        <h2>Understanding Oracles</h2>
        
        <p>
          Oracles bridge the gap between blockchain and external data sources. They're essential for:
        </p>

        <ul>
          <li>Price feeds for DeFi applications</li>
          <li>Real-world event data</li>
          <li>API integrations</li>
          <li>Cross-chain communication</li>
        </ul>

        <h2>Chainlink Price Feeds</h2>
        
        <p>
          Price feeds are one of the most common oracle use cases. Here's how to implement them:
        </p>

        <CodeBlock
          code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract PriceConsumer {
    AggregatorV3Interface internal priceFeed;

    /**
     * Network: Goerli
     * Aggregator: ETH/USD
     * Address: 0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e
     */
    constructor() {
        priceFeed = AggregatorV3Interface(
            0xD4a33860578De61DBAbDc8BFdb98FD742fA7028e
        );
    }

    /**
     * Returns the latest price
     */
    function getLatestPrice() public view returns (int) {
        (
            /* uint80 roundID */,
            int price,
            /* uint startedAt */,
            /* uint timeStamp */,
            /* uint80 answeredInRound */
        ) = priceFeed.latestRoundData();
        return price;
    }
    
    /**
     * Returns the price with additional metadata
     */
    function getPriceData() public view returns (
        uint80 roundId,
        int256 answer,
        uint256 startedAt,
        uint256 updatedAt,
        uint80 answeredInRound
    ) {
        return priceFeed.latestRoundData();
    }
    
    /**
     * Returns the number of decimals in the price feed
     */
    function getDecimals() public view returns (uint8) {
        return priceFeed.decimals();
    }
}`}
          language="solidity"
        />

        <h2>Custom Oracle Implementation</h2>
        
        <p>
          For custom data needs, you can implement your own oracle system:
        </p>

        <CodeBlock
          code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract CustomOracle is Ownable, Pausable {
    struct DataRequest {
        address requester;
        bytes32 dataKey;
        uint256 timestamp;
        bool fulfilled;
    }
    
    // Mapping from request ID to request details
    mapping(bytes32 => DataRequest) public requests;
    
    // Mapping from data key to value
    mapping(bytes32 => bytes) public data;
    
    // Authorized oracle nodes
    mapping(address => bool) public oracles;
    
    // Events
    event DataRequested(
        bytes32 indexed requestId,
        address indexed requester,
        bytes32 dataKey
    );
    
    event DataFulfilled(
        bytes32 indexed requestId,
        bytes32 indexed dataKey,
        bytes value
    );
    
    event OracleAdded(address indexed oracle);
    event OracleRemoved(address indexed oracle);
    
    modifier onlyOracle() {
        require(oracles[msg.sender], "Not authorized oracle");
        _;
    }
    
    constructor() {
        // Add deployer as first oracle
        oracles[msg.sender] = true;
        emit OracleAdded(msg.sender);
    }
    
    function addOracle(address oracle) external onlyOwner {
        require(oracle != address(0), "Invalid oracle address");
        require(!oracles[oracle], "Oracle already exists");
        
        oracles[oracle] = true;
        emit OracleAdded(oracle);
    }
    
    function removeOracle(address oracle) external onlyOwner {
        require(oracles[oracle], "Oracle doesn't exist");
        
        delete oracles[oracle];
        emit OracleRemoved(oracle);
    }
    
    function requestData(bytes32 dataKey) external whenNotPaused returns (bytes32) {
        bytes32 requestId = keccak256(
            abi.encodePacked(
                block.timestamp,
                msg.sender,
                dataKey
            )
        );
        
        requests[requestId] = DataRequest({
            requester: msg.sender,
            dataKey: dataKey,
            timestamp: block.timestamp,
            fulfilled: false
        });
        
        emit DataRequested(requestId, msg.sender, dataKey);
        return requestId;
    }
    
    
    
    function fulfillData(
        bytes32 requestId,
        bytes calldata value
    ) external onlyOracle whenNotPaused {
        DataRequest storage request = requests[requestId];
        require(!request.fulfilled, "Request already fulfilled");
        require(request.requester != address(0), "Request doesn't exist");
        
        request.fulfilled = true;
        data[request.dataKey] = value;
        
        emit DataFulfilled(requestId, request.dataKey, value);
    }
    
    function getData(bytes32 dataKey) external view returns (bytes memory) {
        return data[dataKey];
    }
    
    // Emergency functions
    function pause() external onlyOwner {
        _pause();
    }
    
    function unpause() external onlyOwner {
        _unpause();
    }
}`}
          language="solidity"
        />

        <h3>Oracle Node Implementation</h3>
        
        <CodeBlock
          code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";

contract OracleNode is Ownable {
    CustomOracle public oracle;
    
    event DataFulfilled(bytes32 requestId, bytes value);
    event FailedRequest(bytes32 requestId, string reason);
    
    constructor(address oracleAddress) {
        oracle = CustomOracle(oracleAddress);
    }
    
    function fulfillRequest(
        bytes32 requestId,
        bytes calldata value
    ) external onlyOwner {
        try oracle.fulfillData(requestId, value) {
            emit DataFulfilled(requestId, value);
        } catch Error(string memory reason) {
            emit FailedRequest(requestId, reason);
        }
    }
    
    function updateOracleAddress(address newOracle) external onlyOwner {
        oracle = CustomOracle(newOracle);
    }
}`}
          language="solidity"
        />

        <h2>Using Multiple Data Sources</h2>
        
        <CodeBlock
          code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

contract AggregatedPriceFeed {
    struct PriceSource {
        address feed;
        uint256 weight;
    }
    
    PriceSource[] public priceSources;
    uint256 public constant PRECISION = 1e18;
    
    constructor(
        address[] memory feeds,
        uint256[] memory weights
    ) {
        require(
            feeds.length == weights.length,
            "Feeds and weights length mismatch"
        );
        
        uint256 totalWeight = 0;
        for(uint256 i = 0; i < feeds.length; i++) {
            require(feeds[i] != address(0), "Invalid feed address");
            require(weights[i] > 0, "Weight must be positive");
            
            priceSources.push(PriceSource(feeds[i], weights[i]));
            totalWeight += weights[i];
        }
        
        require(totalWeight == PRECISION, "Weights must sum to PRECISION");
    }
    
    function getAggregatedPrice() public view returns (int256) {
        int256 weightedSum = 0;
        
        for(uint256 i = 0; i < priceSources.length; i++) {
            PriceSource memory source = priceSources[i];
            
            (
                /* uint80 roundID */,
                int price,
                /* uint startedAt */,
                /* uint timeStamp */,
                /* uint80 answeredInRound */
            ) = AggregatorV3Interface(source.feed).latestRoundData();
            
            weightedSum += price * int256(source.weight);
        }
        
        return weightedSum / int256(PRECISION);
    }
}`}
          language="solidity"
        />

        <h2>Best Practices</h2>

        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 dark:border-blue-600 p-4 my-6">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">Oracle Security Guidelines</h3>
              <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Use multiple data sources when possible</li>
                  <li>Implement proper access controls</li>
                  <li>Add circuit breakers for extreme values</li>
                  <li>Consider data staleness</li>
                  <li>Handle failed updates gracefully</li>
                  <li>Monitor oracle costs</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <h2>Common Use Cases</h2>

        <h3>1. DeFi Applications</h3>
        <ul>
          <li>Price feeds for tokens</li>
          <li>Interest rate data</li>
          <li>Exchange rates</li>
          <li>Market indicators</li>
        </ul>

        <h3>2. Insurance</h3>
        <ul>
          <li>Weather data</li>
          <li>Flight status</li>
          <li>Asset verification</li>
        </ul>

        <h3>3. Gaming</h3>
        <ul>
          <li>Sports results</li>
          <li>External game data</li>
          <li>Real-world events</li>
        </ul>

        <div className="mt-12 border-t border-gray-200 dark:border-solidity-800 pt-6">
          <div className="flex justify-between items-center">
            <Link
              to="/tutorials/chainlink-vrf"
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-solidity-700 text-sm font-medium rounded-md text-solidity-700 dark:text-white bg-white dark:bg-solidity-800 hover:bg-gray-50 dark:hover:bg-solidity-700 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous: Chainlink VRF
            </Link>
            <Link
              to="/tutorials/gas-optimization"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-ethereum-600 hover:bg-ethereum-700 transition-colors"
            >
              Next: Gas Optimization <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OracleIntegration;