import { SearchInput } from '@/shared/components/ui/search-input';
import { getDictionary } from '@/shared/i18n/dictionary';
import { MOCK_STORIES } from '../constants';
import type { AiPanelLabels } from '../types';
import { AdsPanel } from './ads-panel';
import { AiAssistantPanel } from './ai-assistant-panel';
import { StoriesPanel } from './stories-panel';

export async function SidebarRight() {
  const t = await getDictionary('Home');

  const aiLabels: AiPanelLabels = {
    title: t('aiAssistantTitle'),
    mode: t('aiAssistantMode'),
    greeting: t('aiGreeting'),
    placeholder: t('aiPlaceholder'),
  };

  return (
    <div className="h-full flex flex-col gap-5 p-4 pt-5">
      <SearchInput placeholder={t('searchPlaceholder')} />
      <StoriesPanel title={t('storiesTitle')} stories={MOCK_STORIES} />
      <AdsPanel title={t('adsTitle')} />
      <AiAssistantPanel labels={aiLabels} />
    </div>
  );
}
