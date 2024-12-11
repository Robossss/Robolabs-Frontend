import { z } from "zod";

export const role = ["admin", "student"];
export const loginInfoSchema = z.object({
  username: z
    .string({required_error: "Field is required"})
    .min(5, { message: "Username is too short" })
    .max(24, { message: "Username is too long" })
    .trim(),
  password: z
    .string({required_error: "Field is required"})
    .min(8, { message: "Password is too short" })
    .max(25, { message: "password is too long" })
    .regex(
      new RegExp(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,25}$/
        ),
      {
        message:
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
      }
    ).trim(),
});

export const userInfoSchema = z
  .object({
    firstName: z
      .string({required_error: "Field is required"})
      .min(2, { message: "First name is required" })
      .max(24, { message: "First name is too long" }).trim(),
    lastName: z
      .string({required_error: "Field is required"})
      .min(2, { message: "Last name is required" })
      .max(24, { message: "Last name is too long" }).trim(),
    username: z
      .string({required_error: "Field is required"})
      .min(5, { message: "Username is too short" })
      .max(24, { message: "Username is too long" }).trim(),
    password: z
      .string({required_error: "Field is required"})
      .min(8, { message: "Password is too short" })
      .max(25, { message: "password is too long" })
      .regex(
        new RegExp(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,25}$/
        ),
        {
          message:
            "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
        }
      ).trim(),
    confirmPassword: z
      .string({required_error: "Field is required"})
      .min(8, { message: "Password is too short" })
      .max(25, { message: "password is too long" }).trim(),
    role: z.string().min(1, { message: "Role is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type userInfoSchema = z.infer<typeof userInfoSchema>;
