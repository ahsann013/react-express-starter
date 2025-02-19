import api from "./api";

// Define types for responses
interface LoginResponse {
  token: string;
}

interface UserData {
  username: string;
  password: string;
}

// Authentication Service
const authService = {
  login: async (data: UserData): Promise<LoginResponse> => {
    const response = await api.post("/auth/login", data);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await api.post("/auth/logout");
  },

  getProfile: async () => {
    const response = await api.get("/auth/profile");
    return response.data;
  },
};

export default authService;
