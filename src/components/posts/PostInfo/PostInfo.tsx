import { useLikes } from "../../../states/useCommentsState";
import likeIcon from "../../../assets/like.png";

export default function PostInfo() {
  const likes = useLikes(state => state.likes);
  const increase = useLikes(state => state.increase);

  return (
    <section className="flex items-center gap-3">
      <div className="flex items-center gap-2">
        <img 
          src={likeIcon} 
          alt="Like icon"
          className="w-7 h-7"
        />
        <p className="text-base font-medium">{likes}</p>
      </div>
      <button 
        className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
        onClick={() => increase(1)}
      >
        Like
      </button>
    </section>
  );
}
