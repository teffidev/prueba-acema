import {
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { User } from "../types";
import { KEYS, storage } from "../utils/storage";
import { api } from "../services/api";
import { UsersContext } from "../hooks/useUsersContext";

export const UsersProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      const cachedUsers = storage.getItem<User[]>(KEYS.USERS_DATA);
      if (cachedUsers && cachedUsers.length > 0) {
        setUsers(cachedUsers);
        setLoading(false);
        return;
      }

      const response = await api.fetchUsers(100);
      setUsers(response.results);
      storage.setItem(KEYS.USERS_DATA, response.results);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
    } finally {
      setLoading(false);
    }
  };

  const updateUser = (email: string, updatedData: Partial<User["user"]>) => {
    setUsers((prevUsers) => {
      const updatedUsers = prevUsers.map((user) => {
        if (user.user.email === email) {
          return {
            ...user,
            user: {
              ...user.user,
              ...updatedData,
            },
          };
        }
        return user;
      });
      storage.setItem(KEYS.USERS_DATA, updatedUsers);
      return updatedUsers;
    });
  };

  const deleteUser = (email: string) => {
    setUsers((prevUsers) => {
      const filteredUsers = prevUsers.filter(
        (user) => user.user.email !== email,
      );
      storage.setItem(KEYS.USERS_DATA, filteredUsers);
      return filteredUsers;
    });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UsersContext.Provider
      value={{ users, loading, error, fetchUsers, updateUser, deleteUser }}>
      {children}
    </UsersContext.Provider>
  );
};

