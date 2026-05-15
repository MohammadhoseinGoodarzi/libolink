import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Providers } from "@/shared/providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Libolink",
  description: "A social platform for book lovers — discover, share, and buy books.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
