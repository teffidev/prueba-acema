export interface User {
  user: {
    gender: string;
    name: {
      title: string;
      first: string;
      last: string;
    };
    location: {
      street: string;
      city: string;
      state: string;
      zip: string;
    };
    email: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
    registered: number;
    dob: number;
    phone: string;
    cell: string;
    DNI: string;
    picture: {
      large: string;
      medium: string;
      thumbnail: string;
    };
  };
  seed: string;
}

export interface ApiResponse {
  results: User[];
  nationality: string;
  seed: string;
  version: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
}

export interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
  fetchUsers: () => Promise<void>;
  updateUser: (email: string, updatedUser: Partial<User["user"]>) => void;
  deleteUser: (email: string) => void;
}

export interface FilterOptions {
  searchTerm: string;
}

export interface PaginationOptions {
  currentPage: number;
  itemsPerPage: number;
}
