import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/config/apiClient';

export function useDeleteForumComment(forumId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (commentId: string) => {
      console.log('🗑️ Deleting forum comment:', commentId);
      await apiClient.delete(`/comments/${commentId}`);
      console.log('✅ Forum comment deleted successfully');
    },
    onSuccess: (_, commentId) => {
      console.log('🎉 Forum comment delete mutation success:', commentId);
      queryClient.invalidateQueries({ queryKey: ['forumComments', forumId] });
      // Also invalidate all forum comment replies queries since we don't know which parent this was
      queryClient.invalidateQueries({ queryKey: ['forumCommentReplies', forumId] });
    },
  });
} 