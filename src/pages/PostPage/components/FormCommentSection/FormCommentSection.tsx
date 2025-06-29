import { useRef } from "react";
import { Link } from "react-router-dom";
import { useMainComments } from '@/hooks/comments/useMainComments';
import { usePostComment } from '@/hooks/comments/usePostComments';
import { useLanguage } from '@/contexts/LanguageContext';
import { useQueryClient } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import Comments from "../CommentsSection/CommentsSection";
import type { Comment } from '@/types/Comment';
import { useAuth } from '@/contexts/AuthContext';

type TFunction = (key: string) => string;

interface CommentInputProps {
  inputRef: React.RefObject<HTMLInputElement>;
  isAuthenticated: boolean;
  t: TFunction;
  handleAddComment: () => void;
}

function CommentInput({
  inputRef,
  isAuthenticated,
  t,
  handleAddComment,
}: CommentInputProps) {
  return (
    <form
      onSubmit={(ev) => {
        ev.preventDefault();
        handleAddComment();
      }}
      className="space-y-4"
      data-testid="comment-form"
    >
      <div className="space-y-2">
        <input
          ref={inputRef}
          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          type="text"
          placeholder={
            isAuthenticated
              ? t("form.comment.placeholder")
              : t("form.comment.signInPlaceholder")
          }
          disabled={!isAuthenticated}
          data-testid="comment-input"
        />
        {isAuthenticated ? (
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-sm font-medium text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            data-testid="submit-comment"
          >
            {t("form.comment.submit")}
          </button>
        ) : (
          <Link
            to="/login"
            className="inline-block px-4 py-2 bg-blue-600 text-sm font-medium text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            {t("form.comment.signInButton")}
          </Link>
        )}
      </div>
    </form>
  );
}

interface CommentsListProps {
  postId: string;
  comments: Comment[];
  t: TFunction;
}

function CommentsList({ postId, comments, t }: CommentsListProps) {
  return (
    <div className="space-y-4" data-testid="comments-list-container">
      <h2 className="text-xl font-semibold" data-testid="comments-count">
        {t("comments.title")} ({comments.length})
      </h2>
      <Comments postId={postId} />
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div className="flex justify-center py-4">
      <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
}

function ErrorMessage() {
  return <div className="text-red-400 text-sm">Error loading comments</div>;
}

// --- Main Component ---

export default function FormComment({ postId }: { postId: string }) {
  const { mutateAsync: postComment } = usePostComment(postId);
  const { mainComments, error: getCommentError, isLoading: isLoadingComment } = useMainComments(postId);
  const inputRef = useRef<HTMLInputElement>(null);
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const queryClient = useQueryClient();

  const handleAddComment = async () => {
    if (!isAuthenticated) {
      toast.error("Please sign in to comment");
      return;
    }

    const comment = inputRef.current?.value.trim() || "";

    if (!comment) {
      toast.error("Please enter a comment");
      return;
    }

    try {
      await postComment({
        comment,
        parentId: undefined,
      });
      queryClient.invalidateQueries({ queryKey: ["mainComments", postId] });
      toast.success("Comment added successfully");
      if (inputRef.current) inputRef.current.value = "";
    } catch (error) {
      toast.error("Failed to add comment");
    }
  };

  if (getCommentError) return <ErrorMessage />;
  if (isLoadingComment) return <LoadingSpinner />;

  const hasComments = mainComments && mainComments.length > 0;

  return (
    <div className="space-y-6" data-testid="comment-form-container">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />

      <CommentInput
        inputRef={inputRef}
        isAuthenticated={isAuthenticated}
        t={t}
        handleAddComment={handleAddComment}
      />

      {hasComments && (
        <CommentsList postId={postId} comments={mainComments as Comment[]} t={t} />
      )}
    </div>
  );
}