import { DashboardShell, SidebarLeft, SidebarRight, SocialMediaNav } from '@/features/home';
import { SearchInput } from '@/shared/components/ui/search-input';
import { getDictionary } from '@/shared/i18n/dictionary';

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const t = await getDictionary('Home');

  return (
    <DashboardShell
      sidebarLeft={<SidebarLeft />}
      sidebarRight={<SidebarRight />}
      mobileSearch={<SearchInput placeholder={t('searchPlaceholder')} />}
      mobileSocialMediaNav={<SocialMediaNav label={t('socialMediaLabel')} />}
    >
      {children}
    </DashboardShell>
  );
}
