import { usePosts } from "../../../hooks/usePosts";
import { Post } from "../../../types/Post";
import { useNavigate } from "react-router-dom";

export default function PostList() {
  const { posts } = usePosts();
  const navigate = useNavigate();
  
  return (
    <div className="mx-auto max-w-2xl">
      {posts.map((post: Post) => (
        <div 
          key={post.id}
          className="group mb-8 cursor-pointer overflow-hidden bg-gray-700 shadow-sm shadow-gray-900/30 transition-all hover:shadow-md hover:shadow-gray-900/50"
          onClick={() => navigate(`/posts/${post.id}`)}
        >
        
          <div className="aspect-video w-full md:aspect-square md:h-[400px]">
            <img
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
              src={`${import.meta.env.VITE_API_BASE_URL}${post.image_url}`}
              alt={post.title}
            />
          </div>

          {/* Text Content */}
          <div className="space-y-4 p-7">
            <h1 className="text-2xl font-semibold text-white hover:text-blue-400">
              {post.title}
            </h1>
            <p className="text-gray-300 line-clamp-3">
              {post.content}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}