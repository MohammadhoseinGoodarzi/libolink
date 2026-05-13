"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@/lib/zod-resolver";

import { signUp, signUpSchema, type SignUpInput } from "@/lib/auth";
import type { SignUpFormProps } from "@/types/auth";
import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form-field";
import { Input } from "@/components/ui/input";

export function SignUpForm({ strings }: SignUpFormProps) {
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { email: "", username: "", password: "", confirmPassword: "" },
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
          {...register("email")}
        />
      </FormField>

      <FormField label={strings.usernameLabel} htmlFor="signup-username" error={errors.username?.message}>
        <Input
          id="signup-username"
          type="text"
          variant="auth"
          placeholder={strings.usernamePlaceholder}
          autoComplete="username"
          {...register("username")}
        />
      </FormField>

      <FormField label={strings.passwordLabel} htmlFor="signup-password" error={errors.password?.message}>
        <div className="relative">
          <Input
            id="signup-password"
            type={showPassword ? "text" : "password"}
            variant="auth"
            placeholder={strings.passwordPlaceholder}
            autoComplete="new-password"
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

      <FormField label={strings.confirmPasswordLabel} htmlFor="signup-confirm-password" error={errors.confirmPassword?.message}>
        <div className="relative">
          <Input
            id="signup-confirm-password"
            type={showConfirmPassword ? "text" : "password"}
            variant="auth"
            placeholder={strings.confirmPasswordPlaceholder}
            autoComplete="new-password"
            className="pr-12"
            {...register("confirmPassword")}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            tabIndex={-1}
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer text-brand-gray hover:text-brand-primary"
          >
            {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
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
    </form>
  );
}
