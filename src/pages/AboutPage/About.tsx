// src/pages/AboutPage/AboutPage.tsx
import NavBar from "../../components/shared/NavBar/NavBar";
import Footer from "../../components/shared/Footer/Footer";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-800 font-sans text-white">
      <NavBar />
      
      <main className="flex-grow flex justify-center items-center">
        <div className="max-w-2xl px-4 py-8">
          <h1 className="text-3xl font-bold mb-6 text-white">About TT Cyclopedia</h1>
          
          <div className="space-y-4 text-gray-300">
            <p className="text-lg">
              TT Cyclopedia is a community-driven platform for blade enthusiasts 
              to share their knowledge and experiences with cutting tools.
            </p>

            <h2 className="text-xl font-semibold text-white mt-6">Our Mission</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Provide comprehensive blade equipment reviews</li>
              <li>Create a community of passionate enthusiasts</li>
              <li>Share expert maintenance and usage tips</li>
              <li>Preserve traditional blade craftsmanship</li>
            </ul>

            <h2 className="text-xl font-semibold text-white mt-6">Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-700 rounded-lg">
                <h3 className="text-gray-200 font-medium">Detailed Reviews</h3>
                <p className="text-sm mt-2">In-depth analysis of blade materials, construction, and performance</p>
              </div>
              <div className="p-4 bg-gray-700 rounded-lg">
                <h3 className="text-gray-200 font-medium">Community Driven</h3>
                <p className="text-sm mt-2">Share your experiences and learn from other enthusiasts</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}