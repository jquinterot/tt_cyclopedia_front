import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEquipment } from '@/hooks/equipment';
import type { Equipment } from '@/types/Equipment';
import SEOHead from '@/components/SEO/SEOHead';

const BRANDS = ['All', 'Butterfly', 'Donic', 'DHS', 'Nittaku', 'Xiom', 'Tibhar', 'Andro', 'Stiga'];
const CATEGORIES = [
  { value: '', label: 'All Equipment' },
  { value: 'blade', label: 'Blades' },
  { value: 'rubber', label: 'Rubbers' },
];

function EquipmentCard({ item }: { item: Equipment }) {
  const navigate = useNavigate();
  const isBlade = item.category === 'blade';
  const isRubber = item.category === 'rubber';

  const getSpecsPreview = () => {
    if (isBlade) return item.subcategory?.replace('_', ' ') || 'Blade';
    if (isRubber) return item.subcategory?.replace('_', ' ') || 'Rubber';
    return item.category;
  };

  const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
  const imageUrl = item.image_url ? `${API_BASE}${item.image_url}` : `${API_BASE}/static/default/default.jpeg`;

  return (
    <div
      onClick={() => navigate(`/equipment/${item.id}`)}
      className="bg-white/5 border border-white/10 rounded-lg overflow-hidden hover:bg-white/10 transition-colors cursor-pointer"
    >
      <div className="aspect-square bg-gray-800/50 flex items-center justify-center overflow-hidden">
        <img
          src={imageUrl}
          alt={item.name}
          className="w-full h-full object-cover"
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

export default function EquipmentPage() {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const brandFilter = selectedBrand === 'All' ? undefined : selectedBrand;
  const { equipment, isLoading, error } = useEquipment(
    selectedCategory || undefined,
    brandFilter,
    searchQuery || undefined
  );

  const filteredEquipment = useMemo(() => {
    if (!equipment) return [];
    return [...equipment].sort((a, b) => (b.avg_rating || 0) - (a.avg_rating || 0));
  }, [equipment]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-400">Error loading equipment catalog</div>
      </div>
    );
  }

  return (
    <>
      <SEOHead
        title="Equipment Catalog - TT Cyclopedia"
        description="Browse table tennis equipment catalog. Blades, rubbers, and more from Butterfly, Donic, DHS, Nittaku, Xiom, Tibhar, Andro, and Stiga."
        canonical="/equipment"
      />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">Equipment Catalog</h1>
            <p className="text-gray-400">Browse blades, rubbers, and gear from top brands</p>
          </div>
          <button
            onClick={() => navigate('/setup-recommender')}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors font-medium"
          >
            Find My Setup
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Category Filter */}
          <div className="flex gap-2">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedCategory === cat.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-white/5 text-gray-300 hover:bg-white/10'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Brand Filter */}
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-md text-gray-300 text-sm focus:outline-none focus:border-blue-500"
          >
            {BRANDS.map((brand) => (
              <option key={brand} value={brand}>
                {brand === 'All' ? 'All Brands' : brand}
              </option>
            ))}
          </select>

          {/* Search */}
          <div className="flex-grow">
            <input
              type="text"
              placeholder="Search equipment..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md text-white placeholder-gray-500 text-sm focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>

        {/* Results */}
        {filteredEquipment.length === 0 && (
          <div className="text-center text-gray-400 py-16">
            No equipment found matching your criteria
          </div>
        )}

        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredEquipment.map((item) => (
            <EquipmentCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
}
