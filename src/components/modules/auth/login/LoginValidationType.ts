import { z } from "zod";

export const loginValidationSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password too short" }),
});

export type LoginValidationType = z.infer<typeof loginValidationSchema>;
