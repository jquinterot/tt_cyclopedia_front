import NavBar from "../../../components/shared/NavBar/NavBar";
import Footer from "../../../components/shared/Footer/Footer";
import AboutTitle from "../components/AboutTitle/AboutTitle";
import AboutDescription from "../components/AboutDescription/AboutDescription";
import MissionSection from "../components/MissionSection/MissionSection";
import FeaturesSection from "../components/FeaturesSection/FeaturesSection";

export default function MainComponent() {
  return (
    <div className="min-h-screen flex flex-col font-sans text-white" data-testid="about-page">
      <NavBar />
      <main className="flex-grow flex justify-center items-center px-4 py-8" data-testid="about-content">
        <div className="max-w-2xl space-y-6">
          <AboutTitle />
          <AboutDescription />
          <MissionSection />
          <FeaturesSection />
        </div>
      </main>
      <Footer />
    </div>
  );
} 