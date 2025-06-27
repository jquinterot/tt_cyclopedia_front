import { apiClient } from "@/config/apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";

export const usePostComment = (postId: string) => {
    const queryClient = useQueryClient();
    const { user } = useAuth();
  
    return useMutation({
    mutationFn: ({ comment, parentId }: { 
      comment: string; 
      parentId?: string;
    }) => {
      if (!user) {
        throw new Error('User must be authenticated to post comments');
      }
      
      return apiClient.post(`/comments`, { 
        comment, 
        user_id: user.id, 
        post_id: postId,
        parent_id: parentId,
        username: user.username 
      });
    },
      onSettled: () => {
        queryClient.invalidateQueries({ 
          queryKey: ['comments', postId]
        });
      },
    });
  };