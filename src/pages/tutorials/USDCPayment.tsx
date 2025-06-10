import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Wallet } from 'lucide-react';
import CodeBlock from '../../components/shared/CodeBlock';

const USDCPayment: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto py-8 animate-fade-in">
      <div className="mb-8">
        <div className="flex items-center text-sm text-solidity-500 dark:text-gray-400 mb-2">
          <Wallet className="h-4 w-4 mr-1" />
          <span>WAGMI</span>
        </div>
        <h1 className="text-3xl font-bold text-solidity-900 dark:text-white mb-4">
          Building a USDC Payment Widget
        </h1>
        <div className="flex items-center text-sm text-solidity-500 dark:text-gray-400">
          <span className="mr-4">Difficulty: Intermediate</span>
          <span>Reading time: ~25 min</span>
        </div>
      </div>

      <div className="prose dark:prose-invert prose-ethereum max-w-none">
        <p className="text-lg text-solidity-700 dark:text-gray-200 leading-relaxed">
          In this tutorial, we'll create a reusable USDC payment widget using WAGMI and Foundry. This widget will allow users to send USDC payments to a specified address with a clean, user-friendly interface.
        </p>

        <h2>Smart Contract</h2>

        <p>First, let's create a simple payment contract that wraps USDC transfers:</p>

        <CodeBlock
          code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract USDCPayment {
    IERC20 public immutable usdc;
    
    event PaymentSent(
        address indexed from,
        address indexed to,
        uint256 amount
    );
    
    constructor(address _usdc) {
        usdc = IERC20(_usdc);
    }
    
    function sendPayment(address to, uint256 amount) external {
        require(to != address(0), "Invalid recipient");
        require(amount > 0, "Amount must be greater than 0");
        
        bool success = usdc.transferFrom(msg.sender, to, amount);
        require(success, "Transfer failed");
        
        emit PaymentSent(msg.sender, to, amount);
    }
    
    function getBalance(address account) external view returns (uint256) {
        return usdc.balanceOf(account);
    }
    
    function getAllowance(address owner, address spender) external view returns (uint256) {
        return usdc.allowance(owner, spender);
    }
}`}
          language="solidity"
        />

        <h2>Frontend Implementation</h2>

        <p>Now let's create the payment widget component:</p>

        <CodeBlock
          code={`import { useState } from 'react';
import { 
  useAccount,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt
} from 'wagmi';
import { parseUnits, formatUnits } from 'viem';

const USDC_ADDRESS = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';
const PAYMENT_CONTRACT = '0x...'; // Your deployed contract address

const USDC_ABI = [
  {
    name: 'approve',
    type: 'function',
    inputs: [
      { name: 'spender', type: 'address' },
      { name: 'amount', type: 'uint256' }
    ],
    outputs: [{ type: 'bool' }],
    stateMutability: 'nonpayable'
  },
  {
    name: 'balanceOf',
    type: 'function',
    inputs: [{ name: 'account', type: 'address' }],
    outputs: [{ type: 'uint256' }],
    stateMutability: 'view'
  }
];

const PAYMENT_ABI = [
  {
    name: 'sendPayment',
    type: 'function',
    inputs: [
      { name: 'to', type: 'address' },
      { name: 'amount', type: 'uint256' }
    ],
    outputs: [],
    stateMutability: 'nonpayable'
  }
];

interface PaymentWidgetProps {
  recipientAddress: \`0x\${string}\`;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

function PaymentWidget({ 
  recipientAddress,
  onSuccess,
  onError
}: PaymentWidgetProps) {
  const { address } = useAccount();
  const [amount, setAmount] = useState('');
  const [step, setStep] = useState<'approve' | 'send'>('approve');

  // Read USDC balance
  const { data: balance } = useReadContract({
    address: USDC_ADDRESS,
    abi: USDC_ABI,
    functionName: 'balanceOf',
    args: [address],
    watch: true,
  });

  // Write contract functions
  const { writeContract: approveUSDC, data: approveHash } = useWriteContract();
  const { writeContract: sendPayment, data: paymentHash } = useWriteContract();

  // Transaction receipts
  const { isLoading: isApproving, isSuccess: isApproved } = useWaitForTransactionReceipt({
    hash: approveHash,
    onSuccess: () => setStep('send'),
    onError,
  });

  const { isLoading: isSending, isSuccess: isSent } = useWaitForTransactionReceipt({
    hash: paymentHash,
    onSuccess,
    onError,
  });

  const handleApprove = () => {
    if (!amount) return;
    
    const value = parseUnits(amount, 6); // USDC has 6 decimals
    
    approveUSDC({
      address: USDC_ADDRESS,
      abi: USDC_ABI,
      functionName: 'approve',
      args: [PAYMENT_CONTRACT, value],
    });
  };

  const handleSend = () => {
    if (!amount) return;
    
    const value = parseUnits(amount, 6);
    
    sendPayment({
      address: PAYMENT_CONTRACT,
      abi: PAYMENT_ABI,
      functionName: 'sendPayment',
      args: [recipientAddress, value],
    });
  };

  return (
    <div className="max-w-sm mx-auto p-6 bg-white dark:bg-solidity-900 rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2">Send USDC Payment</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Balance: {balance ? formatUnits(balance, 6) : '0'} USDC
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">
            Amount (USDC)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.00"
            className="w-full p-2 border rounded focus:ring-2 focus:ring-ethereum-500 dark:bg-solidity-800 dark:border-solidity-700"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Recipient
          </label>
          <div className="text-sm font-mono bg-gray-50 dark:bg-solidity-800 p-2 rounded">
            {recipientAddress}
          </div>
        </div>

        {step === 'approve' ? (
          <button
            onClick={handleApprove}
            disabled={isApproving || !amount}
            className="w-full py-2 px-4 bg-ethereum-600 text-white rounded hover:bg-ethereum-700 disabled:bg-gray-400"
          >
            {isApproving ? 'Approving...' : 'Approve USDC'}
          </button>
        ) : (
          <button
            onClick={handleSend}
            disabled={isSending || !amount}
            className="w-full py-2 px-4 bg-ethereum-600 text-white rounded hover:bg-ethereum-700 disabled:bg-gray-400"
          >
            {isSending ? 'Sending...' : 'Send Payment'}
          </button>
        )}

        {isSent && (
          <div className="text-sm text-green-600 dark:text-green-400">
            Payment sent successfully!
          </div>
        )}
      </div>
    </div>
  );
}`}
          language="typescript"
        />

        <h2>Usage Example</h2>

        <CodeBlock
          code={`function DonationPage() {
  const RECIPIENT = '0x...'; // Your donation address

  return (
    <div className="max-w-2xl mx-auto py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Support Our Project</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Help us continue building by making a USDC donation
        </p>
      </div>

      <PaymentWidget
        recipientAddress={RECIPIENT}
        onSuccess={() => {
          toast.success('Thank you for your donation!');
        }}
        onError={(error) => {
          toast.error(\`Error: \${error.message}\`);
        }}
      />
    </div>
  );
}`}
          language="typescript"
        />

        <h2>Testing the Contract</h2>

        <CodeBlock
          code={`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "../src/USDCPayment.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract USDCPaymentTest is Test {
    USDCPayment payment;
    address constant USDC = 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48;
    address user = address(1);
    address recipient = address(2);
    
    function setUp() public {
        payment = new USDCPayment(USDC);
        
        // Fork mainnet to access real USDC contract
        vm.createSelectFork("mainnet");
        
        // Get some USDC from a whale
        address whale = 0x47ac0Fb4F2D84898e4D9E7b4DaB3C24507a6D503;
        vm.startPrank(whale);
        IERC20(USDC).transfer(user, 1000000000); // 1000 USDC
        vm.stopPrank();
    }
    
    function testSendPayment() public {
        uint256 amount = 100000000; // 100 USDC
        
        vm.startPrank(user);
        
        // Approve payment contract
        IERC20(USDC).approve(address(payment), amount);
        
        // Send payment
        payment.sendPayment(recipient, amount);
        
        // Verify balances
        assertEq(IERC20(USDC).balanceOf(recipient), amount);
        
        vm.stopPrank();
    }
    
    function testFailInsufficientBalance() public {
        vm.startPrank(user);
        
        uint256 balance = IERC20(USDC).balanceOf(user);
        uint256 amount = balance + 1;
        
        IERC20(USDC).approve(address(payment), amount);
        payment.sendPayment(recipient, amount);
        
        vm.stopPrank();
    }
}`}
          language="solidity"
        />

        <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400 dark:border-blue-600 p-4 my-6">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">Implementation Notes</h3>
              <div className="mt-2 text-sm text-blue-700 dark:text-blue-300">
                <ul className="list-disc pl-5 space-y-1">
                  <li>Always validate user input and handle errors gracefully</li>
                  <li>Use proper decimal handling for USDC (6 decimals)</li>
                  <li>Implement loading states for better UX</li>
                  <li>Consider adding amount validation against balance</li>
                  <li>Add proper error messages for failed transactions</li>
                  <li>Consider adding a confirmation step for large amounts</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-200 dark:border-solidity-800 pt-6">
          <div className="flex justify-between items-center">
            <Link
              to="/tutorials/marketplace"
              className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-solidity-700 text-sm font-medium rounded-md text-solidity-700 dark:text-white bg-white dark:bg-solidity-800 hover:bg-gray-50 dark:hover:bg-solidity-700 transition-colors"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Previous: Marketplace
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

export default USDCPayment;