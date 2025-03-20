import toast, { Toaster } from "react-hot-toast";
import { usePosts } from "../../../hooks/usePosts";
import { useRef, LegacyRef } from "react";
import { useNavigate } from "react-router-dom";

export default function CreatePostForm() {
  const { postPosts } = usePosts();
  const formRef = useRef<HTMLFormElement>(null);
  const inputTitleRef = useRef<HTMLInputElement>(null);
  const inputContentRef = useRef<HTMLTextAreaElement>(null);
  const inputImageRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleAddPost = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const title = inputTitleRef.current?.value.trim() || "";
    const content = inputContentRef.current?.value.trim() || "";
    const imageFile = inputImageRef.current?.files?.[0];

    if (!title) {
      toast.error("Please enter a title");
      return;
    }

    if (!content) {
      toast.error("Please enter content");
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('content', content);
      if (imageFile) {
        formData.append('image', imageFile);
      }

      await postPosts(formData);
      toast.success("Post successfully created!");
      formRef.current?.reset();
      navigate("/");
    } catch (error) {
      toast.error("Failed to create post");
    }
  };

  const handleCancel = () => {
    formRef.current?.reset();
    toast.dismiss();
  };

  return (
    <div className="flex justify-center p-4">
      <Toaster position="bottom-right" reverseOrder={true} />
      
      <form
        ref={formRef}
        className="w-full max-w-md space-y-4"
        onSubmit={handleAddPost}
      >
        <h1 className="text-2xl font-bold">Create New Post</h1>

        <div className="space-y-2">
          <label className="block text-lg font-medium" htmlFor="title">
            Post Title
          </label>
          <input
            ref={inputTitleRef}
            id="title"
            className="w-full p-2 rounded border text-black"
            type="text"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-lg font-medium" htmlFor="content">
            Post Content
          </label>
          <textarea
            ref={inputContentRef as LegacyRef<HTMLTextAreaElement>}
            id="content"
            className="w-full p-2 h-32 rounded border text-black"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="block text-lg font-medium" htmlFor="image">
            Post Image (optional)
          </label>
          <input
            ref={inputImageRef}
            id="image"
            type="file"
            accept="image/*"
            className="w-full text-white"
          />
        </div>

        <div className="flex gap-4 justify-end">
          <button
            type="button"
            onClick={handleCancel}
            className="px-2 py-2 bg-red-600 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Create Post
          </button>
        </div>
      </form>
    </div>
  );
}
