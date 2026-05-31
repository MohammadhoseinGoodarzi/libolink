'use client';

import { BookMarked, Home, MessageCircle, Settings, User, Users } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/shared/utils/cn';
import type { NavItem } from '../types';

const NAV_ICONS = {
  home: Home,
  messages: MessageCircle,
  friends: User,
  bookExchange: BookMarked,
  clubs: Users,
  settings: Settings,
} as const;

interface NavMenuProps {
  items: NavItem[];
}

export function NavMenu({ items }: NavMenuProps) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      {items.map(({ key, href, label, disabled }) => {
        const Icon = NAV_ICONS[key as keyof typeof NAV_ICONS];
        const isActive = pathname === href || (href === '/' && pathname === '/home');

        if (disabled) {
          return (
            <span
              key={key}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-foreground opacity-40 cursor-not-allowed select-none"
            >
              {Icon && <Icon size={18} className="shrink-0 -translate-y-px" />}
              <span className="translate-y-px">{label}</span>
            </span>
          );
        }

        return (
          <Link
            key={key}
            href={href}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors cursor-pointer',
              isActive
                ? 'bg-primary text-primary-foreground dark:bg-[#4f8968] dark:text-white'
                : 'text-foreground hover:bg-secondary',
            )}
          >
            {Icon && <Icon size={18} className="shrink-0 -translate-y-px" />}
            <span className="translate-y-px">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
