import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/config/apiClient';
import { useAuth } from '@/contexts/AuthContext';
import type { Comment } from '@/types/Comment';

interface PostForumCommentData {
  comment: string;
  parentId?: string;
  forum_id: string;
  user_id: string;
  username: string;
}

export function usePostForumComment(forumId: string) {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: async (data: Omit<PostForumCommentData, 'forum_id' | 'user_id' | 'username'>) => {
      if (!user) {
        throw new Error('User must be authenticated to post comments');
      }

      console.log('📤 Posting forum comment/reply:', { forumId, data, user });
      const requestData = {
        ...data,
        forum_id: forumId,
        user_id: user.id,
        username: user.username,
        parent_id: data.parentId,
      };
      console.log('📤 Request data being sent:', requestData);
      const res = await apiClient.post<Comment>(`/comments/forum/${forumId}`, requestData);
      console.log('✅ Forum comment/reply posted successfully:', res.data);
      return res.data;
    },
    onSettled: (data, error, variables) => {
      console.log('🎉 Forum comment/reply mutation settled:', { data, error, variables });
      queryClient.invalidateQueries({ queryKey: ['forumComments', forumId] });
      // If it's a reply, also invalidate the replies for that parent
      if (variables.parentId) {
        console.log('🔄 Invalidating forum replies for parent:', variables.parentId);
        queryClient.invalidateQueries({ queryKey: ['forumCommentReplies', forumId, variables.parentId] });
      }
    },
  });
} 