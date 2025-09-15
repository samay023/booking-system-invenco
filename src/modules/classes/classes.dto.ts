import { z } from "zod";

export const ListClassesDto = z.object({
  // Todo: Make this dynamic
  type: z.enum(["salsa", "bachata", "reggaeton", "any"]).default("any"),
});

export type ListClassesDto = z.infer<typeof ListClassesDto>;

export const BookClassDto = z.object({
  email: z.email("email is required and must be a valid email"),
});

export type BookClassDto = z.infer<typeof BookClassDto>;
