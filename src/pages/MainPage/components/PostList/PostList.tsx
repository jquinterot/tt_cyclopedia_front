import { usePosts } from '@/hooks/posts/usePosts';
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import PostCard from "./PostCard/PostCard";
import SearchBar from "@/components/shared/SearchBar/SearchBar";

// --- Main PostList Component ---
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
    return sortedPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.content.toLowerCase().includes(query)
    );
  }, [posts, searchQuery]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64" data-testid="post-list-loading">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-400">Error loading posts</div>
      </div>
    );

  return (
    <div className="max-w-6xl w-full mx-auto" data-testid="post-list-container">
      {/* Header with Title and Create Button */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-white">Posts</h1>
        <button
          onClick={() => navigate('/createPost')}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          data-testid="create-post-button"
        >
          Create Post
        </button>
      </div>

      {/* Search Filter */}
      <SearchBar 
        value={searchQuery} 
        onChange={setSearchQuery} 
        placeholder="Search posts..."
        testId="post-search-input"
      />

      {/* No Results Message */}
      {filteredPosts.length === 0 && searchQuery && (
        <div className="text-center text-gray-400 mb-8" data-testid="no-results-message">
          No posts found matching "{searchQuery}"
        </div>
      )}

      {/* No Posts Available Message */}
      {filteredPosts.length === 0 && !searchQuery && (
        <div className="text-center text-gray-400 mb-8">
          No posts available
        </div>
      )}

      {/* Posts List */}
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3" data-testid="posts-grid">
        {filteredPosts.map((post) => (
          <PostCard key={post.id} post={post} onClick={() => navigate(`/posts/${post.id}`)} />
        ))}
      </div>
    </div>
  );
}