import { z } from "zod";

export const updatePasswordSchema = z
   .object({
      old_password: z //
         .string("old_password is required"),
      new_password: z //
         .string("new_password is required")
         .min(8, "Password must be at least 8 characters"),
   })
   .strict();

export const activationSchema = z
   .object({
      user_id: z.coerce //
         .number("user_id is required")
         .int("user_id must be an integer")
         .positive("user_id must be greater than 0"),

      is_active: z.boolean({
         error: (issue) => (issue.input === undefined ? "is_active is required" : "is_active must be a boolean"),
      }),
   })
   .strict();

export const inviteUserSchema = z
   .object({
      email: z //
         .string("Email is required")
         .email("Invalid email format"),

      password: z //
         .string("Password is required")
         .min(6, "Password must be at least 6 characters"),
   })
   .strict();
