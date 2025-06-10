import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Cpu } from 'lucide-react';
import CodeBlock from '../../components/shared/CodeBlock';

const ERC20: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto py-8 animate-fade-in">
      <div className="mb-8">
        <div className="flex items-center text-sm text-solidity-500 dark:text-gray-400 mb-2">
          <Cpu className="h-4 w-4 mr-1" />
          <span>Smart Contracts</span>
        </div>
        <h1 className="text-3xl font-bold text-solidity-900 dark:text-white mb-4">
          ERC20 Token Standard
        </h1>
        <div className="flex items-center text-sm text-solidity-500 dark:text-gray-400">
          <span className="mr-4">Difficulty: Intermediate</span>
          <span>Reading time: ~30 min</span>
        </div>
      </div>

      <div className="prose dark:prose-invert prose-ethereum max-w-none">
        <p className="text-lg text-solidity-700 dark:text-gray-200 leading-relaxed">
          The ERC20 token standard is one of the most important standards in Ethereum. It defines a common interface for fungible tokens, enabling seamless integration with wallets, exchanges, and other smart contracts.
        </p>

        <h2>What is ERC20?</h2>
        
        <p>
          ERC20 (Ethereum Request for Comments 20) is a standard interface for fungible tokens, meaning each token is exactly the same as every other token. This standard allows for:
        </p>

        <ul>
          <li>Token transfers between addresses</li>
          <li>Querying token balances</li>
          <li>Total supply information</li>
          <li>Token approval and allowance mechanism</li>
        </ul>

        <h2>Required Functions and Events</h2>

        <CodeBlock
          code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    // Required functions
    function totalSupply() external view returns (uint256);
    function balanceOf(address account) external view returns (uint256);
    function transfer(address to, uint256 amount) external returns (bool);
    function allowance(address owner, address spender) external view returns (uint256);
    function approve(address spender, uint256 amount) external returns (bool);
    function transferFrom(address from, address to, uint256 amount) external returns (bool);

    // Required events
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
}`}
          language="solidity"
        />

        <h2>Basic ERC20 Implementation</h2>

        <CodeBlock
          code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BasicERC20 {
    string public name;
    string public symbol;
    uint8 public decimals;
    uint256 private _totalSupply;
    
    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowances;
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    
    constructor(string memory tokenName, string memory tokenSymbol, uint8 tokenDecimals, uint256 initialSupply) {
        name = tokenName;
        symbol = tokenSymbol;
        decimals = tokenDecimals;
        _totalSupply = initialSupply * 10**uint256(decimals);
        _balances[msg.sender] = _totalSupply;
        emit Transfer(address(0), msg.sender, _totalSupply);
    }
    
    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }
    
    function balanceOf(address account) public view returns (uint256) {
        return _balances[account];
    }
    
    function transfer(address to, uint256 amount) public returns (bool) {
        require(to != address(0), "ERC20: transfer to zero address");
        require(_balances[msg.sender] >= amount, "ERC20: insufficient balance");
        
        _balances[msg.sender] -= amount;
        _balances[to] += amount;
        emit Transfer(msg.sender, to, amount);
        return true;
    }
    
    function allowance(address owner, address spender) public view returns (uint256) {
        return _allowances[owner][spender];
    }
    
    function approve(address spender, uint256 amount) public returns (bool) {
        require(spender != address(0), "ERC20: approve to zero address");
        
        _allowances[msg.sender][spender] = amount;
        emit Approval(msg.sender, spender, amount);
        return true;
    }
    
    function transferFrom(address from, address to, uint256 amount) public returns (bool) {
        require(from != address(0), "ERC20: transfer from zero address");
        require(to != address(0), "ERC20: transfer to zero address");
        require(_balances[from] >= amount, "ERC20: insufficient balance");
        require(_allowances[from][msg.sender] >= amount, "ERC20: insufficient allowance");
        
        _balances[from] -= amount;
        _balances[to] += amount;
        _allowances[from][msg.sender] -= amount;
        
        emit Transfer(from, to, amount);
        return true;
    }
}`}
          language="solidity"
        />

        <h2>Using OpenZeppelin's Implementation</h2>
        
        <p>
          OpenZeppelin provides a secure, tested implementation of ERC20 that's widely used in production:
        </p>

        <CodeBlock
          code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract MyToken is ERC20 {
    constructor(uint256 initialSupply) ERC20("MyToken", "MTK") {
        _mint(msg.sender, initialSupply);
    }
}`}
          language="solidity"
        />

        <h2>Advanced Features</h2>

        <h3>Minting and Burning</h3>

        <CodeBlock
          code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract AdvancedToken is ERC20, Ownable {
    constructor() ERC20("Advanced Token", "ADV") {}
    
    function mint(address to, uint256 amount) public onlyOwner {
        _mint(to, amount);
    }
    
    function burn(uint256 amount) public {
        _burn(msg.sender, amount);
    }
}`}
          language="solidity"
        />

        <h3>Pausable Functionality</h3>

        <CodeBlock
          code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PausableToken is ERC20, Pausable, Ownable {
    constructor() ERC20("Pausable Token", "PAUSE") {}
    
    function pause() public onlyOwner {
        _pause();
    }
    
    function unpause() public onlyOwner {
        _unpause();
    }
    
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal virtual override {
        super._beforeTokenTransfer(from, to, amount);
        require(!paused(), "Token transfer while paused");
    }
}`}
          language="solidity"
        />

        <h2>Best Practices</h2>

        <ul>
          <li><strong>Use OpenZeppelin</strong> - Their implementation is battle-tested and secure</li>
          <li><strong>Decimal Places</strong> - Most tokens use 18 decimals to match ETH</li>
          <li><strong>Check Zero Address</strong> - Always validate addresses aren't zero</li>
          <li><strong>Safe Math</strong> - Use Solidity 0.8.0+ for automatic overflow checks</li>
          <li><strong>Events</strong> - Emit events for all state changes</li>
          <li><strong>Access Control</strong> - Implement proper permission systems</li>
        </ul>

        <h2>Common Security Considerations</h2>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 dark:border-yellow-600 p-4 my-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400 dark:text-yellow-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Security Risks</h3>
              <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-300">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Double-spend attacks through reentrancy</li>
                  <li>Integer overflow/underflow (pre-0.8.0)</li>
                  <li>Approval front-running</li>
                  <li>Token theft through unlimited approvals</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <h2>Testing ERC20 Tokens</h2>

        <CodeBlock
          code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Test.sol";
import "../src/Token.sol";

contract TokenTest is Test {
    Token token;
    address alice = address(1);
    address bob = address(2);
    
    function setUp() public {
        token = new Token("Test Token", "TEST");
        token.mint(alice, 1000 * 10**18);
    }
    
    function testTransfer() public {
        vm.startPrank(alice);
        token.transfer(bob, 100 * 10**18);
        assertEq(token.balanceOf(bob), 100 * 10**18);
        assertEq(token.balanceOf(alice), 900 * 10**18);
    }
    
    function testApproveAndTransferFrom() public {
        vm.startPrank(alice);
        token.approve(bob, 100 * 10**18);
        vm.stopPrank();
        
        vm.startPrank(bob);
        token.transferFrom(alice, bob, 100 * 10**18);
        assertEq(token.balanceOf(bob), 100 * 10**18);
        assertEq(token.balanceOf(alice), 900 * 10**18);
    }
    
    function testFailTransferInsufficientBalance() public {
        vm.startPrank(alice);
        token.transfer(bob, 2000 * 10**18);
    }
}`}
          language="solidity"
        />

        <div className="mt-12 border-t border-gray-200 dark:border-solidity-800 pt-6">
          <div className="flex justify-between items-center">
            <Link
              to="/tutorials/events"
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-solidity-700 text-sm font-medium rounded-md text-solidity-700 dark:text-white bg-white dark:bg-solidity-800 hover:bg-gray-50 dark:hover:bg-solidity-700 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous: Events & Logging
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

export default ERC20;