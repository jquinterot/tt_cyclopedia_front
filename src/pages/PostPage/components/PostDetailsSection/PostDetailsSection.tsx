import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePostById } from '@/hooks/posts/usePostById';
import { usePostId } from '@/hooks/usePostId';
import FormComment from "../FormCommentSection/FormCommentSection";
import { STAT_CONFIG } from '@/config/statConfig';
import PostInfoSection from '../PostInfoSection/PostInfoSection';
import LoadingSpinner from '@/components/shared/LoadingSpinner/LoadingSpinner';

function getStatConfig(key: string) {
  return STAT_CONFIG.find((item) => item.key === key);
}

function StatBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex items-center gap-3 group py-1">
      <span className="text-xs font-medium text-gray-400 w-16 group-hover:text-white transition-colors">
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
      <span className="text-xs font-medium text-gray-300 w-10 text-right group-hover:text-white transition-colors">
        {value.toFixed(1)}
      </span>
    </div>
  );
}

function PostImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="aspect-square w-full group relative overflow-hidden rounded-lg" data-testid="post-image-container">
      <img
        className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
        src={src}
        alt={alt}
        data-testid="post-image"
      />
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  );
}

function PostStatsWrapper({ stats }: { stats?: Record<string, number> }) {
  if (!stats) return null;
  const statKeys = Object.keys(stats);
  return (
    <div className="flex flex-col justify-center space-y-6 px-4 sm:px-0" data-testid="post-stats-container">
      <div className="p-4 space-y-4">
        <h3 className="text-base font-semibold text-white text-center" data-testid="stats-heading">
          Stats
        </h3>
        {statKeys.map((key) => {
          const config = getStatConfig(key);
          return (
            <StatBar
              key={key}
              label={config?.label || key.charAt(0).toUpperCase() + key.slice(1)}
              value={stats[key]}
              color={config?.color || 'bg-gray-500'}
            />
          );
        })}
      </div>
    </div>
  );
}

function PostContent({ content }: { content: string }) {
  return (
    <div className="prose prose-invert max-w-none text-sm sm:text-base" data-testid="post-content">
      <p className="text-gray-300 text-xl leading-relaxed whitespace-pre-wrap">{content}</p>
    </div>
  );
}

function ErrorMessage() {
  return (
    <div className="w-full max-w-4xl text-center p-8 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
      <p className="text-red-400">Error getting the post by Id</p>
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
  }, [id, updatePostId]);

  const { post, error, isLoading, refetch } = usePostById(postId);

  if (error) return <ErrorMessage />;
  if (isLoading || !post) return <LoadingSpinner />;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6" data-testid="post-details-container">
      <div className="space-y-8">
        <h1 className="text-center text-5xl">{post.title}</h1>
        <div className="rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-8 mb-6">
          <PostImage src={`${import.meta.env.VITE_API_BASE_URL}${post.image_url}`} alt={post.title} />
          <PostStatsWrapper stats={post.stats} />
        </div>
        <PostContent content={post.content} />
        <PostInfoSection post={post} refetch={refetch} />
      </div>
      <div className="mt-8 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 p-5" data-testid="comments-section">
        {id && <FormComment postId={id} />}
      </div>
    </div>
  );
}