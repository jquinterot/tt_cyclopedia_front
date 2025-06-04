import { useComments } from "../../../hooks/comments/useComments";
import { usePostComment } from "../../../hooks/comments/usePostComments";
import { useRef } from "react";
import Comments from "../Comments/Comments";
import toast, { Toaster } from "react-hot-toast";

export default function FormComment({ postId }: { postId: string }) {
  const { mutateAsync: postComment } = usePostComment(postId);
  const { comments, error: getCommentError, isLoading: isLoadingComment } = useComments(postId);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddComment = async () => {
    const comment = inputRef.current?.value.trim() || "";
    
    if (!comment) {
      toast.error("Please enter a comment");
      return;
    }

    try {
      await postComment({
        comment,
        userId: "default_admin_id",
        postId,
      });
      
      toast.success("Comment added successfully");
      if (inputRef.current) inputRef.current.value = "";
    } catch (error) {
      toast.error("Failed to add comment");
    }
  };

  if (getCommentError) return (
    <div className="text-red-400 text-sm">Error loading comments</div>
  );
  
  if (isLoadingComment) return (
    <div className="flex justify-center py-4">
      <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );

  const hasComments = comments && comments.length > 0;

  return (
    <div className="space-y-6" data-testid="comment-form-container">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: '#363636',
            color: '#fff',
          },
        }}
      />
      
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
            placeholder="Write a comment..."
            data-testid="comment-input"
          />
          <button 
            type="submit"
            className="px-4 py-2 bg-blue-600 text-sm font-medium text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            data-testid="submit-comment"
          >
            Add Comment
          </button>
        </div>
      </form>

      {hasComments && (
        <div className="space-y-4" data-testid="comments-list-container">
          <h2 className="text-xl font-semibold" data-testid="comments-count">Comments ({comments.length})</h2>
          <Comments comments={comments} postId={postId} />
        </div>
      )}
    </div>
  );
}