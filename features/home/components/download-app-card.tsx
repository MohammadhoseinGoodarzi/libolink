import Image from 'next/image';

import { Button } from '@/shared/components/ui/button';

interface DownloadAppCardProps {
  title: string;
  appStoreLabel: string;
  googlePlayLabel: string;
}

export function DownloadAppCard({ title, appStoreLabel, googlePlayLabel }: DownloadAppCardProps) {
  return (
    <div className="bg-primary rounded-2xl p-4 flex flex-col gap-3">
      <p className="text-primary-foreground font-semibold text-sm text-center">{title}</p>
      <div className="flex gap-2 justify-center">
        <Button
          variant="ghost"
          disabled
          className="rounded-full border border-white/30 text-primary-foreground bg-transparent hover:bg-white/10 text-xs h-auto py-1.5 px-4"
        >
          <Image src="/assets/icons/apple.svg" width={14} height={14} alt="" aria-hidden />
          <span className="translate-y-px">{appStoreLabel}</span>
        </Button>
        <Button
          variant="ghost"
          disabled
          className="rounded-full border border-white/30 text-primary-foreground bg-transparent hover:bg-white/10 text-xs h-auto py-1.5 px-4"
        >
          <Image src="/assets/icons/android.svg" width={14} height={14} alt="" aria-hidden />
          <span className="translate-y-px">{googlePlayLabel}</span>
        </Button>
      </div>
    </div>
  );
}
