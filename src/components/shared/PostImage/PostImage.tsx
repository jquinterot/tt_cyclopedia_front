const DEFAULT_IMAGE_URL = import.meta.env.VITE_DEFAULT_IMAGE_URL;
const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

function getFullImageUrl(src: string): string {
  if (!src) return DEFAULT_IMAGE_URL;
  if (src.startsWith('http')) return src;
  return `${API_BASE}${src}`;
}

export function PostImage({ src, alt }: { src: string; alt: string }) {
  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = DEFAULT_IMAGE_URL;
  };

  const imageUrl = getFullImageUrl(src);

  return (
    <div className="aspect-square w-full group relative overflow-hidden rounded-lg" data-testid="post-image-container">
      <img
        className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
        src={imageUrl}
        alt={alt}
        data-testid="post-image"
        loading="lazy"
        onError={handleError}
      />
      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  );
}
