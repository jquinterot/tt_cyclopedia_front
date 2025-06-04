import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePostById } from "../../../hooks/posts/usePostById";
import { usePostId } from "../../../hooks/usePostId";
import FormComment from "../FormComment/FormComment";

// Static stats that will be same for all posts
const CARD_STATS = {
  speed: 7.5,
  spin: 8.2,
  control: 8.8,
  overall: 8.3
};

function StatBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex items-center gap-3 group">
      <span className="text-xs font-medium text-gray-400 w-14 group-hover:text-white transition-colors">
        {label}
      </span>
      <div className="flex-1 h-3 bg-white/10 rounded-lg overflow-hidden backdrop-blur-sm border border-white/5">
        <div 
          className={`h-full ${color} transition-all duration-500 ease-out`}
          style={{ 
            width: `${(value / 10) * 100}%`,
            boxShadow: `0 0 20px ${color.replace('bg-', '').replace('-500', '-400')}` 
          }}
        />
      </div>
      <span className="text-xs font-medium text-gray-300 w-8 group-hover:text-white transition-colors">
        {value.toFixed(1)}
      </span>
    </div>
  );
}

export default function PostDetails() {
  const { id } = useParams();
  const { postId, updatePostId } = usePostId();

  useEffect(() => {
    if (id) {
      updatePostId(id);
    }
  }, [id]);

  const { post, error } = usePostById(postId);

  if (error) return (
    <div className="w-full max-w-4xl text-center p-8 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
      <p className="text-red-400">Error getting the post by Id</p>
    </div>
  );
  
  if (!post) return (
    <div className="flex justify-center items-center h-64">
      <div data-testid="loading-spinner" className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4" data-testid="post-details-container">
      <div className="space-y-8">
        <div className="grid grid-cols-2 gap-8 mb-6">
          {/* Left: Image */}
          <div className="aspect-square w-full group relative overflow-hidden rounded-lg" data-testid="post-image-container">
            <img
              className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
              src={`${import.meta.env.VITE_API_BASE_URL}${post.image_url}`}
              alt={post.title}
              data-testid="post-image"
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          </div>

          {/* Right: Stats */}
          <div className="flex flex-col justify-center space-y-6" data-testid="post-stats-container">
            <div className="space-y-4">
              <StatBar label="Speed" value={CARD_STATS.speed} color="bg-red-500" data-testid="stat-speed" />
              <StatBar label="Spin" value={CARD_STATS.spin} color="bg-green-500" data-testid="stat-spin" />
              <StatBar label="Control" value={CARD_STATS.control} color="bg-blue-500" data-testid="stat-control" />
              <StatBar label="Overall" value={CARD_STATS.overall} color="bg-purple-500" data-testid="stat-overall" />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none" data-testid="post-content">
          <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">{post.content}</p>
        </div>
      </div>

      {/* Comments Section */}
      <div className="rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 p-8" data-testid="comments-section">
        {id && <FormComment postId={id} />}
      </div>
    </div>
  );
}
