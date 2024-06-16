import {z} from "zod";

// Validation scema of "Payment" form
export const PaymentSchema = z.object({
    buyer: z
        .string(),
    seller: z
        .string(),
    orderId: z
        .string(),
    amount: z
        .number(),
    done: z
        .boolean(),
});