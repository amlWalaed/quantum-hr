import { create } from "zustand";
import {
  DEFAULT_PAGE_SIZE,
  getPaginatedItems,
  getTotalPages,
} from "../utils/pagination";

interface UsersState {
  users: User[];
  filteredUsers: User[];
  searchQuery: string;
  currentPage: number;
  pageSize: number;
  setUsers: (users: User[]) => void;
  setSearchQuery: (query: string) => void;
  setCurrentPage: (page: number) => void;
  getPaginatedUsers: () => User[];
  getTotalPages: () => number;
  refreshUsers: () => Promise<void>;
}

export const useUsersStore = create<UsersState>((set, get) => ({
  users: [],
  filteredUsers: [],
  searchQuery: "",
  currentPage: 1,
  pageSize: DEFAULT_PAGE_SIZE,

  setUsers: (users: User[]) => {
    set({ users, filteredUsers: users });
  },

  setSearchQuery: (query: string) => {
    const { users } = get();
    const lowerQuery = query.toLowerCase().trim();

    const filtered = lowerQuery
      ? users.filter((user) => {
          const fullName = `${user.name.first} ${user.name.last}`.toLowerCase();
          return fullName.includes(lowerQuery);
        })
      : users;

    set({
      searchQuery: query,
      filteredUsers: filtered,
      currentPage: 1,
    });
  },

  setCurrentPage: (page: number) => {
    set({ currentPage: page });
  },

  getPaginatedUsers: () => {
    const { filteredUsers, currentPage, pageSize } = get();
    return getPaginatedItems(filteredUsers, currentPage, pageSize);
  },

  getTotalPages: () => {
    const { filteredUsers, pageSize } = get();
    return getTotalPages(filteredUsers.length, pageSize);
  },

  refreshUsers: async () => {
    set({ currentPage: 1, searchQuery: "" });
  },
}));
