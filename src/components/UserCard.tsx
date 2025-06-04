import React from 'react';
import { useAtom } from 'jotai';
import type { User } from '../types/user';
import { selectedUserAtom, isModalOpenAtom } from '../atoms/userAtoms';
import { getUserDisplayName } from '../api/userApi';

interface UserCardProps {
  user: User;
}

const UserCard: React.FC<UserCardProps> = ({ user }) => {
  const [, setSelectedUser] = useAtom(selectedUserAtom);
  const [, setIsModalOpen] = useAtom(isModalOpenAtom);

  const handleClick = () => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  const fullName = getUserDisplayName(user);

  return (
    <div
      className="user-card p-6 cursor-pointer focus-trap animate-slide-in"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View details for ${fullName}`}
    >
      <div className="flex items-center space-x-4">
        <img
          src={user.picture.medium}
          alt={`${fullName}'s profile picture`}
          className="w-16 h-16 rounded-full object-cover flex-shrink-0"
          loading="lazy"
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 truncate">
            {fullName}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
            {user.email}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
            {user.location.city}, {user.location.country}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserCard; 