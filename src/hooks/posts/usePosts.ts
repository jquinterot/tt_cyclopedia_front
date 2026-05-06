import { apiClient } from "@/config/apiClient";
import { Post } from "@/types/Post";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";

export const usePosts = () => {
  const { isAuthenticated } = useAuth();

  const fetchPosts = async () => {
    const response = await apiClient.get<Post[]>('/posts');
    return response.data.map(post => ({
      ...post,
      likedByCurrentUser: Boolean(post.likedByCurrentUser)
    }));
  };

  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetchPosts(),
    enabled: isAuthenticated !== undefined,
    staleTime: 1000 * 60,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  return { posts, isLoading, error };
};
