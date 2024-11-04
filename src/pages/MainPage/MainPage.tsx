import  NavBar  from '../../components/shared/NavBar/NavBar';
import  Footer  from '../../components/shared/Footer/Footer';
import PostList from '../../components/main/PostList/PostList';

function MainPage() {

  return (
    <main className='bg-gray-800 font-sans text-white m-0 '>
     <NavBar></NavBar>
     <PostList></PostList>
     <Footer></Footer>
    </main>
  )
}

export default MainPage