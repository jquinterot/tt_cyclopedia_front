import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import PostPage from "./pages/PostPage/PostPage";
import AboutPage from "./pages/AboutPage/About";
import CreatePostPage from "./pages/AddPostPage/CreatePostPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/posts/:id" element={<PostPage />} />
          <Route path="/createPost" element={<CreatePostPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
