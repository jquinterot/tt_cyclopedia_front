import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import PostPage from "./pages/PostPage/PostPage";
import AboutPage from "./pages/AboutPage/About";
import LoginPage from "./pages/LoginPage/LoginPage";
import CreatePostPage from "./pages/AddPostPage/CreatePostPage";
import SignupPage from "./pages/SignupPage/SignupPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950" data-testid="app-root">
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes data-testid="app-routes">
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/posts/:id" element={<PostPage />} />
            <Route path="/createPost" element={<CreatePostPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </Router>
      </QueryClientProvider>
    </div>
  );
}

export default App;
