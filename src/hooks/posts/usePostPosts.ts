import { Post } from "../../types/Post";
import { useMutation, useQueryClient  } from "@tanstack/react-query";
import { apiClient } from "../../config/apiClient";

export const usePostPost = () => {
    const queryClient = useQueryClient();
  
    return useMutation({
      mutationFn: async ({ formData }: { formData:FormData }) => {
        const response = await apiClient.post<Post>('/posts', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
      },
      onMutate: async ({ formData }) => {
        // Cancel any outgoing refetches
        await queryClient.cancelQueries({ queryKey: ['posts'] });
        
        // Get the current posts
        const previousPosts = queryClient.getQueryData<Post[]>(['posts']) || [];
        
        // Create an optimistic post
        const optimisticPost: Post = {
          id: 'temp-' + Date.now(),
          title: formData.get('title') as string,
          content: formData.get('content') as string,
          image_url: URL.createObjectURL(formData.get('image') as File),
          likes: 0
        };
        
        // Add optimistic post to posts list
        queryClient.setQueryData<Post[]>(['posts'], old => {
          return old ? [optimisticPost, ...old] : [optimisticPost];
        });
        
        return { previousPosts };
      },
      onError: (err, variables, context) => {
        // If the mutation fails, use the context returned from onMutate to roll back
        if (context?.previousPosts) {
          queryClient.setQueryData(['posts'], context.previousPosts);
        }
      },
      onSettled: () => {
        // Always refetch after error or success to sync with server
        queryClient.invalidateQueries({ queryKey: ['posts'] });
      },
    });
};