import {z} from "zod";

// Validation schema of "Pet" form
export const PetSchema = z.object({
    name: z
        .string()
        .min(3, "Name must be at least 3 characters long")
        .max(20, "Name must be at most 20 characters long"),
    breed: z
        .string()
        .min(3, "Breed must be at least 3 characters long")
        .max(20, "Breed must be at most 20 characters long"),
    age: z
        .coerce.number()
        .min(1, "Age must be at least 1 year"),
    description: z
        .string()
        .min(10, "Description must be at least 10 characters long")
        .max(300, "Description must be at most 300 characters long"),
    image: z
        .string(),
    price: z
        .coerce.number()
        .min(1, "Price must be at least 1 rupee")
});