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
      console.log('📝 Editing forum comment:', { commentId, commentText });
      const res = await apiClient.put<Comment>(`/comments/${commentId}`, {
        comment: commentText,
      });
      console.log('✅ Forum comment edited successfully:', res.data);
      return res.data;
    },
    onSuccess: (data, variables) => {
      console.log('🎉 Forum comment edit mutation success:', { data, variables });
      queryClient.invalidateQueries({ queryKey: ['forumComments', forumId] });
      // If it's a reply, also invalidate the replies for that parent
      if (data.parent_id) {
        console.log('🔄 Invalidating forum replies for parent:', data.parent_id);
        queryClient.invalidateQueries({ queryKey: ['forumCommentReplies', forumId, data.parent_id] });
      }
    },
  });
} 