import React, { Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { routes, ROUTES } from '@/config/routes';
import { useAuth } from '@/contexts/AuthContext';
import LoadingSpinner from '@/components/shared/LoadingSpinner/LoadingSpinner';
import NavBar from '@/components/NavBar/NavBar';
import Footer from '@/components/Footer/Footer';

// Loading Component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">
    <LoadingSpinner />
  </div>
);

// Layout Components
const DefaultLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen flex flex-col font-sans text-white bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">
    <NavBar />
    <main className="flex-grow">
      {children}
    </main>
    <Footer />
  </div>
);

const AuthLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen flex flex-col font-sans text-white bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950">
    <main className="flex-grow flex items-center justify-center">
      {children}
    </main>
  </div>
);

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }
  
  return <>{children}</>;
};

// Route Component with Error Boundary
const RouteWithErrorBoundary = ({ 
  component: Component, 
  layout = 'default',
  requiresAuth = false 
}: { 
  component: React.ComponentType; 
  layout?: 'default' | 'auth' | 'none';
  requiresAuth?: boolean;
}) => {
  const content = (
    <Suspense fallback={<PageLoader />}>
      <Component />
    </Suspense>
  );

  const wrappedContent = requiresAuth ? (
    <ProtectedRoute>{content}</ProtectedRoute>
  ) : content;

  switch (layout) {
    case 'auth':
      return <AuthLayout>{wrappedContent}</AuthLayout>;
    case 'none':
      return wrappedContent;
    default:
      return <DefaultLayout>{wrappedContent}</DefaultLayout>;
  }
};

export const AppRouter = () => {
  return (
    <Routes data-testid="app-routes">
      {routes.map(({ path, component, layout, requiresAuth }) => (
        <Route
          key={path}
          path={path}
          element={
            <RouteWithErrorBoundary
              component={component}
              layout={layout}
              requiresAuth={requiresAuth}
            />
          }
        />
      ))}
      {/* 404 Route */}
      <Route
        path="*"
        element={
          <Navigate to={ROUTES.HOME} replace />
        }
      />
    </Routes>
  );
}; 