import HeartIcon from '@/components/shared/HeartIcon/HeartIcon';
import HeartIconFilled from '@/components/shared/HeartIconFilled/HeartIconFilled';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { useLikePost } from '@/hooks/posts/useLikePost';

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
    likedByCurrentUser?: boolean;
  };
};

export default function PostInfoSection({ post }: PostInfoProps) {
  const { user } = useAuth();
  
  // Ensure proper boolean conversion
  const initialLiked = Boolean(post.likedByCurrentUser);
  
  const { likes, liked, handleLike, isProcessing } = useLikePost({
    postId: post.id,
    initialLikes: post.likes,
    initialLiked: initialLiked,
    queryKey: ['post', post.id]
  });

  const handleLikeToggle = (e: React.MouseEvent) => {
    if (!user) {
      toast('Please login to like!', { icon: '⚠️', id: 'login-to-like' });
      e.preventDefault();
      (e.currentTarget as HTMLButtonElement).blur();
      return;
    }
    
    handleLike();
  };

  return (
    <section className="flex items-center gap-3">
      <button
        className="flex items-center gap-2 focus:outline-none"
        onClick={handleLikeToggle}
        disabled={isProcessing}
        aria-pressed={liked}
        style={{ cursor: isProcessing ? 'not-allowed' : 'pointer', background: 'none', border: 'none', padding: 0 }}
        data-testid="post-like-button"
      >
        {liked ? (
          <HeartIconFilled className="w-7 h-7 text-blue-600 transition-colors" data-testid="post-like-icon-filled" />
        ) : (
          <HeartIcon className="w-7 h-7 text-blue-400 transition-colors" data-testid="post-like-icon-outline" />
        )}
        <LikeCount count={likes} />
      </button>
    </section>
  );
}