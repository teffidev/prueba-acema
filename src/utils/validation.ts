export const validation = {
  isValidEmail: (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  isRequired: (value: string): boolean => {
    return value.trim().length > 0;
  },

  isValidPhone: (phone: string): boolean => {
    const phoneRegex =
      /^(\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?$/;
    return phoneRegex.test(phone) && phone.replace(/\D/g, "").length >= 10;
  },

  getErrorMessage: (field: string, value: string): string => {
    if (!validation.isRequired(value)) {
      return `${field} es requerido`;
    }

    if (field === "email" && !validation.isValidEmail(value)) {
      return "Email inválido";
    }

    if (field === "phone" && !validation.isValidPhone(value)) {
      return "Teléfono inválido";
    }

    return "";
  },
};
