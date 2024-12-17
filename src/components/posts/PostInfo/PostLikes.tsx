import { useBearStore } from "../../../states/useCommentsState";
import { Post } from "../../../types/Post";

export default function PostLikes({likes}:{likes:number}) {
  const bears =  useBearStore(state => state.bears);
  const increase = useBearStore(state => state.increase);

  const handleLikes = () =>{

  }

  return (
    <section className="">
      <img src="../../assets/like.png" alt="" />
      <p>bears {bears}</p>
      <p>likes {likes}</p>
      <button className="bg-blue-500" onClick={() => increase(1)}>Likes</button>
    </section>
  );
}
