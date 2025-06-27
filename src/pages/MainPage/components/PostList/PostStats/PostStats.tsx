import React from 'react';
import StatBar from '../StatBar/StatBar';

const CARD_STATS = [
  { label: "Speed", value: 7.5, color: "bg-red-500" },
  { label: "Spin", value: 8.2, color: "bg-green-500" },
  { label: "Control", value: 8.8, color: "bg-blue-500" },
  { label: "Overall", value: 8.3, color: "bg-purple-500" },
];

export default function PostStats() {
  return (
    <div className="rounded-lg p-4 space-y-4">
      <h3 className="text-base font-semibold text-white text-center" data-testid="stats-heading">
        Stats
      </h3>
      {CARD_STATS.map((stat) => (
        <StatBar key={stat.label} {...stat} />
      ))}
    </div>
  );
} 