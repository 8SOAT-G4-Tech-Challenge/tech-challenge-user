import { z } from 'zod';

const productFilterSchema = z.object({
	category: z.string().min(3).optional(),
});

// Custom validator to check if the field is an array of files
const fileSchema = z.custom(
	(val) => val instanceof Array && val.every((file) => file instanceof Object),
	{
		message: 'Expected an array of files',
	},
);

export { productFilterSchema };

export const getProductByIdSchema = z
	.object({
		id: z.string().uuid(),
	})
	.required();

export const productSchema = z.object({
	name: z.string(),
	amount: z.number(),
	description: z.string(),
	categoryId: z.string().uuid(),
	images: fileSchema.optional(),
});

export const updateProductSchema = z.object({
	id: z.string().uuid(),
	name: z.string().optional(),
	amount: z.number().optional(),
	description: z.string().optional(),
	categoryId: z.string().uuid().optional(),
	images: fileSchema.optional(),
});
