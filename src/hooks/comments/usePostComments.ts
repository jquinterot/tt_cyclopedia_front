import { apiClient } from "../../config/apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const usePostComment = (postId: string) => {
    const queryClient = useQueryClient();
  
    return useMutation({
    mutationFn: ({ comment, userId, postId, parentId }: { 
      comment: string; 
      userId: string; 
      postId: string;
      parentId?: string;
    }) =>
      apiClient.post(`/comments`, { 
        comment, 
        user_id: userId, 
        post_id: postId,
        parent_id: parentId 
      }),
      onSettled: () => {
        queryClient.invalidateQueries({ 
          queryKey: ['comments', postId]
        });
      },
    });
  };