import { cookies } from 'next/headers';
import { Header } from '@/features/landing';

export default async function LandingLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const isAuth = cookieStore.get('mock-auth')?.value === 'true';

  if (isAuth) return <>{children}</>;

  return (
    <>
      <Header />
      {children}
    </>
  );
}
