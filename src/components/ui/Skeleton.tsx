interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = "" }: SkeletonProps) {
  return (
    <div
      data-testid="skeleton"
      className={`animate-pulse bg-white/5 rounded-lg ${className}`}
    />
  );
}

export function SkeletonCard() {
  return (
    <div
      className="bg-white/5 border border-white/10 rounded-lg p-4 space-y-3"
      data-testid="skeleton-card"
    >
      <Skeleton className="w-full h-48" />
      <Skeleton className="w-3/4 h-5" />
      <Skeleton className="w-full h-4" />
      <div className="flex justify-between items-center pt-2">
        <Skeleton className="w-24 h-4" />
        <Skeleton className="w-16 h-4" />
      </div>
    </div>
  );
}

export function SkeletonForm() {
  return (
    <div
      className="space-y-6 p-8 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10"
      data-testid="skeleton-form"
    >
      <Skeleton className="w-48 h-8 mx-auto" />
      <Skeleton className="w-64 h-4 mx-auto" />
      <div className="space-y-4 pt-4">
        <div className="space-y-2">
          <Skeleton className="w-20 h-4" />
          <Skeleton className="w-full h-12" />
        </div>
        <div className="space-y-2">
          <Skeleton className="w-20 h-4" />
          <Skeleton className="w-full h-12" />
        </div>
      </div>
      <Skeleton className="w-full h-12" />
    </div>
  );
}

export function SkeletonPostDetail() {
  return (
    <div
      className="w-full max-w-4xl mx-auto px-4 py-6 space-y-8"
      data-testid="skeleton-post-detail"
    >
      <Skeleton className="w-2/3 h-12 mx-auto" />
      <Skeleton className="w-1/3 h-6 mx-auto" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        <Skeleton className="w-full aspect-square" />
        <Skeleton className="w-full h-64" />
      </div>
      <div className="space-y-4">
        <Skeleton className="w-full h-24" />
        <Skeleton className="w-3/4 h-4" />
        <Skeleton className="w-1/2 h-4" />
      </div>
    </div>
  );
}

export function SkeletonList({ count = 6 }: { count?: number }) {
  return (
    <div
      className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      data-testid="skeleton-list"
    >
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
