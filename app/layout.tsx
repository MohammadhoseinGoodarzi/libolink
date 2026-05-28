import type { Metadata } from "next";
import type { ReactNode } from "react";

import { Providers } from "@/shared/providers";
import localFont from "next/font/local";
import "./globals.css";

const vazirmatn = localFont({
  src: "../public/assets/fonts/Vazirmatn[wght].woff2",
  weight: "100 900",
  variable: "--font-vazirmatn",
});

export const metadata: Metadata = {
  title: "Libolink",
  description:
    "A social platform for book lovers — discover, share, and buy books.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={vazirmatn.variable}>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
