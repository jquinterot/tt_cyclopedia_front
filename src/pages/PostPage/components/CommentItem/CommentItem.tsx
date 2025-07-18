import { memo, useState, useRef, useEffect } from "react";
import UserInfo from "../UserInfo/UserInfo";
import { ReplyList } from "../ReplyList/ReplyList";
import type { Comment } from '@/types/Comment';
import { useAuth } from '@/contexts/AuthContext';
import HeartIcon from '@/components/shared/HeartIcon/HeartIcon';
import HeartIconFilled from '@/components/shared/HeartIconFilled/HeartIconFilled';
import { useLikeComment } from '@/hooks/comments/useLikeComment';
import { useEditComment } from '@/hooks/comments/useEditComment';
import toast from 'react-hot-toast';

type CommentItemProps = {
  comment: Comment;
  replyingTo: string | null;
  replyText: Record<string, string>;
  setReplyText: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  setReplyingTo: React.Dispatch<React.SetStateAction<string | null>>;
  setReplyInputRef: (commentId: string) => (el: HTMLTextAreaElement | null) => void;
  handleReply: (parentId: string) => void;
  handleDeleteComment: (commentId: string) => void;
  postId: string;
  handleDeleteReply: (replyId: string, parentId: string) => void;
};

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
  const { likeMutation, unlikeMutation } = useLikeComment(postId);
  const { mutateAsync: editCommentMutation } = useEditComment(postId);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(comment.comment);
  const [editLoading, setEditLoading] = useState(false);
  const editInputRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
      const val = editInputRef.current.value;
      editInputRef.current.setSelectionRange(val.length, val.length);
    }
  }, [isEditing]);

  const handleLikeToggle = () => {
    if (!user) {
      toast('Please login to like!', { icon: '⚠️', id: 'login-to-like' });
      return;
    }
    if (comment.liked_by_current_user) {
      unlikeMutation.mutate(comment.id);
    } else {
      likeMutation.mutate(comment.id);
    }
  };

  const handleEdit = async () => {
    setEditLoading(true);
    try {
      await editCommentMutation({ commentId: comment.id, commentText: editValue });
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

  return (
    <div className="mb-4 p-4 rounded-lg bg-white/5 border border-white/10" data-testid={`comment-${comment.id}`}>
      {/* 1. User info at the top */}
      <div className="flex flex-col items-start">
        <UserInfo userId={comment.user_id} />
        {/* 2. Options row below user info */}
        <div className="flex items-center space-x-2 mt-2 mb-2">
          <button
            className="p-1.5 text-sm text-blue-400 hover:text-blue-300 hover:bg-white/5 rounded-md transition-colors"
            onClick={handleReplyButton}
            data-testid={`reply-button-${comment.id}`}
          >
            Reply
          </button>
          {canEdit && (
            <button
              className="p-1.5 text-sm text-yellow-400 hover:text-yellow-300 hover:bg-white/5 rounded-md transition-colors"
              onClick={handleEditButton}
              data-testid={`edit-button-${comment.id}`}
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
          )}
          {canDelete && (
            <button
              className="p-1.5 text-sm text-red-400 hover:text-red-300 hover:bg-white/5 rounded-md transition-colors"
              onClick={() => handleDeleteComment(comment.id)}
              data-testid={`delete-button-${comment.id}`}
            >
              Delete
            </button>
          )}
        </div>
        {/* 3. Comment content below options */}
        <div className="mt-2 w-full">
          {isEditing ? (
            <div className="space-y-2">
              <textarea
                ref={editInputRef}
                className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                value={editValue}
                onChange={e => setEditValue(e.target.value)}
                rows={2}
                disabled={editLoading}
                data-testid={`edit-input-${comment.id}`}
              />
              <div className="flex space-x-2 justify-end">
                <button
                  className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  onClick={handleEdit}
                  disabled={editLoading}
                  data-testid={`save-edit-${comment.id}`}
                >
                  Save
                </button>
                <button
                  className="px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-md transition-colors"
                  onClick={() => { setIsEditing(false); setEditValue(comment.comment); }}
                  disabled={editLoading}
                  data-testid={`cancel-edit-${comment.id}`}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-300" data-testid={`comment-text-${comment.id}`}>{comment.comment}</p>
          )}
        </div>
        {/* 4. Likes at the bottom */}
        <div className="flex items-center mt-2">
          <button
            className="relative flex items-center gap-1 p-1.5 text-blue-400 hover:text-blue-300 hover:bg-white/5 rounded-md transition-colors group"
            onClick={handleLikeToggle}
            disabled={likeMutation.isPending || unlikeMutation.isPending}
            aria-pressed={!!comment.liked_by_current_user}
            data-testid={`like-button-${comment.id}`}
          >
            {comment.liked_by_current_user ? (
              <HeartIconFilled className="h-5 w-5 text-blue-600 transition-colors" data-testid={`like-icon-filled-${comment.id}`}/>
            ) : (
              <>
                <HeartIcon className="h-5 w-5 text-blue-400 transition-colors group-hover:opacity-0" data-testid={`like-icon-outline-${comment.id}`}/>
                <HeartIconFilled className="h-5 w-5 text-blue-600 absolute left-0 top-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" data-testid={`like-icon-filled-hover-${comment.id}`}/>
              </>
            )}
            <span className="text-sm text-gray-300">{comment.likes || 0}</span>
          </button>
        </div>
      </div>
      {/* Reply form and replies remain unchanged */}
      {replyingTo === comment.id && (
        <div className="mt-4 space-y-3" data-testid={`reply-form-${comment.id}`}>
          <textarea
            ref={setReplyInputRef(comment.id)}
            value={replyText[comment.id] || ""}
            onChange={(e) =>
              setReplyText((prev) => ({ ...prev, [comment.id]: e.target.value }))
            }
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleReply(comment.id);
              }
            }}
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
            placeholder="Write your reply..."
            rows={2}
            data-testid={`reply-input-${comment.id}`}
          />
          <div className="flex justify-end space-x-2">
            <button
              className="px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-md transition-colors"
              onClick={() => {
                setReplyingTo(null);
                setReplyText((prev) => ({ ...prev, [comment.id]: "" }));
              }}
              data-testid={`cancel-reply-${comment.id}`}
            >
              Cancel
            </button>
            <button
              className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              onClick={() => handleReply(comment.id)}
              data-testid={`submit-reply-${comment.id}`}
            >
              Reply
            </button>
          </div>
        </div>
      )}
      <ReplyList
        parentId={comment.id}
        postId={postId}
        onDeleteReply={handleDeleteReply}
      />
    </div>
  );
}); 