import { Post } from "@/types/Post";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/config/apiClient";

export const usePostById = (postId: string) => {
  const fetchPosts = async () => {
    const response = await apiClient.get<Post>(`/posts/${postId}`);
    return response.data;
  };

  const {
    data: post, 
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => fetchPosts(),
    enabled: !!postId,
    refetchOnMount: false,
  });

  return { post, isLoading, error, refetch };
};