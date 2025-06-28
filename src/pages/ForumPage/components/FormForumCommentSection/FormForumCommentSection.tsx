import { useRef } from "react";
import { Link } from "react-router-dom";
import { useForumComments } from '@/hooks/forums/useForumComments';
import { usePostForumComment } from '@/hooks/forums/usePostForumComment';
import { useLanguage } from '@/contexts/LanguageContext';
import { useQueryClient } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import ForumCommentsSection from "../ForumCommentsSection/ForumCommentsSection";
import type { Comment } from '@/types/Comment';
import { useAuth } from '@/contexts/AuthContext';

type TFunction = (key: string) => string;

interface ForumCommentInputProps {
  inputRef: React.RefObject<HTMLInputElement>;
  isAuthenticated: boolean;
  t: TFunction;
  handleAddComment: () => void;
}

function ForumCommentInput({
  inputRef,
  isAuthenticated,
  t,
  handleAddComment,
}: ForumCommentInputProps) {
  return (
    <form
      onSubmit={(ev) => {
        ev.preventDefault();
        handleAddComment();
      }}
      className="space-y-4"
      data-testid="forum-comment-form"
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
          data-testid="forum-comment-input"
        />
        {isAuthenticated ? (
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-sm font-medium text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            data-testid="forum-submit-comment"
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

interface ForumCommentsListProps {
  forumId: string;
  comments: Comment[];
  t: TFunction;
}

function ForumCommentsList({ forumId, comments, t }: ForumCommentsListProps) {
  return (
    <div className="space-y-4" data-testid="forum-comments-list-container">
      <h2 className="text-xl font-semibold" data-testid="forum-comments-count">
        {t("comments.title")} ({comments.length})
      </h2>
      <ForumCommentsSection forumId={forumId} />
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

export default function FormForumComment({ forumId }: { forumId: string }) {
  const { mutateAsync: postComment } = usePostForumComment(forumId);
  const { mainComments, error: getCommentError, isLoading: isLoadingComment } = useForumComments(forumId);
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
      queryClient.invalidateQueries({ queryKey: ["forumComments", forumId] });
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
    <div className="space-y-6" data-testid="forum-comment-form-container">
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

      <ForumCommentInput
        inputRef={inputRef}
        isAuthenticated={isAuthenticated}
        t={t}
        handleAddComment={handleAddComment}
      />

      {hasComments && (
        <ForumCommentsList forumId={forumId} comments={mainComments as Comment[]} t={t} />
      )}
    </div>
  );
} 