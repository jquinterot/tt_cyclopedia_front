import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/config/apiClient';
import HeartIcon from '@/components/shared/HeartIcon/HeartIcon';
import HeartIconFilled from '@/components/shared/HeartIconFilled/HeartIconFilled';
import { useAuth } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';
import type { Post } from '@/types/Post';

// LikeCount.tsx
type LikeCountProps = {
  count: number;
};
function LikeCount({ count }: LikeCountProps) {
  return <p className="text-base font-medium">{count}</p>;
}

// PostInfo.tsx
type PostInfoProps = {
  post: {
    id: string;
    likes: number;
    likedByCurrentUser: boolean;
  };
  refetch: () => void;
};

export default function PostInfoSection({ post, refetch }: PostInfoProps) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const likeMutation = useMutation({
    mutationFn: () => apiClient.post(`/posts/${post.id}/like`),
    onMutate: async () => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['post', post.id] });
      
      // Snapshot the previous value
      const previousPost = queryClient.getQueryData(['post', post.id]);
      
      // Optimistically update to the new value
      queryClient.setQueryData(['post', post.id], (old: Post | undefined) => {
        if (!old) return old;
        return {
          ...old,
          likes: old.likes + 1,
          likedByCurrentUser: true,
        };
      });
      
      // Return a context object with the snapshotted value
      return { previousPost };
    },
    onError: (err, variables, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousPost) {
        queryClient.setQueryData(['post', post.id], context.previousPost);
      }
    },
    onSettled: () => {
      // Always refetch after error or success
      refetch();
    },
  });

  const unlikeMutation = useMutation({
    mutationFn: () => apiClient.delete(`/posts/${post.id}/like`),
    onMutate: async () => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['post', post.id] });
      
      // Snapshot the previous value
      const previousPost = queryClient.getQueryData(['post', post.id]);
      
      // Optimistically update to the new value
      queryClient.setQueryData(['post', post.id], (old: Post | undefined) => {
        if (!old) return old;
        return {
          ...old,
          likes: Math.max(0, old.likes - 1),
          likedByCurrentUser: false,
        };
      });
      
      // Return a context object with the snapshotted value
      return { previousPost };
    },
    onError: (err, variables, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousPost) {
        queryClient.setQueryData(['post', post.id], context.previousPost);
      }
    },
    onSettled: () => {
      // Always refetch after error or success
      refetch();
    },
  });

  const handleLikeToggle = (e: React.MouseEvent) => {
    if (!user) {
      toast('Please login to like!', { icon: '⚠️', id: 'login-to-like' });
      e.preventDefault();
      (e.currentTarget as HTMLButtonElement).blur();
      return;
    }
    if (post.likedByCurrentUser) {
      unlikeMutation.mutate();
    } else {
      likeMutation.mutate();
    }
  };

  return (
    <section className="flex items-center gap-3">
      <button
        className="relative flex items-center gap-2 focus:outline-none group"
        onClick={handleLikeToggle}
        disabled={likeMutation.isPending || unlikeMutation.isPending}
        aria-pressed={post.likedByCurrentUser}
        style={{ cursor: (likeMutation.isPending || unlikeMutation.isPending) ? 'not-allowed' : 'pointer', background: 'none', border: 'none', padding: 0 }}
      >
        {post.likedByCurrentUser ? (
          <HeartIconFilled className="w-7 h-7 text-blue-600 transition-colors" data-testid="like-icon-filled" />
        ) : (
          <>
            <HeartIcon className="w-7 h-7 text-blue-400 transition-colors group-hover:opacity-0" data-testid="like-icon-outline" />
            <HeartIconFilled className="w-7 h-7 text-blue-600 absolute left-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" data-testid="like-icon-filled-hover" />
          </>
        )}
        <LikeCount count={post.likes} />
      </button>
    </section>
  );
}