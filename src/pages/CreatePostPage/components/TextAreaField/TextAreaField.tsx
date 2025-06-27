
type TextAreaFieldProps = {
  label: string;
  id: string;
  inputRef: React.RefObject<HTMLTextAreaElement>;
  placeholder: string;
};

export default function TextAreaField({ label, id, inputRef, placeholder }: TextAreaFieldProps) {
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