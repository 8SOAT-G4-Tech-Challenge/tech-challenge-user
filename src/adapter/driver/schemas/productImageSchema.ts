import { z } from 'zod';

export const getProductImageByIdSchema = z
	.object({
		id: z.string().uuid(),
	})
	.required();

export const productImageCreateSchema = z
	.object({
		url: z.string().url(),
		productId: z.string().uuid(),
	})
	.required();

export const productImageUpdateSchema = z
	.object({
		id: z.string().uuid(),
		url: z.string().url(),
		productId: z.string().uuid(),
	})
	.required();
