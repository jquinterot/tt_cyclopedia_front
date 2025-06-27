import { memo, useState, useRef, useEffect } from "react";
import { useReplyComments } from '@/hooks/comments/useRepliedComments';
import UserInfo from "../UserInfo/UserInfo";
import type { Comment } from '@/types/Comment';
import { useAuth } from '@/contexts/AuthContext';
import HeartIcon from '@/components/shared/HeartIcon';
import HeartIconFilled from '@/components/shared/HeartIconFilled';
import { useLikeComment } from '@/hooks/comments/useLikeComment';
import { useEditComment } from '@/hooks/comments/useEditComment';

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
  const { user } = useAuth();
  const { likeMutation, unlikeMutation } = useLikeComment(postId);
  const { mutateAsync: editCommentMutation } = useEditComment(postId);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [editLoading, setEditLoading] = useState(false);
  const editInputRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (editingId && editInputRef.current) {
      editInputRef.current.focus();
      const val = editInputRef.current.value;
      editInputRef.current.setSelectionRange(val.length, val.length);
    }
  }, [editingId]);

  const handleLikeToggle = (reply: Comment) => {
    if (reply.liked_by_current_user) {
      unlikeMutation.mutate(reply.id);
    } else {
      likeMutation.mutate(reply.id);
    }
  };

  const handleEdit = async (reply: Comment) => {
    setEditLoading(true);
    try {
      await editCommentMutation({ commentId: reply.id, commentText: editValue });
      setEditingId(null);
    } finally {
      setEditLoading(false);
    }
  };

  if (!replies.length) return null;

  return (
    <div className="ml-6 mt-2 space-y-2">
      {replies.map((reply: Comment) => {
        const canEdit = user && reply.user_id === user.id;
        const canDelete = canEdit;
        const isEditing = editingId === reply.id;
        return (
          <div key={reply.id} className="p-3 rounded bg-white/10 border border-white/10">
            <div className="flex items-center justify-between">
              <UserInfo userId={reply.user_id} />
              <div className="flex items-center space-x-2">
                <button
                  className="flex items-center gap-1 p-1 text-blue-400 hover:text-blue-300 hover:bg-white/5 rounded transition-colors"
                  onClick={() => handleLikeToggle(reply)}
                  disabled={likeMutation.isPending || unlikeMutation.isPending}
                  aria-pressed={!!reply.liked_by_current_user}
                  data-testid={`like-reply-button-${reply.id}`}
                >
                  {reply.liked_by_current_user ? (
                    <HeartIconFilled className="h-4 w-4 text-blue-600 transition-colors" data-testid={`like-icon-filled-reply-${reply.id}`}/>
                  ) : (
                    <HeartIcon className="h-4 w-4 text-blue-400 transition-colors" data-testid={`like-icon-outline-reply-${reply.id}`}/>
                  )}
                  <span className="text-xs text-gray-300">{reply.likes || 0}</span>
                </button>
                {canEdit && (
                  <button
                    className="p-1 text-xs text-yellow-400 hover:text-yellow-300 hover:bg-white/5 rounded transition-colors"
                    onClick={() => {
                      if (isEditing) {
                        setEditingId(null);
                        setEditValue("");
                      } else {
                        setEditingId(reply.id);
                        setEditValue(reply.comment);
                      }
                    }}
                    data-testid={`edit-reply-button-${reply.id}`}
                  >
                    {isEditing ? 'Cancel' : 'Edit'}
                  </button>
                )}
                {canDelete && (
                  <button
                    className="p-1 text-xs text-red-400 hover:text-red-300 hover:bg-white/5 rounded transition-colors"
                    onClick={() => onDeleteReply(reply.id, parentId)}
                    data-testid={`delete-reply-button-${reply.id}`}
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
                    onChange={e => setEditValue(e.target.value)}
                    rows={2}
                    disabled={editLoading}
                    data-testid={`edit-reply-input-${reply.id}`}
                  />
                  <div className="flex space-x-2 justify-end">
                    <button
                      className="px-2 py-1 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                      onClick={() => handleEdit(reply)}
                      disabled={editLoading}
                      data-testid={`save-edit-reply-${reply.id}`}
                    >
                      Save
                    </button>
                    <button
                      className="px-2 py-1 text-xs text-gray-300 hover:text-white hover:bg-white/5 rounded-md transition-colors"
                      onClick={() => { setEditingId(null); setEditValue(""); }}
                      disabled={editLoading}
                      data-testid={`cancel-edit-reply-${reply.id}`}
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
      })}
    </div>
  );
}); 