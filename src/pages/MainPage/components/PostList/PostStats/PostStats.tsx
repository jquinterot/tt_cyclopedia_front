import StatBar from '../StatBar/StatBar';
import { STAT_CONFIG } from '@/config/statConfig';

function getStatConfig(key: string) {
  return STAT_CONFIG.find((item) => item.key === key);
}

export default function PostStats({ stats }: { stats?: Record<string, number> }) {
  if (!stats) return null;
  const statKeys = Object.keys(stats);
  return (
    <div className="rounded-lg p-4 space-y-4">
      <h3 className="text-base font-semibold text-white text-center" data-testid="stats-heading">
        Stats
      </h3>
      {statKeys.map((key) => {
        const config = getStatConfig(key);
        return (
          <StatBar
            key={key}
            label={config?.label || key.charAt(0).toUpperCase() + key.slice(1)}
            value={stats[key]}
            color={config?.color || 'bg-gray-500'}
          />
        );
      })}
    </div>
  );
} 