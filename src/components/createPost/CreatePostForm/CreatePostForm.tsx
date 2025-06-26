import toast, { Toaster } from "react-hot-toast";
import { usePostPost } from "../../../hooks/posts/usePostPosts";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

// --- Subcomponents ---

type InputFieldProps = {
  label: string;
  id: string;
  inputRef: React.RefObject<HTMLInputElement>;
  placeholder: string;
};

function InputField({ label, id, inputRef, placeholder }: InputFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor={id}>
        {label}
      </label>
      <input
        ref={inputRef}
        id={id}
        type="text"
        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder={placeholder}
        data-testid={`post-${id}-input`}
      />
    </div>
  );
}

type TextAreaFieldProps = {
  label: string;
  id: string;
  inputRef: React.RefObject<HTMLTextAreaElement>;
  placeholder: string;
};

function TextAreaField({ label, id, inputRef, placeholder }: TextAreaFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor={id}>
        {label}
      </label>
      <textarea
        ref={inputRef}
        id={id}
        rows={6}
        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        placeholder={placeholder}
        data-testid={`post-${id}-input`}
      />
    </div>
  );
}

type ImageUploadFieldProps = {
  inputRef: React.RefObject<HTMLInputElement>;
};

function ImageUploadField({ inputRef }: ImageUploadFieldProps) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-1" htmlFor="image">
        Cover Image
      </label>
      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-white/10 border-dashed rounded-md hover:border-blue-500/50 transition-colors" data-testid="image-upload-area">
        <div className="space-y-1 text-center">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            stroke="currentColor"
            fill="none"
            viewBox="0 0 48 48"
            aria-hidden="true"
          >
            <path
              d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="flex text-sm text-gray-400">
            <label
              htmlFor="image"
              className="relative cursor-pointer rounded-md font-medium text-blue-400 hover:text-blue-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
            >
              <span>Upload a file</span>
              <input
                ref={inputRef}
                id="image"
                type="file"
                accept="image/*"
                className="sr-only"
                data-testid="image-input"
              />
            </label>
            <p className="pl-1">or drag and drop</p>
          </div>
          <p className="text-xs text-gray-400">PNG, JPG, GIF up to 10MB</p>
        </div>
      </div>
    </div>
  );
}

type FormActionsProps = {
  onCancel: () => void;
  isPending: boolean;
};

function FormActions({ onCancel, isPending }: FormActionsProps) {
  return (
    <div className="flex justify-end space-x-4">
      <button
        type="button"
        onClick={onCancel}
        className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 rounded-md transition-colors"
        data-testid="cancel-button"
      >
        Cancel
      </button>
      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-sm font-medium text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        data-testid="submit-button"
        disabled={isPending}
      >
        {isPending ? 'Creating...' : 'Create Post'}
      </button>
    </div>
  );
}

// --- Main Component ---

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