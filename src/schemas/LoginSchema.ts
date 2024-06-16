import {z} from "zod";

// Validation schema of "Login" form
export const LoginSchema = z.object({
    username: z
        .string()
        .min(4, "Username must be at least 4 characters long")
        .max(20, "Username must be at most 20 characters long")
        .regex(/^[a-zA-Z0-9]+$/, "Username must only contain letters and numbers"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .max(20, "Password must be at most 20 characters long")
});