import  NavBar  from '../../components/shared/NavBar/NavBar';
import  Footer  from '../../components/shared/Footer/Footer';
import CreatePostForm from '../../components/createPost/CreatePostForm/CreatePostForm';

function CreatePostPage() {

  return (
     <div className="min-h-screen flex flex-col bg-gray-800 font-sans text-white m-0">
      <NavBar />
      <main className="flex-grow ">
        <CreatePostForm/>
      </main>
      <Footer />
    </div>
  )
}

export default CreatePostPage