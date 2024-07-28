import  NavBar  from './components/NavBar/NavBar';
import  Footer  from './components/Footer/Footer';
import  Post  from './components/Post/Post';


function App() {

  return (
    <main className='bg-gray-800 font-sans text-white m-0'>
     <NavBar></NavBar>
     <Post></Post>
     <Footer></Footer>
    </main>
  )
}

export default App
