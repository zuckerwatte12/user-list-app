import React from 'react';

const UserCardSkeleton: React.FC = () => {
  return (
    <div className="user-card p-6 animate-fade-in" role="status" aria-label="Loading user information">
      <div className="flex items-center space-x-4">
        <div className="skeleton w-16 h-16 rounded-full flex-shrink-0" />
        <div className="flex-1 space-y-3">
          <div className="skeleton h-5 w-3/4 rounded" />
          <div className="skeleton h-4 w-1/2 rounded" />
        </div>
      </div>
      <span className="sr-only">Loading user information...</span>
    </div>
  );
};

export default UserCardSkeleton; 