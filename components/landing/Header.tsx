import { Button } from "@/components/ui/button";
import { getDictionary } from "@/lib/dictionary";
import Image from "next/image";
import Link from "next/link";

export async function Header() {
  const t = await getDictionary("Header");

  return (
    <header className="flex items-center justify-between px-4 sm:px-8 h-22.75 bg-white">
      <Link href="/" className="shrink-0">
        <Image
          src="/logo.svg"
          alt={t("logoAlt")}
          width={205}
          height={59}
          priority
          className="w-[140px] sm:w-[180px] h-auto"
        />
      </Link>

      <nav className="flex items-center gap-3 sm:gap-4">
        <Button variant="ghost" asChild>
          <Link href="/signup">{t("signUp")}</Link>
        </Button>
        <Button asChild>
          <Link href="/login">{t("signIn")}</Link>
        </Button>
      </nav>
    </header>
  );
}
