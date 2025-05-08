import { apiClient } from "../../config/apiClient";
import { useMutation, useQueryClient  } from "@tanstack/react-query";

export const usePostComment = (postId: string ) => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: ({ comment, userId, postId }: { comment: string; userId: string, postId:string }) =>
        apiClient.post(`/comments`, { comment,  user_id: userId, post_id: postId}),
      onSettled: () => {
        queryClient.invalidateQueries({ 
          queryKey: ['comments', postId]
        });
      },
    });
  };