interface UserProfileCardProps {
  name: string;
  role: string;
}

export function UserProfileCard({ name, role }: UserProfileCardProps) {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="bg-primary rounded-2xl p-4 flex flex-col items-center gap-3">
      <div className="w-16 h-16 rounded-full bg-primary-foreground/20 ring-2 ring-white/40 flex items-center justify-center text-primary-foreground font-bold text-lg select-none">
        {initials}
      </div>
      <div className="text-center">
        <p className="text-primary-foreground font-semibold text-sm">{name}</p>
        <p className="text-primary-foreground/70 text-xs mt-0.5">{role}</p>
      </div>
    </div>
  );
}
