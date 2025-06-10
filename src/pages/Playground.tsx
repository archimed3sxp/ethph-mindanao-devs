import React, { useState } from 'react';
import SolidityEditor from '../components/code/SolidityEditor';

const SAMPLE_CONTRACTS = [
  {
    id: "hello-world",
    name: "Hello World",
    description: "A simple contract that stores and retrieves a greeting message",
    code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract HelloWorld {
    string private greeting;
    
    constructor() {
        greeting = "Hello, World!";
    }
    
    function getGreeting() public view returns (string memory) {
        return greeting;
    }
    
    function setGreeting(string memory _greeting) public {
        greeting = _greeting;
    }
}`
  },
  {
    id: "erc20",
    name: "ERC20 Token",
    description: "A basic ERC-20 token implementation",
    code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyToken is ERC20, Ownable {
    constructor() ERC20("MyToken", "MTK") {
        _mint(msg.sender, 1000000 * 10 ** decimals());
    }
    
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
}`
  },
  {
    id: "nft",
    name: "NFT Collection",
    description: "A simple NFT collection with minting functionality",
    code: `// SPDX-License-Identifier: MIT
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
}`
  },
  {
    id: "dao",
    name: "Simple DAO",
    description: "A basic DAO implementation with proposal and voting functionality",
    code: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract SimpleDAO {
    struct Proposal {
        string description;
        uint256 voteCount;
        bool executed;
        mapping(address => bool) hasVoted;
    }
    
    mapping(uint256 => Proposal) public proposals;
    uint256 public proposalCount;
    mapping(address => bool) public members;
    
    constructor() {
        members[msg.sender] = true;
    }
    
    function addMember(address member) public {
        require(members[msg.sender], "Not a member");
        members[member] = true;
    }
    
    function createProposal(string memory description) public {
        require(members[msg.sender], "Not a member");
        proposalCount++;
        Proposal storage proposal = proposals[proposalCount];
        proposal.description = description;
    }
    
    function vote(uint256 proposalId) public {
        require(members[msg.sender], "Not a member");
        Proposal storage proposal = proposals[proposalId];
        require(!proposal.hasVoted[msg.sender], "Already voted");
        require(!proposal.executed, "Proposal already executed");
        
        proposal.hasVoted[msg.sender] = true;
        proposal.voteCount++;
    }
}`
  }
];

const Playground: React.FC = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(SAMPLE_CONTRACTS[0]);

  return (
    <div className="max-w-6xl mx-auto py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-solidity-900 dark:text-white mb-4">
          Solidity Playground
        </h1>
        <p className="text-solidity-600 dark:text-gray-300 mb-6">
          Experiment with Solidity code in our interactive playground. Write, edit, and test your smart contracts without any setup.
        </p>
        
        <div className="flex flex-wrap gap-3 mb-6">
          {SAMPLE_CONTRACTS.map((template) => (
            <button
              key={template.id}
              onClick={() => setSelectedTemplate(template)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedTemplate.id === template.id
                  ? 'bg-ethereum-600 text-white'
                  : 'bg-gray-100 dark:bg-solidity-800 text-solidity-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-solidity-700'
              }`}
            >
              {template.name}
            </button>
          ))}
        </div>
        
        <div className="bg-white dark:bg-solidity-900 rounded-lg shadow-sm p-4 mb-8">
          <h2 className="text-xl font-semibold text-solidity-900 dark:text-white mb-2">
            {selectedTemplate.name}
          </h2>
          <p className="text-solidity-600 dark:text-gray-300">
            {selectedTemplate.description}
          </p>
        </div>
      </div>

      <div className="mb-8">
        <SolidityEditor
          key={selectedTemplate.id}
          defaultCode={selectedTemplate.code}
          height="500px"
        />
      </div>

      <div className="bg-gray-50 dark:bg-solidity-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-solidity-900 dark:text-white mb-4">
          How to Use the Playground
        </h2>
        
        <div className="space-y-4 text-solidity-700 dark:text-gray-300">
          <p>
            1. <strong>Select a Template</strong> from the options above or start from scratch
          </p>
          <p>
            2. <strong>Edit the Code</strong> in the editor to experiment with Solidity
          </p>
          <p>
            3. <strong>Click Compile</strong> to check your code for errors
          </p>
          <p>
            4. <strong>View Results</strong> in the output panel below the editor
          </p>
          <p>
            5. <strong>Download</strong> your code when you're ready to use it
          </p>
        </div>
      </div>
    </div>
  );
};

export default Playground;