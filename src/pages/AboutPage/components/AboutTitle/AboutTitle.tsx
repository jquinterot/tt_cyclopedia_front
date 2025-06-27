import { useLanguage } from '@/contexts/LanguageContext';

export default function AboutTitle() {
  const { t } = useLanguage();
  return (
    <h1 className="text-3xl font-bold mb-6 text-white" data-testid="about-title">
      {t('about.title')}
    </h1>
  );
} 