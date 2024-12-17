import NavBar from "../../components/shared/NavBar/NavBar";
import Footer from "../../components/shared/Footer/Footer";
import PostList from "../../components/main/PostList/PostList";

function MainPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-800 font-sans text-white m-0">
      <NavBar />
      <main className="flex-grow flex justify-center">
        <PostList></PostList>
      </main>
      <Footer />
    </div>
  );
}

export default MainPage;
