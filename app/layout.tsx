import type { Metadata } from 'next';
import localFont from 'next/font/local';
import type { ReactNode } from 'react';
import { Providers } from '@/shared/providers';
import './globals.css';

const vazirmatn = localFont({
  src: '../public/assets/fonts/Vazirmatn[wght].woff2',
  weight: '100 900',
  variable: '--font-vazirmatn',
});

export const metadata: Metadata = {
  title: 'Libolink',
  description: 'A social platform for book lovers — discover, share, and buy books.',
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={vazirmatn.variable} suppressHydrationWarning>
      <body>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}}catch{}`,
          }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
