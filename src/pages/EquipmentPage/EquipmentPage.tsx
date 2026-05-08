import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEquipment } from '@/hooks/equipment';
import SEOHead from '@/components/SEO/SEOHead';
import { EquipmentCard } from '@/components/shared/EquipmentCard/EquipmentCard';
import { LoadingSkeleton } from '@/components/shared/LoadingSkeleton/LoadingSkeleton';

const BRANDS = ['All', 'Butterfly', 'Donic', 'DHS', 'Nittaku', 'Xiom', 'Tibhar', 'Andro', 'Stiga'];
const CATEGORIES = [
  { value: '', label: 'All Equipment' },
  { value: 'blade', label: 'Blades' },
  { value: 'rubber', label: 'Rubbers' },
];

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
    return <LoadingSkeleton />;
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64" data-testid="equipment-error">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-red-400 mb-2">Unable to Load Equipment</h2>
          <p className="text-gray-400">Something went wrong while loading the catalog. Please try again later.</p>
        </div>
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
          <div className="text-center text-gray-400 py-16" data-testid="equipment-empty-state">
            <svg className="mx-auto h-12 w-12 text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h3 className="text-lg font-medium text-white mb-1">No equipment found</h3>
            <p className="text-gray-400">Try adjusting your filters or search query.</p>
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
