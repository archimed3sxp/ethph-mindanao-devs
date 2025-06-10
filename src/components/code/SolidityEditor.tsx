import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import { Play, Download, Trash } from 'lucide-react';

interface SolidityEditorProps {
  defaultCode?: string;
  height?: string;
  readOnly?: boolean;
}

// Mock compilation function (in a real app, you'd connect to a compiler service)
const mockCompile = (code: string) => {
  return new Promise<{success: boolean, output: string}>((resolve) => {
    setTimeout(() => {
      const hasError = code.includes('error') || Math.random() < 0.1;
      
      if (hasError) {
        resolve({
          success: false,
          output: 'Error: Something went wrong in your code. Check for syntax errors.'
        });
      } else {
        resolve({
          success: true,
          output: 'Compilation successful! Contract ready for deployment.'
        });
      }
    }, 1500);
  });
};

const SolidityEditor: React.FC<SolidityEditorProps> = ({
  defaultCode = '// SPDX-License-Identifier: MIT\npragma solidity ^0.8.0;\n\ncontract HelloWorld {\n    string private greeting;\n    \n    constructor() {\n        greeting = "Hello, World!";\n    }\n    \n    function getGreeting() public view returns (string memory) {\n        return greeting;\n    }\n    \n    function setGreeting(string memory _greeting) public {\n        greeting = _greeting;\n    }\n}',
  height = '400px',
  readOnly = false
}) => {
  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState('');
  const [isCompiling, setIsCompiling] = useState(false);
  const [isSuccess, setIsSuccess] = useState<boolean | null>(null);

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
    }
  };

  const handleCompile = async () => {
    setIsCompiling(true);
    setOutput('Compiling...');
    
    try {
      const result = await mockCompile(code);
      setIsSuccess(result.success);
      setOutput(result.output);
    } catch (error) {
      setIsSuccess(false);
      setOutput('Error during compilation: ' + (error as Error).message);
    } finally {
      setIsCompiling(false);
    }
  };

  const handleReset = () => {
    setCode(defaultCode);
    setOutput('');
    setIsSuccess(null);
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([code], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = 'Contract.sol';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const outputClass = isSuccess === null 
    ? 'bg-gray-100 dark:bg-solidity-900 border-gray-300 dark:border-solidity-700'
    : isSuccess 
      ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
      : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';

  return (
    <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-solidity-800 bg-white dark:bg-solidity-900 shadow-md animate-fade-in">
      <div className="bg-gray-100 dark:bg-solidity-800 px-4 py-2 flex items-center justify-between">
        <span className="font-mono text-sm text-solidity-700 dark:text-gray-300">
          Solidity Editor
        </span>
        <div className="flex space-x-2">
          {!readOnly && (
            <>
              <button
                onClick={handleCompile}
                disabled={isCompiling}
                className={`p-1.5 rounded-md text-white ${
                  isCompiling 
                    ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed' 
                    : 'bg-ethereum-600 hover:bg-ethereum-700 dark:bg-ethereum-700 dark:hover:bg-ethereum-600'
                } transition-colors`}
                title="Compile"
              >
                <Play className="h-4 w-4" />
              </button>
              <button
                onClick={handleDownload}
                className="p-1.5 rounded-md text-white bg-solidity-600 hover:bg-solidity-700 dark:bg-solidity-700 dark:hover:bg-solidity-600 transition-colors"
                title="Download"
              >
                <Download className="h-4 w-4" />
              </button>
              <button
                onClick={handleReset}
                className="p-1.5 rounded-md text-white bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-500 transition-colors"
                title="Reset"
              >
                <Trash className="h-4 w-4" />
              </button>
            </>
          )}
        </div>
      </div>
      
      <Editor
        height={height}
        defaultLanguage="sol"
        defaultValue={defaultCode}
        value={code}
        onChange={handleEditorChange}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          readOnly,
          scrollBeyondLastLine: false,
          wordWrap: 'on',
        }}
      />
      
      {!readOnly && (
        <div className={`${outputClass} px-4 py-3 border-t`}>
          <pre className="font-mono text-sm whitespace-pre-wrap">
            {output || 'Compile your code to see the output here'}
          </pre>
        </div>
      )}
    </div>
  );
};

export default SolidityEditor;