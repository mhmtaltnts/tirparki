import { z } from "zod";

export const CreateParkingRateSchema = z.object({
  rate: z.coerce.number().positive(),
});
