import React, { useState, useRef, useEffect } from "react";
import HeartIcon from '@/components/shared/HeartIcon/HeartIcon';
import HeartIconFilled from '@/components/shared/HeartIconFilled/HeartIconFilled';

export interface NestedComment {
  id: string;
  comment: string;
  user_id: string;
  username: string;
  likes?: number;
  liked_by_current_user?: boolean;
  timestamp: string;
}

interface NestedCommentListProps {
  replies: NestedComment[];
  parentId: string;
  onDeleteReply: (replyId: string, parentId: string) => void;
  onLikeToggle: (reply: NestedComment) => void;
  onEdit: (reply: NestedComment, newText: string) => Promise<void>;
  renderUserInfo: (userId: string) => React.ReactNode;
  isLikePending?: boolean;
  isEditPending?: boolean;
}

export const NestedCommentList: React.FC<NestedCommentListProps> = ({
  replies,
  parentId,
  onDeleteReply,
  onLikeToggle,
  onEdit,
  renderUserInfo,
  isLikePending,
  isEditPending,
}) => {
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

  if (!replies.length) return null;

  return (
    <div className="ml-4 mt-2 space-y-2 border-l-2 border-white/10 pl-4" data-testid="nested-comments-list">
      {replies.map((reply) => {
        const isEditing = editingId === reply.id;
        return (
          <div key={reply.id} className="p-3 rounded bg-white/10 border border-white/10" data-testid={`nested-comment-${reply.id}`}>
            <div className="flex items-center justify-between">
              {renderUserInfo(reply.user_id)}
              <div className="flex items-center space-x-2">
                <button
                  className="flex items-center gap-1 p-1 text-blue-400 hover:text-blue-300 hover:bg-white/5 rounded transition-colors"
                  onClick={() => onLikeToggle(reply)}
                  disabled={isLikePending}
                  aria-pressed={!!reply.liked_by_current_user}
                  data-testid={`nested-like-button-${reply.id}`}
                >
                  {reply.liked_by_current_user ? (
                    <HeartIconFilled className="h-4 w-4 text-blue-600" data-testid={`nested-like-icon-filled-${reply.id}`} />
                  ) : (
                    <HeartIcon className="h-4 w-4 text-blue-400" data-testid={`nested-like-icon-outline-${reply.id}`} />
                  )}
                  <span className="text-xs text-gray-300">{reply.likes || 0}</span>
                </button>
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
                  data-testid={`nested-edit-button-${reply.id}`}
                >
                  {isEditing ? "Cancel" : "Edit"}
                </button>
                <button
                  className="p-1 text-xs text-red-400 hover:text-red-300 hover:bg-white/5 rounded transition-colors"
                  onClick={() => onDeleteReply(reply.id, parentId)}
                  data-testid={`nested-delete-button-${reply.id}`}
                >
                  Delete
                </button>
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
                    disabled={editLoading || isEditPending}
                    data-testid={`nested-edit-input-${reply.id}`}
                  />
                  <div className="flex space-x-2 justify-end">
                    <button
                      className="px-2 py-1 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                      onClick={async () => {
                        setEditLoading(true);
                        await onEdit(reply, editValue);
                        setEditLoading(false);
                        setEditingId(null);
                      }}
                      disabled={editLoading || isEditPending}
                      data-testid={`nested-save-edit-${reply.id}`}
                    >
                      Save
                    </button>
                    <button
                      className="px-2 py-1 text-xs text-gray-300 hover:text-white hover:bg-white/5 rounded-md transition-colors"
                      onClick={() => {
                        setEditingId(null);
                        setEditValue("");
                      }}
                      disabled={editLoading || isEditPending}
                      data-testid={`nested-cancel-edit-${reply.id}`}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <span data-testid={`nested-comment-text-${reply.id}`}>{reply.comment}</span>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}; 