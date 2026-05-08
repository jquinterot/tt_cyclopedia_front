import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useForums } from "@/hooks/forums";
import { ForumCard } from "@/components/shared/ForumCard/ForumCard";
import SearchBar from "@/components/shared/SearchBar/SearchBar";
import SEOHead from "@/components/SEO/SEOHead";
import { SkeletonList } from "@/components/ui";
import { useAuth } from "@/contexts/AuthContext";

export default function ForumsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: forums, isLoading, error } = useForums();
  const navigate = useNavigate();
  const { user } = useAuth();

  const filteredForums = useMemo(() => {
    if (!forums) return [];

    const sortedForums = [...forums].sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
    );

    if (!searchQuery.trim()) return sortedForums;

    const query = searchQuery.toLowerCase().trim();
    return sortedForums.filter(
      (forum) =>
        forum.title.toLowerCase().includes(query) ||
        forum.content.toLowerCase().includes(query) ||
        forum.author.toLowerCase().includes(query),
    );
  }, [forums, searchQuery]);

  if (isLoading) return <SkeletonList />;

  if (error) {
    return (
      <div
        className="flex justify-center items-center h-64"
        data-testid="forums-error"
      >
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-400 mb-2">
            Unable to Load Forums
          </h2>
          <p className="text-gray-400">
            Something went wrong while loading the forums. Please try again
            later.
          </p>
        </div>
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
          <h1
            className="text-3xl font-bold text-white"
            data-testid="forums-heading"
          >
            Forums
          </h1>
          {user && (
            <button
              onClick={() => navigate("/create-forum")}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              data-testid="create-forum-button"
            >
              Create Forum
            </button>
          )}
        </div>

        <SearchBar onSearch={setSearchQuery} placeholder="Search forums..." />

        {filteredForums.length === 0 && searchQuery && (
          <div
            className="text-center text-gray-400 mb-8"
            data-testid="forums-no-search-results"
          >
            <svg
              className="mx-auto h-12 w-12 text-gray-500 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <h3 className="text-lg font-medium text-white mb-1">
              No forums found
            </h3>
            <p className="text-gray-400">
              No forums match "{searchQuery}". Try a different search term.
            </p>
          </div>
        )}

        {filteredForums.length === 0 && !searchQuery && (
          <div
            className="text-center text-gray-400 mb-8"
            data-testid="forums-empty-state"
          >
            <svg
              className="mx-auto h-12 w-12 text-gray-500 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
              />
            </svg>
            <h3 className="text-lg font-medium text-white mb-1">
              No forums yet
            </h3>
            <p className="text-gray-400">Be the first to start a discussion!</p>
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
