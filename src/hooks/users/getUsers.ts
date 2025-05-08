import { User } from "../../types/User";
import { apiClient } from "../../config/apiClient";
import { useQuery } from "@tanstack/react-query";

export const getUsers = () => {
  const fetchUsers = async () => {
    const response = await apiClient.get<User[]>("/users");
    return response.data;
  };

  const {
    data: users,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  return { users, isLoading, error };
};
