import { memo } from "react";
import { useReplyComments } from '@/hooks/comments/useRepliedComments';
import UserInfo from "../UserInfo/UserInfo";
import { useLikeComment } from '@/hooks/comments/useLikeComment';
import { useEditComment } from '@/hooks/comments/useEditComment';
import { NestedCommentList, NestedComment } from '@/components/shared/NestedCommentList/NestedCommentList';

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
  const { likeMutation, unlikeMutation } = useLikeComment(postId);
  const { mutateAsync: editCommentMutation } = useEditComment(postId);

  const handleLikeToggle = (reply: NestedComment) => {
    if (reply.liked_by_current_user) {
      unlikeMutation.mutate(reply.id);
    } else {
      likeMutation.mutate(reply.id);
    }
  };

  const handleEdit = async (reply: NestedComment, newText: string) => {
    await editCommentMutation({ commentId: reply.id, commentText: newText });
  };

  return (
    <NestedCommentList
      replies={replies}
      parentId={parentId}
      onDeleteReply={onDeleteReply}
      onLikeToggle={handleLikeToggle}
      onEdit={handleEdit}
      renderUserInfo={(userId) => <UserInfo userId={userId} />}
      isLikePending={likeMutation.isPending || unlikeMutation.isPending}
      isEditPending={false}
    />
  );
}); 