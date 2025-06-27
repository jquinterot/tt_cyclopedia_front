import React from 'react';

interface PostImageProps {
  src: string;
  alt: string;
  postId: string;
}

export default function PostImage({ src, alt, postId }: PostImageProps) {
  return (
    <div className="w-full md:w-1/2 relative rounded-lg overflow-hidden" data-testid={`post-image-container-${postId}`}>
      <div className="aspect-square w-full group relative overflow-hidden rounded-lg">
        <img
          data-testid={`post-image-${postId}`}
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
          src={src}
          alt={alt}
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-110" />
      </div>
    </div>
  );
} 