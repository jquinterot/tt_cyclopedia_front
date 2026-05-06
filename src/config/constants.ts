export const ACTIVITY_TYPE_CONFIG: Record<string, { label: string; color: string; icon?: string }> = {
  tournament: { label: 'Tournament', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30', icon: '🏆' },
  training: { label: 'Training', color: 'bg-blue-500/20 text-blue-400 border-blue-500/30', icon: '🎯' },
  match: { label: 'Match', color: 'bg-green-500/20 text-green-400 border-green-500/30', icon: '⚽' },
  social: { label: 'Social', color: 'bg-purple-500/20 text-purple-400 border-purple-500/30', icon: '👥' },
};

export const DEFAULT_IMAGE_URL = import.meta.env.VITE_DEFAULT_IMAGE_URL;

export const TOAST_CONFIG = {
  duration: 3000,
  style: {
    background: 'rgb(30, 30, 30)',
    color: '#fff',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '8px',
    padding: '12px 16px',
  },
};
