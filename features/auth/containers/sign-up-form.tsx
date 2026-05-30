'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { Button } from '@/shared/components/ui/button';
import { FormField } from '@/shared/components/ui/form-field';
import { Input } from '@/shared/components/ui/input';
import { PasswordInput } from '@/shared/components/ui/password-input';
import { valibotResolver } from '@/shared/validations/valibot-resolver';

import { signUp } from '../services/auth-service';
import type { SignUpFormProps } from '../types';
import { type SignUpInput, signUpSchema } from '../validations/auth-schemas';

export function SignUpForm({ strings }: SignUpFormProps) {
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpInput>({
    resolver: valibotResolver(signUpSchema),
    defaultValues: { email: '', username: '', password: '', confirmPassword: '' },
  });

  async function onSubmit(data: SignUpInput) {
    await signUp({ email: data.email, username: data.username, password: data.password });
    setSuccess(true);
  }

  if (success) {
    return (
      <p className="text-center text-sm font-medium text-brand-primary py-4">
        {strings.successMessage}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
      <FormField label={strings.emailLabel} htmlFor="signup-email" error={errors.email?.message}>
        <Input
          id="signup-email"
          type="email"
          variant="auth"
          placeholder={strings.emailPlaceholder}
          autoComplete="email"
          {...register('email')}
        />
      </FormField>

      <FormField
        label={strings.usernameLabel}
        htmlFor="signup-username"
        error={errors.username?.message}
      >
        <Input
          id="signup-username"
          type="text"
          variant="auth"
          placeholder={strings.usernamePlaceholder}
          autoComplete="username"
          {...register('username')}
        />
      </FormField>

      <FormField
        label={strings.passwordLabel}
        htmlFor="signup-password"
        error={errors.password?.message}
      >
        <PasswordInput
          id="signup-password"
          variant="auth"
          placeholder={strings.passwordPlaceholder}
          autoComplete="new-password"
          {...register('password')}
        />
      </FormField>

      <FormField
        label={strings.confirmPasswordLabel}
        htmlFor="signup-confirm-password"
        error={errors.confirmPassword?.message}
      >
        <PasswordInput
          id="signup-confirm-password"
          variant="auth"
          placeholder={strings.confirmPasswordPlaceholder}
          autoComplete="new-password"
          {...register('confirmPassword')}
        />
      </FormField>

      <Button type="submit" variant="destructive" className="w-full mt-2" disabled={isSubmitting}>
        {strings.submitLabel}
      </Button>
    </form>
  );
}
