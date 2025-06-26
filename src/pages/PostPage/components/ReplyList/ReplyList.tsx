import { memo } from "react";
import { useReplyComments } from "../../../../hooks/comments/useRepliedComments";
import UserInfo from "../UserInfo/UserInfo";
import type { Comment } from "../../../../types/Comment";

type ReplyListProps = {
  parentId: string;
  postId: string;
  onDeleteReply: (replyId: string, parentId: string) => void;
};

export const ReplyList = memo(function ReplyList({
  parentId,
  postId,
  onDeleteReply,
}: ReplyListProps) {
  const { comments: replies = [] } = useReplyComments(postId, parentId);
  if (!replies.length) return null;
  return (
    <div className="ml-6 mt-2 space-y-2">
      {replies.map((reply: Comment) => (
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