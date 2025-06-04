import NavBar from "../../components/shared/NavBar/NavBar";
import Footer from "../../components/shared/Footer/Footer";
import PostList from "../../components/main/PostList/PostList";

function MainPage() {
  return (
    <div className="min-h-screen flex flex-col font-sans text-white" data-testid="main-page">
      <NavBar />
      <main className="flex-grow flex justify-center px-4 py-8" data-testid="main-content">
        <PostList />
      </main>
      <Footer />
    </div>
  );
}

export default MainPage;
