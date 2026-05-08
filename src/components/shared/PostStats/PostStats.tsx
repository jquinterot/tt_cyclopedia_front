import { STAT_CONFIG } from "@/config/statConfig";

function getDefaultStats(): Record<string, number> {
  const defaultStats: Record<string, number> = {};
  STAT_CONFIG.forEach(({ key }) => {
    defaultStats[key] = 0;
  });
  return defaultStats;
}

export function StatBar({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="flex items-center gap-3 group py-1">
      <span className="text-sm font-medium text-gray-400 w-16 group-hover:text-white transition-colors">
        {label}
      </span>
      <div className="flex-1 h-3 bg-white/10 rounded-lg overflow-hidden backdrop-blur-sm border border-white/5 group-hover:border-white group-hover:shadow-md transition-colors transition-shadow duration-200">
        <div
          className={`h-full ${color} transition-all duration-500 ease-out`}
          style={{
            width: `${(value / 10) * 100}%`,
            boxShadow: `0 0 20px ${color.replace("bg-", "").replace("-500", "-400")}`,
          }}
        />
      </div>
      <span className="text-sm font-medium text-gray-300 w-10 text-right group-hover:text-white transition-colors">
        {value.toFixed(1)}
      </span>
    </div>
  );
}

export function PostStatsWrapper({
  stats,
}: {
  stats?: Record<string, number>;
}) {
  const displayStats =
    stats && Object.keys(stats).length > 0 ? stats : getDefaultStats();

  return (
    <div
      className="flex flex-col justify-center space-y-6 px-4 sm:px-0"
      data-testid="post-stats-container"
    >
      <div className="p-4 space-y-4">
        <h3
          className="text-base font-semibold text-white text-center"
          data-testid="stats-heading"
        >
          Stats
        </h3>
        {STAT_CONFIG.map((config) => (
          <StatBar
            key={config.key}
            label={config.label}
            value={displayStats[config.key] || 0}
            color={config.color}
          />
        ))}
      </div>
    </div>
  );
}
