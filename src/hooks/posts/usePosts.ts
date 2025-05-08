import { apiClient } from "../../config/apiClient";
import { Post } from "../../types/Post";
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
    refetchOnMount: false,
  });

  return { posts, isLoading, error };
};