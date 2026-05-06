import { ACTIVITY_TYPE_CONFIG } from '@/config/constants';

interface ActivityBadgeProps {
  type: string;
  className?: string;
}

export function ActivityBadge({ type, className = '' }: ActivityBadgeProps) {
  const config = ACTIVITY_TYPE_CONFIG[type];

  if (!config) return null;

  return (
    <span
      data-testid={`activity-badge-${type}`}
      className={`
        px-3 py-1 text-sm font-medium rounded-full border
        ${config.color}
        ${className}
      `}
    >
      {config.icon && <span className="mr-1">{config.icon}</span>}
      {config.label}
    </span>
  );
}
