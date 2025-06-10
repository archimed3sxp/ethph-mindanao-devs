import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Star } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  categories: string[];
  image: string;
  path: string;
  githubLink?: string;
  creator?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  difficulty,
  categories,
  image,
  path,
  githubLink,
  creator,
}) => {
  const difficultyColor = {
    Beginner: 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400',
    Intermediate: 'text-blue-600 bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400',
    Advanced: 'text-purple-600 bg-purple-100 dark:bg-purple-900/20 dark:text-purple-400',
  }[difficulty];

  return (
    <div className="h-full rounded-lg border border-gray-200 dark:border-solidity-800 bg-white dark:bg-solidity-900 shadow-sm hover:shadow-md dark:shadow-solidity-900/50 transition-all duration-300 overflow-hidden">
      <div className="h-40 bg-gray-200 dark:bg-solidity-800 relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-2 right-2">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${difficultyColor}`}>
            {difficulty}
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold text-solidity-900 dark:text-white mb-2">
            {title}
          </h3>
          {githubLink && (
            <a 
              href={githubLink} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-solidity-500 hover:text-ethereum-600 dark:text-gray-400 dark:hover:text-ethereum-400"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
        
        <p className="text-sm text-solidity-600 dark:text-gray-300 mb-4">
          {description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {categories.map((category, index) => (
            <span 
              key={index}
              className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 dark:bg-solidity-800 text-solidity-600 dark:text-gray-300"
            >
              {category}
            </span>
          ))}
        </div>

        {creator && (
          <div className="mb-4 text-sm text-solidity-500 dark:text-gray-400">
            Created by: {creator}
          </div>
        )}
        
        <Link
          to={path}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-ethereum-600 hover:bg-ethereum-700 transition-colors"
        >
          Project Link
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;