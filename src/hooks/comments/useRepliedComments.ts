import { Comment } from "@/types/Comment";
import { apiClient } from "@/config/apiClient";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

export const useReplyComments = (postId: string, commentId: string) => {
  const fetchComments = async () => {
    try {
      const response = await apiClient.get<Comment[]>(`/comments/post/${postId}/replies/${commentId}`);
      // Transform the data to ensure liked_by_current_user is always a boolean
      const transformedData = response.data.map(comment => ({
        ...comment,
        liked_by_current_user: Boolean(comment.liked_by_current_user)
      }));
      // Always sort by timestamp ascending
      return transformedData.sort(
        (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );
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