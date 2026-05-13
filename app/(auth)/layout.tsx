import Image from "next/image";
import Link from "next/link";

import { AuthTabs } from "@/components/auth/AuthTabs";
import { getDictionary } from "@/lib/dictionary";

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = await getDictionary("Auth");

  return (
    <div className="flex min-h-screen">
      {/* Left panel — xl+ only, max 30%, h-screen caps height so image never causes scroll */}
      <div className="hidden xl:flex xl:w-[30%] shrink-0 flex-col h-screen overflow-hidden pt-6">
        <div className="relative flex-1">
          <Image
            src="/app-preview-side.png"
            alt=""
            fill
            className="object-contain object-top-left"
            priority
          />
        </div>
      </div>

      {/* Right panel */}
      <div className="flex flex-1 flex-col px-8 py-6">
        {/* Logo */}
        <div className="flex justify-end">
          <Link href="/">
            <Image
              src="/logo.svg"
              alt={t("logoAlt")}
              width={140}
              height={40}
              priority
              className="h-auto w-28 sm:w-36"
            />
          </Link>
        </div>

        {/* Main content — justify-start keeps tab position stable across pages */}
        <div className="flex flex-1 flex-col items-center justify-start pt-8">
          <div className="w-full max-w-sm">
            {/* Tab switcher */}
            <div className="mb-8">
              <AuthTabs signUpLabel={t("signUp")} signInLabel={t("signIn")} />
            </div>

            {/* Heading */}
            <h1 className="mb-3 text-center text-3xl font-bold text-brand-primary">
              {t("title")}
            </h1>

            {/* Subtitle */}
            <p className="mb-8 text-center text-sm leading-relaxed text-brand-gray">
              {t("subtitle")}
            </p>

            {/* Form (login/page or signup/page) */}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
