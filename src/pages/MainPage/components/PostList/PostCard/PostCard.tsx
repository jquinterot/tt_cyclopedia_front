import PostImage from '../PostImage/PostImage';
import PostStats from '../PostStats/PostStats';
import HeartIcon from '@/components/shared/HeartIcon/HeartIcon';
import HeartIconFilled from '@/components/shared/HeartIconFilled/HeartIconFilled';
import ActivityMap from '@/components/shared/ActivityMap/ActivityMap';
import { ActivityBadge } from '@/components/ui';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import type { Post } from '@/types/Post';
import { useLikePost } from '@/hooks/posts/useLikePost';

interface PostCardProps {
  post: Post;
  onClick: () => void;
}

const DEFAULT_IMAGE_URL = import.meta.env.VITE_DEFAULT_IMAGE_URL;

export default function PostCard({ post, onClick }: PostCardProps) {
  const { user } = useAuth();
  
  // Ensure proper boolean conversion
  const initialLiked = Boolean(post.likedByCurrentUser);
  
  const { likes, liked, handleLike, isProcessing } = useLikePost({
    postId: post.id,
    initialLikes: post.likes || 0,
    initialLiked: initialLiked,
    queryKey: ['posts']
  });

  const handleLikeToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (!user) {
      toast('Please login to like!', { icon: '⚠️', id: 'login-to-like' });
      e.preventDefault();
      (e.currentTarget as HTMLButtonElement).blur();
      return;
    }
    
    handleLike();
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const formatActivityDate = (dateString?: string) => {
    if (!dateString) return null;
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isActivity = post.activityType && post.activityDate;

  return (
    <article
      key={`${post.id}-${post.likedByCurrentUser}-${post.likes}`}
      data-testid={`post-card-${post.id}`}
      className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 
                 transition-colors cursor-pointer overflow-hidden"
      onClick={onClick}
    >
      <div className="w-full mb-3" data-testid={`post-content-${post.id}`}>
        <PostImage
          src={post.image_url}
          alt={post.title}
          postId={post.id}
          defaultImageUrl={DEFAULT_IMAGE_URL}
        />
      </div>

      {isActivity && (
        <div className="mb-3">
          <div className="flex items-center gap-2 mb-2">
            <ActivityBadge type={post.activityType!} />
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-300">
            <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{formatActivityDate(post.activityDate)}</span>
          </div>
        </div>
      )}

      {post.location && (
        <div className="mb-3">
          <ActivityMap location={post.location} />
        </div>
      )}

      <div className="w-full mb-3" data-testid={`post-stats-section-${post.id}`}>
        <PostStats stats={post.stats} />
      </div>
      <div className="mt-3" data-testid={`post-details-${post.id}`}>
        {post.equipment && (
          <div className="mb-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-600/20 text-blue-400 border border-blue-500/30">
              {post.equipment.brand} {post.equipment.name}
            </span>
          </div>
        )}
        <h2 className="text-lg font-semibold text-white mb-2" data-testid={`post-title-${post.id}`}>
          {post.title}
        </h2>
        <p className="text-gray-300 mb-3 line-clamp-2" data-testid={`post-excerpt-${post.id}`}>
          {post.content}
        </p>
        <div className="flex items-center justify-between text-sm text-gray-400">
          <span>{post.author ? `By ${post.author}` : 'Anonymous'}</span>
          <div className="flex items-center gap-4">
            <div className="flex items-center space-x-2" data-testid={`likes-container-${post.id}`}> 
              <button
                className="flex items-center gap-1 focus:outline-none"
                onClick={handleLikeToggle}
                disabled={isProcessing}
                aria-pressed={liked}
                aria-label={liked ? 'Unlike post' : 'Like post'}
                style={{ cursor: isProcessing ? 'not-allowed' : 'pointer', background: 'none', border: 'none', padding: 0 }}
                data-testid={`post-card-like-button-${post.id}`}
              >
                {liked ? (
                  <HeartIconFilled className="h-5 w-5 text-blue-600 transition-colors" data-testid={`like-icon-filled-${post.id}`}/>
                ) : (
                  <HeartIcon className="h-5 w-5 text-blue-400 transition-colors" data-testid={`like-icon-${post.id}`}/>
                )}
                <span className="text-sm text-gray-300">{likes}</span>
              </button>
            </div>
            <span>{formatDate(post.timestamp)}</span>
          </div>
        </div>
      </div>
    </article>
  );
} 