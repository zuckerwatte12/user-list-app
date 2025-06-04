import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ErrorMessage from '../ErrorMessage';

describe('ErrorMessage Component', () => {
  describe('Error Display', () => {
    test('does not render when no error is provided', () => {
      render(<ErrorMessage error={null} />);
      
      const errorMessage = screen.queryByText('Something went wrong');
      expect(errorMessage).not.toBeInTheDocument();
    });

    test('renders error message when error is provided', () => {
      const testError = new Error('Test error message');
      render(<ErrorMessage error={testError} />);
      
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
      expect(screen.getByText('Test error message')).toBeInTheDocument();
    });

    test('renders default message when error has no message', () => {
      const testError = new Error();
      render(<ErrorMessage error={testError} />);
      
      expect(screen.getByText('An unexpected error occurred while loading the data.')).toBeInTheDocument();
    });

    test('renders error icon', () => {
      const testError = new Error('Test error');
      render(<ErrorMessage error={testError} />);
      
      const errorIcon = screen.getByRole('img', { hidden: true });
      expect(errorIcon).toBeInTheDocument();
    });
  });

  describe('Retry Functionality', () => {
    test('does not show retry button when onRetry is not provided', () => {
      const testError = new Error('Test error');
      render(<ErrorMessage error={testError} />);
      
      const retryButton = screen.queryByText('Try Again');
      expect(retryButton).not.toBeInTheDocument();
    });

    test('shows retry button when onRetry is provided', () => {
      const testError = new Error('Test error');
      const mockRetry = vi.fn();
      render(<ErrorMessage error={testError} onRetry={mockRetry} />);
      
      const retryButton = screen.getByText('Try Again');
      expect(retryButton).toBeInTheDocument();
    });

    test('calls onRetry when retry button is clicked', async () => {
      const user = userEvent.setup();
      const testError = new Error('Test error');
      const mockRetry = vi.fn();
      render(<ErrorMessage error={testError} onRetry={mockRetry} />);
      
      const retryButton = screen.getByText('Try Again');
      await user.click(retryButton);
      
      expect(mockRetry).toHaveBeenCalledTimes(1);
    });
  });

  describe('Accessibility', () => {
    test('retry button has proper accessibility attributes', () => {
      const testError = new Error('Test error');
      const mockRetry = vi.fn();
      render(<ErrorMessage error={testError} onRetry={mockRetry} />);
      
      const retryButton = screen.getByLabelText('Retry loading data');
      expect(retryButton).toBeInTheDocument();
      expect(retryButton).toHaveAttribute('aria-label', 'Retry loading data');
    });

    test('retry button is keyboard accessible', async () => {
      const user = userEvent.setup();
      const testError = new Error('Test error');
      const mockRetry = vi.fn();
      render(<ErrorMessage error={testError} onRetry={mockRetry} />);
      
      const retryButton = screen.getByText('Try Again');
      retryButton.focus();
      expect(retryButton).toHaveFocus();
      
      await user.keyboard('{Enter}');
      expect(mockRetry).toHaveBeenCalledTimes(1);
    });
  });

  describe('Visual Elements', () => {
    test('has proper styling classes', () => {
      const testError = new Error('Test error');
      render(<ErrorMessage error={testError} />);
      
      const container = screen.getByText('Something went wrong').closest('div');
      expect(container).toHaveClass('bg-red-50', 'border-red-200', 'rounded-lg');
    });

    test('displays retry icon when retry button is present', () => {
      const testError = new Error('Test error');
      const mockRetry = vi.fn();
      render(<ErrorMessage error={testError} onRetry={mockRetry} />);
      
      const retryIcon = screen.getAllByRole('img', { hidden: true });
      expect(retryIcon).toHaveLength(2); // Error icon + retry icon
    });
  });
}); 