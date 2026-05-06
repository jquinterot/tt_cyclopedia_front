import { Post } from "@/types/Post";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/config/apiClient";
import { useAuth } from "@/contexts/AuthContext";

export const usePostById = (postId: string) => {
  const { isAuthenticated } = useAuth();

  const fetchPosts = async () => {
    const response = await apiClient.get<Post>(`/posts/${postId}`);
    return {
      ...response.data,
      likedByCurrentUser: Boolean(response.data.likedByCurrentUser)
    };
  };

  const {
    data: post,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => fetchPosts(),
    enabled: !!postId && isAuthenticated !== undefined,
    refetchOnMount: false,
  });

  return { post, isLoading, error, refetch };
};
