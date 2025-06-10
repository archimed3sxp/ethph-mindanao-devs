import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import Introduction from './pages/tutorials/Introduction';
import Setup from './pages/tutorials/Setup';
import GitHubBasics from './pages/tutorials/GitHubBasics';
import Foundry from './pages/tutorials/Foundry';
import FoundryScripts from './pages/tutorials/FoundryScripts';
import BasicSyntax from './pages/tutorials/BasicSyntax';
import DataTypes from './pages/tutorials/DataTypes';
import Functions from './pages/tutorials/Functions';
import ContractLinking from './pages/tutorials/ContractLinking';
import Inheritance from './pages/tutorials/Inheritance';
import ERC20 from './pages/tutorials/ERC20';
import ERC721 from './pages/tutorials/ERC721';
import ERC1155 from './pages/tutorials/ERC1155';
import SecurityBestPractices from './pages/tutorials/SecurityBestPractices';
import CommonAttacks from './pages/tutorials/CommonAttacks';
import DevOpsSecurity from './pages/tutorials/DevOpsSecurity';
import ChainlinkVRF from './pages/tutorials/ChainlinkVRF';
import OracleIntegration from './pages/tutorials/OracleIntegration';
import GasOptimization from './pages/tutorials/GasOptimization';
import DesignPatterns from './pages/tutorials/DesignPatterns';
import WagmiIntegration from './pages/tutorials/WagmiIntegration';
import TransactionStatus from './pages/tutorials/TransactionStatus';
import WalletActions from './pages/tutorials/WalletActions';
import ContractInteractions from './pages/tutorials/ContractInteractions';
import NFTMinter from './pages/tutorials/NFTMinter';
import Marketplace from './pages/tutorials/Marketplace';
import USDCPayment from './pages/tutorials/USDCPayment';
import Projects from './pages/Projects';
import Playground from './pages/Playground';
import Resources from './pages/Resources';

const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});

const queryClient = new QueryClient();

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <div className="flex flex-col min-h-screen bg-white dark:bg-solidity-950 text-solidity-900 dark:text-gray-100">
            <Navbar />
            <div className="flex flex-1 overflow-hidden">
              <Sidebar />
              <main className="flex-1 overflow-y-auto p-4 md:p-8">
                <div className="max-w-6xl mx-auto">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/tutorials/introduction" element={<Introduction />} />
                    <Route path="/tutorials/setup" element={<Setup />} />
                    <Route path="/tutorials/github-basics" element={<GitHubBasics />} />
                    <Route path="/tutorials/foundry" element={<Foundry />} />
                    <Route path="/tutorials/foundry-scripts" element={<FoundryScripts />} />
                    <Route path="/tutorials/basic-syntax" element={<BasicSyntax />} />
                    <Route path="/tutorials/data-types" element={<DataTypes />} />
                    <Route path="/tutorials/functions" element={<Functions />} />
                    <Route path="/tutorials/contract-linking" element={<ContractLinking />} />
                    <Route path="/tutorials/inheritance" element={<Inheritance />} />
                    <Route path="/tutorials/erc20" element={<ERC20 />} />
                    <Route path="/tutorials/erc721" element={<ERC721 />} />
                    <Route path="/tutorials/erc1155" element={<ERC1155 />} />
                    <Route path="/tutorials/security-best-practices" element={<SecurityBestPractices />} />
                    <Route path="/tutorials/common-attacks" element={<CommonAttacks />} />
                    <Route path="/tutorials/devops-security" element={<DevOpsSecurity />} />
                    <Route path="/tutorials/chainlink-vrf" element={<ChainlinkVRF />} />
                    <Route path="/tutorials/oracle-integration" element={<OracleIntegration />} />
                    <Route path="/tutorials/gas-optimization" element={<GasOptimization />} />
                    <Route path="/tutorials/design-patterns" element={<DesignPatterns />} />
                    <Route path="/tutorials/wagmi-integration" element={<WagmiIntegration />} />
                    <Route path="/tutorials/transaction-status" element={<TransactionStatus />} />
                    <Route path="/tutorials/wallet-actions" element={<WalletActions />} />
                    <Route path="/tutorials/contract-interactions" element={<ContractInteractions />} />
                    <Route path="/tutorials/nft-minter" element={<NFTMinter />} />
                    <Route path="/tutorials/marketplace" element={<Marketplace />} />
                    <Route path="/tutorials/usdc-payment" element={<USDCPayment />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/playground" element={<Playground />} />
                    <Route path="/resources" element={<Resources />} />
                  </Routes>
                </div>
              </main>
            </div>
            <Footer />
          </div>
        </Router>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;