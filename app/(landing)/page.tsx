import { cookies } from 'next/headers';
import type { HomeFeedLabels } from '@/features/home';
import {
  DashboardShell,
  HomeFeed,
  MOCK_POSTS,
  MOCK_STORIES,
  SidebarLeft,
  SidebarRight,
  SocialMediaNav,
} from '@/features/home';
import { Hero } from '@/features/landing';
import { SearchInput } from '@/shared/components/ui/search-input';
import { getDictionary } from '@/shared/i18n/dictionary';

export default async function RootPage() {
  const cookieStore = await cookies();
  const isAuth = cookieStore.get('mock-auth')?.value === 'true';

  if (!isAuth) {
    return (
      <main className="bg-background min-h-screen">
        <Hero />
      </main>
    );
  }

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

  return (
    <DashboardShell
      sidebarLeft={<SidebarLeft />}
      sidebarRight={<SidebarRight />}
      mobileSearch={<SearchInput placeholder={t('searchPlaceholder')} />}
      mobileSocialMediaNav={<SocialMediaNav label={t('socialMediaLabel')} />}
    >
      <HomeFeed posts={MOCK_POSTS} stories={MOCK_STORIES} labels={feedLabels} />
    </DashboardShell>
  );
}
