import { useRef } from "react";
import { Link } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import toast, { Toaster } from "react-hot-toast";
import type { Comment } from '@/types/Comment';
import LoadingSpinner from '@/components/shared/LoadingSpinner/LoadingSpinner';

// Types for hooks and props
export interface GenericFormCommentSectionProps {
  id: string; // postId or forumId
  useMainComments: (id: string) => { mainComments: Comment[]; error: unknown; isLoading: boolean };
  usePostComment: (id: string) => { mutateAsync: (data: { comment: string; parentId?: string }) => Promise<unknown> };
  isAuthenticated: boolean;
  t: (key: string) => string;
  testIdPrefix?: string;
  CommentsSectionComponent: React.ComponentType<{ id: string }>;
}

function GenericCommentInput({
  inputRef,
  isAuthenticated,
  t,
  handleAddComment,
  testIdPrefix = "",
}: {
  inputRef: React.RefObject<HTMLInputElement>;
  isAuthenticated: boolean;
  t: (key: string) => string;
  handleAddComment: () => void;
  testIdPrefix?: string;
}) {
  return (
    <form
      onSubmit={(ev) => {
        ev.preventDefault();
        handleAddComment();
      }}
      className="space-y-4"
      data-testid={`${testIdPrefix}comment-form`}
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
          data-testid={`${testIdPrefix}comment-input`}
        />
        {isAuthenticated ? (
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-sm font-medium text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            data-testid={`${testIdPrefix}submit-comment`}
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

function GenericCommentsList({ id, comments, t, testIdPrefix = "", CommentsSectionComponent }: {
  id: string;
  comments: Comment[];
  t: (key: string) => string;
  testIdPrefix?: string;
  CommentsSectionComponent: React.ComponentType<{ id: string }>;
}) {
  return (
    <div className="space-y-4" data-testid={`${testIdPrefix}comments-list-container`}>
      <h2 className="text-xl font-semibold" data-testid={`${testIdPrefix}comments-count`}>
        {t("comments.title")} ({comments.length})
      </h2>
      <CommentsSectionComponent id={id} />
    </div>
  );
}

function ErrorMessage() {
  return <div className="text-red-400 text-sm">Error loading comments</div>;
}

export default function GenericFormCommentSection({
  id,
  useMainComments,
  usePostComment,
  isAuthenticated,
  t,
  testIdPrefix = "",
  CommentsSectionComponent,
}: GenericFormCommentSectionProps) {
  const { mutateAsync: postComment } = usePostComment(id);
  const { mainComments, error: getCommentError, isLoading: isLoadingComment } = useMainComments(id);
  const inputRef = useRef<HTMLInputElement>(null);
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
      queryClient.invalidateQueries();
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
    <div className="space-y-6" data-testid={`${testIdPrefix}comment-form-container`}>
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

      <GenericCommentInput
        inputRef={inputRef}
        isAuthenticated={isAuthenticated}
        t={t}
        handleAddComment={handleAddComment}
        testIdPrefix={testIdPrefix}
      />

      {hasComments && (
        <GenericCommentsList
          id={id}
          comments={mainComments as Comment[]}
          t={t}
          testIdPrefix={testIdPrefix}
          CommentsSectionComponent={CommentsSectionComponent}
        />
      )}
    </div>
  );
} 