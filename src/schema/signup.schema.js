import { z } from "zod";

// Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character
const passwordValidation = new RegExp(
  /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
);

export const SignupSchema = z.object({
  firstName: z
    .string()
    .min(3, {
      // using min makes it a required field
      message: "First name must be at least 3 characters.",
    })
    .max(100, {
      message: "First name cannot be more than 100 characters",
    }),
  lastName: z
    .string()
    .max(100, {
      message: "Last name cannot be more than 100 characters",
    })
    .optional(), // optional needs to come after max
  email: z.string().email({
    message: "Invalid email format.",
  }),
  password: z.string().regex(passwordValidation, {
    message:
      "Password must be atleast 8 characters and must include at least one number, one uppercase letter, one lowercase letter, and one special character.",
  }),
});
