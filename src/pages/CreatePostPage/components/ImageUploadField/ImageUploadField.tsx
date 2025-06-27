
type ImageUploadFieldProps = {
  inputRef: React.RefObject<HTMLInputElement>;
};

export default function ImageUploadField({ inputRef }: ImageUploadFieldProps) {
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