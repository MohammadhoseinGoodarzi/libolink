'use server';

import { cookies } from 'next/headers';

export async function setAuthCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set('mock-auth', 'true', { path: '/', maxAge: 86400 });
}

export async function clearAuthCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete('mock-auth');
}
