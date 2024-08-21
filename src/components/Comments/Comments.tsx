import { Comment } from '../../types/Comment';
import UserInfo from '../UserInfo/UserInfo';

export default function Comments({ comments, deleteComment }: { comments: Comment[];  deleteComment:(commentId:string) => Promise<void>; }) {
  const handleDeleteComment = async (commentId:string) => {
    await deleteComment(commentId);
  }
  return (
    <div className='mt-2 mb-2'>
      <h1 className='mb-5 text-2xl'>Comments</h1>
      <section className="">
        {comments.map((commentItem: Comment) => (
          <div key={commentItem.id} className="mb-4">
            <UserInfo />
            <p className="">{commentItem.comment}</p>
            <button className="bg-red-500" onClick={() => handleDeleteComment(commentItem.id)}>Delete</button>
          </div>
        ))}
      </section>
    </div>
  );
}