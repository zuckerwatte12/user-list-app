
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider as JotaiProvider } from 'jotai';
import { UserGroupIcon } from '@heroicons/react/24/outline';
import { useUsers } from './hooks/useUsers';
import { useTheme } from './hooks/useTheme';
import UserCard from './components/UserCard';
import UserCardSkeleton from './components/UserCardSkeleton';
import SearchBar from './components/SearchBar';
import SortDropdown from './components/SortDropdown';
import Pagination from './components/Pagination';
import ThemeToggle from './components/ThemeToggle';
import UserModal from './components/UserModal';
import ErrorMessage from './components/ErrorMessage';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
});

const UserListApp = () => {
  const { users, isLoading, isError, error, totalPages, totalUsers } = useUsers();
  
  useTheme();

  const handleRetry = () => {
    window.location.reload();
  };

  if (isError) {
    return <ErrorMessage error={error as Error} onRetry={handleRetry} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8">
          <div className="mb-4 sm:mb-0">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              User Directory
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-1">
              Browse and search through our user database
            </p>
          </div>
          <ThemeToggle />
        </div>

        {/* Search and Filter Controls */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1">
            <SearchBar />
          </div>
          <div className="lg:w-48">
            <SortDropdown />
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <UserCardSkeleton key={index} />
            ))}
          </div>
        )}

        {/* User Grid */}
        {!isLoading && users.length > 0 && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {users.map((user) => (
                <UserCard key={user.login.uuid} user={user} />
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              totalPages={totalPages}
              totalUsers={totalUsers}
              usersPerPage={10}
            />
          </>
        )}

        {/* No Results */}
        {!isLoading && users.length === 0 && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <UserGroupIcon
                className="mx-auto h-12 w-12 text-gray-400"
                aria-hidden="true"
              />
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-gray-100">
                No users found
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Try adjusting your search criteria or filters.
              </p>
            </div>
          </div>
        )}

        {/* User Modal */}
        <UserModal />
      </div>
    </div>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <JotaiProvider>
        <UserListApp />
      </JotaiProvider>
    </QueryClientProvider>
  );
};

export default App;
