import  NavBar  from '../../components/shared/NavBar/NavBar';
import  Footer  from '../../components/shared/Footer/Footer';
import  Post  from '../../components/posts/Post/Post';

function PostPage() {

  return (
    <main className='bg-gray-800 font-sans text-white m-0'>
     <NavBar></NavBar>
     <Post></Post>
     <Footer></Footer>
    </main>
  )
}

export default PostPage