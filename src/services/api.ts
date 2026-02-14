import type { ApiResponse } from "../types";


const API_BASE_URL = "https://randomuser.me/api/0.8";

export const api = {
  fetchUsers: async (results: number = 100): Promise<ApiResponse> => {
    try {
      const response = await fetch(`${API_BASE_URL}/?results=${results}`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApiResponse = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw new Error("Error al cargar usuarios. Por favor, intenta de nuevo.");
    }
  },
};
