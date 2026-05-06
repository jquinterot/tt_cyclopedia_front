import { apiClient } from "@/config/apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Comment } from "@/types/Comment";

export const useLikeComment = (postId: string) => {
  const queryClient = useQueryClient();

  // Helper to update a comment in a list
  const updateCommentInList = (comments: Comment[] | undefined, commentId: string, updated: Partial<Comment>) => {
    if (!comments) return comments;
    return comments.map(c => c.id === commentId ? { ...c, ...updated } : c);
  };

  const likeMutation = useMutation({
    mutationFn: async (commentId: string) => {
      const response = await apiClient.post(`/comments/${commentId}/like`);
      return response.data;
    },
    onMutate: async (commentId) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["mainComments", postId] });
      await queryClient.cancelQueries({ queryKey: ["repliedComments", postId] });
      
      // Snapshot the previous values
      const previousMainComments = queryClient.getQueryData(["mainComments", postId]);
      const previousRepliedComments = queryClient.getQueryCache().findAll({ queryKey: ["repliedComments", postId] });
      
      // Optimistically update mainComments
      queryClient.setQueryData<Comment[]>(["mainComments", postId], old => {
        if (!old) return old;
        return old.map(c => c.id === commentId ? { ...c, likes: c.likes + 1, liked_by_current_user: true } : c);
      });
      
      // Optimistically update all repliedComments
      previousRepliedComments.forEach(({ queryKey }) => {
        queryClient.setQueryData<Comment[]>(queryKey, old => {
          if (!old) return old;
          return old.map(c => c.id === commentId ? { ...c, likes: c.likes + 1, liked_by_current_user: true } : c);
        });
      });
      
      return { previousMainComments, previousRepliedComments };
    },
    onError: (_error, _commentId, context) => {
      // Rollback optimistic updates
      if (context?.previousMainComments) {
        queryClient.setQueryData(["mainComments", postId], context.previousMainComments);
      }
      if (context?.previousRepliedComments) {
        context.previousRepliedComments.forEach(({ queryKey }) => {
          queryClient.setQueryData(queryKey, queryClient.getQueryData(queryKey));
        });
      }
    },
    onSuccess: (updatedComment, commentId) => {
      // Update with server response
      queryClient.setQueryData<Comment[]>(["mainComments", postId], old =>
        updateCommentInList(old, commentId, updatedComment)
      );
      const keys = queryClient.getQueryCache().findAll({ queryKey: ["repliedComments", postId] });
      keys.forEach(({ queryKey }) => {
        queryClient.setQueryData<Comment[]>(queryKey, old =>
          updateCommentInList(old, commentId, updatedComment)
        );
      });
    },
  });

  const unlikeMutation = useMutation({
    mutationFn: async (commentId: string) => {
      const response = await apiClient.delete(`/comments/${commentId}/like`);
      return response.data;
    },
    onMutate: async (commentId) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ["mainComments", postId] });
      await queryClient.cancelQueries({ queryKey: ["repliedComments", postId] });
      
      // Snapshot the previous values
      const previousMainComments = queryClient.getQueryData(["mainComments", postId]);
      const previousRepliedComments = queryClient.getQueryCache().findAll({ queryKey: ["repliedComments", postId] });
      
      // Optimistically update mainComments
      queryClient.setQueryData<Comment[]>(["mainComments", postId], old => {
        if (!old) return old;
        return old.map(c => c.id === commentId ? { ...c, likes: Math.max(0, c.likes - 1), liked_by_current_user: false } : c);
      });
      
      // Optimistically update all repliedComments
      previousRepliedComments.forEach(({ queryKey }) => {
        queryClient.setQueryData<Comment[]>(queryKey, old => {
          if (!old) return old;
          return old.map(c => c.id === commentId ? { ...c, likes: Math.max(0, c.likes - 1), liked_by_current_user: false } : c);
        });
      });
      
      return { previousMainComments, previousRepliedComments };
    },
    onError: (_error, _commentId, context) => {
      // Rollback optimistic updates
      if (context?.previousMainComments) {
        queryClient.setQueryData(["mainComments", postId], context.previousMainComments);
      }
      if (context?.previousRepliedComments) {
        context.previousRepliedComments.forEach(({ queryKey }) => {
          queryClient.setQueryData(queryKey, queryClient.getQueryData(queryKey));
        });
      }
    },
    onSuccess: (updatedComment, commentId) => {
      // Update with server response
      queryClient.setQueryData<Comment[]>(["mainComments", postId], old =>
        updateCommentInList(old, commentId, updatedComment)
      );
      const keys = queryClient.getQueryCache().findAll({ queryKey: ["repliedComments", postId] });
      keys.forEach(({ queryKey }) => {
        queryClient.setQueryData<Comment[]>(queryKey, old =>
          updateCommentInList(old, commentId, updatedComment)
        );
      });
    },
  });

  return { likeMutation, unlikeMutation };
}; 