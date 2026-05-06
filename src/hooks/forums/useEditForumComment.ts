import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/config/apiClient';
import type { Comment } from '@/types/Comment';

interface EditForumCommentData {
  commentId: string;
  commentText: string;
}

export function useEditForumComment(forumId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ commentId, commentText }: EditForumCommentData) => {
      const res = await apiClient.put<Comment>(`/comments/${commentId}`, {
        comment: commentText,
      });
      return res.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['forumComments', forumId] });
      if (data.parent_id) {
        queryClient.invalidateQueries({ queryKey: ['forumCommentReplies', forumId, data.parent_id] });
      }
    },
  });
}
