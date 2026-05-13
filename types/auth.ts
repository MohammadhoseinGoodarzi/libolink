export interface SignInFormStrings {
  emailLabel: string;
  emailPlaceholder: string;
  passwordLabel: string;
  passwordPlaceholder: string;
  forgotPassword: string;
  submitLabel: string;
  successMessage: string;
  orDivider: string;
  signInWithGoogle: string;
  signInWithFacebook: string;
}

export interface SignUpFormStrings {
  emailLabel: string;
  emailPlaceholder: string;
  usernameLabel: string;
  usernamePlaceholder: string;
  passwordLabel: string;
  passwordPlaceholder: string;
  confirmPasswordLabel: string;
  confirmPasswordPlaceholder: string;
  submitLabel: string;
  successMessage: string;
}

export interface SignInFormProps {
  strings: SignInFormStrings;
}

export interface SignUpFormProps {
  strings: SignUpFormStrings;
}

export interface AuthTabsProps {
  signUpLabel: string;
  signInLabel: string;
}
