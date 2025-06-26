import { useLikes } from "../../../states/useCommentsState";
import likeIcon from "../../../assets/like.png";

// LikeIcon.tsx
type LikeIconProps = {
  src: string;
  alt?: string;
};
function LikeIcon({ src, alt = "Like icon" }: LikeIconProps) {
  return <img src={src} alt={alt} className="w-7 h-7" />;
}

// LikeCount.tsx
type LikeCountProps = {
  count: number;
};
function LikeCount({ count }: LikeCountProps) {
  return <p className="text-base font-medium">{count}</p>;
}

// LikeButton.tsx
type LikeButtonProps = {
  onClick: () => void;
};
function LikeButton({ onClick }: LikeButtonProps) {
  return (
    <button
      className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
      onClick={onClick}
    >
      Like
    </button>
  );
}

// PostInfo.tsx
export default function PostInfo() {
  const likes = useLikes(state => state.likes);
  const increase = useLikes(state => state.increase);

  return (
    <section className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <LikeIcon src={likeIcon} />
        <LikeCount count={likes} />
      </div>
      <LikeButton onClick={() => increase(1)} />
    </section>
  );
}