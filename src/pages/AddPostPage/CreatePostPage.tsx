import NavBar from '../../components/shared/NavBar/NavBar';
import Footer from '../../components/shared/Footer/Footer';
import CreatePostForm from '../../components/createPost/CreatePostForm/CreatePostForm';

function CreatePostPage() {
  return (
    <div className="min-h-screen flex flex-col font-sans text-white" data-testid="create-post-page">
      <NavBar />
      <main className="flex-grow" data-testid="create-post-content">
        <CreatePostForm/>
      </main>
      <Footer />
    </div>
  );
}

export default CreatePostPage;