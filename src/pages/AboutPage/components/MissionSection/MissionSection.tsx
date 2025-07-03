import { useLanguage } from '@/contexts/LanguageContext.utils';

export default function MissionSection() {
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