import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { useMemo, useEffect } from 'react';
import { fetchUsers } from '../api/userApi';
import { 
  allUsersAtom, 
  searchTermAtom, 
  sortOptionAtom, 
  currentPageAtom, 
  usersPerPageAtom 
} from '../atoms/userAtoms';
import { filterUsers, sortUsers, paginateUsers, getTotalPages } from '../utils/userUtils';

export const useUsers = () => {
  const [allUsers, setAllUsers] = useAtom(allUsersAtom);
  const [searchTerm] = useAtom(searchTermAtom);
  const [sortOption] = useAtom(sortOptionAtom);
  const [currentPage, setCurrentPage] = useAtom(currentPageAtom);
  const [usersPerPage] = useAtom(usersPerPageAtom);

  // Fetch users with TanStack Query
  const { data, isLoading, error, isError } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetchUsers(100),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });

  // Update allUsers atom when data changes
  useEffect(() => {
    if (data?.results) {
      setAllUsers(data.results);
    }
  }, [data, setAllUsers]);

  // Memoized filtered and sorted users
  const filteredAndSortedUsers = useMemo(() => {
    if (!allUsers.length) return [];
    
    const filtered = filterUsers(allUsers, searchTerm);
    return sortUsers(filtered, sortOption);
  }, [allUsers, searchTerm, sortOption]);

  // Memoized paginated users
  const paginatedUsers = useMemo(() => {
    return paginateUsers(filteredAndSortedUsers, currentPage, usersPerPage);
  }, [filteredAndSortedUsers, currentPage, usersPerPage]);

  // Total pages calculation
  const totalPages = useMemo(() => {
    return getTotalPages(filteredAndSortedUsers.length, usersPerPage);
  }, [filteredAndSortedUsers.length, usersPerPage]);

  // Reset page when search or sort changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, sortOption, setCurrentPage]);

  return {
    users: paginatedUsers,
    allUsers: filteredAndSortedUsers,
    isLoading,
    isError,
    error,
    totalPages,
    currentPage,
    totalUsers: filteredAndSortedUsers.length,
  };
}; 