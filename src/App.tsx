import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import PostPage from "./pages/PostPage/PostPage";
import CreatePostPage from "./pages/AddPostPage/CreatePostPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/posts/:id" element={<PostPage />} />
        <Route path="/createPost"  element={<CreatePostPage />}/>
      </Routes>
    </Router>
  );
}

export default App;
