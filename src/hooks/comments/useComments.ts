import { Comment } from "../../types/Comment";
import { apiClient } from "../../config/apiClient";
import { useQuery } from "@tanstack/react-query";

export const useComments = (postId: string) => {
  const fetchComments = async (postId: string) => {
    const response = await apiClient.get<Comment[]>(`/comments/post/${postId}`);
    return response.data;
  };

  const {
    data: comments,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["comments", postId],
    queryFn: () => fetchComments(postId),
    enabled: !!postId,
    refetchOnMount: false, // Prevent refetching on component mount
  });

  return { comments, isLoading, error };
};