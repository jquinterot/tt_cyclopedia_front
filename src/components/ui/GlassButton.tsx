import { ButtonHTMLAttributes, ReactNode } from "react";

interface GlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  children: ReactNode;
}

export function GlassButton({
  variant = "primary",
  children,
  className = "",
  disabled,
  ...props
}: GlassButtonProps) {
  const baseStyles =
    "px-4 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary:
      "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      data-testid={props.id ? `glass-button-${props.id}` : "glass-button"}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
