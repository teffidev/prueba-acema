import { useState, type ReactNode } from "react";
import type { LoginCredentials, User } from "../types";
import { KEYS, storage } from "../utils/storage";
import { authService } from "../features/auth/services/authServices";
import { useUsersContext } from "../hooks/useUsersContext";
import { AuthContext } from "../hooks/useAuth";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedUser = storage.getItem<User>(KEYS.AUTH_USER);
    return !!storedUser;
  });

  const [user, setUser] = useState<User | null>(() => {
    return storage.getItem<User>(KEYS.AUTH_USER);
  });

  const { users } = useUsersContext();

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    const validation = authService.validateCredentials(credentials);
    if (!validation.isValid) {
      return false;
    }

    const authenticatedUser = authService.authenticate(credentials, users);

    if (authenticatedUser) {
      setUser(authenticatedUser);
      setIsAuthenticated(true);
      storage.setItem(KEYS.AUTH_USER, authenticatedUser);
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    storage.removeItem(KEYS.AUTH_USER);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
