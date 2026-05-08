import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import type { User } from "@/types/User";
import { SESSION_EXPIRED_EVENT, apiClient } from "@/config/apiClient";

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

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

const clearAuthData = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("user");
  localStorage.removeItem("isAuthenticated");
};

const setAuthData = (token: string, user: User) => {
  localStorage.setItem("authToken", token);
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("isAuthenticated", "true");
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    clearAuthData();
    toast.success("Successfully logged out");
    navigate("/");
  }, [navigate]);

  const handleSessionExpired = useCallback(() => {
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    clearAuthData();
    toast.error("Session expired. Please log in again.");
    if (window.location.pathname !== "/login") {
      navigate("/login");
    }
  }, [navigate]);

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      try {
        const userData = JSON.parse(storedUser);
        setToken(storedToken);
        setUser(userData);
        setIsAuthenticated(true);
      } catch (error) {
        clearAuthData();
      }
    }
  }, []);

  // Listen for session expiration events from API client
  useEffect(() => {
    window.addEventListener(SESSION_EXPIRED_EVENT, handleSessionExpired);
    return () => {
      window.removeEventListener(SESSION_EXPIRED_EVENT, handleSessionExpired);
    };
  }, [handleSessionExpired]);

  // Periodic token validation (every 5 minutes)
  useEffect(() => {
    if (!isAuthenticated || !token) return;

    const validateToken = async () => {
      try {
        await apiClient.get("/auth/validate", { timeout: 5000 });
      } catch (error) {
        window.dispatchEvent(new CustomEvent(SESSION_EXPIRED_EVENT));
      }
    };

    const interval = setInterval(validateToken, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [isAuthenticated, token]);

  const login = (newToken: string, userData: User) => {
    setToken(newToken);
    setUser(userData);
    setIsAuthenticated(true);
    setAuthData(newToken, userData);
  };

  const logout = () => {
    handleLogout();
  };

  const handleSessionExpiration = () => {
    handleSessionExpired();
  };

  const updateToken = (newToken: string) => {
    setToken(newToken);
    localStorage.setItem("authToken", newToken);
  };

  const reloadPage = () => {
    window.location.reload();
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

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthContext };
