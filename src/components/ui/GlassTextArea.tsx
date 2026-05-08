interface GlassTextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  ref?: React.Ref<HTMLTextAreaElement>;
}

export function GlassTextArea({
  className = "",
  error = false,
  ref,
  ...props
}: GlassTextAreaProps) {
  return (
    <textarea
      ref={ref}
      data-testid={props.id ? `glass-textarea-${props.id}` : "glass-textarea"}
      className={`
        w-full px-4 py-3 bg-white/5 border rounded-lg text-white placeholder-gray-400
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
        transition-colors resize-none
        ${error ? "border-red-500 focus:ring-red-500" : "border-white/10"}
        ${className}
      `}
      {...props}
    />
  );
}
