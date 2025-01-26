import { z } from 'zod';

export const userSchema = z
	.object({
		name: z.string().nullable().optional(),
		email: z.string().email(),
		password: z
			.string()
			.min(6, { message: 'Password must have at least 6 characters' }),
		sessionToken: z.string().nullable().optional(),
		isAdmin: z.boolean().default(false),
	});

export type UserDto = z.infer<typeof userSchema>;

export const userUpdateSchema = z
	.object({
		name: z.string(),
		email: z.string().email(),
		sessionToken: z.string().nullable().optional(),
		isAdmin: z.boolean(),
	});

export type UserUpdateDto = z.infer<typeof userUpdateSchema>;
