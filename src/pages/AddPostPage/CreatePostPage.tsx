import  NavBar  from '../../components/shared/NavBar/NavBar';
import  Footer  from '../../components/shared/Footer/Footer';
import CreatePostForm from '../../components/createPost/CreatePostForm/CreatePostForm';

function CreatePostPage() {

  return (
    <main className='bg-gray-800 font-sans text-white m-0 '>
     <NavBar></NavBar>
     <CreatePostForm></CreatePostForm>
     <Footer></Footer>
    </main>
  )
}

export default CreatePostPage