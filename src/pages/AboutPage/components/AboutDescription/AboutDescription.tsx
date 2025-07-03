import { useLanguage } from '@/contexts/LanguageContext.utils';

export default function AboutDescription() {
  const { t } = useLanguage();
  return (
    <p className="text-lg text-gray-300" data-testid="about-description">
      {t('about.description')}
    </p>
  );
} 