import { z } from 'zod'

// give the object that defines the shape of our user object, this helps us define our validation rules
const issuesSchema = z.object({
    title: z.string().min(1, "Title is required").max(255),
    description: z.string().min(1, "Description is required").max(65535),
    assignedUserId: z.string().min(1, "AssignedUserId is required").max(255).nullable()
})

export const patchIssuesSchema = z.object({
    title: z.string().min(1, "Title is required").max(255).optional(),
    description: z.string().min(1, "Description is required").max(65535).optional(),
    assignedUserId: z.string().min(1, "AssignedUserId is required").max(255).optional().nullable()
})


export default issuesSchema;