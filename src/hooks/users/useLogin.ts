import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/config/apiClient';
import { User } from '@/types/User';

export interface LoginPayload {
  username: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  access_token: string; // Backend returns access_token
}

export const useLogin = () => {
  return useMutation<LoginResponse, unknown, LoginPayload>({
    mutationFn: async (payload: LoginPayload) => {
      const response = await apiClient.post<LoginResponse>('/users/login', payload);
      return response.data;
    },
  });
}; 