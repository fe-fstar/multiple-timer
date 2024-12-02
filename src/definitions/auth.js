import { z } from 'zod';

// Login form schema
export const LoginFormSchema = z.object({
    username_xor_email: z
        .string()
        .min(1, "username_xor_email_required")
        .transform((value) => {
            const isEmail = z.string().email().safeParse(value).success;

            return isEmail ? { type: "email", value } : { type: "username", value };
        }),
    password: z.string().min(1, "password_required"),
});

// Register form schema
export const RegisterFormSchema = z.object({
    username: z
        .string()
        .min(4, "username_minmax")
        .max(24, "username_minmax")
        .regex(/^[a-zA-Z0-9._-]+$/, "username_pattern"),

    email: z
        .string()
        .email("invalid_email"),

    password: z
        .string()
        .min(6, "password_minmax")
        .max(32, "password_minmax"),

    confirm_password: z
        .string()
}).refine(data => data.password === data.confirm_password, {
    message: "passwords_mismatch",
    path: ["confirm_password"],
});