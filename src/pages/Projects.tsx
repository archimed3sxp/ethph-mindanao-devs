import React from 'react';
import ProjectCard from '../components/shared/ProjectCard';

const Projects: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto py-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-solidity-900 dark:text-white mb-4">
          Community Projects
        </h1>
        <p className="text-solidity-600 dark:text-gray-300">
          Reinforce your learning by building real-world smart contracts. Start with beginner projects and work your way up to more complex applications. As a community member, you can feature your project here.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ProjectCard
          title="Simple Storage Contract"
          description="Build a basic contract that stores and retrieves values on the blockchain"
          difficulty="Beginner"
          categories={["Storage", "Basic"]}
          image="https://images.pexels.com/photos/8370752/pexels-photo-8370752.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          path="/projects/simple-storage"
          creator="John Smith"
        />
        
        <ProjectCard
          title="Token Creation"
          description="Create your own ERC-20 token with transferable balances"
          difficulty="Beginner"
          categories={["ERC-20", "Tokens"]}
          image="https://images.pexels.com/photos/844124/pexels-photo-844124.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          path="/projects/token-creation"
          githubLink="https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC20/ERC20.sol"
          creator="Alice Johnson"
        />
        
        <ProjectCard
          title="Voting System"
          description="Build a decentralized voting system with proposal and vote tracking"
          difficulty="Intermediate"
          categories={["Governance", "Voting"]}
          image="https://images.pexels.com/photos/1550337/pexels-photo-1550337.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          path="/projects/voting-system"
          creator="Bob Wilson"
        />
        
        <ProjectCard
          title="NFT Collection"
          description="Create a non-fungible token collection with unique digital assets"
          difficulty="Intermediate"
          categories={["ERC-721", "NFT"]}
          image="https://images.pexels.com/photos/2047905/pexels-photo-2047905.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          path="/projects/nft-collection"
          githubLink="https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol"
          creator="Carol Martinez"
        />
        
        <ProjectCard
          title="Decentralized Marketplace"
          description="Build a peer-to-peer marketplace for digital and physical goods"
          difficulty="Advanced"
          categories={["DApp", "Marketplace"]}
          image="https://images.pexels.com/photos/3943901/pexels-photo-3943901.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          path="/projects/marketplace"
          creator="David Brown"
        />
        
        <ProjectCard
          title="DeFi Yield Farm"
          description="Create a yield farming contract with staking and rewards"
          difficulty="Advanced"
          categories={["DeFi", "Staking"]}
          image="https://images.pexels.com/photos/2132281/pexels-photo-2132281.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          path="/projects/yield-farm"
          creator="Eva Chen"
        />
      </div>
    </div>
  );
};

export default Projects;