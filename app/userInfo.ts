import { z } from "zod";

export const role = ["admin", "student"];
export const loginInfoSchema = z.object({
  username: z
    .string()
    .min(5, { message: "Username is too short" })
    .max(24, { message: "Username is too long" }),
  password: z
    .string()
    .min(8, { message: "Password is too short" })
    .max(25, { message: "password is too long" }),
});

export const userInfoSchema = z
  .object({
    firstName: z.string().min(2, { message: "First name is required" }).max(24, { message: "First name is too long" }),
    lastName: z.string().min(2, { message: "Last name is required" }).max(24, { message: "Last name is too long" }),
    username: z.string().min(5, { message: "Username is too short" }).max(24, { message: "Username is too long" }),
    password: z.string().min(8,{message:"Password is too short"}).max(25, { message: "password is too long" }),
    confirmPassword: z.string().min(8,{message:"Password is too short"}).max(25, { message: "password is too long" }),
    role: z.string().min(1, { message: "Role is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type userInfoSchema = z.infer<typeof userInfoSchema>;
