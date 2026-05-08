import StatBar from "../StatBar/StatBar";
import { STAT_CONFIG } from "@/config/statConfig";

function getDefaultStats(): Record<string, number> {
  const defaultStats: Record<string, number> = {};
  STAT_CONFIG.forEach(({ key }) => {
    defaultStats[key] = 0;
  });
  return defaultStats;
}

export default function PostStats({
  stats,
}: {
  stats?: Record<string, number>;
}) {
  const displayStats =
    stats && Object.keys(stats).length > 0 ? stats : getDefaultStats();

  return (
    <div className="rounded-lg p-4 space-y-4">
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
  );
}
