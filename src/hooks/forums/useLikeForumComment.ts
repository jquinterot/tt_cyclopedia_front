import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/config/apiClient';
import type { Comment } from '@/types/Comment';

export function useLikeForumComment(forumId: string) {
  const queryClient = useQueryClient();

  const likeMutation = useMutation({
    mutationFn: async (commentId: string) => {
      const response = await apiClient.post(`/comments/${commentId}/like`);
      return response.data;
    },
    onMutate: async (commentId) => {
      await queryClient.cancelQueries({ queryKey: ['forumComments', forumId] });
      await queryClient.cancelQueries({ queryKey: ['forumCommentReplies', forumId] });

      const previousForumComments = queryClient.getQueryData(['forumComments', forumId]);
      const previousForumReplies = queryClient.getQueryCache().findAll({ queryKey: ['forumCommentReplies', forumId] });

      queryClient.setQueryData<Comment[]>(['forumComments', forumId], (old) => {
        if (!old) return old;
        return old.map((c) => c.id === commentId ? { ...c, likes: c.likes + 1, liked_by_current_user: true } : c);
      });

      previousForumReplies.forEach(({ queryKey }) => {
        queryClient.setQueryData<Comment[]>(queryKey, (old) => {
          if (!old) return old;
          return old.map((c) => c.id === commentId ? { ...c, likes: c.likes + 1, liked_by_current_user: true } : c);
        });
      });

      return { previousForumComments, previousForumReplies };
    },
    onError: (_error, _commentId, context) => {
      if (context?.previousForumComments) {
        queryClient.setQueryData(['forumComments', forumId], context.previousForumComments);
      }
      if (context?.previousForumReplies) {
        context.previousForumReplies.forEach(({ queryKey }) => {
          queryClient.setQueryData(queryKey, queryClient.getQueryData(queryKey));
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forumComments', forumId] });
      queryClient.invalidateQueries({ queryKey: ['forumCommentReplies', forumId] });
    },
  });

  const unlikeMutation = useMutation({
    mutationFn: async (commentId: string) => {
      const response = await apiClient.delete(`/comments/${commentId}/like`);
      return response.data;
    },
    onMutate: async (commentId) => {
      await queryClient.cancelQueries({ queryKey: ['forumComments', forumId] });
      await queryClient.cancelQueries({ queryKey: ['forumCommentReplies', forumId] });

      const previousForumComments = queryClient.getQueryData(['forumComments', forumId]);
      const previousForumReplies = queryClient.getQueryCache().findAll({ queryKey: ['forumCommentReplies', forumId] });

      queryClient.setQueryData<Comment[]>(['forumComments', forumId], (old) => {
        if (!old) return old;
        return old.map((c) => c.id === commentId ? { ...c, likes: Math.max(0, c.likes - 1), liked_by_current_user: false } : c);
      });

      previousForumReplies.forEach(({ queryKey }) => {
        queryClient.setQueryData<Comment[]>(queryKey, (old) => {
          if (!old) return old;
          return old.map((c) => c.id === commentId ? { ...c, likes: Math.max(0, c.likes - 1), liked_by_current_user: false } : c);
        });
      });

      return { previousForumComments, previousForumReplies };
    },
    onError: (_error, _commentId, context) => {
      if (context?.previousForumComments) {
        queryClient.setQueryData(['forumComments', forumId], context.previousForumComments);
      }
      if (context?.previousForumReplies) {
        context.previousForumReplies.forEach(({ queryKey }) => {
          queryClient.setQueryData(queryKey, queryClient.getQueryData(queryKey));
        });
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forumComments', forumId] });
      queryClient.invalidateQueries({ queryKey: ['forumCommentReplies', forumId] });
    },
  });

  return { likeMutation, unlikeMutation };
}
