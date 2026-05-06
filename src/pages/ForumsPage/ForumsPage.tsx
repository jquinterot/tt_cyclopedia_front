import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForums, useLikeForum } from '@/hooks/forums';
import type { Forum } from '@/types/Forum';
import { useAuth } from '@/contexts/AuthContext';
import HeartIcon from '@/components/shared/HeartIcon/HeartIcon';
import HeartIconFilled from '@/components/shared/HeartIconFilled/HeartIconFilled';
import SearchBar from '@/components/shared/SearchBar/SearchBar';
import SEOHead from '@/components/SEO/SEOHead';
import { toast } from 'sonner';

// Forum Card Component
function ForumCard({ forum, onClick }: { forum: Forum; onClick: () => void }) {
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
    e.stopPropagation(); // Prevent parent handlers from firing
    if (!user) {
      toast('Please login to like!', { icon: '⚠️', id: 'login-to-like' });
      return;
    }
    
    // Prevent multiple simultaneous requests
    if (likeMutation.isPending || unlikeMutation.isPending) {
      return;
    }
    
    if (forum.liked_by_current_user) {
      unlikeMutation.mutate();
    } else {
      likeMutation.mutate();
    }
  };

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
            className="flex items-center gap-1 focus:outline-none"
            onClick={handleLikeToggle}
            disabled={likeMutation.isPending || unlikeMutation.isPending}
            aria-pressed={forum.liked_by_current_user}
            style={{ cursor: (likeMutation.isPending || unlikeMutation.isPending) ? 'not-allowed' : 'pointer', background: 'none', border: 'none', padding: 0 }}
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

// Main Forums Page Component
export default function ForumsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const { data: forums, isLoading, error } = useForums();
  const navigate = useNavigate();
  const { user } = useAuth();

  const filteredForums = useMemo(() => {
    if (!forums) return [];
    
    const sortedForums = [...forums].sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    if (!searchQuery.trim()) return sortedForums;
    
    const query = searchQuery.toLowerCase().trim();
    return sortedForums.filter(
      (forum) =>
        forum.title.toLowerCase().includes(query) ||
        forum.content.toLowerCase().includes(query) ||
        forum.author.toLowerCase().includes(query)
    );
  }, [forums, searchQuery]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-400">Error loading forums</div>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title="Forums - TT Cyclopedia"
        description="Explore table tennis forums and discussions. Share your experiences, ask questions, and connect with the TT Cyclopedia community."
        canonical="/forums"
      />
      <div className="max-w-6xl mx-auto px-4 py-8" data-testid="forums-page">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white" data-testid="forums-heading">Forums</h1>
        {user && (
          <button
            onClick={() => navigate('/create-forum')}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            data-testid="create-forum-button"
          >
            Create Forum
          </button>
        )}
      </div>

      <SearchBar 
        onSearch={setSearchQuery}
        placeholder="Search forums..."
      />

      {filteredForums.length === 0 && searchQuery && (
        <div className="text-center text-gray-400 mb-8">
          No forums found matching "{searchQuery}"
        </div>
      )}

      {filteredForums.length === 0 && !searchQuery && (
        <div className="text-center text-gray-400 mb-8">
          No forums available
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredForums.map((forum) => (
          <ForumCard
            key={forum.id}
            forum={forum}
            onClick={() => navigate(`/forums/${forum.id}`)}
          />
        ))}
      </div>
    </div>
    </>
  );
}