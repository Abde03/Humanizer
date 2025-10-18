import { z } from "zod"

export const humanizeTextSchema = z.object({
  text: z
    .string()
    .min(10, "Text must be at least 10 characters long")
    .max(5000, "Text must be less than 5000 characters"),
})

export const signinSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
})

export const signupSchema = signinSchema.extend({
  name: z.string().min(2, "Name must be at least 2 characters long"),
})

export type SigninInput = z.infer<typeof signinSchema>
export type SignupInput = z.infer<typeof signupSchema>
export type HumanizeTextInput = z.infer<typeof humanizeTextSchema>
