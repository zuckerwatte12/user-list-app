import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider as JotaiProvider } from 'jotai';
import { useAtom } from 'jotai';
import SearchBar from '../SearchBar';
import { searchTermAtom } from '../../atoms/userAtoms';

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  return <JotaiProvider>{children}</JotaiProvider>;
};

const SearchTermDisplay = () => {
  const [searchTerm] = useAtom(searchTermAtom);
  return <div data-testid="search-term">{searchTerm}</div>;
};

describe('SearchBar Component', () => {
  beforeEach(() => {
    render(
      <TestWrapper>
        <SearchBar />
        <SearchTermDisplay />
      </TestWrapper>
    );
  });

  describe('Rendering', () => {
    test('renders search input with correct placeholder', () => {
      const searchInput = screen.getByPlaceholderText('Search by name or email...');
      expect(searchInput).toBeInTheDocument();
      expect(searchInput).toHaveAttribute('type', 'text');
    });

    test('renders search icon', () => {
      const searchIcon = screen.getByRole('img', { hidden: true });
      expect(searchIcon).toBeInTheDocument();
    });

    test('does not show clear button initially', () => {
      const clearButton = screen.queryByLabelText('Clear search');
      expect(clearButton).not.toBeInTheDocument();
    });
  });

  describe('User Interactions', () => {
    test('updates search term when user types', async () => {
      const user = userEvent.setup();
      const searchInput = screen.getByPlaceholderText('Search by name or email...');
      
      await user.type(searchInput, 'john');
      
      expect(screen.getByTestId('search-term')).toHaveTextContent('john');
      expect(searchInput).toHaveValue('john');
    });

    test('shows clear button when search term exists', async () => {
      const user = userEvent.setup();
      const searchInput = screen.getByPlaceholderText('Search by name or email...');
      
      await user.type(searchInput, 'test');
      
      const clearButton = screen.getByLabelText('Clear search');
      expect(clearButton).toBeInTheDocument();
    });

    test('clears search term when clear button is clicked', async () => {
      const user = userEvent.setup();
      const searchInput = screen.getByPlaceholderText('Search by name or email...');
      

      await user.type(searchInput, 'test search');
      expect(screen.getByTestId('search-term')).toHaveTextContent('test search');
      
      const clearButton = screen.getByLabelText('Clear search');
      await user.click(clearButton);
      
      expect(screen.getByTestId('search-term')).toHaveTextContent('');
      expect(searchInput).toHaveValue('');
    });

    test('hides clear button after clearing search', async () => {
      const user = userEvent.setup();
      const searchInput = screen.getByPlaceholderText('Search by name or email...');
      
      await user.type(searchInput, 'test');
      const clearButton = screen.getByLabelText('Clear search');
      await user.click(clearButton);
      
      expect(screen.queryByLabelText('Clear search')).not.toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    test('has proper accessibility attributes', () => {
      const searchInput = screen.getByLabelText('Search users by name or email');
      expect(searchInput).toBeInTheDocument();
      expect(searchInput).toHaveAttribute('aria-label', 'Search users by name or email');
    });

    test('search input is focusable', () => {
      const searchInput = screen.getByPlaceholderText('Search by name or email...');
      searchInput.focus();
      expect(searchInput).toHaveFocus();
    });

    test('clear button is accessible when visible', async () => {
      const user = userEvent.setup();
      const searchInput = screen.getByPlaceholderText('Search by name or email...');
      
      await user.type(searchInput, 'test');
      
      const clearButton = screen.getByLabelText('Clear search');
      expect(clearButton).toBeInTheDocument();
      expect(clearButton).toHaveAttribute('aria-label', 'Clear search');
    });

    test('clear button is keyboard accessible', async () => {
      const user = userEvent.setup();
      const searchInput = screen.getByPlaceholderText('Search by name or email...');
      
      await user.type(searchInput, 'test');
      
      const clearButton = screen.getByLabelText('Clear search');
      clearButton.focus();
      expect(clearButton).toHaveFocus();
      
      await user.keyboard('{Enter}');
      expect(screen.getByTestId('search-term')).toHaveTextContent('');
    });
  });

  describe('Edge Cases', () => {
    test('handles rapid typing', async () => {
      const user = userEvent.setup();
      const searchInput = screen.getByPlaceholderText('Search by name or email...');
      
      await user.type(searchInput, 'abcdefghijklmnop');
      
      expect(screen.getByTestId('search-term')).toHaveTextContent('abcdefghijklmnop');
    });

    test('handles special characters', async () => {
      const user = userEvent.setup();
      const searchInput = screen.getByPlaceholderText('Search by name or email...');
      
      await user.type(searchInput, 'test@example.com');
      
      expect(screen.getByTestId('search-term')).toHaveTextContent('test@example.com');
    });

    test('handles backspace and deletion', async () => {
      const user = userEvent.setup();
      const searchInput = screen.getByPlaceholderText('Search by name or email...');
      
      await user.type(searchInput, 'testing');
      await user.keyboard('{Backspace}{Backspace}{Backspace}');
      
      expect(screen.getByTestId('search-term')).toHaveTextContent('test');
    });
  });
}); 