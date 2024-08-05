import { Multipart } from '@fastify/multipart';

export type GetProducByIdParams = {
	id: string;
};

export type UpdateProductParams = {
	id: string;
	name?: string;
	amount?: number;
	description?: string;
	categoryId?: string;
	images?: Multipart[];
};

export type CreateProductParams = {
	name: string;
	amount: number;
	description: string;
	categoryId: string;
	images?: Multipart[];
};
