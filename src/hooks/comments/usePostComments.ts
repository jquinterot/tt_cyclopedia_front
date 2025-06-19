import { apiClient } from "../../config/apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const usePostComment = (postId: string) => {
    const queryClient = useQueryClient();
  
    return useMutation({
    mutationFn: ({ comment, userId, postId, parentId, username }: { 
      comment: string; 
      userId: string; 
      postId: string;
      parentId?: string;
      username?: string;
    }) =>
      apiClient.post(`/comments`, { 
        comment, 
        user_id: userId, 
        post_id: postId,
        parent_id: parentId,
        username: username 
      }),
      onSettled: () => {
        queryClient.invalidateQueries({ 
          queryKey: ['comments', postId]
        });
      },
    });
  };