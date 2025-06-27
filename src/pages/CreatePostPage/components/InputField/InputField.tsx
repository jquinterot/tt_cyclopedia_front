
type InputFieldProps = {
  label: string;
  id: string;
  inputRef: React.RefObject<HTMLInputElement>;
  placeholder: string;
};

export default function InputField({ label, id, inputRef, placeholder }: InputFieldProps) {
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