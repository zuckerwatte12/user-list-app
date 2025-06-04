import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider as JotaiProvider } from 'jotai';
import { useSetAtom } from 'jotai';
import UserModal from '../UserModal';
import { selectedUserAtom, isModalOpenAtom } from '../../atoms/userAtoms';
import type { User } from '../../types/user';

const mockUser: User = {
  gender: 'male',
  name: {
    title: 'Mr',
    first: 'John',
    last: 'Doe'
  },
  location: {
    street: {
      number: 123,
      name: 'Main St'
    },
    city: 'Anytown',
    state: 'CA',
    country: 'United States',
    postcode: '12345',
    coordinates: {
      latitude: '40.7128',
      longitude: '-74.0060'
    },
    timezone: {
      offset: '-5:00',
      description: 'Eastern Standard Time'
    }
  },
  email: 'john.doe@example.com',
  login: {
    uuid: 'test-uuid',
    username: 'johndoe',
    password: 'password',
    salt: 'salt',
    md5: 'md5hash',
    sha1: 'sha1hash',
    sha256: 'sha256hash'
  },
  dob: {
    date: '1990-01-01T00:00:00Z',
    age: 33
  },
  registered: {
    date: '2020-01-01T00:00:00Z',
    age: 3
  },
  phone: '(555) 123-4567',
  cell: '(555) 987-6543',
  id: {
    name: 'SSN',
    value: '123-45-6789'
  },
  picture: {
    large: 'https://randomuser.me/api/portraits/men/1.jpg',
    medium: 'https://randomuser.me/api/portraits/med/men/1.jpg',
    thumbnail: 'https://randomuser.me/api/portraits/thumb/men/1.jpg'
  },
  nat: 'US'
};

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  return <JotaiProvider>{children}</JotaiProvider>;
};

const ModalController = () => {
  const setSelectedUser = useSetAtom(selectedUserAtom);
  const setIsModalOpen = useSetAtom(isModalOpenAtom);

  return (
    <div>
      <button 
        onClick={() => {
          setSelectedUser(mockUser);
          setIsModalOpen(true);
        }}
        data-testid="open-modal"
      >
        Open Modal
      </button>
      <UserModal />
    </div>
  );
};

describe('UserModal Component', () => {
  describe('Modal Visibility', () => {
    test('does not render when modal is closed', () => {
      render(
        <TestWrapper>
          <UserModal />
        </TestWrapper>
      );

      const modal = screen.queryByRole('dialog');
      expect(modal).not.toBeInTheDocument();
    });

    test('renders when modal is open with user data', async () => {
      const user = userEvent.setup();
      
      render(
        <TestWrapper>
          <ModalController />
        </TestWrapper>
      );

      await user.click(screen.getByTestId('open-modal'));
      
      const modal = screen.getByRole('dialog');
      expect(modal).toBeInTheDocument();
      expect(screen.getByText('John Doe')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    beforeEach(async () => {
      const user = userEvent.setup();
      render(
        <TestWrapper>
          <ModalController />
        </TestWrapper>
      );
      await user.click(screen.getByTestId('open-modal'));
    });

    test('has proper ARIA attributes', () => {
      const modal = screen.getByRole('dialog');
      expect(modal).toHaveAttribute('aria-modal', 'true');
      expect(modal).toHaveAttribute('aria-labelledby', 'modal-title');
    });

    test('has accessible title', () => {
      const title = screen.getByRole('heading', { name: 'User Details' });
      expect(title).toBeInTheDocument();
      expect(title).toHaveAttribute('id', 'modal-title');
    });

    test('focuses close button on open', () => {
      const closeButton = screen.getByLabelText('Close modal');
      expect(closeButton).toHaveFocus();
    });

    test('traps focus within modal', async () => {
      const user = userEvent.setup();
      const closeButton = screen.getByLabelText('Close modal');
      const modalCloseButton = screen.getByRole('button', { name: 'Close' });

      await user.tab();
      expect(modalCloseButton).toHaveFocus();
      
      await user.tab();
      expect(closeButton).toHaveFocus();
    });

    test('closes on Escape key', async () => {
      const user = userEvent.setup();
      
      await user.keyboard('{Escape}');
      
      const modal = screen.queryByRole('dialog');
      expect(modal).not.toBeInTheDocument();
    });

    test('closes when clicking overlay', async () => {
      const user = userEvent.setup();
      const modal = screen.getByRole('dialog');
      const overlay = modal.parentElement!;
      
      await user.click(overlay);
      
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    test('does not close when clicking modal content', async () => {
      const user = userEvent.setup();
      const modal = screen.getByRole('dialog');
      
      await user.click(modal);
      
      expect(screen.getByRole('dialog')).toBeInTheDocument();
    });
  });

  describe('User Information Display', () => {
    beforeEach(async () => {
      const user = userEvent.setup();
      render(
        <TestWrapper>
          <ModalController />
        </TestWrapper>
      );
      await user.click(screen.getByTestId('open-modal'));
    });

    test('displays user profile information', () => {
      expect(screen.getByText('John Doe')).toBeInTheDocument();
      expect(screen.getByText('john.doe@example.com')).toBeInTheDocument();
      expect(screen.getByText('33 years old')).toBeInTheDocument();
    });

    test('displays contact information', () => {
      expect(screen.getByText('(555) 123-4567')).toBeInTheDocument();
      expect(screen.getByText('(555) 987-6543')).toBeInTheDocument();
    });

    test('displays address information', () => {
      expect(screen.getByText('123 Main St')).toBeInTheDocument();
      expect(screen.getByText('Anytown')).toBeInTheDocument();
      expect(screen.getByText('CA')).toBeInTheDocument();
      expect(screen.getByText('United States')).toBeInTheDocument();
    });

    test('displays account information', () => {
      expect(screen.getByText('johndoe')).toBeInTheDocument();
      expect(screen.getByText('SSN: 123-45-6789')).toBeInTheDocument();
    });

    test('displays user image with alt text', () => {
      const userImage = screen.getByAltText("John Doe's profile picture");
      expect(userImage).toBeInTheDocument();
      expect(userImage).toHaveAttribute('src', mockUser.picture.large);
    });
  });

  describe('Modal Interactions', () => {
    test('closes modal when close button is clicked', async () => {
      const user = userEvent.setup();
      render(
        <TestWrapper>
          <ModalController />
        </TestWrapper>
      );

      await user.click(screen.getByTestId('open-modal'));
      expect(screen.getByRole('dialog')).toBeInTheDocument();

      await user.click(screen.getByLabelText('Close modal'));
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    test('closes modal when footer close button is clicked', async () => {
      const user = userEvent.setup();
      render(
        <TestWrapper>
          <ModalController />
        </TestWrapper>
      );

      await user.click(screen.getByTestId('open-modal'));
      expect(screen.getByRole('dialog')).toBeInTheDocument();

      await user.click(screen.getByRole('button', { name: 'Close' }));
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });
  });

  describe('Responsive Design', () => {
    test('modal adapts to different screen sizes', async () => {
      const user = userEvent.setup();
      render(
        <TestWrapper>
          <ModalController />
        </TestWrapper>
      );

      await user.click(screen.getByTestId('open-modal'));
      
      const modal = screen.getByRole('dialog');
      expect(modal).toHaveClass('max-w-2xl', 'w-full', 'mx-4');
    });
  });
}); 