interface SpecBarProps {
  label: string;
  value?: number | null;
  max?: number;
}

export function SpecBar({ label, value, max = 100 }: SpecBarProps) {
  if (value === undefined || value === null) return null;
  const percentage = Math.min((value / max) * 100, 100);
  return (
    <div className="mb-3">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-300">{label}</span>
        <span className="text-white font-medium">{value}</span>
      </div>
      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 rounded-full transition-all duration-500"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default SpecBar;
