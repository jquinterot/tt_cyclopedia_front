import { usePosts } from "../../../hooks/usePosts";
import { Post } from "../../../types/Post";
import { useNavigate } from "react-router-dom";

export default function PostList() {
  const { posts } = usePosts();
  const navigate = useNavigate();
  return (
    <div className="ml-5">
      {posts.map((post: Post) => (
        <div key={post.id} className="mb-7">
          <div className="flex flex-row flex-nowrap w-max">
            <img className=" w-1/12 object-cover" src={post.img} />
            <div className="w-1/4">
              <h1
                className=" text-3xl cursor-pointer hover:bg-gray-500"
                onClick={() => navigate(`/posts/${post.id}`)}
              >
                {post.title}
              </h1>
              <p className="  overflow-wrap break-words">{post.content}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
