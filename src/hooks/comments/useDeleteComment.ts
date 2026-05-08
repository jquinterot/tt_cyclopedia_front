import { apiClient } from "@/config/apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Comment } from "@/types/Comment";

export const useDeleteComment = (postId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (commentId: string) =>
      apiClient.delete(`/comments/${commentId}`).then((res) => res.data),
    onSuccess: (deletedComment: Comment) => {
      queryClient.setQueryData<Comment[]>(["mainComments", postId], (old) =>
        old ? old.filter((comment) => comment.id !== deletedComment.id) : [],
      );
      const keys = queryClient
        .getQueryCache()
        .findAll({ queryKey: ["repliedComments", postId] });
      keys.forEach(({ queryKey }) => {
        queryClient.setQueryData<Comment[]>(queryKey, (old) =>
          old ? old.filter((reply) => reply.id !== deletedComment.id) : [],
        );
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["mainComments", postId] });
      queryClient.invalidateQueries({ queryKey: ["comments", postId] });
    },
  });
};
