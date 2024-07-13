import { z } from 'zod'

export const productCategorySchema = z.object({
    name: z.string()
}).required();

export type ProductCategoryDto = z.infer<typeof productCategorySchema>