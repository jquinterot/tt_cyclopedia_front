import PostImage from '../PostImage/PostImage';
import PostStats from '../PostStats/PostStats';
import HeartIcon from '@/components/shared/HeartIcon/HeartIcon';
import HeartIconFilled from '@/components/shared/HeartIconFilled/HeartIconFilled';

interface Post {
  id: string;
  title: string;
  content: string;
  image_url: string;
  likes?: number;
  stats?: Record<string, number>;
  likedByCurrentUser?: boolean;
  timestamp?: string;
  author?: string;
}

interface PostCardProps {
  post: Post;
  onClick: () => void;
}

export default function PostCard({ post, onClick }: PostCardProps) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <article
      key={post.id}
      data-testid={`post-card-${post.id}`}
      className="group bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 
                 transition-colors cursor-pointer overflow-hidden"
      onClick={onClick}
    >
      <div className="w-full mb-3" data-testid={`post-content-${post.id}`}>
        <PostImage
          src={`${import.meta.env.VITE_API_BASE_URL}${post.image_url}`}
          alt={post.title}
          postId={post.id}
        />
      </div>
      <div className="w-full mb-3" data-testid={`post-stats-section-${post.id}`}>
        <PostStats stats={post.stats} />
      </div>
      <div className="mt-3" data-testid={`post-details-${post.id}`}>
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
              {post.likedByCurrentUser ? (
                <HeartIconFilled className="h-5 w-5 text-blue-600" data-testid={`like-icon-filled-${post.id}`}/>
              ) : (
                <HeartIcon className="h-5 w-5 text-blue-400" data-testid={`like-icon-${post.id}`}/>
              )}
              <span className="text-sm text-gray-300">{post.likes || 0}</span>
            </div>
            <span>{formatDate(post.timestamp)}</span>
          </div>
        </div>
      </div>
    </article>
  );
} 