import { usePosts } from "../../../hooks/usePosts";
import { useRef } from "react";

export default function CreatePostForm() {
    const { postPosts } = usePosts();
    const inputTitleRef = useRef<HTMLInputElement>(null);
    const inputContentRef = useRef<HTMLInputElement>(null);

  const handleAddPost = async () => {
    const title = inputTitleRef.current?.value || "";
    const content = inputContentRef.current?.value || "";


    if(title!= ''){
      await postPosts(title, content, 'img');
    }
    
    if (inputTitleRef.current) {
        inputTitleRef.current.value = "";
    }

    if (inputContentRef.current) {
        inputContentRef.current.value = "";
    }
  };
  return (
    <>
      <form
        onSubmit={(ev) => {
          ev.preventDefault();
        }}
      >
        <p className="text-2xl">Create Post</p>

        <h2 className="text-xl">Post Title</h2>
        <input
        ref={inputTitleRef}
          className="w-11/12 sm:w-9/12 h-8  rounded-sm mb-2  text-black"
          type="text"
          name="title"
        />

        <h2 className="text-xl">Post Content</h2>
        <input
        ref={inputContentRef}
          className="w-11/12 sm:w-9/12 h-16  rounded-sm mb-2  text-black"
          type="text"
          name="content"
        />

        <h2 className="text-xl">Add Post Image</h2>

        <div className="">
          <button className=" bg-red-600 px-1">Cancel</button>
          <button className="bg-green-500 px-1"  onClick={handleAddPost}>Add Post</button>
        </div>
      </form>
    </>
  );
}
