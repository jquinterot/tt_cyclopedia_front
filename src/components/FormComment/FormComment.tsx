import { useComments } from "../../hooks/useComments";
import { useRef } from "react";
import Comments from "../Comments/Comments";

export default function FormComment() {
  const { postComments, comments, deleteComment } = useComments();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddComment = async () => {
    const comment = inputRef.current?.value || "";
    if(comment!= ''){
      await postComments(comment);
    }
    
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <>
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
        }}
      >
        <p className="text-2xl">Add Comment</p>
        <input
          ref={inputRef}
          className="w-11/12 sm:w-9/12 h-8  rounded-sm mb-2  text-black"
          type="text"
          name="search"
        />
        <div className="">
          <button className=" bg-red-600 px-1">Cancel</button>
          <button className="bg-green-500 px-1" onClick={handleAddComment}>
            Add Comment
          </button>
        </div>
      </form>
      
    
      <Comments comments={comments} deleteComment={deleteComment}></Comments>
    </>
  );
}
