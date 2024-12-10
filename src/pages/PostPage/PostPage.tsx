import  NavBar  from '../../components/shared/NavBar/NavBar';
import  Footer  from '../../components/shared/Footer/Footer';
import  PostDetails  from '../../components/posts/Post/PostDetails';

function PostPage() {

  return (
    <main className='bg-gray-800 font-sans text-white m-0'>
     <NavBar></NavBar>
     <PostDetails></PostDetails>
     <Footer></Footer>
    </main>
  )
}

export default PostPage