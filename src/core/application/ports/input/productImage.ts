export type GetProductImageByIdParams = {
	id: string;
};

export type CreateProductImageParams = {
	id?: string;
	url: string;
	productId: string;
};
