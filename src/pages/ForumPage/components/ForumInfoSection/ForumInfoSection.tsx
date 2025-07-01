import { useMutation } from '@tanstack/react-query';
import { apiClient } from '@/config/apiClient';
import HeartIcon from '@/components/shared/HeartIcon/HeartIcon';
import HeartIconFilled from '@/components/shared/HeartIconFilled/HeartIconFilled';

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
  const likeMutation = useMutation({
    mutationFn: () => apiClient.post(`/forums/${forum.id}/like`),
    onSuccess: refetch,
  });
  const unlikeMutation = useMutation({
    mutationFn: () => apiClient.delete(`/forums/${forum.id}/like`),
    onSuccess: refetch,
  });

  const handleLikeToggle = () => {
    if (forum.liked_by_current_user) {
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
        aria-pressed={forum.liked_by_current_user}
        style={{ cursor: (likeMutation.isPending || unlikeMutation.isPending) ? 'not-allowed' : 'pointer', background: 'none', border: 'none', padding: 0 }}
        data-testid="forum-like-button"
      >
        {forum.liked_by_current_user ? (
          <HeartIconFilled className="w-7 h-7 text-blue-600 transition-colors" data-testid="forum-like-icon-filled" />
        ) : (
          <HeartIcon className="w-7 h-7 text-blue-400 transition-colors" data-testid="forum-like-icon-outline" />
        )}
        <LikeCount count={forum.likes} />
      </button>
    </section>
  );
} 