import { useParams, Link } from 'react-router-dom';
import { useEquipmentDetail } from '@/hooks/equipment';
import { usePostsByEquipment } from '@/hooks/posts/usePostsByEquipment';
import SEOHead from '@/components/SEO/SEOHead';
import { SpecBar } from '@/components/shared/SpecBar/SpecBar';
import { LoadingSkeleton } from '@/components/shared/LoadingSkeleton/LoadingSkeleton';

export default function EquipmentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { equipment, isLoading, error } = useEquipmentDetail(id || '');
  const { posts: relatedPosts, isLoading: postsLoading } = usePostsByEquipment(id || '');

  if (isLoading) {
    return <LoadingSkeleton />;
  }

  if (error || !equipment) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-400">Equipment not found</div>
      </div>
    );
  }

  const API_BASE = import.meta.env.VITE_API_BASE_URL || '';
  const imageUrl = equipment.image_url ? `${API_BASE}${equipment.image_url}` : `${API_BASE}/static/default/default.jpeg`;
  const isBlade = equipment.category === 'blade';
  const isRubber = equipment.category === 'rubber';

  return (
    <>
      <SEOHead
        title={`${equipment.name} - ${equipment.brand} | TT Cyclopedia`}
        description={equipment.description || `${equipment.name} by ${equipment.brand} - Table tennis ${equipment.category}`}
        canonical={`/equipment/${equipment.id}`}
      />
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Image */}
          <div className="aspect-square bg-gray-800/50 rounded-lg overflow-hidden flex items-center justify-center">
            <img
              src={imageUrl}
              alt={equipment.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = '/static/default/default.jpeg';
              }}
            />
          </div>

          {/* Info */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium text-blue-400 uppercase tracking-wider">
                {equipment.brand}
              </span>
              <span className="text-xs text-gray-500">|</span>
              <span className="text-xs text-gray-400 capitalize">{equipment.category}</span>
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">{equipment.name}</h1>
            {equipment.price_usd && (
              <p className="text-xl font-medium text-green-400 mb-4">
                ${equipment.price_usd.toFixed(2)}
              </p>
            )}
            {equipment.description && (
              <p className="text-gray-300 mb-6 leading-relaxed">{equipment.description}</p>
            )}
            {equipment.avg_rating && (
              <div className="flex items-center gap-2 mb-4">
                <span className="text-yellow-400 text-lg">{equipment.avg_rating.toFixed(1)}</span>
                <span className="text-gray-400 text-sm">({equipment.review_count} reviews)</span>
              </div>
            )}
            {equipment.release_year && (
              <p className="text-sm text-gray-500 mb-4">Released: {equipment.release_year}</p>
            )}
          </div>
        </div>

        {/* Specs */}
        <div className="mt-8 grid md:grid-cols-2 gap-8">
          {/* Blade Specs */}
          {isBlade && equipment.blade_specs && (
            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Blade Specifications</h2>
              <SpecBar label="Speed" value={equipment.blade_specs.speed} />
              <SpecBar label="Control" value={equipment.blade_specs.control} />
              <SpecBar label="Stiffness" value={equipment.blade_specs.stiffness} />
              <SpecBar label="Hardness" value={equipment.blade_specs.hardness} />
              {equipment.blade_specs.plies && (
                <div className="flex justify-between text-sm py-2 border-t border-white/10">
                  <span className="text-gray-300">Plies</span>
                  <span className="text-white">{equipment.blade_specs.plies}</span>
                </div>
              )}
              {equipment.blade_specs.material && (
                <div className="flex justify-between text-sm py-2 border-t border-white/10">
                  <span className="text-gray-300">Material</span>
                  <span className="text-white">{equipment.blade_specs.material}</span>
                </div>
              )}
              {equipment.blade_specs.weight_min && equipment.blade_specs.weight_max && (
                <div className="flex justify-between text-sm py-2 border-t border-white/10">
                  <span className="text-gray-300">Weight</span>
                  <span className="text-white">{equipment.blade_specs.weight_min}-{equipment.blade_specs.weight_max}g</span>
                </div>
              )}
              {equipment.blade_specs.thickness && (
                <div className="flex justify-between text-sm py-2 border-t border-white/10">
                  <span className="text-gray-300">Thickness</span>
                  <span className="text-white">{equipment.blade_specs.thickness}mm</span>
                </div>
              )}
              {equipment.blade_specs.handle_types && (
                <div className="flex justify-between text-sm py-2 border-t border-white/10">
                  <span className="text-gray-300">Handle Types</span>
                  <span className="text-white">{equipment.blade_specs.handle_types}</span>
                </div>
              )}
            </div>
          )}

          {/* Rubber Specs */}
          {isRubber && equipment.rubber_specs && (
            <div className="bg-white/5 border border-white/10 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Rubber Specifications</h2>
              <SpecBar label="Speed" value={equipment.rubber_specs.speed} />
              <SpecBar label="Spin" value={equipment.rubber_specs.spin} />
              <SpecBar label="Control" value={equipment.rubber_specs.control} />
              <SpecBar label="Tackiness" value={equipment.rubber_specs.tackiness} />
              <SpecBar label="Grip" value={equipment.rubber_specs.grip} />
              <SpecBar label="Durability" value={equipment.rubber_specs.durability} />
              {equipment.rubber_specs.sponge_hardness && (
                <div className="flex justify-between text-sm py-2 border-t border-white/10">
                  <span className="text-gray-300">Sponge Hardness</span>
                  <span className="text-white">{equipment.rubber_specs.sponge_hardness}</span>
                </div>
              )}
              {equipment.rubber_specs.sponge_thickness && (
                <div className="flex justify-between text-sm py-2 border-t border-white/10">
                  <span className="text-gray-300">Sponge Thickness</span>
                  <span className="text-white">{equipment.rubber_specs.sponge_thickness}</span>
                </div>
              )}
              {equipment.rubber_specs.top_sheet && (
                <div className="flex justify-between text-sm py-2 border-t border-white/10">
                  <span className="text-gray-300">Top Sheet</span>
                  <span className="text-white capitalize">{equipment.rubber_specs.top_sheet.replace('_', ' ')}</span>
                </div>
              )}
              {equipment.rubber_specs.weight && (
                <div className="flex justify-between text-sm py-2 border-t border-white/10">
                  <span className="text-gray-300">Weight (uncut)</span>
                  <span className="text-white">{equipment.rubber_specs.weight}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Related Posts / Reviews */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-white mb-4">Community Reviews</h2>
          {postsLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : relatedPosts && relatedPosts.length > 0 ? (
            <div className="grid gap-4">
              {relatedPosts.map((post) => (
                <Link
                  key={post.id}
                  to={`/post/${post.id}`}
                  className="bg-white/5 border border-white/10 rounded-lg p-4 hover:bg-white/10 transition-colors"
                >
                  <h3 className="text-lg font-semibold text-white mb-1">{post.title}</h3>
                  <p className="text-gray-300 text-sm line-clamp-2 mb-2">{post.content}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>By {post.author || 'Anonymous'}</span>
                    <span>{post.likes} likes</span>
                    {post.timestamp && (
                      <span>{new Date(post.timestamp).toLocaleDateString()}</span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-white/5 border border-white/10 rounded-lg p-6 text-center">
              <p className="text-gray-400 mb-2">No reviews yet.</p>
              <Link
                to="/create-post"
                className="text-blue-400 hover:text-blue-300 text-sm font-medium"
              >
                Be the first to review this equipment →
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
