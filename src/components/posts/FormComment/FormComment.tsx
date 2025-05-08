import { useComments  } from "../../../hooks/comments/useComments";
import { usePostComment } from "../../../hooks/comments/usePostComments";
import { useRef } from "react";
import Comments from "../Comments/Comments";

export default function FormComment({ postId }: { postId: string }) {
  const { mutateAsync: postComment } = usePostComment(postId);
  const {
    comments,
    error: getCommentError,
    isLoading: isLoadingComment,
  } = useComments(postId);

  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddComment = async () => {
    const comment = inputRef.current?.value || "";
    if (comment !== "") {
      await postComment({
        comment,
        userId: "QZWHYrz9NpYbSuR84sF5W8",
        postId,
      });
    }
    
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  if (getCommentError) return <div>Error fetching comments</div>;
  if (isLoadingComment) return <div>Loading...</div>;

  return (
    <>
      <form onSubmit={(ev) => ev.preventDefault()}>
        <p className="text-2xl">Add Comment</p>
        <input
          ref={inputRef}
          className="w-11/12 sm:w-9/12 h-8 rounded-sm mb-2 text-black"
          type="text"
          name="search"
        />
        <div>
          <button className="bg-red-600 px-1">Cancel</button>
          <button className="bg-green-500 px-1" onClick={handleAddComment}>
            Add Comment
          </button>
        </div>
      </form>

      <Comments comments={comments ?? []} postId={postId} />
    </>
  );
}
