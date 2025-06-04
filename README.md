# User List App

A modern, responsive React 18 application that displays a list of users fetched from the Random User API. Built with Vite, TypeScript, TailwindCSS, TanStack Query, and Jotai for state management.

## ✨ Features

- **Data Fetching**: Uses TanStack Query for efficient data fetching, caching, and error handling
- **Global State Management**: Jotai atoms for managing search, pagination, sorting, and modal state
- **Pagination**: Client-side pagination with 10 users per page
- **Live Search**: Real-time filtering by name or email (case-insensitive)
- **Sorting**: Sort users by name (A-Z, Z-A) or email (A-Z, Z-A)
- **User Details Modal**: Accessible modal with comprehensive user information
- **Dark Mode**: Toggle between light and dark themes with system preference detection
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Accessibility**: Full keyboard navigation, ARIA labels, focus management
- **Loading States**: Skeleton loading animations for better UX
- **Error Handling**: Graceful error states with retry functionality

## 🛠️ Tech Stack

- **React 18** - Latest React with concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **TanStack Query** - Server state management
- **Jotai** - Atomic state management
- **Vitest** - Fast unit testing framework
- **React Testing Library** - Testing utilities

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd user-list-app
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run test` - Run tests
- `npm run test:ui` - Run tests with UI
- `npm run test:coverage` - Run tests with coverage

## 🏗️ Project Structure

```
src/
├── api/           # API service functions
├── atoms/         # Jotai state atoms
├── components/    # React components
│   └── __tests__/ # Component tests
├── hooks/         # Custom React hooks
├── types/         # TypeScript type definitions
├── utils/         # Utility functions
└── test/          # Test setup and utilities
```

## 🎯 Key Features Explained

### Data Fetching
- Uses Random User API to fetch 100 users with a consistent seed
- TanStack Query handles caching, background refetching, and error states
- Automatic retry logic with exponential backoff

### State Management
- **Search**: Global search term stored in Jotai atom
- **Pagination**: Current page state with automatic reset on search/sort
- **Sorting**: Sort preference persisted across page changes
- **Modal**: Selected user and modal visibility state
- **Theme**: Dark mode preference with localStorage persistence

### Accessibility
- Full keyboard navigation support
- ARIA labels and roles for screen readers
- Focus trap in modal dialogs
- Semantic HTML structure
- High contrast colors in both themes

### Performance
- Memoized computations for filtering and sorting
- Lazy loading of user images
- Efficient re-renders with proper dependency arrays
- Skeleton loading states for perceived performance

## 🧪 Testing

The project includes comprehensive tests for:
- Component behavior and user interactions
- Search and filter functionality
- Accessibility features
- Loading and error states

Run tests with:
```bash
npm run test
```

## 🎨 Customization

### Styling
- Modify `tailwind.config.js` for custom design tokens
- Update `src/index.css` for global styles
- Component styles use Tailwind utility classes

### API Configuration
- Update `src/api/userApi.ts` to change API endpoints
- Modify fetch parameters in `useUsers` hook

### State Management
- Add new atoms in `src/atoms/userAtoms.ts`
- Create custom hooks in `src/hooks/` for complex state logic

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Random User API](https://randomuser.me/) for providing test user data
- [TanStack Query](https://tanstack.com/query) for excellent data fetching
- [Jotai](https://jotai.org/) for atomic state management
- [TailwindCSS](https://tailwindcss.com/) for utility-first styling
