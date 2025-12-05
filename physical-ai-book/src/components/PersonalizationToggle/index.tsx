import React from 'react';

interface PersonalizationToggleProps {
  isEnabled: boolean;
  onToggle: (enabled: boolean) => void;
  isLoading?: boolean;
}

export default function PersonalizationToggle({ isEnabled, onToggle, isLoading }: PersonalizationToggleProps) {
  return (
    <div className="flex items-center space-x-3 p-2 bg-gray-100 dark:bg-gray-800 rounded-lg mb-4">
      <span className="text-sm font-medium text-gray-900 dark:text-gray-300">
        {isEnabled ? "✨ Personalized View" : "Original View"}
      </span>
      <button
        onClick={() => onToggle(!isEnabled)}
        disabled={isLoading}
        className={`
          relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent 
          transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
          ${isEnabled ? 'bg-indigo-600' : 'bg-gray-200'}
          ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <span
          className={`
            pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 
            transition duration-200 ease-in-out
            ${isEnabled ? 'translate-x-5' : 'translate-x-0'}
          `}
        />
      </button>
      {isLoading && <span className="text-xs text-gray-500 animate-pulse">Adapting content...</span>}
    </div>
  );
}
