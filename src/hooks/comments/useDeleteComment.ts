import { apiClient } from "../../config/apiClient";
import { useMutation, useQueryClient  } from "@tanstack/react-query";

export const useDeleteComment = (postId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
      mutationFn: (commentId: string) => apiClient.delete(`/comments/${commentId}`),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['comments', postId] });
      },
    
    });
  };