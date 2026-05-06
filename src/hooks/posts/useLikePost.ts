import { useOptimistic, startTransition } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/config/apiClient';
import { toast } from 'sonner';
import type { Post } from '@/types/Post';

interface UseLikePostOptions {
  postId: string;
  initialLikes: number;
  initialLiked: boolean;
  queryKey: string[];
}

export const useLikePost = ({ postId, initialLikes, initialLiked, queryKey }: UseLikePostOptions) => {
  const queryClient = useQueryClient();

  const [optimisticState, addOptimistic] = useOptimistic(
    { likes: initialLikes, liked: initialLiked },
    (state, _toggle: boolean) => ({
      likes: state.liked ? state.likes - 1 : state.likes + 1,
      liked: !state.liked,
    })
  );

  const handleLike = () => {
    startTransition(async () => {
      addOptimistic(true);
      try {
        const response = await apiClient.post(`/posts/${postId}/toggle-like`);
        const updatedPost = response.data as Post;

        queryClient.setQueryData<Post[] | Post>(queryKey, (old) => {
          if (!old) return old;
          if (Array.isArray(old)) {
            return old.map(p => p.id === postId ? updatedPost : p);
          }
          return old.id === postId ? updatedPost : old;
        });
      } catch (error) {
        toast.error('Like toggle failed');
      }
    });
  };

  return {
    likes: optimisticState.likes,
    liked: optimisticState.liked,
    handleLike,
    isProcessing: false,
  };
};
