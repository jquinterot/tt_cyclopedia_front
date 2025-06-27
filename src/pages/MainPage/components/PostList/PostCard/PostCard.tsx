import PostImage from '../PostImage/PostImage';
import PostStats from '../PostStats/PostStats';
import HeartIcon from '@/components/shared/HeartIcon';
import HeartIconFilled from '@/components/shared/HeartIconFilled';

interface Post {
  id: string;
  title: string;
  content: string;
  image_url: string;
  likes?: number;
  stats?: Record<string, number>;
  likedByCurrentUser?: boolean;
}

interface PostCardProps {
  post: Post;
  onClick: () => void;
}

export default function PostCard({ post, onClick }: PostCardProps) {
  return (
    <article
      key={post.id}
      data-testid={`post-card-${post.id}`}
      className="group rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 hover:border-white/20 
                 transition-all duration-300 cursor-pointer overflow-hidden"
      onClick={onClick}
    >
      <div className="flex flex-col md:flex-row pb-2" data-testid={`post-content-${post.id}`}>
        <PostImage
          src={`${import.meta.env.VITE_API_BASE_URL}${post.image_url}`}
          alt={post.title}
          postId={post.id}
        />
        <div className="w-full md:w-1/2 flex flex-col justify-center space-y-6 px-4" data-testid={`post-stats-section-${post.id}`}>
          <PostStats stats={post.stats} />
        </div>
      </div>
      <div className="px-6 pb-6" data-testid={`post-details-${post.id}`}>
        <div className="w-full pt-4 border-t border-white/10">
          <h2 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors mb-2" data-testid={`post-title-${post.id}`}>
            {post.title}
          </h2>
          <p className="text-gray-300 text-sm line-clamp-2 mb-3" data-testid={`post-excerpt-${post.id}`}>
            {post.content}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-blue-400 hover:text-blue-300 transition-colors" data-testid={`read-more-${post.id}`}>
              Read more →
            </span>
            <div className="flex items-center space-x-2" data-testid={`likes-container-${post.id}`}> 
              {post.likedByCurrentUser ? (
                <HeartIconFilled className="h-5 w-5 text-blue-600" data-testid={`like-icon-filled-${post.id}`}/>
              ) : (
                <HeartIcon className="h-5 w-5 text-blue-400" data-testid={`like-icon-${post.id}`}/>
              )}
              <span className="text-sm text-gray-300">{post.likes || 0}</span>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
} 