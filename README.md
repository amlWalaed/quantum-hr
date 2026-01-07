# Quantum HR - User Dashboard Application

A professional frontend web application built with React that demonstrates common real-world frontend skills including data fetching, state management, pagination, searching, authentication flow (mocked), and form validation.

## 🚀 Features

### Core Functionality

- **Mock Authentication**
  - Login screen with email/password validation
  - Credentials: `q@quantum.io` / `qTask123#`
  - Loading and error states
  - Token storage with Zustand and localStorage persistence

- **User List Dashboard**
  - Display users with full name, email, city, and country
  - Card-based layout (responsive grid)
  - Material UI components for professional UI

- **Client-Side Pagination**
  - Fetch all users once from API
  - 10 users per page
  - Pagination controls with first/last buttons

- **Search/Filter**
  - Case-insensitive search by name
  - Real-time filtering
  - Works seamlessly with pagination
  - Resets to page 1 when search changes

- **User Details Modal**
  - Detailed user information display
  - Shows: name, email, phone, full address, profile picture
  - Accessible and dismissible modal overlay

- **Edit Own Profile**
  - Profile page with editable fields
  - Fields: name, phone, job title, years of experience, address, working hours
  - Form validation with React Hook Form + Zod
  - Mocked save functionality with loading/success feedback

### State Management

- **Zustand** for global state management
  - Authentication state (token, user, profile fields)
  - Users data, search, and pagination state
  - Persistent storage for authentication

- **React Query** for data fetching
  - User data fetching and caching
  - Optimistic updates
  - Error handling

## 🛠️ Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **TanStack Router** - Type-safe routing with file-based routing support
- **Zustand** - Lightweight state management
- **React Query (TanStack Query)** - Data fetching and caching
- **Material UI (MUI)** - UI component library
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Axios** - HTTP client

## 📦 Installation

### Prerequisites

- Node.js (v18 or higher recommended)
- npm, yarn, pnpm, or bun

### Setup Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd quantum-hr
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   - Navigate to `http://localhost:5173` (or the port shown in terminal)

## 🏃 Running the Application

### Development Mode

```bash
npm run dev
```

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Linting

```bash
npm run lint
```

## 🔐 Authentication

The application uses **mocked authentication** (no backend required).

### Login Credentials

- **Email:** `q@quantum.io`
- **Password:** `qTask123#`

### Authentication Flow

1. User enters credentials on login page
2. Form validation using Zod schema
3. Mock authentication service validates credentials
4. On success:
   - Token stored in Zustand store
   - User data persisted to localStorage
   - Redirect to dashboard
5. On failure:
   - Error message displayed
   - User remains on login page

### Protected Routes

- Routes are protected using route guards
- Unauthenticated users are redirected to `/login`
- Authenticated users cannot access `/login` (redirected to dashboard)

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── UserCard.tsx    # Individual user card component
│   ├── UserList.tsx    # User list with loading states
│   └── UserDetailsModal.tsx  # User details modal
├── guards/              # Route protection guards
│   ├── ProtectedRouteGuard.ts
│   └── GuestRouteGuard.ts
├── layouts/             # Layout components
│   ├── AuthLayout.tsx   # Authenticated layout with navbar
│   ├── GuestLayout.tsx  # Guest layout (login)
│   ├── RootLayout.tsx   # Root layout
│   └── partials/
│       └── Navbar.tsx   # Navigation bar
├── pages/               # Page components
│   ├── Dashboard.tsx    # User dashboard
│   ├── Login.tsx        # Login page
│   └── Profile.tsx      # Profile editing page
├── services/            # API and mock services
│   ├── mockLogin.ts     # Mock authentication
│   ├── mockProfile.ts   # Mock profile update
│   └── usersApi.ts      # Users API (Random User API)
├── stores/              # Zustand stores
│   ├── authStore.ts     # Authentication state
│   └── usersStore.ts    # Users, search, pagination state
├── theme/               # Material UI theme
│   └── theme.ts
├── types/               # TypeScript type definitions
│   └── model.d.ts
├── utils/               # Utility functions
│   └── pagination.ts    # Pagination helpers
├── router.tsx           # TanStack Router configuration
└── main.tsx            # Application entry point
```

## 🎨 UI/UX Features

- **Responsive Design**
  - Mobile-first approach
  - Responsive grid layout for user cards
  - Mobile drawer navigation
  - Adaptive layouts for different screen sizes

- **Loading States**
  - Skeleton loaders for user cards
  - Loading spinners for form submissions
  - Smooth transitions

- **Error Handling**
  - User-friendly error messages
  - Form validation feedback
  - API error handling with React Query

- **Accessibility**
  - Semantic HTML
  - Keyboard navigation support
  - ARIA labels where appropriate
  - Focus management

## 🔍 Search & Pagination

### Search Functionality

- **Case-insensitive** search by user name
- Real-time filtering as you type
- Automatically resets to page 1 when search changes
- Shows filtered count vs total users

### Pagination

- **10 users per page** (configurable via `DEFAULT_PAGE_SIZE`)
- Client-side pagination (all users fetched once)
- Pagination controls:
  - First/Previous/Next/Last buttons
  - Page numbers
  - Shows current page and total pages

## 📝 Assumptions & Decisions

### Technical Decisions

1. **State Management: Zustand over Redux**
   - Chosen for simplicity and minimal boilerplate
   - Better TypeScript support
   - Easier to learn and maintain
   - Sufficient for application scope

2. **Routing: TanStack Router**
   - Type-safe routing with excellent TypeScript support
   - File-based routing support (though code-based used here)
   - Built-in data loading and caching
   - Better developer experience

3. **Data Fetching: React Query**
   - Handles caching, refetching, and error states automatically
   - Works seamlessly with TanStack Router
   - Reduces boilerplate code
   - Built-in loading and error states

4. **Form Handling: React Hook Form + Zod**
   - React Hook Form for performance (uncontrolled components)
   - Zod for runtime validation and TypeScript type inference
   - Better than native HTML5 validation
   - Excellent developer experience

5. **UI Library: Material UI**
   - Comprehensive component library
   - Consistent design system
   - Good accessibility support
   - Customizable theme

6. **Build Tool: Vite over Create React App**
   - Faster development server
   - Better build performance
   - Modern tooling
   - Better TypeScript support

### Design Decisions

1. **Card-based Layout vs Table**
   - More visually appealing
   - Better for mobile responsiveness
   - Easier to add interactions (hover effects)
   - Modern UI pattern

2. **Client-side Pagination**
   - All users fetched once (50 users from API)
   - Faster navigation between pages
   - No additional API calls needed
   - Suitable for moderate dataset sizes

3. **Persistent Authentication**
   - Authentication state persisted in localStorage
   - Users remain logged in after page refresh
   - Better user experience

4. **Mocked Services**
   - No backend required for demonstration
   - Easy to test and develop
   - Can be easily replaced with real API calls

### Assumptions

1. **User Data Source**
   - Using Random User API (`https://randomuser.me/api/?results=50`)
   - Assumes API is available and returns consistent data structure
   - No error handling for API unavailability (would add in production)

2. **Authentication**
   - Single hardcoded user for demonstration
   - In production, would integrate with real authentication service
   - Token format is simplified (just a string)

3. **Profile Data**
   - Profile fields stored in Zustand store
   - Persisted to localStorage
   - In production, would sync with backend

4. **Browser Support**
   - Modern browsers (Chrome, Firefox, Safari, Edge)
   - ES6+ features assumed
   - LocalStorage support required

## ✨ Bonus Features Implemented

1. ✅ **TypeScript Support**
   - Full TypeScript implementation
   - Type-safe routing with TanStack Router
   - Type-safe state management
   - Type-safe API calls

2. ✅ **Persist Authentication State**
   - Authentication state persisted in localStorage
   - Users remain logged in after page refresh
   - Automatic rehydration on app load

3. ✅ **Refresh Users Button**
   - Button to manually refresh user list
   - Clears search and resets pagination
   - Refetches data from API

4. ✅ **Vite Instead of CRA**
   - Modern build tool
   - Faster development experience
   - Better performance

5. ✅ **Card-based UI**
   - User cards instead of table layout
   - More visually appealing
   - Better mobile experience
   - Hover effects and transitions

6. ✅ **Skeleton Loading States**
   - Skeleton loaders for user cards
   - Better perceived performance
   - Professional loading experience

7. ✅ **Responsive Navigation**
   - Mobile drawer menu
   - Desktop horizontal navigation
   - Active route highlighting
   - Smooth transitions

8. ✅ **Form Validation**
   - Comprehensive form validation with Zod
   - Real-time error messages
   - Success feedback after save

9. ✅ **Code Organization**
   - Modular component structure
   - Separated concerns (components, stores, services)
   - Reusable utilities
   - Clean file organization

## 🧪 Testing

Currently, the application does not include unit tests. In a production environment, you would add:

- Unit tests for components (React Testing Library)
- Integration tests for user flows
- E2E tests for critical paths

## 📄 License

This project is for demonstration purposes.

## 👤 Author

All rights reserved by Aml walaed &copy; 2026

## 🤝 Contributing

This is a demonstration project. For production use, consider:

- Adding unit and integration tests
- Implementing real backend API integration
- Adding error boundaries
- Implementing proper error logging
- Adding analytics
- Performance optimizations
- Accessibility improvements
