import { createContext, useContext } from "react";
import type { UsersState } from "../types";

export const UsersContext = createContext<UsersState | undefined>(undefined);

export const useUsersContext = () => {
  const context = useContext(UsersContext);
  if (context === undefined) {
    throw new Error("useUsersContext must be used within a UsersProvider");
  }
  return context;
};
