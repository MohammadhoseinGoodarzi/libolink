"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@/lib/zod-resolver";
import Link from "next/link";

import { signIn, signInSchema, type SignInInput } from "@/lib/auth";
import type { SignInFormProps } from "@/types/auth";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <path
        fill="#1877F2"
        d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"
      />
    </svg>
  );
}

export function SignInForm({ strings }: SignInFormProps) {
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  async function onSubmit(data: SignInInput) {
    await signIn(data);
    setSuccess(true);
  }

  if (success) {
    return (
      <p className="py-4 text-center text-sm font-medium text-brand-primary">
        {strings.successMessage}
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-4"
    >
      <FormField label={strings.emailLabel} htmlFor="signin-email" error={errors.email?.message}>
        <Input
          id="signin-email"
          type="email"
          variant="auth"
          placeholder={strings.emailPlaceholder}
          autoComplete="email"
          {...register("email")}
        />
      </FormField>

      <FormField
        label={strings.passwordLabel}
        htmlFor="signin-password"
        error={errors.password?.message}
        action={
          <Link
            href="/forgot-password"
            className="text-xs font-semibold text-brand-primary hover:underline"
          >
            {strings.forgotPassword}
          </Link>
        }
      >
        <div className="relative">
          <Input
            id="signin-password"
            type={showPassword ? "text" : "password"}
            variant="auth"
            placeholder={strings.passwordPlaceholder}
            autoComplete="current-password"
            className="pr-12"
            {...register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-brand-gray hover:text-brand-primary"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </FormField>

      <Button
        type="submit"
        variant="destructive"
        className="w-full mt-2"
        disabled={isSubmitting}
      >
        {strings.submitLabel}
      </Button>

      <div className="flex items-center gap-3 my-1">
        <div className="h-px flex-1 bg-border" />
        <span className="text-sm text-brand-gray">{strings.orDivider}</span>
        <div className="h-px flex-1 bg-border" />
      </div>

      <div className="flex flex-col gap-3">
        <Button
          type="button"
          variant="outline"
          className="h-13 w-full rounded-full text-sm font-normal"
        >
          <GoogleIcon />
          <span className="flex-1 text-center">{strings.signInWithGoogle}</span>
        </Button>
        <Button
          type="button"
          variant="outline"
          className="h-13 w-full rounded-full text-sm font-normal"
        >
          <FacebookIcon />
          <span className="flex-1 text-center">
            {strings.signInWithFacebook}
          </span>
        </Button>
      </div>
    </form>
  );
}
