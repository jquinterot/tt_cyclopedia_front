interface PostImageProps {
  src: string;
  alt: string;
  postId: string;
  defaultImageUrl: string;
}

export default function PostImage({ src, alt, postId, defaultImageUrl }: PostImageProps) {
  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.onerror = null; // Prevent infinite loop
    e.currentTarget.src = defaultImageUrl;
  };

  return (
    <div className="w-full relative rounded-lg overflow-hidden" data-testid={`post-image-container-${postId}`}>
      <div className="aspect-square w-full group relative overflow-hidden rounded-lg">
        <img
          data-testid={`post-image-${postId}`}
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
          src={src}
          alt={alt}
          loading="lazy"
          onError={handleError}
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-110" />
      </div>
    </div>
  );
} 