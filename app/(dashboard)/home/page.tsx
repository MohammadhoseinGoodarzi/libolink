import type { HomeFeedLabels } from '@/features/home';
import { HomeFeed, MOCK_POSTS, MOCK_STORIES } from '@/features/home';
import { getDictionary } from '@/shared/i18n/dictionary';

export default async function HomePage() {
  const t = await getDictionary('Home');

  const feedLabels: HomeFeedLabels = {
    socialMediaLabel: t('socialMediaLabel'),
    storiesTitle: t('storiesTitle'),
    tabRecent: t('tabRecent'),
    tabPopular: t('tabPopular'),
    tabFollowing: t('tabFollowing'),
    writeNowPlaceholder: t('writeNowPlaceholder'),
    post: t('post'),
    imageOption: t('imageOption'),
    locationOption: t('locationOption'),
    tagOption: t('tagOption'),
    like: t('like'),
    comment: t('comment'),
    share: t('share'),
    copied: t('copied'),
  };

  return <HomeFeed posts={MOCK_POSTS} stories={MOCK_STORIES} labels={feedLabels} />;
}
