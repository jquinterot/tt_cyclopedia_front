import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/config/apiClient';

export function useLikeForumComment(forumId: string) {
  const queryClient = useQueryClient();

  const likeMutation = useMutation({
    mutationFn: async (commentId: string) => {
      console.log('❤️ Liking forum comment:', commentId);
      await apiClient.post(`/comments/${commentId}/like`);
      console.log('✅ Forum comment liked successfully');
    },
    onSuccess: (_, commentId) => {
      console.log('🎉 Forum comment like mutation success:', commentId);
      queryClient.invalidateQueries({ queryKey: ['forumComments', forumId] });
      // Also invalidate all forum comment replies queries since we don't know which parent this was
      queryClient.invalidateQueries({ queryKey: ['forumCommentReplies', forumId] });
    },
  });

  const unlikeMutation = useMutation({
    mutationFn: async (commentId: string) => {
      console.log('💔 Unliking forum comment:', commentId);
      await apiClient.delete(`/comments/${commentId}/like`);
      console.log('✅ Forum comment unliked successfully');
    },
    onSuccess: (_, commentId) => {
      console.log('🎉 Forum comment unlike mutation success:', commentId);
      queryClient.invalidateQueries({ queryKey: ['forumComments', forumId] });
      // Also invalidate all forum comment replies queries since we don't know which parent this was
      queryClient.invalidateQueries({ queryKey: ['forumCommentReplies', forumId] });
    },
  });

  return { likeMutation, unlikeMutation };
} 