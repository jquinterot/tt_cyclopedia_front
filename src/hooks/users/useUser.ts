import { User } from "@/types/User";
import { apiClient } from "@/config/apiClient";
import { useQuery } from "@tanstack/react-query";

export const useUser = (userId: string) => {
  const fetchUser = async () => {
    const response = await apiClient.get<User>(`/users/${userId}`);
    return response.data;
  };

  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user", userId],
    queryFn: fetchUser,
    enabled: !!userId,
  });

  return { user, isLoading, error };
};