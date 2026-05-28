import Image from "next/image";
import Link from "next/link";

import { Button } from "@/shared/components/ui/button";
import { getDictionary } from "@/shared/i18n/dictionary";

export async function Header() {
  const t = await getDictionary("Header");

  return (
    <header className="flex items-center justify-between px-4 sm:px-8 h-22.75 bg-background">
      <Link href="/" className="shrink-0">
        <Image
          src="/assets/images/logo.svg"
          alt={t("logoAlt")}
          width={205}
          height={59}
          priority
          className="w-35 sm:w-45 h-auto"
        />
      </Link>

      <nav className="flex items-center gap-3 sm:gap-4">
        <Button variant="ghost" asChild>
          <Link href="/signup" prefetch>
            {t("signUp")}
          </Link>
        </Button>
        <Button asChild>
          <Link href="/login" prefetch>
            {t("signIn")}
          </Link>
        </Button>
      </nav>
    </header>
  );
}
