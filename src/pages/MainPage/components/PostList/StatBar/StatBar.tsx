
interface StatBarProps {
  label: string;
  value: number;
  color: string;
}

export default function StatBar({ label, value, color }: StatBarProps) {
  return (
    <div className="flex items-center gap-3 group py-2">
      <span className="text-sm font-medium text-gray-400 w-16 group-hover:text-white transition-colors">
        {label}
      </span>
      <div className="flex-1 h-3 bg-white/10 rounded-lg overflow-hidden backdrop-blur-sm border border-white/5">
        <div
          data-testid="statbar-progress"
          className={`h-full ${color} transition-all duration-500 ease-out`}
          style={{ width: `${(value / 10) * 100}%` }}
        />
      </div>
      <span className="text-sm font-medium text-gray-300 w-10 text-right group-hover:text-white transition-colors">
        {value.toFixed(1)}
      </span>
    </div>
  );
} 