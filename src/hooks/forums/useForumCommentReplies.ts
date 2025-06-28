import { Comment } from "@/types/Comment";
import { apiClient } from "@/config/apiClient";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

export const useForumCommentReplies = (forumId: string, commentId: string) => {
  console.log('🔄 useForumCommentReplies hook called with:', { forumId, commentId });
  
  const fetchReplies = async () => {
    console.log('🔍 Fetching forum replies for:', { forumId, commentId });
    try {
      const response = await apiClient.get<Comment[]>(`/comments/forum/${forumId}/replies/${commentId}`);
      console.log('📥 Forum replies response:', response.data);
      // Always sort by timestamp ascending
      const sortedReplies = response.data.sort(
        (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );
      console.log('📋 Sorted forum replies:', sortedReplies);
      return sortedReplies;
    } catch (error) {
      console.error('❌ Error fetching forum replies:', error);
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.status === 404) {
        // If replies resource is gone, just return empty
        console.log('⚠️ 404 - No replies found, returning empty array');
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

  console.log('🔄 Forum replies hook result:', { replies, isLoading, error, forumId, commentId });

  return { replies, isLoading, error };
}; 