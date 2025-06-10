import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Cpu } from 'lucide-react';
import CodeBlock from '../../components/shared/CodeBlock';

const ERC1155: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto py-8 animate-fade-in">
      <div className="mb-8">
        <div className="flex items-center text-sm text-solidity-500 dark:text-gray-400 mb-2">
          <Cpu className="h-4 w-4 mr-1" />
          <span>Smart Contracts</span>
        </div>
        <h1 className="text-3xl font-bold text-solidity-900 dark:text-white mb-4">
          ERC1155 Multi-Token Standard
        </h1>
        <div className="flex items-center text-sm text-solidity-500 dark:text-gray-400">
          <span className="mr-4">Difficulty: Advanced</span>
          <span>Reading time: ~35 min</span>
        </div>
      </div>

      <div className="prose dark:prose-invert prose-ethereum max-w-none">
        <p className="text-lg text-solidity-700 dark:text-gray-200 leading-relaxed">
          ERC1155 is a multi-token standard that can represent both fungible and non-fungible tokens in a single contract. It's particularly useful for gaming assets and complex token systems.
        </p>

        <h2>What is ERC1155?</h2>
        
        <p>
          ERC1155 combines the functionality of ERC20 and ERC721, allowing:
        </p>

        <ul>
          <li>Multiple token types in a single contract</li>
          <li>Batch transfers of multiple token types</li>
          <li>Semi-fungible tokens</li>
          <li>Gas optimization through batching</li>
          <li>Safe transfer guarantees</li>
        </ul>

        <h2>Common Use Cases</h2>

        <h3>1. Gaming Assets</h3>
        <ul>
          <li><strong>In-Game Currencies</strong> - Gold, gems, or other fungible resources</li>
          <li><strong>Equipment</strong> - Weapons, armor, and tools with different rarities</li>
          <li><strong>Consumables</strong> - Potions, scrolls, or power-ups</li>
          <li><strong>Collectibles</strong> - Special edition items or achievements</li>
        </ul>

        <h3>2. Digital Marketplaces</h3>
        <ul>
          <li><strong>Trading Cards</strong> - Different cards with varying quantities</li>
          <li><strong>Art Collections</strong> - Multiple editions of digital artworks</li>
          <li><strong>Tickets</strong> - Event tickets with different tiers and quantities</li>
          <li><strong>Membership Passes</strong> - Various levels of access tokens</li>
        </ul>

        <h3>3. DeFi Applications</h3>
        <ul>
          <li><strong>Liquidity Pool Tokens</strong> - Representing shares in multiple pools</li>
          <li><strong>Synthetic Assets</strong> - Different types of tokenized real-world assets</li>
          <li><strong>Staking Rewards</strong> - Multiple reward types in a single contract</li>
          <li><strong>Governance Tokens</strong> - Different voting power tokens</li>
        </ul>

        <h3>4. Real-World Asset Tokenization</h3>
        <ul>
          <li><strong>Real Estate</strong> - Different properties with fractional ownership</li>
          <li><strong>Supply Chain</strong> - Tracking multiple product types and batches</li>
          <li><strong>Commodities</strong> - Various resources with different units</li>
          <li><strong>Certificates</strong> - Different types of credentials or licenses</li>
        </ul>

        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 dark:border-blue-600 p-4 my-6">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">Advantages of Using ERC1155</h3>
              <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                <ul className="list-disc pl-5 space-y-1">
                  <li><strong>Gas Efficiency</strong> - Batch transfers reduce transaction costs</li>
                  <li><strong>Contract Consolidation</strong> - Multiple token types in one contract</li>
                  <li><strong>Flexible Supply</strong> - Mix of fungible and non-fungible tokens</li>
                  <li><strong>Atomic Swaps</strong> - Trade multiple token types in a single transaction</li>
                  <li><strong>Simplified Management</strong> - One contract for your entire token ecosystem</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <h2>Required Functions and Events</h2>

        <CodeBlock
          code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC1155 {
    // Required functions
    function balanceOf(address account, uint256 id) external view returns (uint256);
    function balanceOfBatch(address[] calldata accounts, uint256[] calldata ids)
        external view returns (uint256[] memory);
    function setApprovalForAll(address operator, bool approved) external;
    function isApprovedForAll(address account, address operator) external view returns (bool);
    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 amount,
        bytes calldata data
    ) external;
    function safeBatchTransferFrom(
        address from,
        address to,
        uint256[] calldata ids,
        uint256[] calldata amounts,
        bytes calldata data
    ) external;

    // Required events
    event TransferSingle(
        address indexed operator,
        address indexed from,
        address indexed to,
        uint256 id,
        uint256 value
    );
    event TransferBatch(
        address indexed operator,
        address indexed from,
        address indexed to,
        uint256[] ids,
        uint256[] values
    );
    event ApprovalForAll(address indexed account, address indexed operator, bool approved);
    event URI(string value, uint256 indexed id);
}`}
          language="solidity"
        />

        <h2>Basic ERC1155 Implementation</h2>

        <CodeBlock
          code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BasicERC1155 {
    // Mapping from token ID to account balances
    mapping(uint256 => mapping(address => uint256)) private _balances;
    
    // Mapping from account to operator approvals
    mapping(address => mapping(address => bool)) private _operatorApprovals;
    
    // URI for all token types
    string private _uri;
    
    event TransferSingle(
        address indexed operator,
        address indexed from,
        address indexed to,
        uint256 id,
        uint256 value
    );
    event TransferBatch(
        address indexed operator,
        address indexed from,
        address indexed to,
        uint256[] ids,
        uint256[] values
    );
    event ApprovalForAll(address indexed account, address indexed operator, bool approved);
    event URI(string value, uint256 indexed id);
    
    constructor(string memory uri_) {
        _setURI(uri_);
    }
    
    function uri(uint256) public view virtual returns (string memory) {
        return _uri;
    }
    
    function balanceOf(address account, uint256 id) public view returns (uint256) {
        require(account != address(0), "ERC1155: address zero is not a valid owner");
        return _balances[id][account];
    }
    
    function balanceOfBatch(
        address[] memory accounts,
        uint256[] memory ids
    ) public view returns (uint256[] memory) {
        require(accounts.length == ids.length, "ERC1155: accounts and ids length mismatch");
        
        uint256[] memory batchBalances = new uint256[](accounts.length);
        
        for(uint256 i = 0; i < accounts.length; i++) {
            batchBalances[i] = balanceOf(accounts[i], ids[i]);
        }
        
        return batchBalances;
    }
    
    function setApprovalForAll(address operator, bool approved) public {
        require(msg.sender != operator, "ERC1155: setting approval status for self");
        
        _operatorApprovals[msg.sender][operator] = approved;
        emit ApprovalForAll(msg.sender, operator, approved);
    }
    
    function isApprovedForAll(address account, address operator) public view returns (bool) {
        return _operatorApprovals[account][operator];
    }
    
    function _setURI(string memory newuri) internal virtual {
        _uri = newuri;
    }
    
    function _mint(
        address to,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) internal virtual {
        require(to != address(0), "ERC1155: mint to the zero address");
        
        address operator = msg.sender;
        
        _balances[id][to] += amount;
        emit TransferSingle(operator, address(0), to, id, amount);
    }
    
    function _mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal virtual {
        require(to != address(0), "ERC1155: mint to the zero address");
        require(ids.length == amounts.length, "ERC1155: ids and amounts length mismatch");
        
        address operator = msg.sender;
        
        for(uint256 i = 0; i < ids.length; i++) {
            _balances[ids[i]][to] += amounts[i];
        }
        
        emit TransferBatch(operator, address(0), to, ids, amounts);
    }
}`}
          language="solidity"
        />

        <h2>Using OpenZeppelin's Implementation</h2>

        <CodeBlock
          code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract GameItems is ERC1155, Ownable {
    uint256 public constant GOLD = 0;
    uint256 public constant SILVER = 1;
    uint256 public constant SWORD = 2;
    uint256 public constant SHIELD = 3;
    uint256 public constant CROWN = 4;

    constructor() ERC1155("https://game.example/api/item/{id}.json") {
        _mint(msg.sender, GOLD, 10**18, "");  // 1 million gold tokens
        _mint(msg.sender, SILVER, 10**27, ""); // 1 billion silver tokens
        _mint(msg.sender, SWORD, 1000, "");    // 1000 swords
        _mint(msg.sender, SHIELD, 1000, "");   // 1000 shields
        _mint(msg.sender, CROWN, 1, "");       // 1 unique crown
    }

    function mint(address account, uint256 id, uint256 amount) public onlyOwner {
        _mint(account, id, amount, "");
    }

    function mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts
    ) public onlyOwner {
        _mintBatch(to, ids, amounts, "");
    }
}`}
          language="solidity"
        />

        <h2>Advanced Features</h2>

        <h3>URI Management</h3>

        <CodeBlock
          code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DynamicURI is ERC1155, Ownable {
    mapping(uint256 => string) private _tokenURIs;
    
    constructor() ERC1155("") {}
    
    function uri(uint256 tokenId) public view virtual override returns (string memory) {
        string memory tokenURI = _tokenURIs[tokenId];
        return bytes(tokenURI).length > 0 ? tokenURI : super.uri(tokenId);
    }
    
    function setTokenURI(uint256 tokenId, string memory tokenURI) public onlyOwner {
        _tokenURIs[tokenId] = tokenURI;
        emit URI(tokenURI, tokenId);
    }
}`}
          language="solidity"
        />

        <h3>Supply Tracking</h3>

        <CodeBlock
          code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract SupplyTracking is ERC1155 {
    mapping(uint256 => uint256) private _totalSupply;
    
    constructor() ERC1155("") {}
    
    function totalSupply(uint256 id) public view returns (uint256) {
        return _totalSupply[id];
    }
    
    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal virtual override {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
        
        if (from == address(0)) {
            for (uint256 i = 0; i < ids.length; ++i) {
                _totalSupply[ids[i]] += amounts[i];
            }
        }
        
        if (to == address(0)) {
            for (uint256 i = 0; i < ids.length; ++i) {
                _totalSupply[ids[i]] -= amounts[i];
            }
        }
    }
}`}
          language="solidity"
        />

        <h2>Best Practices</h2>

        <ul>
          <li><strong>Batch Operations</strong> - Use batch functions when possible to save gas</li>
          <li><strong>URI Management</strong> - Use IPFS or other decentralized storage for metadata</li>
          <li><strong>Access Control</strong> - Implement proper permission systems</li>
          <li><strong>Supply Limits</strong> - Consider implementing maximum supply limits</li>
          <li><strong>Gas Optimization</strong> - Be mindful of array lengths in batch operations</li>
        </ul>

        <h2>Testing ERC1155</h2>

        <CodeBlock
          code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Test.sol";
import "../src/GameItems.sol";

contract GameItemsTest is Test {
    GameItems items;
    address alice = address(1);
    address bob = address(2);
    
    function setUp() public {
        items = new GameItems();
    }
    
    function testMintSingle() public {
        items.mint(alice, 0, 100);
        assertEq(items.balanceOf(alice, 0), 100);
    }
    
    function testMintBatch() public {
        uint256[] memory ids = new uint256[](2);
        ids[0] = 0;
        ids[1] = 1;
        
        uint256[] memory amounts = new uint256[](2);
        amounts[0] = 100;
        amounts[1] = 200;
        
        items.mintBatch(alice, ids, amounts);
        
        assertEq(items.balanceOf(alice, 0), 100);
        assertEq(items.balanceOf(alice, 1), 200);
    }
    
    function testTransferSingle() public {
        items.mint(alice, 0, 100);
        
        vm.startPrank(alice);
        items.safeTransferFrom(alice, bob, 0, 50, "");
        vm.stopPrank();
        
        assertEq(items.balanceOf(alice, 0), 50);
        assertEq(items.balanceOf(bob, 0), 50);
    }
    
    function testApprovalForAll() public {
        items.mint(alice, 0, 100);
        
        vm.startPrank(alice);
        items.setApprovalForAll(bob, true);
        
        vm.stopPrank();
        vm.startPrank(bob);
        
        items.safeTransferFrom(alice, bob, 0, 50, "");
        vm.stopPrank();
        
        assertEq(items.balanceOf(alice, 0), 50);
        assertEq(items.balanceOf(bob, 0), 50);
    }
}`}
          language="solidity"
        />

        <h2>Step-by-Step Tutorial: Deploying an ERC1155 Collection</h2>

        <p>
          Let's walk through creating and deploying a complete ERC1155 collection for a game's items and currencies.
        </p>

        <h3>Step 1: Prepare Your Metadata</h3>

        <p>
          Create metadata JSON files for each token type. ERC1155 metadata follows a similar structure to ERC721:
        </p>

        <CodeBlock
          code={`// Fungible Token Example (e.g., Gold)
{
  "name": "Gold Coin",
  "description": "In-game currency used for purchases and trades",
  "image": "ipfs://QmYourImageCIDHere/gold.png",
  "properties": {
    "type": "Currency",
    "tier": "Common",
    "decimals": 18,
    "maxSupply": 1000000
  }
}

// Semi-Fungible Token Example (e.g., Sword)
{
  "name": "Flaming Sword",
  "description": "A powerful sword enchanted with fire magic",
  "image": "ipfs://QmYourImageCIDHere/sword.png",
  "properties": {
    "type": "Weapon",
    "rarity": "Rare",
    "damage": 150,
    "element": "Fire",
    "durability": 1000,
    "level_requirement": 20
  }
}

// Non-Fungible Token Example (e.g., Legendary Item)
{
  "name": "Crown of the Eternal King",
  "description": "A unique crown worn by the ancient kings",
  "image": "ipfs://QmYourImageCIDHere/crown.png",
  "properties": {
    "type": "Artifact",
    "rarity": "Legendary",
    "unique": true,
    "attributes": [
      {
        "trait_type": "Power",
        "value": 1000
      },
      {
        "trait_type": "Magic Bonus",
        "value": 25,
        "display_type": "boost_percentage"
      },
      {
        "trait_type": "Creation Date",
        "value": 1546360800,
        "display_type": "date"
      }
    ],
    "stats": {
      "wisdom": 50,
      "charisma": 100,
      "leadership": 75
    }
  }
}`}
          language="json"
        />

        <p>
          Key differences in ERC1155 metadata:
        </p>

        <ul>
          <li><strong>Fungible Tokens</strong>: Include decimals and supply information</li>
          <li><strong>Semi-Fungible Tokens</strong>: Focus on properties that are same across all instances</li>
          <li><strong>Non-Fungible Tokens</strong>: Can include unique attributes and boost properties</li>
        </ul>

        <p>
          Common metadata fields for all types:
        </p>

        <ul>
          <li><strong>name</strong>: Token name</li>
          <li><strong>description</strong>: Detailed description</li>
          <li><strong>image</strong>: IPFS URL to token image</li>
          <li><strong>properties</strong>: Object containing token-specific properties</li>
        </ul>

        <h3>Step 2: Upload Assets to IPFS</h3>

        <ol className="list-decimal pl-6 space-y-4">
          <li>
            <strong>Prepare Your Files</strong>
            <ul className="list-disc pl-6 mt-2">
              <li>Create a folder for images</li>
              <li>Create a folder for metadata JSON files</li>
              <li>Ensure filenames match your token IDs</li>
            </ul>
          </li>
          
          <li>
            <strong>Upload to Pinata</strong>
            <ul className="list-disc pl-6 mt-2">
              <li>Upload images folder first</li>
              <li>Copy the CID and update metadata files with correct IPFS links</li>
              <li>Upload metadata folder</li>
              <li>Save both CIDs for contract deployment</li>
            </ul>
          </li>
        </ol>

        <h3>Step 3: Create the Smart Contract</h3>

        <p>
          Create a new file called GameItems.sol:
        </p>

        <CodeBlock
          code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

contract GameItems is ERC1155, Ownable, Pausable, ERC1155Supply {
    // Token type IDs
    uint256 public constant GOLD = 0;
    uint256 public constant SILVER = 1;
    uint256 public constant SWORD = 2;
    uint256 public constant SHIELD = 3;
    uint256 public constant LEGENDARY_HAMMER = 4;

    // Price for minting (in wei)
    mapping(uint256 => uint256) public mintPrice;
    
    // Maximum supply for each token type
    mapping(uint256 => uint256) public maxSupply;
    
    constructor() ERC1155("ipfs://YOUR_METADATA_CID/") {
        // Set mint prices
        mintPrice[GOLD] = 0.01 ether;
        mintPrice[SILVER] = 0.005 ether;
        mintPrice[SWORD] = 0.1 ether;
        mintPrice[SHIELD] = 0.1 ether;
        mintPrice[LEGENDARY_HAMMER] = 1 ether;
        
        // Set max supply
        maxSupply[GOLD] = 1000000;
        maxSupply[SILVER] = 1000000;
        maxSupply[SWORD] = 1000;
        maxSupply[SHIELD] = 1000;
        maxSupply[LEGENDARY_HAMMER] = 100;
        
        // Mint some initial supply to contract creator
        _mint(msg.sender, GOLD, 10000, "");
        _mint(msg.sender, SILVER, 10000, "");
        _mint(msg.sender, SWORD, 10, "");
        _mint(msg.sender, SHIELD, 10, "");
        _mint(msg.sender, LEGENDARY_HAMMER, 1, "");
    }

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function mint(uint256 id, uint256 amount) 
        public 
        payable
    {
        require(id <= LEGENDARY_HAMMER, "Invalid token ID");
        require(msg.value >= mintPrice[id] * amount, "Insufficient payment");
        require(
            totalSupply(id) + amount <= maxSupply[id],
            "Would exceed max supply"
        );
        
        _mint(msg.sender, id, amount, "");
    }

    function mintBatch(
        uint256[] memory ids,
        uint256[] memory amounts
    ) public payable {
        require(
            ids.length == amounts.length,
            "ERC1155: ids and amounts length mismatch"
        );
        
        uint256 totalPrice = 0;
        for (uint256 i = 0; i < ids.length; i++) {
            require(ids[i] <= LEGENDARY_HAMMER, "Invalid token ID");
            require(
                totalSupply(ids[i]) + amounts[i] <= maxSupply[ids[i]],
                "Would exceed max supply"
            );
            totalPrice += mintPrice[ids[i]] * amounts[i];
        }
        
        require(msg.value >= totalPrice, "Insufficient payment");
        
        _mintBatch(msg.sender, ids, amounts, "");
    }

    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        payable(msg.sender).transfer(balance);
    }

    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal override(ERC1155, ERC1155Supply) whenNotPaused {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }
}`}
          language="solidity"
        />

        <h3>Step 4: Create Deployment Script</h3>

        <CodeBlock
          code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/GameItems.sol";

contract DeployGameItems is Script {
    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        
        vm.startBroadcast(deployerPrivateKey);
        
        GameItems gameItems = new GameItems();
        
        vm.stopBroadcast();
    }
}`}
          language="solidity"
        />

        <h3>Step 5: Deploy Your Contract</h3>

        <CodeBlock
          code={`# Set environment variables
export PRIVATE_KEY=your_private_key
export ETHERSCAN_API_KEY=your_etherscan_key
export RPC_URL=your_rpc_url

# Deploy to network
forge script script/DeployGameItems.s.sol --rpc-url $RPC_URL --broadcast --verify`}
          language="bash"
        />

        <h3>Step 6: Verify Contract on Etherscan</h3>

        <p>
          If automatic verification fails:
        </p>

        <CodeBlock
          code={`forge verify-contract \
  --chain-id 5 \
  --compiler-version v0.8.13 \
  <DEPLOYED_ADDRESS> \
  src/GameItems.sol:GameItems \
  $ETHERSCAN_API_KEY`}
          language="bash"
        />

        <h3>Step 7: Interact with Your Contract</h3>

        <CodeBlock
          code={`# Mint a single token type
cast send $CONTRACT_ADDRESS "mint(uint256,uint256)" 2 1 --value 0.1ether --private-key $PRIVATE_KEY

# Mint multiple token types
cast send $CONTRACT_ADDRESS "mintBatch(uint256[],uint256[])" "[2,3]" "[1,1]" --value 0.2ether --private-key $PRIVATE_KEY

# Check balance
cast call $CONTRACT_ADDRESS "balanceOf(address,uint256)" $YOUR_ADDRESS 2`}
          language="bash"
        />

        <h3>Step 8: View on OpenSea</h3>

        <ol className="list-decimal pl-6 space-y-4">
          <li>
            <strong>Wait for Indexing</strong>
            <ul className="list-disc pl-6 mt-2">
              <li>OpenSea typically takes 15-30 minutes to index new collections</li>
              <li>Testnet collections appear on testnets.opensea.io</li>
            </ul>
          </li>
          
          <li>
            <strong>Update Collection</strong>
            <ul className="list-disc pl-6 mt-2">
              <li>Add collection image and banner</li>
              <li>Set description and social links</li>
              <li>Configure royalties if desired</li>
            </ul>
          </li>
        </ol>

        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 dark:border-blue-600 p-4 my-6">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">Pro Tips</h3>
              <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Always test on a testnet first</li>
                  <li>Consider implementing a whitelist for initial minting</li>
                  <li>Add events for important state changes</li>
                  <li>Implement emergency pause functionality</li>
                  <li>Consider adding upgradeability for future improvements</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 dark:border-solidity-800 pt-6">
          <div className="flex justify-between items-center">
            <Link
              to="/tutorials/erc721"
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-solidity-700 text-sm font-medium rounded-md text-solidity-700 dark:text-white bg-white dark:bg-solidity-800 hover:bg-gray-50 dark:hover:bg-solidity-700 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous: ERC721 NFTs
            </Link>
            <Link
              to="/tutorials/vulnerabilities"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-ethereum-600 hover:bg-ethereum-700 transition-colors"
            >
              Next: Common Vulnerabilities <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ERC1155;