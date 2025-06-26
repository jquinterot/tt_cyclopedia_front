import { useState, useRef, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useDeleteComment } from "../../../../hooks/comments/useDeleteComment";
import { usePostComment } from "../../../../hooks/comments/usePostComments";
import { useMainComments } from "../../../../hooks/comments/useMainComments";
import type { Comment } from "../../../../types/Comment";
import { CommentItem } from "../CommentItem/CommentItem";

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
      {(mainComments || []).map((mainComment: Comment) => (
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