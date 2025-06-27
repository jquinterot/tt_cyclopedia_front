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
    mutationFn: (commentId: string) => apiClient.post(`/comments/${commentId}/like`).then(res => res.data),
    onSuccess: (updatedComment, commentId) => {
      // Update mainComments
      queryClient.setQueryData<Comment[]>(["mainComments", postId], old =>
        updateCommentInList(old, commentId, updatedComment)
      );
      // Update all repliedComments
      const keys = queryClient.getQueryCache().findAll({ queryKey: ["repliedComments", postId] });
      keys.forEach(({ queryKey }) => {
        queryClient.setQueryData<Comment[]>(queryKey, old =>
          updateCommentInList(old, commentId, updatedComment)
        );
      });
    },
  });

  const unlikeMutation = useMutation({
    mutationFn: (commentId: string) => apiClient.delete(`/comments/${commentId}/like`).then(res => res.data),
    onSuccess: (updatedComment, commentId) => {
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