import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface TutorialCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  path: string;
}

const TutorialCard: React.FC<TutorialCardProps> = ({
  title,
  description,
  icon,
  difficulty,
  duration,
  path,
}) => {
  const difficultyColor = {
    Beginner: 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400',
    Intermediate: 'text-blue-600 bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400',
    Advanced: 'text-purple-600 bg-purple-100 dark:bg-purple-900/20 dark:text-purple-400',
  }[difficulty];

  return (
    <Link
      to={path}
      className="block group"
    >
      <div className="h-full rounded-lg border border-gray-200 dark:border-solidity-800 bg-white dark:bg-solidity-900 shadow-sm hover:shadow-md dark:shadow-solidity-900/50 transition-all duration-300 overflow-hidden">
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div className="mr-4 text-ethereum-600 dark:text-ethereum-500">
              {icon}
            </div>
            <h3 className="text-lg font-semibold text-solidity-900 dark:text-white group-hover:text-ethereum-600 dark:group-hover:text-ethereum-400 transition-colors">
              {title}
            </h3>
          </div>
          
          <p className="text-sm text-solidity-600 dark:text-gray-300 mb-4">
            {description}
          </p>
          
          <div className="flex items-center justify-between mt-4">
            <div className="flex space-x-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${difficultyColor}`}>
                {difficulty}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-solidity-600 bg-gray-100 dark:bg-solidity-800 dark:text-gray-300">
                {duration}
              </span>
            </div>
            
            <ArrowRight className="h-5 w-5 text-solidity-400 group-hover:text-ethereum-600 group-hover:translate-x-1 transition-all" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TutorialCard;