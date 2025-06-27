import { useLanguage } from '@/contexts/LanguageContext';
import FeatureCard from "../FeatureCard/FeatureCard";

export default function FeaturesSection() {
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