"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { AuthTabsProps } from "@/types/auth";
import { Button } from "@/components/ui/button";

export function AuthTabs({ signUpLabel, signInLabel }: AuthTabsProps) {
  const pathname = usePathname();
  const isSignUp = pathname === "/signup";

  return (
    <div className="flex items-center justify-center gap-3">
      <Button variant={isSignUp ? "default" : "ghost"} asChild className="w-26">
        <Link href="/signup">{signUpLabel}</Link>
      </Button>
      <Button variant={isSignUp ? "ghost" : "default"} asChild className="w-26">
        <Link href="/login">{signInLabel}</Link>
      </Button>
    </div>
  );
}
