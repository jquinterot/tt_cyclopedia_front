import { memo } from "react";
import { useForumCommentReplies } from '@/hooks/forums/useForumCommentReplies';
import { useLikeForumComment } from '@/hooks/forums/useLikeForumComment';
import { useEditForumComment } from '@/hooks/forums/useEditForumComment';
import { NestedCommentList } from '@/components/shared/NestedCommentList/NestedCommentList';
import type { NestedComment } from '@/components/shared/NestedCommentList/NestedCommentList';

type ForumReplyListProps = {
  parentId: string;
  forumId: string;
  onDeleteReply: (replyId: string, parentId: string) => void;
};

export const ForumReplyList = memo(function ForumReplyList({
  parentId,
  forumId,
  onDeleteReply,
}: ForumReplyListProps) {
  const { replies: rawReplies = [] } = useForumCommentReplies(forumId, parentId);
  const replies: NestedComment[] = rawReplies.map((reply) => ({
    id: reply.id,
    comment: reply.comment,
    user_id: reply.user_id,
    username: reply.username,
    likes: reply.likes,
    liked_by_current_user: reply.liked_by_current_user,
    timestamp: reply.timestamp,
  }));
  const { likeMutation, unlikeMutation } = useLikeForumComment(forumId);
  const { mutateAsync: editCommentMutation } = useEditForumComment(forumId);

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
      renderUserInfo={() => null}
      isLikePending={likeMutation.isPending || unlikeMutation.isPending}
      isEditPending={false}
    />
  );
}); 