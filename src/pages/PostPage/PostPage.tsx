import NavBar from '../../components/shared/NavBar/NavBar';
import Footer from '../../components/shared/Footer/Footer';
import PostDetails from '../../components/posts/Post/PostDetails';

function PostPage() {
  return (
    <div className="min-h-screen flex flex-col font-sans text-white">
          <NavBar />
      <main className="flex-grow flex justify-center px-4 py-8">
        <PostDetails />
          </main>
          <Footer />
        </div>
  );
}

export default PostPage;