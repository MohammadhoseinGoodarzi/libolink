'use client';

import { Bot, Menu, X } from 'lucide-react';
import Image from 'next/image';
import { type ReactNode, useState } from 'react';

import { ThemeToggle } from '@/shared/components/theme-toggle';
import { Button } from '@/shared/components/ui/button';
import { cn } from '@/shared/utils/cn';

interface DashboardShellProps {
  sidebarLeft: ReactNode;
  sidebarRight: ReactNode;
  mobileSearch: ReactNode;
  mobileSocialMediaNav?: ReactNode;
  children: ReactNode;
}

export function DashboardShell({
  sidebarLeft,
  sidebarRight,
  mobileSearch,
  mobileSocialMediaNav,
  children,
}: DashboardShellProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-neutral-100 dark:bg-background">
      {/* Mobile drawer overlay */}
      <div
        className={cn(
          'fixed inset-0 z-50 lg:hidden transition-opacity duration-200',
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        )}
      >
        <button
          type="button"
          aria-label="Close menu"
          className="absolute inset-0 bg-black/40"
          onClick={() => setMobileOpen(false)}
        />
        <div
          className={cn(
            'absolute left-0 top-0 h-full w-72 bg-neutral-100 dark:bg-background overflow-y-auto transition-transform duration-200',
            mobileOpen ? 'translate-x-0' : '-translate-x-full',
          )}
        >
          {/* Drawer header: logo + theme toggle aligned with close button */}
          <div className="flex items-center justify-between px-4 py-4">
            <div className="flex items-center gap-1">
              <Image
                src="/assets/images/logo.png"
                alt="Libolink"
                width={120}
                height={34}
                className="w-28 h-auto"
              />
              <ThemeToggle />
            </div>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={() => setMobileOpen(false)}
              className="text-foreground"
            >
              <X size={18} />
            </Button>
          </div>

          {/* Search */}
          <div className="px-4 pb-3">{mobileSearch}</div>

          {sidebarLeft}
        </div>
      </div>

      {/* Desktop left sidebar */}
      <aside className="hidden lg:block w-72 shrink-0 sticky top-0 h-screen overflow-y-auto">
        {sidebarLeft}
      </aside>

      <main className="flex-1 min-w-0 h-screen sticky top-0 overflow-hidden flex flex-col pb-5 px-4 lg:px-5">
        {/* Mobile top bar: hamburger | SocialMediaNav | AI button */}
        <div className="lg:hidden flex items-center gap-2 px-2 -mx-4 mb-1">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => setMobileOpen(true)}
            className="shrink-0 text-foreground"
          >
            <Menu size={22} />
          </Button>
          {mobileSocialMediaNav && <div className="flex-1 min-w-0">{mobileSocialMediaNav}</div>}
          <Button
            variant="ghost"
            size="icon"
            disabled
            className="shrink-0 rounded-full bg-linear-to-br from-brand-soft to-brand-glow text-primary hover:bg-none"
          >
            <Bot size={18} />
          </Button>
        </div>

        {children}
      </main>

      {/* Right sidebar — visible at lg+ */}
      <aside className="hidden lg:block w-72 shrink-0 sticky top-0 h-screen overflow-y-auto">
        {sidebarRight}
      </aside>
    </div>
  );
}
