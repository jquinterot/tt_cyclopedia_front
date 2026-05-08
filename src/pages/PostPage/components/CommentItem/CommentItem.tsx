import { memo, useState, useRef, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useEditComment } from "@/hooks/comments/useEditComment";
import { useLikeCommentModern } from "@/hooks/comments/useLikeCommentModern";
import { toast } from "sonner";
import type { Comment } from "@/types/Comment";
import HeartIcon from "@/components/shared/HeartIcon/HeartIcon";
import HeartIconFilled from "@/components/shared/HeartIconFilled/HeartIconFilled";

interface CommentItemProps {
  comment: Comment;
  replyingTo: string | null;
  replyText: string;
  setReplyText: (text: string) => void;
  setReplyingTo: (commentId: string | null) => void;
  setReplyInputRef: (ref: HTMLTextAreaElement | null) => void;
  handleReply: (commentId: string) => void;
  handleDeleteComment: (commentId: string) => void;
  postId: string;
  handleDeleteReply: (commentId: string, parentId: string) => void;
}

export const CommentItem = memo(function CommentItem({
  comment,
  replyingTo,
  replyText,
  setReplyText,
  setReplyingTo,
  setReplyInputRef,
  handleReply,
  handleDeleteComment,
  postId,
  handleDeleteReply,
}: CommentItemProps) {
  const { user } = useAuth();
  const canEdit = user && comment.user_id === user.id;
  const canDelete = canEdit;
  const { mutateAsync: editCommentMutation } = useEditComment(postId);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(comment.comment);
  const [editLoading, setEditLoading] = useState(false);
  const editInputRef = useRef<HTMLTextAreaElement | null>(null);

  const { likes, liked, handleLike, isProcessing } = useLikeCommentModern({
    commentId: comment.id,
    postId,
    initialLikes: comment.likes || 0,
    initialLiked: comment.liked_by_current_user || false,
  });

  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
      const val = editInputRef.current.value;
      editInputRef.current.setSelectionRange(val.length, val.length);
    }
  }, [isEditing]);

  const handleLikeToggle = () => {
    if (!user) {
      toast("Please login to like!", { icon: "⚠️", id: "login-to-like" });
      return;
    }

    handleLike();
  };

  const handleEdit = async () => {
    setEditLoading(true);
    try {
      await editCommentMutation({
        commentId: comment.id,
        commentText: editValue,
      });
      setIsEditing(false);
    } finally {
      setEditLoading(false);
    }
  };

  const handleEditButton = () => {
    if (!isEditing) {
      setIsEditing(true);
      setReplyingTo(null);
    } else {
      setIsEditing(false);
      setEditValue(comment.comment);
    }
  };

  const handleReplyButton = () => {
    if (replyingTo === comment.id) {
      setReplyingTo(null);
    } else {
      setReplyingTo(comment.id);
      setIsEditing(false);
      setEditValue(comment.comment);
    }
  };

  const handleDelete = () => {
    if (comment.parent_id) {
      handleDeleteReply(comment.id, postId);
    } else {
      handleDeleteComment(comment.id);
    }
  };

  return (
    <div className="border-l-2 border-white/20 pl-4 mb-4">
      <div className="flex items-start space-x-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <span className="font-semibold text-white">
                {comment.username}
              </span>
              <span className="text-sm text-gray-400">
                {new Date(comment.timestamp).toLocaleDateString()}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={handleReplyButton}
                className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                disabled={isProcessing}
              >
                Reply
              </button>
              {canEdit && (
                <button
                  onClick={handleEditButton}
                  className="text-sm text-green-400 hover:text-green-300 transition-colors"
                  disabled={isProcessing}
                >
                  {isEditing ? "Cancel" : "Edit"}
                </button>
              )}
              {canDelete && (
                <button
                  onClick={handleDelete}
                  className="text-sm text-red-400 hover:text-red-300 transition-colors"
                  disabled={isProcessing}
                >
                  Delete
                </button>
              )}
            </div>
          </div>

          {isEditing ? (
            <div className="mb-2">
              <textarea
                ref={editInputRef}
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-colors"
                rows={3}
              />
              <div className="flex space-x-2 mt-2">
                <button
                  onClick={handleEdit}
                  disabled={editLoading}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
                >
                  {editLoading ? "Saving..." : "Save"}
                </button>
                <button
                  onClick={handleEditButton}
                  className="px-4 py-2 bg-white/5 text-gray-300 rounded-lg hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-300 mb-2">{comment.comment}</p>
          )}

          <div className="flex items-center space-x-2">
            <button
              className="flex items-center space-x-1 focus:outline-none"
              onClick={handleLikeToggle}
              disabled={isProcessing}
              aria-pressed={liked}
              data-testid={`like-button-${comment.id}`}
            >
              {liked ? (
                <HeartIconFilled
                  className="h-5 w-5 text-blue-600 transition-colors"
                  data-testid={`like-icon-filled-${comment.id}`}
                />
              ) : (
                <HeartIcon
                  className="h-5 w-5 text-blue-400 transition-colors"
                  data-testid={`like-icon-outline-${comment.id}`}
                />
              )}
              <span className="text-sm text-gray-300">{likes}</span>
            </button>
          </div>
        </div>
      </div>

      {replyingTo === comment.id && (
        <div className="mt-4 ml-4">
          <textarea
            ref={(el) => setReplyInputRef(el)}
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            placeholder="Write a reply..."
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-colors"
            rows={3}
          />
          <div className="flex space-x-2 mt-2">
            <button
              onClick={() => handleReply(comment.id)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Reply
            </button>
            <button
              onClick={() => setReplyingTo(null)}
              className="px-4 py-2 bg-white/5 text-gray-300 rounded-lg hover:bg-white/10 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
});
