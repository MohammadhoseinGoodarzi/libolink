import { z } from "zod";

export const signInSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, "At least 8 characters"),
});

export const signUpSchema = z
  .object({
    email: z.string().email("Enter a valid email address"),
    username: z.string().min(8, "At least 8 characters"),
    password: z.string().min(8, "At least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type SignInInput = z.infer<typeof signInSchema>;
export type SignUpInput = z.infer<typeof signUpSchema>;

export async function signIn(data: SignInInput): Promise<void> {
  console.log("[auth] signIn", data);
}

export async function signUp(
  data: Omit<SignUpInput, "confirmPassword">
): Promise<void> {
  console.log("[auth] signUp", data);
}
