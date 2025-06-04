import type { User, SortOption } from '../types/user';
import { getUserDisplayName } from '../api/userApi';

export const filterUsers = (users: User[], searchTerm: string): User[] => {
  if (!searchTerm.trim()) return users;
  
  const lowercaseSearch = searchTerm.toLowerCase();
  
  return users.filter(user => {
    const fullName = getUserDisplayName(user).toLowerCase();
    const email = user.email.toLowerCase();
    
    return fullName.includes(lowercaseSearch) || email.includes(lowercaseSearch);
  });
};

export const sortUsers = (users: User[], sortOption: SortOption): User[] => {
  const sortedUsers = [...users];
  
  switch (sortOption) {
    case 'name-asc':
      return sortedUsers.sort((a, b) => 
        getUserDisplayName(a).localeCompare(getUserDisplayName(b))
      );
    case 'name-desc':
      return sortedUsers.sort((a, b) => 
        getUserDisplayName(b).localeCompare(getUserDisplayName(a))
      );
    case 'email-asc':
      return sortedUsers.sort((a, b) => a.email.localeCompare(b.email));
    case 'email-desc':
      return sortedUsers.sort((a, b) => b.email.localeCompare(a.email));
    default:
      return sortedUsers;
  }
};

export const paginateUsers = (users: User[], currentPage: number, usersPerPage: number): User[] => {
  const startIndex = (currentPage - 1) * usersPerPage;
  const endIndex = startIndex + usersPerPage;
  return users.slice(startIndex, endIndex);
};

export const getTotalPages = (totalUsers: number, usersPerPage: number): number => {
  return Math.ceil(totalUsers / usersPerPage);
};

export const clsx = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
}; 