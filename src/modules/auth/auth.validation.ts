import { z } from "zod";
import mongoose from "mongoose";

const objectId = z
  .string()
  .refine((id) => mongoose.Types.ObjectId.isValid(id), {
    message: "Invalid specialty id",
  });

const phoneRegex = /^(\+20|0)?1[0125][0-9]{8}$/;


const employerBody = z
  .object({
    name: z
      .string({ error: "Name is required" })
      .trim()
      .min(3, "Name must be at least 3 characters"),

    email: z
      .string({ error: "Email is required" })
      .trim()
      .toLowerCase()
      .email("Invalid email address"),

    password: z
      .string({ error: "Password is required" })
      .min(6, "Password must be at least 6 characters"),

    role: z.literal("employer"),


  })
  .strict();


const candidateBody = z
  .object({
    name: z
      .string({ error: "Name is required" })
      .trim()
      .min(3, "Name must be at least 3 characters"),

    email: z
      .string({ error: "Email is required" })
      .trim()
      .toLowerCase()
      .email("Invalid email address"),

    password: z
      .string({ error: "Password is required" })
      .min(6, "Password must be at least 6 characters"),

    role: z.literal("candidate"),


  })
  .strict();


const adminBody = z
  .object({
    name: z
      .string({ error: "Name is required" })
      .trim()
      .min(3, "Name must be at least 3 characters"),

    email: z
      .string({ error: "Email is required" })
      .trim()
      .toLowerCase()
      .email("Invalid email address"),

    password: z
      .string({ error: "Password is required" })
      .min(6, "Password must be at least 6 characters"),

    role: z.literal("admin"),
  })
  .strict();


export const registerSchema = z.object({
  body: z.discriminatedUnion("role", [employerBody, candidateBody, adminBody]),
});


export const verifyEmailSchema = z.object({
  body: z.object({
    token: z
      .string({ error: "Verification token is required" })
      .min(10, "Invalid token")
      .max(100, "Invalid token"),
  }),
});


export const refreshTokenSchema = z.object({
  cookies: z.object({
    refreshToken: z
      .string({ error: "Refresh token is required" })
      .min(10, "Invalid refresh token")
      .max(100, "Invalid refresh token"),
  }),
});


export type RegisterInput = z.infer<typeof registerSchema>["body"];
export type VerifyEmailInput = z.infer<typeof verifyEmailSchema>["body"];
export type RefreshTokenInput = z.infer<typeof refreshTokenSchema>["cookies"];