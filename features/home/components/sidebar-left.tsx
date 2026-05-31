import Image from 'next/image';
import Link from 'next/link';

import { ThemeToggle } from '@/shared/components/theme-toggle';

import { getDictionary } from '@/shared/i18n/dictionary';
import { MOCK_USER } from '../constants';
import { DownloadAppCard } from './download-app-card';
import { FavoriteBookCard } from './favorite-book-card';
import { NavMenu } from './nav-menu';
import { UserProfileCard } from './user-profile-card';

export async function SidebarLeft() {
  const t = await getDictionary('Home');

  const navItems = [
    { key: 'home', href: '/', label: t('homeNav') },
    { key: 'messages', href: '/messages', label: t('messagesNav'), disabled: true },
    { key: 'friends', href: '/friends', label: t('friendsNav'), disabled: true },
    { key: 'bookExchange', href: '/book-exchange', label: t('bookExchangeNav'), disabled: true },
    { key: 'clubs', href: '/clubs', label: t('clubsNav'), disabled: true },
    { key: 'settings', href: '/settings', label: t('settingsNav'), disabled: true },
  ];

  return (
    <div className="h-full flex flex-col gap-4 p-4 pt-5">
      <div className="hidden lg:flex items-center justify-between px-1">
        <Link href="/" className="shrink-0">
          <Image
            src="/assets/images/logo.png"
            alt={t('logoAlt')}
            width={140}
            height={40}
            className="w-32 h-auto"
            priority
          />
        </Link>
        <ThemeToggle />
      </div>

      <div className="rounded-2xl overflow-hidden flex flex-col">
        <UserProfileCard name={MOCK_USER.name} role={MOCK_USER.role} className="rounded-none" />
        <FavoriteBookCard
          label={t('favoriteBookLabel')}
          title={MOCK_USER.favoriteBook}
          className="rounded-none border-t-0"
        />
      </div>

      <NavMenu items={navItems} />

      <div className="mt-auto pt-4">
        <DownloadAppCard
          title={t('downloadTitle')}
          appStoreLabel={t('appStore')}
          googlePlayLabel={t('googlePlay')}
        />
      </div>
    </div>
  );
}
