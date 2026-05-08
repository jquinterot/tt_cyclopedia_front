import { apiClient } from "@/config/apiClient";
import { Post } from "@/types/Post";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";

export const usePostsByEquipment = (equipmentId: string) => {
  const { isAuthenticated } = useAuth();

  const fetchPosts = async () => {
    const response = await apiClient.get<Post[]>(
      `/posts?equipment_id=${equipmentId}`,
    );
    return response.data.map((post) => ({
      ...post,
      likedByCurrentUser: Boolean(post.likedByCurrentUser),
    }));
  };

  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts", "equipment", equipmentId],
    queryFn: fetchPosts,
    enabled: isAuthenticated !== undefined && !!equipmentId,
    staleTime: 1000 * 60,
  });

  return { posts, isLoading, error };
};
