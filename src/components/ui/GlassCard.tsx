import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function GlassCard({ children, className = '', hover = false }: GlassCardProps) {
  return (
    <div
      data-testid="glass-card"
      className={`
        bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-6
        ${hover ? 'hover:bg-white/20 transition-colors cursor-pointer' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
