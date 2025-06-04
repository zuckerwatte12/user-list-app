import { atom } from 'jotai';
import type { User, SortOption } from '../types/user';

export const searchTermAtom = atom<string>('');

export const currentPageAtom = atom<number>(1);
export const usersPerPageAtom = atom<number>(10);

export const sortOptionAtom = atom<SortOption>('name-asc');

export const selectedUserAtom = atom<User | null>(null);
export const isModalOpenAtom = atom<boolean>(false);

export const isDarkModeAtom = atom<boolean>(false);

export const filteredAndSortedUsersAtom = atom<User[]>([]);

export const allUsersAtom = atom<User[]>([]); 