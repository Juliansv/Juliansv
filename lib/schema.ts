import {z} from "zod"

export const FormDataSchema = z.object({
    name: z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string"
    }).min(2, {message: "Name must be at least 2 characters"}),
    email: z.string().email({message: "Invalid email address"}),
    message: z.string().min(1, {message: "Message is required"}).max(200, {message: "Message is too long"})
})