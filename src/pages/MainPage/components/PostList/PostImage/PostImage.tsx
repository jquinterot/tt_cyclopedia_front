interface PostImageProps {
  src: string;
  alt: string;
  postId: string;
  defaultImageUrl: string;
}

const API_BASE = import.meta.env.VITE_API_BASE_URL || '';

function getFullImageUrl(src: string, fallback: string): string {
  if (!src) return fallback;
  if (src.startsWith('http')) return src;
  return `${API_BASE}${src}`;
}

export default function PostImage({ src, alt, postId, defaultImageUrl }: PostImageProps) {
  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.onerror = null; // Prevent infinite loop
    e.currentTarget.src = defaultImageUrl;
  };

  const imageUrl = getFullImageUrl(src, defaultImageUrl);

  return (
    <div className="w-full relative rounded-lg overflow-hidden" data-testid={`post-image-container-${postId}`}>
      <div className="aspect-square w-full group relative overflow-hidden rounded-lg">
        <img
          data-testid={`post-image-${postId}`}
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
          src={imageUrl}
          alt={alt}
          loading="lazy"
          onError={handleError}
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-110" />
      </div>
    </div>
  );
} 