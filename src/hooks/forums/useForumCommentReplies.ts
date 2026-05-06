import { Comment } from "@/types/Comment";
import { apiClient } from "@/config/apiClient";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

export const useForumCommentReplies = (forumId: string, commentId: string) => {
  const fetchReplies = async () => {
    try {
      const response = await apiClient.get<Comment[]>(`/comments/forum/${forumId}/replies/${commentId}`);
      const transformedData = response.data.map(comment => ({
        ...comment,
        liked_by_current_user: Boolean(comment.liked_by_current_user)
      }));
      return transformedData.sort(
        (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );
    } catch (error) {
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.status === 404) {
        return [];
      }
      throw error;
    }
  };

  const {
    data: replies,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["forumCommentReplies", forumId, commentId],
    queryFn: fetchReplies,
    enabled: !!forumId && !!commentId,
    refetchOnMount: false,
  });

  return { replies, isLoading, error };
};
