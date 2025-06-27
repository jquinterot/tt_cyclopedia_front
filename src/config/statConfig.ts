// src/config/statConfig.ts

export interface StatConfigItem {
  key: string;
  label: string;
  color: string;
  tooltip: string;
}

export const STAT_CONFIG: StatConfigItem[] = [
  { key: 'speed', label: 'Speed', color: 'bg-red-500', tooltip: 'How fast is this item?' },
  { key: 'control', label: 'Control', color: 'bg-blue-500', tooltip: 'How easy is it to control?' },
  { key: 'spin', label: 'Spin', color: 'bg-green-500', tooltip: 'How much spin can it generate?' },
  { key: 'overall', label: 'Overall', color: 'bg-purple-500', tooltip: 'Overall rating' },
]; 