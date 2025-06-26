import { memo } from "react";
import UserInfo from "../UserInfo/UserInfo";
import { ReplyList } from "../ReplyList/ReplyList";
import type { Comment } from "../../../../types/Comment";

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