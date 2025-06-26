import { useState, useRef, useCallback, memo } from "react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import UserInfo from "../UserInfo/UserInfo";
import { useDeleteComment } from "../../../hooks/comments/useDeleteComment";
import { usePostComment } from "../../../hooks/comments/usePostComments";
import { useMainComments } from "../../../hooks/comments/useMainComments";
import { useReplyComments } from "../../../hooks/comments/useRepliedComments";
import type { Comment } from "../../../types/Comment";

// --- Types ---
type ReplyListProps = {
  parentId: string;
  postId: string;
  onDeleteReply: (replyId: string, parentId: string) => void;
};

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

// --- Components ---

export const ReplyList = memo(function ReplyList({
  parentId,
  postId,
  onDeleteReply,
}: ReplyListProps) {
  const { comments: replies = [] } = useReplyComments(postId, parentId);
  if (!replies.length) return null;
  return (
    <div className="ml-6 mt-2 space-y-2">
      {replies.map((reply) => (
        <div key={reply.id} className="p-3 rounded bg-white/10 border border-white/10">
          <div className="flex items-center justify-between">
            <UserInfo userId={reply.user_id} />
            <button
              className="p-1 text-xs text-red-400 hover:text-red-300 hover:bg-white/5 rounded transition-colors"
              onClick={() => onDeleteReply(reply.id, parentId)}
              data-testid={`delete-reply-button-${reply.id}`}
            >
              Delete
            </button>
          </div>
          <div className="mt-1 text-gray-300">{reply.comment}</div>
        </div>
      ))}
    </div>
  );
});

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
  return (
    <div className="mb-4 p-4 rounded-lg bg-white/5 border border-white/10" data-testid={`comment-${comment.id}`}>
      <div className="flex items-center justify-between">
        <UserInfo userId={comment.user_id} />
        <div className="flex items-center space-x-2">
          <button
            className="p-1.5 text-sm text-blue-400 hover:text-blue-300 hover:bg-white/5 rounded-md transition-colors"
            onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
            data-testid={`reply-button-${comment.id}`}
          >
            Reply
          </button>
          <button
            className="p-1.5 text-sm text-red-400 hover:text-red-300 hover:bg-white/5 rounded-md transition-colors"
            onClick={() => handleDeleteComment(comment.id)}
            data-testid={`delete-button-${comment.id}`}
          >
            Delete
          </button>
        </div>
      </div>
      <div className="mt-2">
        <p className="text-gray-300" data-testid={`comment-text-${comment.id}`}>{comment.comment}</p>
      </div>
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

export default function Comments({ postId }: { postId: string }) {
  const queryClient = useQueryClient();
  const { mainComments, isLoading, error } = useMainComments(postId);
  const { mutateAsync: deleteCommentMutation } = useDeleteComment(postId);
  const { mutateAsync: postComment } = usePostComment(postId);
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
    queryClient.setQueryData(['mainComments', postId], (old: Comment[] | undefined) =>
      old ? old.filter(comment => comment.id !== commentId) : []
    );
    try {
      await deleteCommentMutation(commentId);
      toast.success("Comment deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["mainComments", postId] });
    } catch (error) {
      toast.error("Failed to delete comment");
      queryClient.invalidateQueries({ queryKey: ["mainComments", postId] });
    }
  }, [deleteCommentMutation, postId, queryClient]);

  const handleDeleteReply = useCallback(async (replyId: string, parentId: string) => {
    queryClient.setQueryData(['repliedComments', postId, parentId], (old: Comment[] | undefined) =>
      old ? old.filter(reply => reply.id !== replyId) : []
    );
    try {
      await deleteCommentMutation(replyId);
      toast.success("Reply deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["repliedComments", postId, parentId] });
    } catch (error) {
      toast.error("Failed to delete reply");
      queryClient.invalidateQueries({ queryKey: ["repliedComments", postId, parentId] });
    }
  }, [deleteCommentMutation, postId, queryClient]);

  const handleReply = useCallback(async (parentId: string) => {
    const text = replyText[parentId]?.trim() || "";
    if (!text) {
      toast.error("Please enter a reply");
      return;
    }
    try {
      const userId = "default_admin_id";
      const username = "admin";
      await postComment({
        comment: text,
        userId,
        username,
        postId,
        parentId,
      });

      queryClient.invalidateQueries({ queryKey: ["mainComments", postId] });
      toast.success("Reply added successfully");
      setReplyText((prev) => ({ ...prev, [parentId]: "" }));
      setReplyingTo(null);
      queryClient.invalidateQueries({ queryKey: ["repliedComments", postId, parentId] });
    } catch (error) {
      toast.error("Failed to add reply");
    }
  }, [postComment, postId, replyText, queryClient]);

  if (isLoading) return <div>Loading comments...</div>;
  if (error) return <div className="text-red-400">Error loading comments</div>;

  return (
    <div className="space-y-4" data-testid="comments-list">
      {(mainComments || []).map((mainComment) => (
        <CommentItem
          key={mainComment.id}
          comment={mainComment}
          replyingTo={replyingTo}
          replyText={replyText}
          setReplyText={setReplyText}
          setReplyingTo={setReplyingTo}
          setReplyInputRef={setReplyInputRef}
          handleReply={handleReply}
          handleDeleteComment={handleDeleteComment}
          postId={postId}
          handleDeleteReply={handleDeleteReply}
        />
      ))}
    </div>
  );
}