import { getDictionary } from "@/shared/i18n/dictionary";
import { SignInForm } from "@/features/auth";

export default async function LoginPage() {
  const t = await getDictionary("Auth");

  return (
    <SignInForm
      strings={{
        emailLabel: t("email"),
        emailPlaceholder: t("emailPlaceholder"),
        passwordLabel: t("password"),
        passwordPlaceholder: t("passwordPlaceholder"),
        forgotPassword: t("forgotPassword"),
        submitLabel: t("signInButton"),
        successMessage: t("signInSuccess"),
        orDivider: t("orDivider"),
        signInWithGoogle: t("signInWithGoogle"),
        signInWithFacebook: t("signInWithFacebook"),
      }}
    />
  );
}
