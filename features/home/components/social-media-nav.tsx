import { ArrowLeftRight, Calendar, Globe, ShoppingBag } from 'lucide-react';

interface SocialMediaNavProps {
  label: string;
}

export function SocialMediaNav({ label }: SocialMediaNavProps) {
  return (
    <div className="flex justify-center">
      <div className="flex items-center gap-3 bg-primary text-primary-foreground px-5 py-2.5 rounded-b-4xl">
        <Globe size={16} />
        <span className="font-semibold text-sm">{label}</span>
        <div className="w-px h-4 bg-white/30" />
        <ArrowLeftRight size={16} />
        <Calendar size={16} />
        <ShoppingBag size={16} />
      </div>
    </div>
  );
}
