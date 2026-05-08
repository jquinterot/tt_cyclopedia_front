import { useNavigate } from 'react-router-dom';
import type { Equipment } from '@/types/Equipment';

interface EquipmentCardProps {
  item: Equipment;
}

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

export function EquipmentCard({ item }: EquipmentCardProps) {
  const navigate = useNavigate();
  const isBlade = item.category === 'blade';
  const isRubber = item.category === 'rubber';

  const getSpecsPreview = () => {
    if (isBlade) return item.subcategory?.replace('_', ' ') || 'Blade';
    if (isRubber) return item.subcategory?.replace('_', ' ') || 'Rubber';
    return item.category;
  };

  const imageUrl = item.image_url ? `${API_BASE}${item.image_url}` : `${API_BASE}/static/default/default.jpeg`;

  return (
    <div
      onClick={() => navigate(`/equipment/${item.id}`)}
      className="bg-white/5 border border-white/10 rounded-lg overflow-hidden hover:bg-white/10 transition-colors cursor-pointer"
      data-testid={`equipment-card-${item.id}`}
    >
      <div className="aspect-square bg-gray-800/50 flex items-center justify-center overflow-hidden">
        <img
          src={imageUrl}
          alt={item.name}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/static/default/default.jpeg';
          }}
        />
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-medium text-blue-400 uppercase tracking-wider">
            {item.brand}
          </span>
          <span className="text-xs text-gray-500">|</span>
          <span className="text-xs text-gray-400 capitalize">{getSpecsPreview()}</span>
        </div>
        <h3 className="text-lg font-semibold text-white mb-1">{item.name}</h3>
        {item.description && (
          <p className="text-sm text-gray-400 line-clamp-2 mb-2">{item.description}</p>
        )}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-green-400">
            {item.price_usd ? `$${item.price_usd.toFixed(2)}` : 'Price N/A'}
          </span>
          {item.avg_rating && (
            <span className="text-sm text-yellow-400">
              {item.avg_rating.toFixed(1)} ({item.review_count} reviews)
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default EquipmentCard;
