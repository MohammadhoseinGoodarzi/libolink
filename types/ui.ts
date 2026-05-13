import type { ReactNode } from "react";

export interface FormFieldProps {
  label: string;
  htmlFor: string;
  error?: string;
  action?: ReactNode;
  children: ReactNode;
}
