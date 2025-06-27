import { Post } from "@/types/Post";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/config/apiClient";
import { useAuth } from "@/contexts/AuthContext";

type OptimisticContext = { previousPosts?: Post[] };

function uuid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export const usePostPost = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation<Post, unknown, { formData: FormData }, OptimisticContext>({
    mutationFn: async ({ formData }) => {
      const response = await apiClient.post<Post>('/posts', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      return response.data;
    },
    onMutate: async ({ formData }) => {
      await queryClient.cancelQueries({ queryKey: ['posts'] });
      const previousPosts = queryClient.getQueryData<Post[]>(['posts']) || [];
      const imageFile = formData.get('image');
      const optimisticPost: Post = {
        id: uuid(),
        title: formData.get('title') as string,
        content: formData.get('content') as string,
        image_url: imageFile && imageFile instanceof File ? URL.createObjectURL(imageFile) : "",
        likes: 0,
        author: user?.username || 'Unknown User',
        likedByCurrentUser: false,
      };
      queryClient.setQueryData<Post[]>(['posts'], old => {
        return old ? [optimisticPost, ...old] : [optimisticPost];
      });
      return { previousPosts };
    },
    onError: (_error, _variables, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(['posts'], context.previousPosts);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
};