import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/config/apiClient";
import type { Comment } from "@/types/Comment";

export const useEditComment = (postId: string) => {
  const queryClient = useQueryClient();

  const updateCommentInList = (comments: Comment[] | undefined, commentId: string, updated: Partial<Comment>) => {
    if (!comments) return comments;
    return comments.map(c => c.id === commentId ? { ...c, ...updated } : c);
  };

  return useMutation({
    mutationFn: ({ commentId, commentText }: { commentId: string, commentText: string }) =>
      apiClient.put(`/comments/${commentId}`, { comment: commentText }).then(res => res.data),
    onSuccess: (updatedComment) => {
      // Update mainComments
      queryClient.setQueryData<Comment[]>(["mainComments", postId], old =>
        updateCommentInList(old, updatedComment.id, updatedComment)
      );
      // Update all repliedComments
      const keys = queryClient.getQueryCache().findAll({ queryKey: ["repliedComments", postId] });
      keys.forEach(({ queryKey }) => {
        queryClient.setQueryData<Comment[]>(queryKey, old =>
          updateCommentInList(old, updatedComment.id, updatedComment)
        );
      });
    },
  });
}; 