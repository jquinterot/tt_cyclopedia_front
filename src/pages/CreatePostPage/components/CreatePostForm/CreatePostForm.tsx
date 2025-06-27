import toast, { Toaster } from "react-hot-toast";
import { usePostPost } from "../../../../hooks/posts/usePostPosts";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import InputField from "../InputField/InputField";
import TextAreaField from "../TextAreaField/TextAreaField";
import ImageUploadField from "../ImageUploadField/ImageUploadField";
import FormActions from "../FormActions/FormActions";

export default function CreatePostForm() {
  const { mutateAsync: createPost, isError, isPending } = usePostPost();
  const formRef = useRef<HTMLFormElement>(null);
  const inputTitleRef = useRef<HTMLInputElement>(null);
  const inputContentRef = useRef<HTMLTextAreaElement>(null);
  const inputImageRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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
      formData.append('author', 'Admin');
      if (imageFile != undefined) {
        formData.append('image', imageFile);
      }
      await createPost({ formData });
      queryClient.invalidateQueries({ queryKey: ["mainComments"] });
      toast.success("Post successfully created!");
      formRef.current?.reset();
      navigate("/");
    } catch (error) {
      toast.error("Failed to create post");
    }
  };

  const handleCancel = () => {
    formRef.current?.reset();
    navigate("/");
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8" data-testid="create-post-container">
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

      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/10">
        <form
          ref={formRef}
          onSubmit={handleAddPost}
          className="space-y-6"
          data-testid="create-post-form"
        >
          <div>
            <h1 className="text-2xl font-bold mb-6">Create New Post</h1>
            <p className="text-sm text-gray-300 mb-8">Share your thoughts with the community</p>
          </div>

          <div className="space-y-4">
            <InputField
              label="Title"
              id="title"
              inputRef={inputTitleRef}
              placeholder="Enter post title"
            />
            <TextAreaField
              label="Content"
              id="content"
              inputRef={inputContentRef}
              placeholder="Write your post content..."
            />
            <ImageUploadField inputRef={inputImageRef} />
          </div>

          {isError && (
            <div className="text-red-400 text-sm bg-red-400/10 p-3 rounded-md">
              Error: Failed to create post. Please try again.
            </div>
          )}

          <FormActions onCancel={handleCancel} isPending={isPending} />
        </form>
      </div>
    </div>
  );
}