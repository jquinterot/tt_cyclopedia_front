import { useAuth } from '@/contexts/AuthContext';
import HeartIcon from '@/components/shared/HeartIcon/HeartIcon';
import HeartIconFilled from '@/components/shared/HeartIconFilled/HeartIconFilled';
import { useLikeForum } from '@/hooks/forums/useLikeForum';
import type { Forum } from '@/types/Forum';
import { toast } from 'sonner';

interface ForumCardProps {
  forum: Forum;
  onClick: () => void;
}

export function ForumCard({ forum, onClick }: ForumCardProps) {
  const { user } = useAuth();
  const { likeMutation, unlikeMutation } = useLikeForum(forum.id);

  const contentPreview = forum.content.length > 150
    ? forum.content.substring(0, 150) + '...'
    : forum.content;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleLikeToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      toast('Please login to like!', { icon: '⚠️', id: 'login-to-like' });
      return;
    }

    if (likeMutation.isPending || unlikeMutation.isPending) {
      return;
    }

    if (forum.liked_by_current_user) {
      unlikeMutation.mutate();
    } else {
      likeMutation.mutate();
    }
  };

  const isLikePending = likeMutation.isPending || unlikeMutation.isPending;

  return (
    <div
      onClick={onClick}
      className="bg-white/5 border border-white/10 rounded-lg p-6 hover:bg-white/10 transition-colors cursor-pointer"
      data-testid={`forum-card-${forum.id}`}
    >
      <h3 className="text-xl font-semibold text-white mb-2" data-testid={`forum-card-title-${forum.id}`}>{forum.title}</h3>
      <p className="text-gray-300 mb-4 line-clamp-3" data-testid={`forum-card-content-${forum.id}`}>{contentPreview}</p>
      <div className="flex items-center justify-between text-sm text-gray-400">
        <span>By {forum.author}</span>
        <div className="flex items-center gap-4">
          <button
            className="flex items-center gap-1 focus:outline-none disabled:opacity-50"
            onClick={handleLikeToggle}
            disabled={isLikePending}
            aria-pressed={forum.liked_by_current_user}
            aria-label={forum.liked_by_current_user ? 'Unlike forum' : 'Like forum'}
            data-testid={`forum-card-like-button-${forum.id}`}
          >
            {forum.liked_by_current_user ? (
              <HeartIconFilled className="h-5 w-5 text-blue-600 transition-colors" data-testid={`forum-card-like-icon-filled-${forum.id}`} />
            ) : (
              <HeartIcon className="h-5 w-5 text-blue-400 transition-colors" data-testid={`forum-card-like-icon-outline-${forum.id}`} />
            )}
            <span className="text-sm text-gray-300 select-none pointer-events-none">{forum.likes || 0}</span>
          </button>
          <span>{formatDate(forum.timestamp)}</span>
        </div>
      </div>
    </div>
  );
}

export default ForumCard;
