
import { usePosts } from "../../../hooks/usePosts";
import { Post } from "../../../types/Post";
import FormComment from "../FormComment/FormComment";
import PostInfo from "../PostInfo/PostLikes";

export default function PostDetails() {
  const { posts } = usePosts();
  return (
    <div className="ml-5 w-10/12 md:mx-auto md:w-1/2 lg:mx-auto lg:w-1/2">
      {posts.map((post: Post) => (
        <div key={post.id} className="mb-7">
          <div>
            <h1 className=" text-3xl">{post.title}</h1>
          </div>

          <div className="">
            <img
              className=""
              src={post.img}
            />
            <p className="">
             {post.content}
            </p>
          </div>
          <PostInfo likes= {post.likes}></PostInfo>
        </div>
      ))}

      <div className="">
        <FormComment></FormComment>
      </div>
    </div>
  );
}
