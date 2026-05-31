import { cn } from '@/shared/utils/cn';

interface FavoriteBookCardProps {
  label: string;
  title: string;
  className?: string;
}

export function FavoriteBookCard({ label, title, className }: FavoriteBookCardProps) {
  return (
    <div
      className={cn(
        'bg-background rounded-2xl px-4 py-3 flex items-center justify-between border border-border',
        className,
      )}
    >
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-bold text-primary text-base mt-0.5 leading-tight">{title}</p>
      </div>
      <div className="w-9 h-12 rounded bg-muted shrink-0" />
    </div>
  );
}
