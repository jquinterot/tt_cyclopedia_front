import NavBar from "../../components/shared/NavBar/NavBar";
import Footer from "../../components/shared/Footer/Footer";
import { useLanguage } from "../../contexts/LanguageContext";

// AboutTitle.tsx
function AboutTitle() {
  const { t } = useLanguage();
  return (
    <h1 className="text-3xl font-bold mb-6 text-white" data-testid="about-title">
      {t('about.title')}
    </h1>
  );
}

// AboutDescription.tsx
function AboutDescription() {
  const { t } = useLanguage();
  return (
    <p className="text-lg text-gray-300" data-testid="about-description">
      {t('about.description')}
    </p>
  );
}

// MissionSection.tsx
function MissionSection() {
  const { t } = useLanguage();
  return (
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
  );
}

// FeaturesSection.tsx
function FeaturesSection() {
  const { t } = useLanguage();
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-white" data-testid="features-title">
        {t('about.features.title')}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-testid="features-grid">
        <FeatureCard
          title={t('about.features.reviews.title')}
          description={t('about.features.reviews.description')}
          testId="feature-reviews"
        />
        <FeatureCard
          title={t('about.features.community.title')}
          description={t('about.features.community.description')}
          testId="feature-community"
        />
      </div>
    </div>
  );
}

// FeatureCard.tsx
type FeatureCardProps = {
  title: string;
  description: string;
  testId: string;
};
function FeatureCard({ title, description, testId }: FeatureCardProps) {
  return (
    <div className="p-6 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10" data-testid={testId}>
      <h3 className="text-lg font-medium text-white mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
}

// AboutPage.tsx
export default function AboutPage() {
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