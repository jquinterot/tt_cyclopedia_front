import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePostState } from "../../../states/usePostState"; // Zustand store
import PostInfo from "../PostInfo/PostLikes";
import FormComment from "../FormComment/FormComment";

export default function PostDetails() {
  const { id } = useParams(); // Get postId from the route
  const { post, error, getPostById } = usePostState(); // Zustand store

  useEffect(() => {
    if (id) {
      getPostById(id);
    }
  }, [id, getPostById]);

  if (error) return <div>Error: {error}</div>; // Display error message
  if (!post) return <div>Loading...</div>; // Show loading state until post is fetched

  return (
    <div className="ml-5 w-10/12 md:mx-auto md:w-1/2 lg:mx-auto lg:w-1/2">
      <div key={post.id} className="mb-7">
        <h1 className="text-3xl">{post.title}</h1>
        <img 
  className="w-full h-auto" 
  src={`${import.meta.env.VITE_API_BASE_URL}${post.image_url}`} 
  alt={post.title} 
/>
        <p>{post.content}</p>
        <PostInfo />
      </div>
      <div className="">
        <FormComment />
      </div>
    </div>
  );
}
