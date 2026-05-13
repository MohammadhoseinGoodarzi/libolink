import { getDictionary } from "@/lib/dictionary";
import { SignUpForm } from "@/components/auth/SignUpForm";

export default async function SignUpPage() {
  const t = await getDictionary("Auth");

  return (
    <SignUpForm
      strings={{
        emailLabel: t("email"),
        emailPlaceholder: t("emailPlaceholder"),
        usernameLabel: t("username"),
        usernamePlaceholder: t("usernamePlaceholder"),
        passwordLabel: t("password"),
        passwordPlaceholder: t("passwordPlaceholder"),
        confirmPasswordLabel: t("confirmPassword"),
        confirmPasswordPlaceholder: t("confirmPasswordPlaceholder"),
        submitLabel: t("signUpButton"),
        successMessage: t("signUpSuccess"),
      }}
    />
  );
}
