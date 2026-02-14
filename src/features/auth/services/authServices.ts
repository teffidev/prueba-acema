import type { LoginCredentials, User } from "../../../types";


export const authService = {
  authenticate: (credentials: LoginCredentials, users: User[]): User | null => {
    const user = users.find(
      (u) =>
        u.user.email === credentials.email &&
        u.user.password === credentials.password,
    );

    return user || null;
  },

  validateCredentials: (
    credentials: LoginCredentials,
  ): {
    isValid: boolean;
    errors: { email?: string; password?: string };
  } => {
    const errors: { email?: string; password?: string } = {};

    if (!credentials.email) {
      errors.email = "El email es requerido";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(credentials.email)) {
      errors.email = "El formato del email es inválido";
    }

    if (!credentials.password) {
      errors.password = "La contraseña es requerida";
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  },
};
