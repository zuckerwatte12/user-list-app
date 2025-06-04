import { filterUsers, sortUsers, paginateUsers, getTotalPages } from '../userUtils';
import type { User } from '../../types/user';

const mockUsers: User[] = [
  {
    name: { title: 'Mr', first: 'John', last: 'Doe' },
    email: 'john.doe@example.com',
    login: { uuid: '1' },
  } as User,
  {
    name: { title: 'Ms', first: 'Jane', last: 'Smith' },
    email: 'jane.smith@example.com',
    login: { uuid: '2' },
  } as User,
  {
    name: { title: 'Dr', first: 'Bob', last: 'Johnson' },
    email: 'bob.johnson@test.com',
    login: { uuid: '3' },
  } as User,
  {
    name: { title: 'Mrs', first: 'Alice', last: 'Brown' },
    email: 'alice.brown@example.com',
    login: { uuid: '4' },
  } as User,
];

describe('User Utility Functions', () => {
  describe('filterUsers', () => {
    test('returns all users when search term is empty', () => {
      const result = filterUsers(mockUsers, '');
      expect(result).toEqual(mockUsers);
    });

    test('returns all users when search term is only whitespace', () => {
      const result = filterUsers(mockUsers, '   ');
      expect(result).toEqual(mockUsers);
    });

    test('filters users by first name (case insensitive)', () => {
      const result = filterUsers(mockUsers, 'john');
      expect(result).toHaveLength(1);
      expect(result[0].name.first).toBe('John');
    });

    test('filters users by last name (case insensitive)', () => {
      const result = filterUsers(mockUsers, 'smith');
      expect(result).toHaveLength(1);
      expect(result[0].name.last).toBe('Smith');
    });

    test('filters users by full name', () => {
      const result = filterUsers(mockUsers, 'Jane Smith');
      expect(result).toHaveLength(1);
      expect(result[0].name.first).toBe('Jane');
    });

    test('filters users by email domain', () => {
      const result = filterUsers(mockUsers, 'example.com');
      expect(result).toHaveLength(3);
    });

    test('filters users by partial email', () => {
      const result = filterUsers(mockUsers, 'bob.johnson');
      expect(result).toHaveLength(1);
      expect(result[0].email).toBe('bob.johnson@test.com');
    });

    test('returns empty array when no matches found', () => {
      const result = filterUsers(mockUsers, 'nonexistent');
      expect(result).toHaveLength(0);
    });

    test('handles special characters in search', () => {
      const result = filterUsers(mockUsers, '@test.com');
      expect(result).toHaveLength(1);
      expect(result[0].email).toBe('bob.johnson@test.com');
    });
  });

  describe('sortUsers', () => {
    test('sorts users by name A-Z', () => {
      const result = sortUsers(mockUsers, 'name-asc');
      expect(result[0].name.first).toBe('Alice');
      expect(result[1].name.first).toBe('Bob');
      expect(result[2].name.first).toBe('Jane');
      expect(result[3].name.first).toBe('John');
    });

    test('sorts users by name Z-A', () => {
      const result = sortUsers(mockUsers, 'name-desc');
      expect(result[0].name.first).toBe('John');
      expect(result[1].name.first).toBe('Jane');
      expect(result[2].name.first).toBe('Bob');
      expect(result[3].name.first).toBe('Alice');
    });

    test('sorts users by email A-Z', () => {
      const result = sortUsers(mockUsers, 'email-asc');
      expect(result[0].email).toBe('alice.brown@example.com');
      expect(result[1].email).toBe('bob.johnson@test.com');
      expect(result[2].email).toBe('jane.smith@example.com');
      expect(result[3].email).toBe('john.doe@example.com');
    });

    test('sorts users by email Z-A', () => {
      const result = sortUsers(mockUsers, 'email-desc');
      expect(result[0].email).toBe('john.doe@example.com');
      expect(result[1].email).toBe('jane.smith@example.com');
      expect(result[2].email).toBe('bob.johnson@test.com');
      expect(result[3].email).toBe('alice.brown@example.com');
    });

    test('does not mutate original array', () => {
      const originalUsers = [...mockUsers];
      sortUsers(mockUsers, 'name-asc');
      expect(mockUsers).toEqual(originalUsers);
    });

    test('handles unknown sort option by returning users as-is', () => {
      const result = sortUsers(mockUsers, 'unknown-sort' as any);
      expect(result).toEqual(mockUsers);
    });
  });

  describe('paginateUsers', () => {
    test('returns correct slice for first page', () => {
      const result = paginateUsers(mockUsers, 1, 2);
      expect(result).toHaveLength(2);
      expect(result[0].name.first).toBe('John');
      expect(result[1].name.first).toBe('Jane');
    });

    test('returns correct slice for second page', () => {
      const result = paginateUsers(mockUsers, 2, 2);
      expect(result).toHaveLength(2);
      expect(result[0].name.first).toBe('Bob');
      expect(result[1].name.first).toBe('Alice');
    });

    test('returns remaining items on last page', () => {
      const result = paginateUsers(mockUsers, 2, 3);
      expect(result).toHaveLength(1);
      expect(result[0].name.first).toBe('Alice');
    });

    test('returns empty array for page beyond available data', () => {
      const result = paginateUsers(mockUsers, 10, 2);
      expect(result).toHaveLength(0);
    });

    test('handles single item per page', () => {
      const result = paginateUsers(mockUsers, 3, 1);
      expect(result).toHaveLength(1);
      expect(result[0].name.first).toBe('Bob');
    });
  });

  describe('getTotalPages', () => {
    test('calculates correct number of pages', () => {
      expect(getTotalPages(10, 3)).toBe(4);
      expect(getTotalPages(10, 5)).toBe(2);
      expect(getTotalPages(10, 10)).toBe(1);
    });

    test('handles exact division', () => {
      expect(getTotalPages(12, 4)).toBe(3);
    });

    test('handles zero users', () => {
      expect(getTotalPages(0, 10)).toBe(0);
    });

    test('handles single user', () => {
      expect(getTotalPages(1, 10)).toBe(1);
    });

    test('handles more users per page than total users', () => {
      expect(getTotalPages(5, 10)).toBe(1);
    });
  });

  describe('Integration Tests', () => {
    test('filter and sort work together', () => {
      const filtered = filterUsers(mockUsers, 'example.com');
      const sorted = sortUsers(filtered, 'name-asc');
      
      expect(sorted).toHaveLength(3);
      expect(sorted[0].name.first).toBe('Alice');
      expect(sorted[1].name.first).toBe('Jane');
      expect(sorted[2].name.first).toBe('John');
    });

    test('filter, sort, and paginate work together', () => {
      const filtered = filterUsers(mockUsers, 'example.com');
      const sorted = sortUsers(filtered, 'name-asc');
      const paginated = paginateUsers(sorted, 1, 2);
      
      expect(paginated).toHaveLength(2);
      expect(paginated[0].name.first).toBe('Alice');
      expect(paginated[1].name.first).toBe('Jane');
    });
  });
}); 