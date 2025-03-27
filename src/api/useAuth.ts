// import axios from "axios";
import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

// Define types for authentication
interface LoginCredentials {
  email: string;
  password: string;
}

interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

interface RegisterCredentials extends LoginCredentials {
  name: string;
}

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (credentials.email && credentials.password === "123456") {
          resolve({
            token: "mock-token-123",
            user: {
              id: "1",
              email: credentials.email,
              name: "Test User",
            },
          });
        } else {
          reject("Invalid email or password");
        }
      }, 1000);
    });
  },

  // Mock Register API call
  register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          token: "mock-token-456",
          user: {
            id: "2",
            email: credentials.email,
            name: credentials.name,
          },
        });
      }, 1000);
    });
  },

  // Mock Logout API call
  logout: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve("Logged out successfully");
      }, 500);
    });
  },
};

// Authentication hooks
export const useAuth = () => {
  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      // Show success toast

      toast.success("Login successful!");
    },
    onError: () => {
      toast.error("Invalid email or password");
    },
  });

  return {
    login: loginMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    isLoggedIn: !!localStorage.getItem("token"),
  };
};
