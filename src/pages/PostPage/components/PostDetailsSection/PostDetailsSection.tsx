import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { usePostById } from "@/hooks/posts/usePostById";
import { usePostId } from "@/hooks/posts/usePostId";
import { useUpdatePost } from "@/hooks/posts/useUpdatePost";
import { useDeletePost } from "@/hooks/posts/useDeletePost";
import { useAuth } from "@/contexts/AuthContext";
import FormComment from "../FormCommentSection/FormCommentSection";
import PostInfoSection from "../PostInfoSection/PostInfoSection";
import { PostImage } from "@/components/shared/PostImage/PostImage";
import { PostStatsWrapper } from "@/components/shared/PostStats/PostStats";
import ActivityMap from "@/components/shared/ActivityMap/ActivityMap";
import { ActivityBadge, SkeletonPostDetail } from "@/components/ui";
import { ACTIVITY_TYPE_CONFIG } from "@/config/constants";

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
  const { user } = useAuth();
  const navigate = useNavigate();
  const updatePost = useUpdatePost();
  const deletePost = useDeletePost();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  useEffect(() => {
    if (id) updatePostId(id);
  }, [id, updatePostId]);

  const { post, error, isLoading } = usePostById(postId);

  if (error) return <ErrorMessage />;
  if (isLoading || !post) return <SkeletonPostDetail />;

  const isOwner = user && post && user.username === post.author;

  const handleEdit = () => {
    setEditTitle(post.title);
    setEditContent(post.content);
    setIsEditing(true);
  };

  const handleSaveEdit = async () => {
    const formData = new FormData();
    formData.append("title", editTitle);
    formData.append("content", editContent);
    await updatePost.mutateAsync({ postId, data: formData });
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this post?")) {
      await deletePost.mutateAsync(postId);
      navigate("/");
    }
  };

  const formatActivityDate = (dateString?: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const activityInfo =
    post.activityType && ACTIVITY_TYPE_CONFIG[post.activityType];

  return (
    <div
      className="w-full max-w-4xl mx-auto px-4 py-6"
      data-testid="post-details-container"
    >
      <div className="space-y-8">
        {isEditing ? (
          <div className="space-y-4">
            <input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-3xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
              data-testid="edit-post-title-input"
            />
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[200px]"
              data-testid="edit-post-content-input"
            />
            <div className="flex gap-3">
              <button
                onClick={handleSaveEdit}
                disabled={updatePost.isPending}
                className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                data-testid="save-post-edit"
              >
                {updatePost.isPending ? "Saving..." : "Save Changes"}
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-3 bg-white/5 text-gray-300 rounded-lg hover:bg-white/10 border border-white/10 transition-colors"
                data-testid="cancel-post-edit"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl text-center flex-1">
                {post.title}
              </h1>
              {isOwner && (
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={handleEdit}
                    className="px-4 py-2 text-sm bg-white/5 text-yellow-400 rounded-lg hover:bg-white/10 border border-white/10 transition-colors"
                    data-testid="edit-post-button"
                  >
                    Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={deletePost.isPending}
                    className="px-4 py-2 text-sm bg-white/5 text-red-400 rounded-lg hover:bg-white/10 border border-white/10 transition-colors disabled:opacity-50"
                    data-testid="delete-post-button"
                  >
                    {deletePost.isPending ? "Deleting..." : "Delete"}
                  </button>
                </div>
              )}
            </div>

            {post.equipment && (
              <div className="flex justify-center mt-3">
                <Link
                  to={`/equipment/${post.equipment.id}`}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-600/20 text-blue-400 border border-blue-500/30 hover:bg-blue-600/30 transition-colors"
                >
                  {post.equipment.brand} {post.equipment.name}
                </Link>
              </div>
            )}

            {activityInfo && post.activityDate && (
              <div className="flex items-center justify-center gap-4 mt-4">
                <ActivityBadge type={post.activityType!} />
                <span className="text-gray-300 flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {formatActivityDate(post.activityDate)}
                </span>
              </div>
            )}
          </div>
        )}

        <div className="rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 grid grid-cols-1 sm:grid-cols-2 gap-8 mb-6">
          <PostImage src={post.image_url} alt={post.title} />
          <PostStatsWrapper stats={post.stats} />
        </div>

        {post.location && <ActivityMap location={post.location} showFullMap />}
        <PostInfoSection post={post} />
      </div>
      <div
        className="mt-8 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 p-5"
        data-testid="comments-section"
      >
        {id && <FormComment postId={id} />}
      </div>
    </div>
  );
}
