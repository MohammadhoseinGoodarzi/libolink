import type { FormFieldProps } from "@/shared/types/ui";

export function FormField({ label, htmlFor, error, action, children }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-sm font-medium">
        {label}
      </label>
      {children}
      <div className="flex h-4 items-center justify-between">
        <p className="text-xs text-brand-accent">{error}</p>
        {action}
      </div>
    </div>
  );
}
