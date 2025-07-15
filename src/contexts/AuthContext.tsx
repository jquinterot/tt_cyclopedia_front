import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import type { User } from '@/types/User';
import { SESSION_EXPIRED_EVENT, apiClient } from '@/config/apiClient';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string, user: User) => void;
  logout: () => void;
  updateToken: (token: string) => void;
  handleSessionExpiration: () => void;
  reloadPage: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken');
    const storedUser = localStorage.getItem('user');
    
    if (storedToken && storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setToken(storedToken);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        // Invalid stored data, clear it
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        localStorage.removeItem('isAuthenticated');
      }
    }
  }, []);

  // Listen for session expiration events from API client
  useEffect(() => {
    const handleSessionExpired = () => {
      // Clear state immediately
      setToken(null);
      setUser(null);
      setIsAuthenticated(false);
      
      // Clear localStorage
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      localStorage.removeItem('isAuthenticated');
      
      // Show notification to user
      toast.error('Session expired. Please log in again.');
      
      // Redirect to login if not already there
      if (window.location.pathname !== '/login') {
        navigate('/login');
      }
    };

    window.addEventListener(SESSION_EXPIRED_EVENT, handleSessionExpired);

    return () => {
      window.removeEventListener(SESSION_EXPIRED_EVENT, handleSessionExpired);
    };
  }, [navigate]);

  // Periodic token validation (every 5 minutes)
  useEffect(() => {
    if (!isAuthenticated || !token) return;

    const validateToken = async () => {
      try {
        // Make a lightweight API call to validate the token
        await apiClient.get('/auth/validate', { timeout: 5000 });
      } catch (error) {
        // If validation fails, trigger session expiration
        window.dispatchEvent(new CustomEvent(SESSION_EXPIRED_EVENT));
      }
    };

    const interval = setInterval(validateToken, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, [isAuthenticated, token]);

  const login = (newToken: string, userData: User) => {
    setToken(newToken);
    setUser(userData);
    setIsAuthenticated(true);
    
    // Store in localStorage
    localStorage.setItem('authToken', newToken);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('isAuthenticated', 'true');
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    
    // Clear localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    
    toast.success('Successfully logged out');
    navigate('/');
  };

  const handleSessionExpiration = () => {
    // Clear state immediately
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    
    // Clear localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    
    // Show notification to user
    toast.error('Session expired. Please log in again.');
    
    // Redirect to login if not already there
    if (window.location.pathname !== '/login') {
      navigate('/login');
    }
  };

  const reloadPage = () => {
    window.location.reload();
  };

  const updateToken = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem('authToken', newToken);
  };

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated,
    login,
    logout,
    updateToken,
    handleSessionExpiration,
    reloadPage,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext }; 