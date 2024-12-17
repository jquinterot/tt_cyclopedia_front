import  NavBar  from '../../components/shared/NavBar/NavBar';
import  Footer  from '../../components/shared/Footer/Footer';
import  PostDetails  from '../../components/posts/Post/PostDetails';

function PostPage() {

  return (
    <div className="min-h-screen flex flex-col bg-gray-800 font-sans text-white m-0">
          <NavBar />
          <main className="flex-grow ">
          <PostDetails></PostDetails>
          </main>
          <Footer />
        </div>
  )
}

export default PostPage