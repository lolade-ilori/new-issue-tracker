import { z } from 'zod'

// give the object that defines the shape of our user object, this helps us define our validation rules
const issuesSchema = z.object({
    title: z.string().min(1, "Title is required").max(255),
    description: z.string().min(1, "Description is required")
})

export default issuesSchema;