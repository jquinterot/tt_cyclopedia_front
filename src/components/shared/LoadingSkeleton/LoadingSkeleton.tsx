export function LoadingSkeleton() {
  return (
    <div
      className="max-w-5xl mx-auto px-4 py-8 animate-pulse"
      data-testid="loading-skeleton"
    >
      <div className="grid md:grid-cols-2 gap-8">
        {/* Image skeleton */}
        <div className="aspect-square bg-gray-800/50 rounded-lg" />
        {/* Info skeleton */}
        <div className="space-y-4">
          <div className="h-4 bg-white/10 rounded w-1/3" />
          <div className="h-8 bg-white/10 rounded w-3/4" />
          <div className="h-6 bg-white/10 rounded w-1/4" />
          <div className="h-20 bg-white/10 rounded w-full" />
          <div className="h-4 bg-white/10 rounded w-1/2" />
        </div>
      </div>
      <div className="mt-8 grid md:grid-cols-2 gap-8">
        <div className="bg-white/5 border border-white/10 rounded-lg p-6 space-y-4">
          <div className="h-6 bg-white/10 rounded w-1/2" />
          <div className="h-2 bg-white/10 rounded w-full" />
          <div className="h-2 bg-white/10 rounded w-full" />
          <div className="h-2 bg-white/10 rounded w-full" />
        </div>
      </div>
    </div>
  );
}

export default LoadingSkeleton;
