import { atom } from 'jotai';
import type { User, SortOption } from '../types/user';

// Search and filter atoms
export const searchTermAtom = atom<string>('');

// Pagination atoms
export const currentPageAtom = atom<number>(1);
export const usersPerPageAtom = atom<number>(10);

// Sorting atom
export const sortOptionAtom = atom<SortOption>('name-asc');

// Modal atoms
export const selectedUserAtom = atom<User | null>(null);
export const isModalOpenAtom = atom<boolean>(false);

// Theme atom
export const isDarkModeAtom = atom<boolean>(false);

// Derived atoms for computed values
export const filteredAndSortedUsersAtom = atom<User[]>([]);

// Atom to store all users from API
export const allUsersAtom = atom<User[]>([]); 