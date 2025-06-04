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

  const { data, isLoading, error, isError } = useQuery({
    queryKey: ['users'],
    queryFn: () => fetchUsers(100),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000, 
  });

  useEffect(() => {
    if (data?.results) {
      setAllUsers(data.results);
    }
  }, [data, setAllUsers]);

  const filteredAndSortedUsers = useMemo(() => {
    if (!allUsers.length) return [];
    
    const filtered = filterUsers(allUsers, searchTerm);
    return sortUsers(filtered, sortOption);
  }, [allUsers, searchTerm, sortOption]);

  const paginatedUsers = useMemo(() => {
    return paginateUsers(filteredAndSortedUsers, currentPage, usersPerPage);
  }, [filteredAndSortedUsers, currentPage, usersPerPage]);

  const totalPages = useMemo(() => {
    return getTotalPages(filteredAndSortedUsers.length, usersPerPage);
  }, [filteredAndSortedUsers.length, usersPerPage]);

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