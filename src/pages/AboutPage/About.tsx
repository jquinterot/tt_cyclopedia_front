// src/pages/AboutPage/AboutPage.tsx
import NavBar from "../../components/shared/NavBar/NavBar";
import Footer from "../../components/shared/Footer/Footer";
import { useLanguage } from "../../contexts/LanguageContext";

export default function AboutPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col font-sans text-white" data-testid="about-page">
      <NavBar />
      
      <main className="flex-grow flex justify-center items-center px-4 py-8" data-testid="about-content">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold mb-6 text-white" data-testid="about-title">
            {t('about.title')}
          </h1>
          
          <div className="space-y-6">
            <p className="text-lg text-gray-300" data-testid="about-description">
              {t('about.description')}
            </p>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white" data-testid="mission-title">
                {t('about.mission.title')}
              </h2>
              <ul className="list-disc list-inside space-y-2 text-gray-300" data-testid="mission-list">
                <li>{t('about.mission.item1')}</li>
                <li>{t('about.mission.item2')}</li>
                <li>{t('about.mission.item3')}</li>
                <li>{t('about.mission.item4')}</li>
              </ul>
            </div>

            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-white" data-testid="features-title">
                {t('about.features.title')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-testid="features-grid">
                <div className="p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10" data-testid="feature-reviews">
                  <h3 className="text-lg font-medium text-white mb-2">
                    {t('about.features.reviews.title')}
                  </h3>
                  <p className="text-gray-300">
                    {t('about.features.reviews.description')}
                  </p>
                </div>
                <div className="p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10" data-testid="feature-community">
                  <h3 className="text-lg font-medium text-white mb-2">
                    {t('about.features.community.title')}
                  </h3>
                  <p className="text-gray-300">
                    {t('about.features.community.description')}
                  </p>
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