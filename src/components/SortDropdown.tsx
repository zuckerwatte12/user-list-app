import React from 'react';
import { useAtom } from 'jotai';
import { sortOptionAtom } from '../atoms/userAtoms';
import type { SortOption } from '../types/user';

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'name-asc', label: 'Name A-Z' },
  { value: 'name-desc', label: 'Name Z-A' },
  { value: 'email-asc', label: 'Email A-Z' },
  { value: 'email-desc', label: 'Email Z-A' },
];

const SortDropdown = () => {
  const [sortOption, setSortOption] = useAtom(sortOptionAtom);

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(event.target.value as SortOption);
  };

  return (
    <div className="relative">
      <label htmlFor="sort-select" className="sr-only">Sort users</label>
      <select
        id="sort-select"
        value={sortOption}
        onChange={handleSortChange}
        className="block w-full pl-3 pr-10 py-3 border border-gray-300 dark:border-gray-600 
                   bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 
                   rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                   transition-colors duration-200"
        aria-label="Sort users by"
      >
        {sortOptions.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SortDropdown; 