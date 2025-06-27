import { usePosts } from "../../../../../src/hooks/posts/usePosts";
import { useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import PostCard from "./PostCard/PostCard";
import SearchBar from "./SearchBar/SearchBar";

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

  if (!posts || posts.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-400">No posts available</div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8" data-testid="post-list-container">
      {/* Search Filter */}
      <div className="mb-8" data-testid="search-filter-section">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        {filteredPosts.length === 0 && searchQuery && (
          <div className="mt-4 text-center text-gray-400" data-testid="no-results-message">
            No posts found matching "{searchQuery}"
          </div>
        )}
      </div>
      {/* Posts List */}
      <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2" data-testid="posts-grid">
        {filteredPosts.map((post) => (
          <PostCard key={post.id} post={post} onClick={() => navigate(`/posts/${post.id}`)} />
        ))}
      </div>
    </div>
  );
}