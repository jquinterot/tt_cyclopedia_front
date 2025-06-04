import { Comment } from "../../../types/Comment";
import UserInfo from "../UserInfo/UserInfo";
import { useDeleteComment } from "../../../hooks/comments/useDeleteComment";
import { usePostComment } from "../../../hooks/comments/usePostComments";
import { useState, useRef } from "react";
import toast from "react-hot-toast";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export default function Comments({
  comments,
  postId,
}: {
  comments: Comment[];
  postId: string;
}) {
  const { mutateAsync: deleteCommentMutation } = useDeleteComment(postId);
  const { mutateAsync: postComment } = usePostComment(postId);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const replyInputRef = useRef<HTMLTextAreaElement>(null);

  const handleDeleteComment = async (commentId: string) => {
    try {
      await deleteCommentMutation(commentId);
      toast.success("Comment deleted successfully");
    } catch (error) {
      toast.error("Failed to delete comment");
    }
  };

  const handleReply = async (parentId: string) => {
    const replyText = replyInputRef.current?.value.trim() || "";
    
    if (!replyText) {
      toast.error("Please enter a reply");
      return;
    }

    try {
      await postComment({
        comment: replyText,
        userId: "default_admin_id",
        postId,
        parentId
      });
      toast.success("Reply added successfully");
      if (replyInputRef.current) replyInputRef.current.value = "";
      setReplyingTo(null);
    } catch (error) {
      toast.error("Failed to add reply");
    }
  };

  const CommentItem = ({ comment }: { comment: Comment }) => (
    <div className="mb-4 p-4 rounded-lg bg-white/5 border border-white/10" data-testid={`comment-${comment.id}`}>
      <div className="flex items-center justify-between">
        <UserInfo />
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

      <div className="mt-2 flex items-center space-x-0">
        <span className="text-sm text-gray-300" data-testid={`likes-count-${comment.id}`}>{comment.likes || 0}</span>
        <button className="p-2 rounded-full hover:bg-white/5 transition-colors" data-testid={`like-button-${comment.id}`}>
          <svg className="h-5 w-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>
      
      {replyingTo === comment.id && (
        <div className="mt-4 space-y-3" data-testid={`reply-form-${comment.id}`}>
          <textarea
            ref={replyInputRef}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleReply(comment.id);
              }
            }}
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
            placeholder="Write your reply..."
            rows={2}
            autoFocus
            data-testid={`reply-input-${comment.id}`}
          />
          <div className="flex justify-end space-x-2">
            <button
              className="px-3 py-1.5 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-md transition-colors"
              onClick={() => {
                setReplyingTo(null);
                if (replyInputRef.current) replyInputRef.current.value = "";
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
    </div>
  );

  return (
    <div className="space-y-4" data-testid="comments-list">
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
}