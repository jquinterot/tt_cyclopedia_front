
import { useComments } from '../../hooks/useComments';
import { Comment } from '../../types/Comment';

export function Comments() {
  const { comments } = useComments();

  return (
    <div>
      <h1>Comments</h1>
      <section className='mt-5'>
        {comments.map((commentItem: Comment, index) => (
          <div className='mb-5'>
            <section className='flex space-x-1'>
              <img className='basis-6 h-5 w-1 m-0 p-0' src= 'https://static.vecteezy.com/system/resources/thumbnails/008/442/086/small_2x/illustration-of-human-icon-user-symbol-icon-modern-design-on-blank-background-free-vector.jpg'/>
              <h2 className='basis-6'>User</h2>
            </section>
            <p key={index}>{commentItem.comment}</p>
            <button className='bg-red-600 rounded-md p-1'>Delete</button>
          </div>
          
       
        ))}
      </section>
    </div>
  );
}
