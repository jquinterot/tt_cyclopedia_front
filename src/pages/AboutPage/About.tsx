// src/pages/AboutPage/AboutPage.tsx
import NavBar from "../../components/shared/NavBar/NavBar";
import Footer from "../../components/shared/Footer/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col font-sans text-white" data-testid="about-page">
      <NavBar />
      
      <main className="flex-grow flex justify-center items-center px-4 py-8" data-testid="about-content">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold mb-6 text-white" data-testid="about-title">About TT Cyclopedia</h1>
          
          <div className="space-y-6">
            <p className="text-lg text-gray-300" data-testid="about-description">
              TT Cyclopedia is a community-driven platform for blade enthusiasts 
              to share their knowledge and experiences with cutting tools.
            </p>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white" data-testid="mission-title">Our Mission</h2>
              <ul className="list-disc list-inside space-y-2 text-gray-300" data-testid="mission-list">
                <li>Provide comprehensive blade equipment reviews</li>
                <li>Create a community of passionate enthusiasts</li>
                <li>Share expert maintenance and usage tips</li>
                <li>Preserve traditional blade craftsmanship</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white" data-testid="features-title">Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-testid="features-grid">
                <div className="p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10" data-testid="feature-reviews">
                  <h3 className="text-lg font-medium text-white mb-2">Detailed Reviews</h3>
                  <p className="text-gray-300">In-depth analysis of blade materials, construction, and performance</p>
                </div>
                <div className="p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10" data-testid="feature-community">
                  <h3 className="text-lg font-medium text-white mb-2">Community Driven</h3>
                  <p className="text-gray-300">Share your experiences and learn from other enthusiasts</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}