import { render, screen } from '@testing-library/react';
import UserCardSkeleton from '../UserCardSkeleton';

describe('UserCardSkeleton Component', () => {
  describe('Rendering', () => {
    test('renders skeleton loading state', () => {
      render(<UserCardSkeleton />);
      
      const skeleton = screen.getByRole('status');
      expect(skeleton).toBeInTheDocument();
    });

    test('has proper accessibility attributes', () => {
      render(<UserCardSkeleton />);
      
      const skeleton = screen.getByRole('status');
      expect(skeleton).toHaveAttribute('aria-label', 'Loading user information');
    });

    test('includes screen reader text', () => {
      render(<UserCardSkeleton />);
      
      const screenReaderText = screen.getByText('Loading user information...');
      expect(screenReaderText).toBeInTheDocument();
      expect(screenReaderText).toHaveClass('sr-only');
    });
  });

  describe('Visual Structure', () => {
    test('has correct layout structure', () => {
      render(<UserCardSkeleton />);
      
      const skeleton = screen.getByRole('status');
      expect(skeleton).toHaveClass('user-card', 'p-6', 'animate-fade-in');
    });

    test('contains avatar skeleton', () => {
      render(<UserCardSkeleton />);
      
      const container = screen.getByRole('status');
      const avatarSkeleton = container.querySelector('.w-16.h-16.rounded-full');
      expect(avatarSkeleton).toBeInTheDocument();
      expect(avatarSkeleton).toHaveClass('skeleton');
    });

    test('contains text line skeletons', () => {
      render(<UserCardSkeleton />);
      
      const container = screen.getByRole('status');
      const textSkeletons = container.querySelectorAll('.skeleton');
      expect(textSkeletons.length).toBeGreaterThan(1);
    });

    test('has animation classes', () => {
      render(<UserCardSkeleton />);
      
      const container = screen.getByRole('status');
      const skeletonElements = container.querySelectorAll('.skeleton');
      
      skeletonElements.forEach(element => {
        expect(element).toHaveClass('animate-pulse');
      });
    });
  });

  describe('Multiple Skeletons', () => {
    test('renders multiple skeletons independently', () => {
      render(
        <div>
          <UserCardSkeleton />
          <UserCardSkeleton />
          <UserCardSkeleton />
        </div>
      );
      
      const skeletons = screen.getAllByRole('status');
      expect(skeletons).toHaveLength(3);
      
      skeletons.forEach(skeleton => {
        expect(skeleton).toHaveAttribute('aria-label', 'Loading user information');
      });
    });
  });

  describe('Accessibility', () => {
    test('provides appropriate loading feedback for screen readers', () => {
      render(<UserCardSkeleton />);
      
      const loadingText = screen.getByText('Loading user information...');
      expect(loadingText).toBeInTheDocument();
      
      expect(loadingText).toHaveClass('sr-only');
    });

    test('uses semantic role for loading status', () => {
      render(<UserCardSkeleton />);
      
      const skeleton = screen.getByRole('status');
      expect(skeleton).toBeInTheDocument();
    });
  });
}); 