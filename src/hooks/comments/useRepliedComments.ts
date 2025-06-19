import { Comment } from "../../types/Comment";
import { apiClient } from "../../config/apiClient";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

export const useReplyComments = (postId: string, commentId: string) => {
  const fetchComments = async () => {
    try {
      const response = await apiClient.get<Comment[]>(`/comments/post/${postId}/replies/${commentId}`);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.status === 404) {
        // If replies resource is gone, just return empty
        return [];
      }
      throw error;
    }
  };

  const {
    data: comments,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["repliedComments", postId, commentId],
    queryFn: fetchComments,
    enabled: !!postId && !!commentId,
    refetchOnMount: false,
  });

  return { comments, isLoading, error };
};