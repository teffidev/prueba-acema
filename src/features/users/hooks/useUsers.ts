import { useState, useMemo } from "react";
import { userService } from "../services/useServices";
import { useUsersContext } from "../../../hooks/useUsersContext";

export const useUsers = () => {
  const { users, loading, error, updateUser, deleteUser, fetchUsers } =
    useUsersContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredUsers = useMemo(() => {
    return userService.filterUsers(users, searchTerm);
  }, [users, searchTerm]);

  const paginatedUsers = useMemo(() => {
    return userService.paginateUsers(filteredUsers, currentPage, itemsPerPage);
  }, [filteredUsers, currentPage]);

  const totalPages = useMemo(() => {
    return userService.getTotalPages(filteredUsers.length, itemsPerPage);
  }, [filteredUsers.length]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  return {
    users,
    filteredUsers,
    paginatedUsers,
    loading,
    error,
    searchTerm,
    currentPage,
    totalPages,
    itemsPerPage,
    setSearchTerm: handleSearch,
    setCurrentPage,
    updateUser,
    deleteUser,
    fetchUsers,
  };
};
