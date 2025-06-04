import { usePosts } from "../../../hooks/posts/usePosts";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";

// Static stats configuration
const CARD_STATS = [
  { label: "Speed", value: 7.5, color: "bg-red-500" },
  { label: "Spin", value: 8.2, color: "bg-green-500" },
  { label: "Control", value: 8.8, color: "bg-blue-500" },
  { label: "Overall", value: 8.3, color: "bg-purple-500" }
];

function StatBar({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div className="flex items-center gap-3 group py-2">
      <span className="text-sm font-medium text-gray-400 w-16 group-hover:text-white transition-colors">
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
      <span className="text-sm font-medium text-gray-300 w-10 text-right group-hover:text-white transition-colors">
        {value.toFixed(1)}
      </span>
    </div>
  );
}

export default function PostList() {
  const { posts, isLoading, error } = usePosts();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPosts = useMemo(() => {
    if (!posts) return [];
    
    const sortedPosts = [...posts].sort((a, b) => 
      a.title.toLowerCase().localeCompare(b.title.toLowerCase())
    );

    if (!searchQuery.trim()) return sortedPosts;

    const query = searchQuery.toLowerCase().trim();
    return sortedPosts.filter(post => 
      post.title.toLowerCase().includes(query) || 
      post.content.toLowerCase().includes(query)
    );
  }, [posts, searchQuery]);

  if (isLoading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  if (error) return (
    <div className="flex justify-center items-center h-64">
      <div className="text-gray-400">Error loading posts</div>
    </div>
  );

  if (!posts || posts.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-400">No posts available</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8" data-testid="post-list-container">
      {/* Search Filter Box */}
      <div className="mb-8" data-testid="search-filter-section">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search posts..."
            data-testid="post-search-input"
            className="w-full px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/10 
                     text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 
                     transition-colors duration-300"
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-4">
            <svg 
              data-testid="search-icon"
              className={`h-5 w-5 ${searchQuery ? 'text-blue-400' : 'text-gray-400'}`}
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        {filteredPosts.length === 0 && searchQuery && (
          <div className="mt-4 text-center text-gray-400" data-testid="no-results-message">
            No posts found matching "{searchQuery}"
          </div>
        )}
      </div>

      {/* Posts List */}
      <div className="space-y-8" data-testid="posts-grid">
        {filteredPosts.map((post) => (
          <article 
            key={post.id}
            data-testid={`post-card-${post.id}`}
            className="group rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 hover:border-white/20 
                       transition-all duration-300 cursor-pointer overflow-hidden"
            onClick={() => navigate(`/posts/${post.id}`)}
          >
            {/* Top Section: Image and Stats */}
            <div className="flex gap-6 p-6" data-testid={`post-content-${post.id}`}>
              {/* Image Section */}
              <div className="w-1/2 relative rounded-lg overflow-hidden" data-testid={`post-image-container-${post.id}`}>
                <div className="aspect-square relative">
                  <img
                    data-testid={`post-image-${post.id}`}
                    className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                    src={`${import.meta.env.VITE_API_BASE_URL}${post.image_url}`}
                    alt={post.title}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>

              {/* Stats Section */}
              <div className="w-1/2 flex flex-col justify-center" data-testid={`post-stats-section-${post.id}`}>
                <div className="rounded-lg p-6  h-full flex flex-col justify-center space-y-6">
                  <h3 className="text-lg font-semibold text-white mb-2" data-testid="stats-heading">Performance Stats</h3>
                  {CARD_STATS.map((stat) => (
                    <StatBar 
                      key={stat.label}
                      label={stat.label}
                      value={stat.value}
                      color={stat.color}
                      data-testid={`stat-bar-${stat.label.toLowerCase()}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Section: Content */}
            <div className="px-6 pb-6" data-testid={`post-details-${post.id}`}>
              <div className="pt-4 border-t border-white/10">
                <h2 className="text-2xl font-semibold text-white group-hover:text-blue-400 transition-colors mb-3" data-testid={`post-title-${post.id}`}>
                  {post.title}
                </h2>
                <p className="text-gray-300 text-base line-clamp-2 mb-4" data-testid={`post-excerpt-${post.id}`}>
                  {post.content}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-blue-400 hover:text-blue-300 transition-colors" data-testid={`read-more-${post.id}`}>
                    Read more →
                  </span>
                  <div className="flex items-center space-x-2" data-testid={`likes-container-${post.id}`}>
                    <svg className="h-5 w-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" data-testid={`like-icon-${post.id}`}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span className="text-sm text-gray-300">{post.likes || 0}</span>
                  </div>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
} 