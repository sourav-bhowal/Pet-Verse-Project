import {z} from "zod";


// Validation schema of "SignUp" form
export const SignUpSchema = z.object({
    username: z
        .string()
        .min(4, "Username must be at least 4 characters long")
        .max(20, "Username must be at most 20 characters long")
        .regex(/^[a-zA-Z0-9]+$/, "Username must only contain letters and numbers"),
    name: z
        .string()
        .min(3, "Name must be at least 3 characters long")
        .max(20, "Name must be at most 20 characters long"),
    email: z
        .string()
        .email("Invalid email address"),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters long")
        .max(20, "Password must be at most 20 characters long"),
    razorpayId: z
        .string(),
    razorpaySecret: z
        .string()
});