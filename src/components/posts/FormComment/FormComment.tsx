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
      
      toast.success("Comment successfully created!");
      if (inputRef.current) inputRef.current.value = "";
    } catch (error) {
      toast.error("Failed to create comment");
    }
  };

  if (getCommentError) return <div>Error fetching comments</div>;
  if (isLoadingComment) return <div>Loading...</div>;

  return (
    <>
      {/* Add Toaster component */}
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
      
      <form onSubmit={(ev) => {
        ev.preventDefault();
        handleAddComment();
      }}>
        <p className="text-2xl">Add Comment</p>
        <input
          ref={inputRef}
          className="w-11/12 sm:w-9/12 h-8 rounded-sm mb-2 text-black"
          type="text"
          name="search"
        />
        <div>
          <button className="bg-red-600 px-1">Cancel</button>
          <button 
            className="bg-green-500 px-1" 
            type="submit"  // Changed to type="submit"
          >
            Add Comment
          </button>
        </div>
      </form>

      <Comments comments={comments ?? []} postId={postId} />
    </>
  );
}