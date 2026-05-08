import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForum } from "@/hooks/forums/useForum";
import { useUpdateForum } from "@/hooks/forums/useUpdateForum";
import { useDeleteForum } from "@/hooks/forums/useDeleteForum";
import { useAuth } from "@/contexts/AuthContext";
import FormForumComment from "../FormCommentSection/FormCommentSection";
import ForumInfoSection from "../ForumInfoSection/ForumInfoSection";
import { SkeletonPostDetail } from "@/components/ui";

function ForumContent({ content }: { content: string }) {
  return (
    <div
      className="prose prose-invert max-w-none text-sm sm:text-base"
      data-testid="forum-content"
    >
      <p className="text-gray-300 text-xl leading-relaxed whitespace-pre-wrap">
        {content}
      </p>
    </div>
  );
}

function ErrorMessage() {
  return (
    <div className="w-full max-w-4xl text-center p-8 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
      <p className="text-red-400">Error getting the forum by Id</p>
    </div>
  );
}

export default function ForumDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { data: forum, error, isLoading, refetch } = useForum(id || "");
  const updateForum = useUpdateForum();
  const deleteForum = useDeleteForum();
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  if (error) return <ErrorMessage />;
  if (isLoading || !forum) return <SkeletonPostDetail />;

  const isOwner = user && forum.author === user.username;

  const handleEdit = () => {
    setEditTitle(forum.title);
    setEditContent(forum.content);
    setIsEditing(true);
  };

  const handleSaveEdit = async () => {
    await updateForum.mutateAsync({
      forumId: forum.id,
      data: { title: editTitle, content: editContent },
    });
    setIsEditing(false);
  };

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this forum?")) {
      await deleteForum.mutateAsync(forum.id);
      navigate("/forums");
    }
  };

  return (
    <div
      className="w-full max-w-4xl mx-auto px-4 py-6"
      data-testid="forum-details-container"
    >
      <div className="space-y-8">
        {isEditing ? (
          <div className="space-y-4">
            <input
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white text-3xl font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
              data-testid="edit-forum-title-input"
            />
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[200px]"
              data-testid="edit-forum-content-input"
            />
            <div className="flex gap-3">
              <button
                onClick={handleSaveEdit}
                disabled={updateForum.isPending}
                className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                data-testid="save-forum-edit"
              >
                {updateForum.isPending ? "Saving..." : "Save Changes"}
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-3 bg-white/5 text-gray-300 rounded-lg hover:bg-white/10 border border-white/10 transition-colors"
                data-testid="cancel-forum-edit"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl text-center flex-1">
                {forum.title}
              </h1>
              {isOwner && (
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={handleEdit}
                    className="px-4 py-2 text-sm bg-white/5 text-yellow-400 rounded-lg hover:bg-white/10 border border-white/10 transition-colors"
                    data-testid="edit-forum-button"
                  >
                    Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={deleteForum.isPending}
                    className="px-4 py-2 text-sm bg-white/5 text-red-400 rounded-lg hover:bg-white/10 border border-white/10 transition-colors disabled:opacity-50"
                    data-testid="delete-forum-button"
                  >
                    {deleteForum.isPending ? "Deleting..." : "Delete"}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        <div className="rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 p-6 mb-6">
          <ForumContent content={forum.content} />
        </div>
        <ForumInfoSection forum={forum} refetch={refetch} />
      </div>
      <div
        className="mt-8 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 p-5"
        data-testid="forum-comments-section"
      >
        {id && <FormForumComment forumId={id} />}
      </div>
    </div>
  );
}
