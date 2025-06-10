import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Cpu } from 'lucide-react';
import CodeBlock from '../../components/shared/CodeBlock';

const ERC721: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto py-8 animate-fade-in">
      <div className="mb-8">
        <div className="flex items-center text-sm text-solidity-500 dark:text-gray-400 mb-2">
          <Cpu className="h-4 w-4 mr-1" />
          <span>Smart Contracts</span>
        </div>
        <h1 className="text-3xl font-bold text-solidity-900 dark:text-white mb-4">
          ERC721 NFT Standard
        </h1>
        <div className="flex items-center text-sm text-solidity-500 dark:text-gray-400">
          <span className="mr-4">Difficulty: Intermediate</span>
          <span>Reading time: ~30 min</span>
        </div>
      </div>

      <div className="prose dark:prose-invert prose-ethereum max-w-none">
        <p className="text-lg text-solidity-700 dark:text-gray-200 leading-relaxed">
          ERC721 is the standard for non-fungible tokens (NFTs) on Ethereum. Each token is unique and can represent ownership of digital or physical assets.
        </p>

        <h2>What is ERC721?</h2>
        
        <p>
          ERC721 tokens are non-fungible, meaning each token is unique and not interchangeable. Common use cases include:
        </p>

        <ul>
          <li>Digital Art</li>
          <li>Gaming Items</li>
          <li>Virtual Real Estate</li>
          <li>Collectibles</li>
          <li>Physical Asset Tokenization</li>
        </ul>

        <h2>Required Functions and Events</h2>

        <CodeBlock
          code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC721 {
    // Required functions
    function balanceOf(address owner) external view returns (uint256);
    function ownerOf(uint256 tokenId) external view returns (address);
    function safeTransferFrom(address from, address to, uint256 tokenId, bytes calldata data) external;
    function safeTransferFrom(address from, address to, uint256 tokenId) external;
    function transferFrom(address from, address to, uint256 tokenId) external;
    function approve(address to, uint256 tokenId) external;
    function setApprovalForAll(address operator, bool approved) external;
    function getApproved(uint256 tokenId) external view returns (address);
    function isApprovedForAll(address owner, address operator) external view returns (bool);

    // Required events
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);
    event ApprovalForAll(address indexed owner, address indexed operator, bool approved);
}`}
          language="solidity"
        />

        <h2>Basic ERC721 Implementation</h2>

        <CodeBlock
          code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BasicERC721 {
    string public name;
    string public symbol;
    
    mapping(uint256 => address) private _owners;
    mapping(address => uint256) private _balances;
    mapping(uint256 => address) private _tokenApprovals;
    mapping(address => mapping(address => bool)) private _operatorApprovals;
    
    event Transfer(address indexed from, address indexed to, uint256 indexed tokenId);
    event Approval(address indexed owner, address indexed approved, uint256 indexed tokenId);
    event ApprovalForAll(address indexed owner, address indexed operator, bool approved);
    
    constructor(string memory tokenName, string memory tokenSymbol) {
        name = tokenName;
        symbol = tokenSymbol;
    }
    
    function balanceOf(address owner) public view returns (uint256) {
        require(owner != address(0), "ERC721: address zero is not a valid owner");
        return _balances[owner];
    }
    
    function ownerOf(uint256 tokenId) public view returns (address) {
        address owner = _owners[tokenId];
        require(owner != address(0), "ERC721: invalid token ID");
        return owner;
    }
    
    function approve(address to, uint256 tokenId) public {
        address owner = ownerOf(tokenId);
        require(to != owner, "ERC721: approval to current owner");
        require(
            msg.sender == owner || isApprovedForAll(owner, msg.sender),
            "ERC721: approve caller is not token owner or approved for all"
        );
        _tokenApprovals[tokenId] = to;
        emit Approval(owner, to, tokenId);
    }
    
    function setApprovalForAll(address operator, bool approved) public {
        require(msg.sender != operator, "ERC721: approve to caller");
        _operatorApprovals[msg.sender][operator] = approved;
        emit ApprovalForAll(msg.sender, operator, approved);
    }
    
    function transferFrom(address from, address to, uint256 tokenId) public {
        require(_isApprovedOrOwner(msg.sender, tokenId), "ERC721: caller is not token owner or approved");
        _transfer(from, to, tokenId);
    }
    
    function _transfer(address from, address to, uint256 tokenId) internal {
        require(ownerOf(tokenId) == from, "ERC721: transfer from incorrect owner");
        require(to != address(0), "ERC721: transfer to the zero address");
        
        _beforeTokenTransfer(from, to, tokenId);
        
        delete _tokenApprovals[tokenId];
        _balances[from] -= 1;
        _balances[to] += 1;
        _owners[tokenId] = to;
        
        emit Transfer(from, to, tokenId);
        
        _afterTokenTransfer(from, to, tokenId);
    }
    
    function _isApprovedOrOwner(address spender, uint256 tokenId) internal view returns (bool) {
        address owner = ownerOf(tokenId);
        return (spender == owner ||
            isApprovedForAll(owner, spender) ||
            getApproved(tokenId) == spender);
    }
    
    function _beforeTokenTransfer(address from, address to, uint256 tokenId) internal virtual {}
    
    function _afterTokenTransfer(address from, address to, uint256 tokenId) internal virtual {}
}`}
          language="solidity"
        />

        <h2>Using OpenZeppelin's Implementation</h2>

        <CodeBlock
          code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MyNFT is ERC721, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    
    constructor() ERC721("MyNFT", "MNFT") {}
    
    function mint(address to) public onlyOwner returns (uint256) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        _mint(to, newTokenId);
        return newTokenId;
    }
}`}
          language="solidity"
        />

        <h2>Advanced Features</h2>

        <h3>Metadata and Token URI</h3>

        <CodeBlock
          code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MetadataNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    
    constructor() ERC721("MetadataNFT", "META") {}
    
    function mint(
        address to,
        string memory tokenURI
    ) public onlyOwner returns (uint256) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();
        
        _mint(to, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        
        return newTokenId;
    }
}`}
          language="solidity"
        />

        <h3>Enumerable Extension</h3>

        <CodeBlock
          code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract EnumerableNFT is ERC721Enumerable, Ownable {
    uint256 private _price = 0.1 ether;
    uint256 private _maxTokens = 10000;
    
    constructor() ERC721("EnumerableNFT", "ENUM") {}
    
    function mint() public payable {
        require(msg.value >= _price, "Insufficient payment");
        require(totalSupply() < _maxTokens, "Max supply reached");
        
        _mint(msg.sender, totalSupply());
    }
    
    function tokensOfOwner(address owner) public view returns (uint256[] memory) {
        uint256 tokenCount = balanceOf(owner);
        uint256[] memory tokens = new uint256[](tokenCount);
        
        for(uint256 i = 0; i < tokenCount; i++) {
            tokens[i] = tokenOfOwnerByIndex(owner, i);
        }
        
        return tokens;
    }
}`}
          language="solidity"
        />

        <h2>Best Practices</h2>

        <ul>
          <li><strong>Use OpenZeppelin</strong> - Their implementation is secure and well-tested</li>
          <li><strong>Implement Access Control</strong> - Restrict minting and admin functions</li>
          <li><strong>Gas Optimization</strong> - Consider batch minting for multiple NFTs</li>
          <li><strong>Metadata Storage</strong> - Use IPFS or other decentralized storage</li>
          <li><strong>Royalties</strong> - Consider implementing EIP-2981 for royalties</li>
        </ul>

        <h2>Testing ERC721</h2>

        <CodeBlock
          code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Test.sol";
import "../src/NFT.sol";

contract NFTTest is Test {
    NFT nft;
    address alice = address(1);
    address bob = address(2);
    
    function setUp() public {
        nft = new NFT();
    }
    
    function testMint() public {
        nft.mint(alice);
        assertEq(nft.ownerOf(1), alice);
        assertEq(nft.balanceOf(alice), 1);
    }
    
    function testTransfer() public {
        nft.mint(alice);
        
        vm.startPrank(alice);
        nft.transferFrom(alice, bob, 1);
        vm.stopPrank();
        
        assertEq(nft.ownerOf(1), bob);
        assertEq(nft.balanceOf(alice), 0);
        assertEq(nft.balanceOf(bob), 1);
    }
    
    function testApproval() public {
        nft.mint(alice);
        
        vm.startPrank(alice);
        nft.approve(bob, 1);
        vm.stopPrank();
        
        vm.startPrank(bob);
        nft.transferFrom(alice, bob, 1);
        vm.stopPrank();
        
        assertEq(nft.ownerOf(1), bob);
    }
}`}
          language="solidity"
        />

        <h2>Deploying Your NFT Collection</h2>

        <p>
          Let's walk through the complete process of deploying an NFT collection, from metadata preparation to OpenSea verification.
        </p>

        <h3>Step 1: Prepare Your Metadata</h3>

        <p>
          First, create your metadata JSON files. Each token needs a metadata file following the OpenSea metadata standard:
        </p>

        <CodeBlock
          code={`{
  "name": "Awesome NFT #1",
  "description": "This is an amazing NFT from my collection",
  "image": "ipfs://QmYourImageCIDHere/1.png",
  "external_url": "https://yourcollection.com/1",
  "attributes": [
    {
      "trait_type": "Background",
      "value": "Blue"
    },
    {
      "trait_type": "Eyes",
      "value": "Diamond"
    },
    {
      "trait_type": "Mouth",
      "value": "Smile"
    },
    {
      "trait_type": "Level",
      "value": 5
    },
    {
      "trait_type": "Stamina",
      "value": 1.4,
      "display_type": "number"
    },
    {
      "trait_type": "Experience",
      "value": 0,
      "max_value": 100,
      "display_type": "progress"
    },
    {
      "trait_type": "Creation Date",
      "value": 1546360800,
      "display_type": "date"
    }
  ]
}`}
          language="json"
        />

        <p>
          Key metadata fields explained:
        </p>

        <ul>
          <li><strong>name</strong>: The name of your NFT</li>
          <li><strong>description</strong>: A human-readable description of the NFT</li>
          <li><strong>image</strong>: IPFS URL to your NFT's image</li>
          <li><strong>external_url</strong>: Optional link to your NFT's webpage</li>
          <li><strong>attributes</strong>: Array of traits that define your NFT's characteristics</li>
        </ul>

        <p>
          Attribute types supported by OpenSea:
        </p>

        <ul>
          <li><strong>string</strong>: Regular text traits (default)</li>
          <li><strong>number</strong>: Numeric traits with decimals</li>
          <li><strong>progress</strong>: Progress bars with current and max values</li>
          <li><strong>date</strong>: Unix timestamps displayed as dates</li>
          <li><strong>boost_number</strong>: Stats that affect the item's power</li>
          <li><strong>boost_percentage</strong>: Percentage-based boosts</li>
        </ul>

        <h3>Step 2: Upload Assets to IPFS via Pinata</h3>

        <ol className="list-decimal pl-6 space-y-4">
          <li>
            <strong>Create a Pinata Account</strong>
            <ul className="list-disc pl-6 mt-2">
              <li>Go to <a href="https://app.pinata.cloud" target="_blank" rel="noopener noreferrer" className="text-ethereum-600 hover:text-ethereum-700">pinata.cloud</a></li>
              <li>Sign up for a free account</li>
            </ul>
          </li>
          
          <li>
            <strong>Upload Image Files</strong>
            <ul className="list-disc pl-6 mt-2">
              <li>Click "Upload" → "Folder"</li>
              <li>Upload your images folder</li>
              <li>Save the CID (Content Identifier) returned by Pinata</li>
            </ul>
          </li>
          
          <li>
            <strong>Update Metadata Files</strong>
            <ul className="list-disc pl-6 mt-2">
              <li>Replace image URLs with your IPFS CID</li>
              <li>Format: <code>ipfs://YOUR_IMAGE_CID/filename.png</code></li>
            </ul>
          </li>
          
          <li>
            <strong>Upload Metadata Files</strong>
            <ul className="list-disc pl-6 mt-2">
              <li>Upload your metadata folder to Pinata</li>
              <li>Save the metadata CID</li>
            </ul>
          </li>
        </ol>

        <h3>Step 3: Deploy Your Smart Contract</h3>

        <p>
          Create a deployment script using Foundry:
        </p>

        <CodeBlock
          code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "../src/MyNFT.sol";

contract DeployNFT is Script {
    function run() public {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        string memory baseURI = vm.envString("BASE_URI");
        
        vm.startBroadcast(deployerPrivateKey);
        
        MyNFT nft = new MyNFT();
        nft.setBaseURI(baseURI); // Your IPFS metadata folder CID
        
        vm.stopBroadcast();
    }
}`}
          language="solidity"
        />

        <p>Deploy using Foundry:</p>

        <CodeBlock
          code={`# Set environment variables
export PRIVATE_KEY=your_private_key
export BASE_URI="ipfs://YOUR_METADATA_CID/"
export ETHERSCAN_API_KEY=your_etherscan_key

# Deploy to network (e.g., Goerli testnet)
forge script script/DeployNFT.s.sol --rpc-url $RPC_URL --broadcast --verify`}
          language="bash"
        />

        <h3>Step 4: Verify Contract on Etherscan</h3>

        <p>
          If the automatic verification fails, verify manually:
        </p>

        <CodeBlock
          code={`forge verify-contract \
  --chain-id 5 \
  --compiler-version v0.8.13 \
  --constructor-args $(cast abi-encode "constructor(string)" "MyNFT") \
  <DEPLOYED_ADDRESS> \
  src/MyNFT.sol:MyNFT \
  $ETHERSCAN_API_KEY`}
          language="bash"
        />

        <h3>Step 5: Mint Your First NFTs</h3>

        <CodeBlock
          code={`// Using Cast to interact with your contract
cast send $CONTRACT_ADDRESS "mint(address,uint256)" $RECIPIENT_ADDRESS 1 --private-key $PRIVATE_KEY

// Or mint using a script
forge script script/Mint.s.sol --rpc-url $RPC_URL --broadcast`}
          language="bash"
        />

        <h3>Step 6: View on OpenSea</h3>

        <ol className="list-decimal pl-6 space-y-4">
          <li>
            <strong>Wait for Indexing</strong>
            <ul className="list-disc pl-6 mt-2">
              <li>OpenSea typically takes 15-30 minutes to index new collections</li>
              <li>Testnet collections appear on testnets.opensea.io</li>
            </ul>
          </li>
          
          <li>
            <strong>View Your Collection</strong>
            <ul className="list-disc pl-6 mt-2">
              <li>Go to OpenSea and connect your wallet</li>
              <li>Navigate to your profile</li>
              <li>Your NFTs should appear under "Collected"</li>
            </ul>
          </li>
          
          <li>
            <strong>Update Collection Details</strong>
            <ul className="list-disc pl-6 mt-2">
              <li>Click "Edit" on your collection page</li>
              <li>Add logo, banner, description, and social links</li>
              <li>Set royalties if desired</li>
            </ul>
          </li>
        </ol>

        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 dark:border-blue-600 p-4 my-6">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">Pro Tips</h3>
              <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Always test on a testnet first (Goerli or Sepolia)</li>
                  <li>Use meaningful token IDs that match your metadata</li>
                  <li>Consider implementing lazy minting for large collections</li>
                  <li>Set reasonable gas limits for your mint function</li>
                  <li>Implement a presale mechanism if needed</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 dark:border-solidity-800 pt-6">
          <div className="flex justify-between items-center">
            <Link
              to="/tutorials/erc20"
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-solidity-700 text-sm font-medium rounded-md text-solidity-700 dark:text-white bg-white dark:bg-solidity-800 hover:bg-gray-50 dark:hover:bg-solidity-700 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous: ERC20 Tokens
            </Link>
            <Link
              to="/tutorials/erc1155"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-ethereum-600 hover:bg-ethereum-700 transition-colors"
            >
              Next: ERC1155 Multi-Token <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ERC721;