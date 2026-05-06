import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/config/apiClient';

export function useDeleteForumComment(forumId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (commentId: string) => {
      await apiClient.delete(`/comments/${commentId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forumComments', forumId] });
      queryClient.invalidateQueries({ queryKey: ['forumCommentReplies', forumId] });
    },
  });
}
