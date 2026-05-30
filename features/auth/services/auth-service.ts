import type { SignInInput, SignUpInput } from '../validations/auth-schemas';

export async function signIn(data: SignInInput): Promise<void> {
  console.log('[auth] signIn', data);
}

export async function signUp(data: Omit<SignUpInput, 'confirmPassword'>): Promise<void> {
  console.log('[auth] signUp', data);
}
