import { memo } from "react";
import { useForumComments } from '@/hooks/forums/useForumComments';
import { useForumCommentReplies } from '@/hooks/forums/useForumCommentReplies';
import UserInfo from "../../../PostPage/components/UserInfo/UserInfo";
import { useLikeForumComment } from '@/hooks/forums/useLikeForumComment';
import { useEditForumComment } from '@/hooks/forums/useEditForumComment';
import { useDeleteForumComment } from '@/hooks/forums/useDeleteForumComment';
import { usePostForumComment } from '@/hooks/forums/usePostForumComment';
import { useAuth } from '@/contexts/AuthContext';
import HeartIcon from '@/components/shared/HeartIcon';
import HeartIconFilled from '@/components/shared/HeartIconFilled';
import type { Comment } from '@/types/Comment';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

type ForumCommentTreeProps = {
  forumId: string;
};

// Individual reply component (matches post reply structure exactly)
const ForumReply = memo(function ForumReply({
  reply,
  onDeleteReply,
  onLikeToggle,
  onEdit,
}: {
  reply: Comment;
  onDeleteReply: (replyId: string, parentId: string) => void;
  onLikeToggle: (reply: Comment) => void;
  onEdit: (reply: Comment, newText: string) => Promise<void>;
}) {
  const { user } = useAuth();
  const canEdit = user && reply.user_id === user.id;
  const canDelete = canEdit;
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(reply.comment);
  const [editLoading, setEditLoading] = useState(false);
  const editInputRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
      const val = editInputRef.current.value;
      editInputRef.current.setSelectionRange(val.length, val.length);
    }
  }, [isEditing]);

  const handleEdit = async () => {
    setEditLoading(true);
    try {
      await onEdit(reply, editValue);
      setIsEditing(false);
    } finally {
      setEditLoading(false);
    }
  };

  return (
    <div className="p-3 rounded bg-white/10 border border-white/10">
      <div className="flex items-center justify-between">
        <section className="flex justify-start items-center" data-testid="user-info">
          <UserInfo userId={reply.user_id} />
        </section>
        <div className="flex items-center space-x-2">
          <button
            className="flex items-center gap-1 p-1 text-blue-400 hover:text-blue-300 hover:bg-white/5 rounded transition-colors"
            onClick={() => onLikeToggle(reply)}
            aria-pressed={!!reply.liked_by_current_user}
          >
            {reply.liked_by_current_user ? (
              <HeartIconFilled className="h-4 w-4 text-blue-600" />
            ) : (
              <HeartIcon className="h-4 w-4 text-blue-400" />
            )}
            <span className="text-xs text-gray-300">{reply.likes || 0}</span>
          </button>
          {canEdit && (
            <button
              className="p-1 text-xs text-yellow-400 hover:text-yellow-300 hover:bg-white/5 rounded transition-colors"
              onClick={() => setIsEditing(!isEditing)}
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
          )}
          {canDelete && (
            <button
              className="p-1 text-xs text-red-400 hover:text-red-300 hover:bg-white/5 rounded transition-colors"
              onClick={() => onDeleteReply(reply.id, reply.parent_id || '')}
            >
              Delete
            </button>
          )}
        </div>
      </div>
      <div className="mt-1 text-gray-300">
        {isEditing ? (
          <div className="space-y-2">
            <textarea
              ref={editInputRef}
              className="w-full px-2 py-1 bg-white/5 border border-white/10 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none text-xs"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              rows={2}
              disabled={editLoading}
            />
            <div className="flex space-x-2 justify-end">
              <button
                className="px-2 py-1 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                onClick={handleEdit}
                disabled={editLoading}
              >
                Save
              </button>
              <button
                className="px-2 py-1 text-xs text-gray-300 hover:text-white hover:bg-white/5 rounded-md transition-colors"
                onClick={() => { setIsEditing(false); setEditValue(reply.comment); }}
                disabled={editLoading}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          reply.comment
        )}
      </div>
    </div>
  );
});

// Parent comment with nested replies (matches post structure exactly)
const ForumCommentWithReplies = memo(function ForumCommentWithReplies({
  comment,
  forumId,
  onDeleteComment,
  onDeleteReply,
  onReply,
  replyingTo,
  replyText,
  setReplyText,
  setReplyingTo,
  setReplyInputRef,
}: {
  comment: Comment;
  forumId: string;
  onDeleteComment: (commentId: string) => void;
  onDeleteReply: (replyId: string, parentId: string) => void;
  onReply: (parentId: string) => void;
  replyingTo: string | null;
  replyText: Record<string, string>;
  setReplyText: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  setReplyingTo: React.Dispatch<React.SetStateAction<string | null>>;
  setReplyInputRef: (commentId: string) => (el: HTMLTextAreaElement | null) => void;
}) {
  const { user } = useAuth();
  const canEdit = user && comment.user_id === user.id;
  const canDelete = canEdit;
  const { replies = [], isLoading: repliesLoading, error: repliesError } = useForumCommentReplies(forumId, comment.id);
  const { likeMutation, unlikeMutation } = useLikeForumComment(forumId);
  const { mutateAsync: editCommentMutation } = useEditForumComment(forumId);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(comment.comment);
  const [editLoading, setEditLoading] = useState(false);
  const editInputRef = useRef<HTMLTextAreaElement | null>(null);

  console.log('📋 ForumCommentWithReplies for comment:', comment.id, 'replies:', replies, 'loading:', repliesLoading, 'error:', repliesError);

  useEffect(() => {
    if (isEditing && editInputRef.current) {
      editInputRef.current.focus();
      const val = editInputRef.current.value;
      editInputRef.current.setSelectionRange(val.length, val.length);
    }
  }, [isEditing]);

  const handleLikeToggle = () => {
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

  const handleReplyLikeToggle = (reply: Comment) => {
    if (reply.liked_by_current_user) {
      unlikeMutation.mutate(reply.id);
    } else {
      likeMutation.mutate(reply.id);
    }
  };

  const handleReplyEdit = async (reply: Comment, newText: string) => {
    await editCommentMutation({ commentId: reply.id, commentText: newText });
  };

  return (
    <div className="mb-4 p-4 rounded-lg bg-white/5 border border-white/10" data-testid={`forum-comment-${comment.id}`}>
      <div className="flex items-center justify-between">
        <section className="flex justify-start items-center" data-testid="user-info">
          <UserInfo userId={comment.user_id} />
        </section>
        <div className="flex items-center space-x-2">
          <button
            className="flex items-center gap-1 p-1.5 text-blue-400 hover:text-blue-300 hover:bg-white/5 rounded-md transition-colors"
            onClick={handleLikeToggle}
            disabled={likeMutation.isPending || unlikeMutation.isPending}
            aria-pressed={!!comment.liked_by_current_user}
            data-testid={`forum-like-button-${comment.id}`}
          >
            {comment.liked_by_current_user ? (
              <HeartIconFilled className="h-5 w-5 text-blue-600 transition-colors" data-testid={`forum-like-icon-filled-${comment.id}`}/>
            ) : (
              <HeartIcon className="h-5 w-5 text-blue-400 transition-colors" data-testid={`forum-like-icon-outline-${comment.id}`}/>
            )}
            <span className="text-sm text-gray-300">{comment.likes || 0}</span>
          </button>
          <button
            className="p-1.5 text-sm text-blue-400 hover:text-blue-300 hover:bg-white/5 rounded-md transition-colors"
            onClick={handleReplyButton}
            data-testid={`forum-reply-button-${comment.id}`}
          >
            Reply
          </button>
          {canEdit && (
            <button
              className="p-1.5 text-sm text-yellow-400 hover:text-yellow-300 hover:bg-white/5 rounded-md transition-colors"
              onClick={handleEditButton}
              data-testid={`forum-edit-button-${comment.id}`}
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </button>
          )}
          {canDelete && (
            <button
              className="p-1.5 text-sm text-red-400 hover:text-red-300 hover:bg-white/5 rounded-md transition-colors"
              onClick={() => onDeleteComment(comment.id)}
              data-testid={`forum-delete-button-${comment.id}`}
            >
              Delete
            </button>
          )}
        </div>
      </div>
      
      <div className="mt-2">
        {isEditing ? (
          <div className="space-y-2">
            <textarea
              ref={editInputRef}
              className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
              value={editValue}
              onChange={e => setEditValue(e.target.value)}
              rows={2}
              disabled={editLoading}
              data-testid={`forum-edit-input-${comment.id}`}
            />
            <div className="flex space-x-2 justify-end">
              <button
                className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                onClick={handleEdit}
                disabled={editLoading}
                data-testid={`forum-save-edit-${comment.id}`}
              >
                Save
              </button>
              <button
                className="px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-md transition-colors"
                onClick={() => { setIsEditing(false); setEditValue(comment.comment); }}
                disabled={editLoading}
                data-testid={`forum-cancel-edit-${comment.id}`}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <p className="text-gray-300" data-testid={`forum-comment-text-${comment.id}`}>{comment.comment}</p>
        )}
      </div>

      {/* Reply Form */}
      {replyingTo === comment.id && (
        <div className="mt-4 space-y-3" data-testid={`forum-reply-form-${comment.id}`}>
          <textarea
            ref={setReplyInputRef(comment.id)}
            value={replyText[comment.id] || ""}
            onChange={(e) =>
              setReplyText((prev) => ({ ...prev, [comment.id]: e.target.value }))
            }
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                onReply(comment.id);
              }
            }}
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
            placeholder="Write your reply..."
            rows={2}
            data-testid={`forum-reply-input-${comment.id}`}
          />
          <div className="flex justify-end space-x-2">
            <button
              className="px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-md transition-colors"
              onClick={() => {
                setReplyingTo(null);
                setReplyText((prev) => ({ ...prev, [comment.id]: "" }));
              }}
              data-testid={`forum-cancel-reply-${comment.id}`}
            >
              Cancel
            </button>
            <button
              className="px-3 py-1.5 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              onClick={() => onReply(comment.id)}
              data-testid={`forum-submit-reply-${comment.id}`}
            >
              Reply
            </button>
          </div>
        </div>
      )}

      {/* Nested Replies - matches post structure exactly */}
      {replies.length > 0 && (
        <div className="ml-4 mt-2 space-y-2 border-l-2 border-white/10 pl-4">
          {replies.map((reply) => (
            <ForumReply
              key={reply.id}
              reply={reply}
              onDeleteReply={onDeleteReply}
              onLikeToggle={handleReplyLikeToggle}
              onEdit={handleReplyEdit}
            />
          ))}
        </div>
      )}
    </div>
  );
});

// Main ForumCommentTree component
export const ForumCommentTree = memo(function ForumCommentTree({
  forumId,
}: ForumCommentTreeProps) {
  const queryClient = useQueryClient();
  const { mainComments, isLoading, error } = useForumComments(forumId);
  const { mutateAsync: deleteCommentMutation } = useDeleteForumComment(forumId);
  const { mutateAsync: postComment } = usePostForumComment(forumId);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState<Record<string, string>>({});
  const replyInputRefs = useRef<Record<string, HTMLTextAreaElement | null>>({});

  const setReplyInputRef = useCallback(
    (commentId: string) => (el: HTMLTextAreaElement | null) => {
      replyInputRefs.current[commentId] = el;
      if (replyingTo === commentId && el) {
        el.focus();
        const val = el.value;
        el.value = "";
        el.value = val;
      }
    },
    [replyingTo]
  );

  const handleDeleteComment = useCallback(async (commentId: string) => {
    queryClient.setQueryData(['forumComments', forumId], (old: Comment[] | undefined) =>
      old ? old.filter(comment => comment.id !== commentId) : []
    );
    try {
      await deleteCommentMutation(commentId);
      toast.success("Comment deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["forumComments", forumId] });
    } catch (error) {
      toast.error("Failed to delete comment");
      queryClient.invalidateQueries({ queryKey: ["forumComments", forumId] });
    }
  }, [deleteCommentMutation, forumId, queryClient]);

  const handleDeleteReply = useCallback(async (replyId: string, parentId: string) => {
    queryClient.setQueryData(['forumCommentReplies', forumId, parentId], (old: Comment[] | undefined) =>
      old ? old.filter(reply => reply.id !== replyId) : []
    );
    try {
      await deleteCommentMutation(replyId);
      toast.success("Reply deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["forumCommentReplies", forumId, parentId] });
    } catch (error) {
      toast.error("Failed to delete reply");
      queryClient.invalidateQueries({ queryKey: ["forumCommentReplies", forumId, parentId] });
    }
  }, [deleteCommentMutation, forumId, queryClient]);

  const handleReply = useCallback(async (parentId: string) => {
    console.log('🚀 handleReply called with parentId:', parentId);
    const text = replyText[parentId]?.trim() || "";
    console.log('📝 Reply text:', text);
    if (!text) {
      toast.error("Please enter a reply");
      return;
    }
    try {
      console.log('📤 Calling postComment with:', { comment: text, parentId });
      await postComment({
        comment: text,
        parentId,
      });

      console.log('✅ postComment successful, invalidating queries');
      queryClient.invalidateQueries({ queryKey: ["forumComments", forumId] });
      toast.success("Reply added successfully");
      setReplyText((prev) => ({ ...prev, [parentId]: "" }));
      setReplyingTo(null);
      console.log('🔄 Invalidating forum replies for parent:', parentId);
      queryClient.invalidateQueries({ queryKey: ["forumCommentReplies", forumId, parentId] });
    } catch (error) {
      console.error('❌ Error in handleReply:', error);
      toast.error("Failed to add reply");
    }
  }, [postComment, forumId, replyText, queryClient]);

  if (isLoading) return <div>Loading comments...</div>;
  if (error) return <div className="text-red-400">Error loading comments</div>;

  return (
    <div className="space-y-4" data-testid="forum-comment-tree">
      {(mainComments || []).map((mainComment: Comment) => (
        <ForumCommentWithReplies
          key={mainComment.id}
          comment={mainComment}
          forumId={forumId}
          onDeleteComment={handleDeleteComment}
          onDeleteReply={handleDeleteReply}
          onReply={handleReply}
          replyingTo={replyingTo}
          replyText={replyText}
          setReplyText={setReplyText}
          setReplyingTo={setReplyingTo}
          setReplyInputRef={setReplyInputRef}
        />
      ))}
    </div>
  );
}); 