import { apiClient } from "@/config/apiClient";
import { Post } from "@/types/Post";
import { useQuery } from "@tanstack/react-query";

export const usePosts = () => {
  const fetchPosts = async () => {
    const response = await apiClient.get<Post[]>('/posts');
    return response.data;
  };

  const {
    data: posts,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: () => fetchPosts(),
    staleTime: 1000 * 60, // Consider data fresh for 1 minute
    refetchOnMount: true, // Enable refetch on mount
    refetchOnWindowFocus: true, // Enable refetch on window focus
  });

  return { posts, isLoading, error };
};