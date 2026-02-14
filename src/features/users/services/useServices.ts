import type { User } from "../../../types";

export const userService = {
  filterUsers: (users: User[], searchTerm: string): User[] => {
    if (!searchTerm.trim()) {
      return users;
    }

    const term = searchTerm.toLowerCase();
    return users.filter(
      (user) =>
        user.user.name.first.toLowerCase().includes(term) ||
        user.user.name.last.toLowerCase().includes(term) ||
        user.user.email.toLowerCase().includes(term),
    );
  },

  paginateUsers: (
    users: User[],
    currentPage: number,
    itemsPerPage: number,
  ): User[] => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return users.slice(startIndex, endIndex);
  },

  getTotalPages: (totalItems: number, itemsPerPage: number): number => {
    return Math.ceil(totalItems / itemsPerPage);
  },

  getDisplayName: (user: User): string => {
    const { title, first, last } = user.user.name;
    return `${title}. ${first} ${last}`;
  },

  getLocation: (user: User): string => {
    const { city, state } = user.user.location;
    return `${city}, ${state}`;
  },
};
