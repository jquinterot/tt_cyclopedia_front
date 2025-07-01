import { useQuery } from '@tanstack/react-query';
import { apiClient } from '@/config/apiClient';
import type { Comment } from '@/types/Comment';
import type { AxiosError } from "axios";

export function useForumCommentCount(forumId: string) {
  return useQuery<Comment[]>({
    queryKey: ['forumComments', forumId],
    queryFn: async () => {
      const res = await apiClient.get<Comment[]>(`/comments/forum/${forumId}/main`);
      // Filter to ensure only main comments (no parent_id) are returned
      const mainComments = res.data.filter(comment => !comment.parent_id);
      return mainComments;
    },
    enabled: !!forumId,
  });
}

export const useForumComments = (forumId: string) => {
  const fetchMainComments = async () => {
    console.log('🔍 Fetching forum main comments for:', forumId);
    try {
      const response = await apiClient.get<Comment[]>(`/comments/forum/${forumId}/main`);
      console.log('📥 Forum main comments response:', response.data);
      // Sort by timestamp descending (newest first)
      const sortedComments = response.data.sort(
        (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
      console.log('📋 Sorted forum main comments:', sortedComments);
      return sortedComments;
    } catch (error) {
      console.error('❌ Error fetching forum main comments:', error);
      const axiosError = error as AxiosError;
      if (axiosError.response && axiosError.response.status === 404) {
        console.log('⚠️ 404 - No forum main comments found, returning empty array');
        return [];
      }
      throw error;
    }
  };

  const {
    data: mainComments,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["forumComments", forumId],
    queryFn: fetchMainComments,
    enabled: !!forumId,
    refetchOnMount: false,
  });

  console.log('🔄 Forum main comments hook result:', { mainComments, isLoading, error, forumId });

  return { mainComments: mainComments ?? [], isLoading, error };
}; 