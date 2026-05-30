import Image from 'next/image';

interface AdsPanelProps {
  title: string;
}

export function AdsPanel({ title }: AdsPanelProps) {
  return (
    <div>
      <h3 className="font-semibold text-sm mb-3">{title}</h3>
      <div className="rounded-2xl overflow-hidden bg-muted aspect-video">
        <Image
          src="https://picsum.photos/seed/ad1/288/162"
          alt="Advertisement"
          width={288}
          height={162}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
