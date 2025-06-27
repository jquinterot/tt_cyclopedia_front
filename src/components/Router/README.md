# Routing System Documentation

## Overview

This project uses a centralized routing system with path aliases for better maintainability and scalability.

## Path Aliases

The following path aliases are configured:

- `@/` → `src/`
- `@components/` → `src/components/`
- `@pages/` → `src/pages/`
- `@hooks/` → `src/hooks/`
- `@contexts/` → `src/contexts/`
- `@types/` → `src/types/`
- `@config/` → `src/config/`
- `@assets/` → `src/assets/`

## Usage Examples

### Importing with Path Aliases

```typescript
// Before
import NavBar from "../../components/NavBar/NavBar";
import { useUser } from "../../hooks/users/useUser";

// After
import NavBar from "@components/NavBar/NavBar";
import { useUser } from "@hooks/users/useUser";
```

### Using the Navigation Hook

```typescript
import { useNavigation } from "@/hooks/useNavigation";

function MyComponent() {
  const { goToHome, goToPost, goToCreatePost, isCurrentRoute } = useNavigation();

  return (
    <div>
      <button onClick={goToHome}>Go Home</button>
      <button onClick={() => goToPost("123")}>View Post 123</button>
      <button onClick={goToCreatePost}>Create Post</button>
      
      {isCurrentRoute("HOME") && <p>You're on the home page</p>}
    </div>
  );
}
```

### Adding New Routes

1. Update `src/config/routes.ts`:
```typescript
export const ROUTES = {
  // ... existing routes
  NEW_ROUTE: '/new-route',
} as const;

export const routes: RouteConfig[] = [
  // ... existing routes
  {
    path: ROUTES.NEW_ROUTE,
    component: lazy(() => import('@pages/NewPage/NewPage')),
    title: 'New Page',
    layout: 'default',
    requiresAuth: false, // or true for protected routes
  },
];
```

2. Add navigation function to `useNavigation` hook:
```typescript
const goToNewRoute = () => navigate(ROUTES.NEW_ROUTE);
```

## Route Configuration

Each route can have the following properties:

- `path`: The URL path
- `component`: The React component to render
- `title`: Page title (optional)
- `requiresAuth`: Whether authentication is required (optional)
- `layout`: Layout type - 'default', 'auth', or 'none' (optional)

## Layouts

- **default**: Includes NavBar and Footer
- **auth**: Centered layout for login/signup pages
- **none**: No layout wrapper

## Benefits

1. **Centralized Configuration**: All routes defined in one place
2. **Type Safety**: TypeScript support for route paths
3. **Lazy Loading**: Components are loaded only when needed
4. **Path Aliases**: Cleaner imports with `@/` syntax
5. **Route Protection**: Built-in authentication checks
6. **Error Boundaries**: Automatic error handling
7. **Loading States**: Built-in loading spinners 