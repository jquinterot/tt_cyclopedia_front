import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/config/apiClient';
import HeartIcon from '@/components/shared/HeartIcon';
import HeartIconFilled from '@/components/shared/HeartIconFilled';

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
  const likeMutation = useMutation({
    mutationFn: () => apiClient.post(`/posts/${post.id}/like`),
    onSuccess: refetch,
  });
  const unlikeMutation = useMutation({
    mutationFn: () => apiClient.delete(`/posts/${post.id}/like`),
    onSuccess: refetch,
  });

  const handleLikeToggle = () => {
    if (post.likedByCurrentUser) {
      unlikeMutation.mutate();
    } else {
      likeMutation.mutate();
    }
  };

  return (
    <section className="flex items-center gap-3">
      <button
        className="flex items-center gap-2 focus:outline-none"
        onClick={handleLikeToggle}
        disabled={likeMutation.isPending || unlikeMutation.isPending}
        aria-pressed={post.likedByCurrentUser}
        style={{ cursor: (likeMutation.isPending || unlikeMutation.isPending) ? 'not-allowed' : 'pointer', background: 'none', border: 'none', padding: 0 }}
      >
        {post.likedByCurrentUser ? (
          <HeartIconFilled className="w-7 h-7 text-blue-600 transition-colors" data-testid="like-icon-filled" />
        ) : (
          <HeartIcon className="w-7 h-7 text-blue-400 transition-colors" data-testid="like-icon-outline" />
        )}
        <LikeCount count={post.likes} />
      </button>
    </section>
  );
}