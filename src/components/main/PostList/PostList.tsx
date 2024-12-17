import { usePosts } from "../../../hooks/usePosts";
import { Post } from "../../../types/Post";
import { useNavigate } from "react-router-dom";

export default function PostList() {
  const { posts } = usePosts();
  const navigate = useNavigate();
  
  return (
    <div className="ml-5 w-3/5">
      {posts.map((post: Post) => (
        <div key={post.id} className="mb-7 ">
          <div
            className="flex flex-row flex-nowrap justify-center hover:bg-gray-500"
            onClick={() => navigate(`/posts/${post.id}`)}
          >
            <img
              className="w-80 h-60 rounded-md object-cover mr-4 hover:bg-gray-500"
              src={post.img}
            />
            <div className="w-2/4 ">
              <h1 className="text-3xl cursor-pointer ">{post.title}</h1>
              <p className="overflow-wrap break-words">
                {post.content.length > 200 // Adjust character limit as needed
                  ? `${post.content.substring(0, 200)}...`
                  : post.content}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
