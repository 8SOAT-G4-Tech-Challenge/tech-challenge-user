import { Multipart } from '@fastify/multipart';

export type GetProducByIdParams = {
	id: string;
};

export type UpdateProductParams = {
	id: string;
	name?: string;
	value?: number;
	description?: string;
	categoryId?: string;
	images?: Multipart[];
};

export type CreateProductParams = {
	name: string;
	value: number;
	description: string;
	categoryId: string;
	images?: Multipart[];
};
