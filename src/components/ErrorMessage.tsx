
import { ExclamationTriangleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

interface ErrorMessageProps {
  error: Error | null;
  onRetry?: () => void;
}

const ErrorMessage = ({ error, onRetry }: ErrorMessageProps) => {
  if (!error) return null;

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 max-w-md w-full">
        <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 dark:bg-red-900/40 rounded-full">
          <ExclamationTriangleIcon
            className="w-6 h-6 text-red-600 dark:text-red-400"
            aria-hidden="true"
          />
        </div>
        
        <h3 className="text-lg font-medium text-red-900 dark:text-red-100 mb-2">
          Something went wrong
        </h3>
        
        <p className="text-sm text-red-700 dark:text-red-300 mb-4">
          {error.message || 'An unexpected error occurred while loading the data.'}
        </p>
        
        {onRetry && (
          <button
            onClick={onRetry}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md
                       text-white bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
                       transition-colors duration-200"
            aria-label="Retry loading data"
          >
            <ArrowPathIcon
              className="w-4 h-4 mr-2"
              aria-hidden="true"
            />
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage; 