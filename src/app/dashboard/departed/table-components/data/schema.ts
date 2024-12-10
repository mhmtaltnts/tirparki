import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const departedSchema = z.object({
    id: z.string(),
    trailer: z.string().toUpperCase(),
    truck: z.string().toUpperCase(),
    customerId: z.string(),
    cargo: z.string(),
    amount: z.number(),
    status: z.string(),
    userId: z.string(),
});

export type Departed = z.infer<typeof departedSchema>;
