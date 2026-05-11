import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header className="flex items-center justify-between px-4 sm:px-8 h-22.75 bg-white">
      <Link href="/" className="shrink-0">
        <Image
          src="/logo.svg"
          alt="Libolink"
          width={205}
          height={59}
          priority
          className="w-[140px] sm:w-[180px] h-auto"
        />
      </Link>

      <nav className="flex items-center gap-3 sm:gap-4">
        <Button variant="ghost" asChild>
          <Link href="/signup">Sign up</Link>
        </Button>
        <Button asChild>
          <Link href="/login">Sign in</Link>
        </Button>
      </nav>
    </header>
  );
}
