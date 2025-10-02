import { z } from "zod"

export const todoSchema = z.object({
    text:z.string().min(1,"Todo Text is required"),
    category:z.string().min(1,"category is required")
});

export type TodoFormValues = z.infer<typeof todoSchema>