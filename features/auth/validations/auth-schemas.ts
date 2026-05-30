import * as v from 'valibot';

export const signInSchema = v.object({
  email: v.pipe(v.string(), v.email('Enter a valid email address')),
  password: v.pipe(v.string(), v.minLength(8, 'At least 8 characters')),
});

export const signUpSchema = v.pipe(
  v.object({
    email: v.pipe(v.string(), v.email('Enter a valid email address')),
    username: v.pipe(v.string(), v.minLength(8, 'At least 8 characters')),
    password: v.pipe(v.string(), v.minLength(8, 'At least 8 characters')),
    confirmPassword: v.string(),
  }),
  v.forward(
    v.partialCheck(
      [['password'], ['confirmPassword']],
      (input) => input.password === input.confirmPassword,
      "Passwords don't match",
    ),
    ['confirmPassword'],
  ),
);

export type SignInInput = v.InferInput<typeof signInSchema>;
export type SignUpInput = v.InferInput<typeof signUpSchema>;
