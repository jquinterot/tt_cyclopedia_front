import { useOptimistic, startTransition } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/config/apiClient';
import { toast } from 'sonner';
import type { Comment } from '@/types/Comment';

interface UseLikeCommentOptions {
  commentId: string;
  postId: string;
  initialLikes: number;
  initialLiked: boolean;
}

export const useLikeCommentModern = ({
  commentId,
  postId,
  initialLikes,
  initialLiked
}: UseLikeCommentOptions) => {
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
        const response = await apiClient.post(`/comments/${commentId}/toggle-like`);
        const updatedComment = response.data as Comment;

        queryClient.setQueryData<Comment[]>(["mainComments", postId], (comments) =>
          comments ? comments.map(c => c.id === commentId ? updatedComment : c) : comments
        );

        const keys = queryClient.getQueryCache().findAll({ queryKey: ["repliedComments", postId] });
        keys.forEach(({ queryKey }) => {
          queryClient.setQueryData<Comment[]>(queryKey, (comments) =>
            comments ? comments.map(c => c.id === commentId ? updatedComment : c) : comments
          );
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
