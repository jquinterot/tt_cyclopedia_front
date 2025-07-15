import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/config/apiClient';
import HeartIcon from '@/components/shared/HeartIcon/HeartIcon';
import HeartIconFilled from '@/components/shared/HeartIconFilled/HeartIconFilled';
import { useAuth } from '@/contexts/AuthContext';
import toast from 'react-hot-toast';
import type { Forum } from '@/types/Forum';

// LikeCount.tsx
type LikeCountProps = {
  count: number;
};
function LikeCount({ count }: LikeCountProps) {
  return <p className="text-base font-medium">{count}</p>;
}

// ForumInfo.tsx
type ForumInfoProps = {
  forum: {
    id: string;
    likes: number;
    liked_by_current_user?: boolean;
  };
  refetch: () => void;
};

export default function ForumInfoSection({ forum, refetch }: ForumInfoProps) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const likeMutation = useMutation({
    mutationFn: () => apiClient.post(`/forums/${forum.id}/like`),
    onMutate: async () => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['forum', forum.id] });
      
      // Snapshot the previous value
      const previousForum = queryClient.getQueryData(['forum', forum.id]);
      
      // Optimistically update to the new value
      queryClient.setQueryData(['forum', forum.id], (old: Forum | undefined) => {
        if (!old) return old;
        return {
          ...old,
          likes: old.likes + 1,
          liked_by_current_user: true,
        };
      });
      
      // Return a context object with the snapshotted value
      return { previousForum };
    },
    onError: (err, variables, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousForum) {
        queryClient.setQueryData(['forum', forum.id], context.previousForum);
      }
    },
    onSettled: () => {
      // Always refetch after error or success
      refetch();
    },
  });

  const unlikeMutation = useMutation({
    mutationFn: () => apiClient.delete(`/forums/${forum.id}/like`),
    onMutate: async () => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['forum', forum.id] });
      
      // Snapshot the previous value
      const previousForum = queryClient.getQueryData(['forum', forum.id]);
      
      // Optimistically update to the new value
      queryClient.setQueryData(['forum', forum.id], (old: Forum | undefined) => {
        if (!old) return old;
        return {
          ...old,
          likes: Math.max(0, old.likes - 1),
          liked_by_current_user: false,
        };
      });
      
      // Return a context object with the snapshotted value
      return { previousForum };
    },
    onError: (err, variables, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousForum) {
        queryClient.setQueryData(['forum', forum.id], context.previousForum);
      }
    },
    onSettled: () => {
      // Always refetch after error or success
      refetch();
    },
  });

  const handleLikeToggle = () => {
    if (!user) {
      toast('Please login to like!', { icon: '⚠️', id: 'login-to-like' });
      return;
    }
    if (forum.liked_by_current_user) {
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
        aria-pressed={forum.liked_by_current_user}
        style={{ cursor: (likeMutation.isPending || unlikeMutation.isPending) ? 'not-allowed' : 'pointer', background: 'none', border: 'none', padding: 0 }}
        data-testid="forum-like-button"
      >
        {forum.liked_by_current_user ? (
          <HeartIconFilled className="w-7 h-7 text-blue-600 transition-colors" data-testid="forum-like-icon-filled" />
        ) : (
          <>
            <HeartIcon className="w-7 h-7 text-blue-400 transition-colors group-hover:opacity-0" data-testid="forum-like-icon-outline" />
            <HeartIconFilled className="w-7 h-7 text-blue-600 absolute left-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" data-testid="forum-like-icon-filled-hover" />
          </>
        )}
        <LikeCount count={forum.likes} />
      </button>
    </section>
  );
} 