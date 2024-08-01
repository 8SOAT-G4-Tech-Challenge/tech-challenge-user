export const SwaggerCreateProductImages = {
	schema: {
		summary: 'Create product image',
		description: 'Create product image',
		tags: ['Product Image'],
		body: {
			type: 'array',
			required: ['myFile', 'productId'],
			properties: {
				myFile: {
					type: 'string',
					description: 'Product image file',
				},
				productId: {
					type: 'string',
					format: 'uuid',
					description: 'Product Id',
				},
			},
		},
		response: {
			201: {
				description: 'Created product image',
				type: 'object',
				properties: {
					id: {
						type: 'string',
					},
					url: {
						type: 'string',
						description: 'Product image url',
					},
					productId: {
						type: 'string',
						description: 'Product Id',
					},
					createdAt: {
						type: 'string',
						format: 'datetime',
					},
					updatedAt: {
						type: 'string',
						format: 'datetime',
					},
				},
			},
			400: {
				description: 'Invalid parameters to product image create',
				type: 'object',
				properties: {
					path: {
						type: 'string',
					},
					status: {
						type: 'string',
					},
					message: {
						type: 'string',
					},
					details: {
						type: 'array',
						items: {
							type: 'string',
						},
					},
				},
			},
			500: {
				description: 'Unexpected error when creating product image',
				type: 'object',
				properties: {
					path: {
						type: 'string',
					},
					status: {
						type: 'string',
					},
					message: {
						type: 'string',
					},
					details: {
						type: 'array',
						items: {
							type: 'string',
						},
					},
				},
			},
		},
	},
};

export const SwaggerGetProductImages = {
	schema: {
		summary: 'Get product images',
		description: 'Returns product images',
		tags: ['Product Image'],
		response: {
			200: {
				description: 'Success get product images',
				type: 'array',
				items: {
					type: 'object',
					properties: {
						id: {
							type: 'string',
							format: 'uuid',
						},
						url: {
							type: 'string',
						},
						productId: {
							type: 'string',
							format: 'uuid',
						},
						createdAt: {
							type: 'string',
							format: 'datetime',
						},
						updatedAt: {
							type: 'string',
							format: 'datetime',
						},
					},
				},
			},
			500: {
				description: 'Unexpected error when listing for product images',
				type: 'object',
				properties: {
					path: {
						type: 'string',
					},
					status: {
						type: 'string',
					},
					message: {
						type: 'string',
					},
					details: {
						type: 'array',
						items: {
							type: 'string',
						},
					},
				},
			},
		},
	},
};

export const SwaggerGetProductImageById = {
	schema: {
		summary: 'Get product image by id',
		description: 'Returns product image by id',
		tags: ['Product Image'],
		params: { id: { type: 'string' } },
		response: {
			200: {
				description: 'Success get product images by Id',
				type: 'object',
				properties: {
					id: {
						type: 'string',
						format: 'uuid',
					},
					url: {
						type: 'string',
					},
					productId: {
						type: 'string',
						format: 'uuid',
					},
					createdAt: {
						type: 'string',
						format: 'datetime',
					},
					updatedAt: {
						type: 'string',
						format: 'datetime',
					},
				},
			},
			500: {
				description: 'Unexpected error when listing for product images',
				type: 'object',
				properties: {
					path: {
						type: 'string',
					},
					status: {
						type: 'string',
					},
					message: {
						type: 'string',
					},
					details: {
						type: 'array',
						items: {
							type: 'string',
						},
					},
				},
			},
		},
	},
};

export const SwaggerGetProductImagesByProductId = {
	schema: {
		summary: 'Get a list of product images by product id',
		description: 'Returns product images by product',
		tags: ['Product Image'],
		params: { id: { type: 'string' } },
		response: {
			200: {
				description: 'Success get product images by Id',
				type: 'array',
				items: {
					type: 'object',
					properties: {
						id: {
							type: 'string',
							format: 'uuid',
						},
						url: {
							type: 'string',
						},
						productId: {
							type: 'string',
							format: 'uuid',
						},
						createdAt: {
							type: 'string',
							format: 'datetime',
						},
						updatedAt: {
							type: 'string',
							format: 'datetime',
						},
					},
				},
			},
			404: {
				description: 'No product images found for product id',
				type: 'object',
				properties: {
					path: {
						type: 'string',
					},
					status: {
						type: 'string',
					},
					message: {
						type: 'string',
					},
					details: {
						type: 'array',
						items: {
							type: 'string',
						},
					},
				},
			},
			500: {
				description: 'Unexpected error when listing for product images',
				type: 'object',
				properties: {
					path: {
						type: 'string',
					},
					status: {
						type: 'string',
					},
					message: {
						type: 'string',
					},
					details: {
						type: 'array',
						items: {
							type: 'string',
						},
					},
				},
			},
		},
	},
};

export const SwaggerDeleteProductImageById = {
	schema: {
		summary: 'Delete product image by id',
		description: 'Delete product image by id',
		tags: ['Product Image'],
		params: { id: { type: 'string' } },
		response: {
			200: {
				description: 'Product image deleted',
				type: 'object',
				properties: {
					path: {
						type: 'string',
					},
					status: {
						type: 'string',
					},
					message: {
						type: 'string',
					},
					details: {
						type: 'array',
						items: {
							type: 'string',
						},
					},
				},
			},
			400: {
				description: 'Invalid parameters to product image create',
				type: 'object',
				properties: {
					path: {
						type: 'string',
					},
					status: {
						type: 'string',
					},
					message: {
						type: 'string',
					},
					details: {
						type: 'array',
						items: {
							type: 'string',
						},
					},
				},
			},
			500: {
				description: 'Unexpected error when creating product image',
				type: 'object',
				properties: {
					path: {
						type: 'string',
					},
					status: {
						type: 'string',
					},
					message: {
						type: 'string',
					},
					details: {
						type: 'array',
						items: {
							type: 'string',
						},
					},
				},
			},
		},
	},
};

export const SwaggerDeleteProductImageByProductId = {
	schema: {
		summary: 'Delete all the product images by product id',
		description: 'Delete product image by id',
		tags: ['Product Image'],
		params: { id: { type: 'string' } },
		response: {
			200: {
				description: 'Product image deleted',
				type: 'object',
				properties: {
					path: {
						type: 'string',
					},
					status: {
						type: 'string',
					},
					message: {
						type: 'string',
					},
					details: {
						type: 'array',
						items: {
							type: 'string',
						},
					},
				},
			},
			400: {
				description: 'Invalid parameters to product image create',
				type: 'object',
				properties: {
					path: {
						type: 'string',
					},
					status: {
						type: 'string',
					},
					message: {
						type: 'string',
					},
					details: {
						type: 'array',
						items: {
							type: 'string',
						},
					},
				},
			},
			500: {
				description: 'Unexpected error when creating product image',
				type: 'object',
				properties: {
					path: {
						type: 'string',
					},
					status: {
						type: 'string',
					},
					message: {
						type: 'string',
					},
					details: {
						type: 'array',
						items: {
							type: 'string',
						},
					},
				},
			},
		},
	},
};
export const SwaggerUpdateProductImages = {
	schema: {
		summary: 'Update product image',
		description: 'Update product image',
		tags: ['Product Image'],
		params: { id: { type: 'string' } },
		body: {
			type: 'array',
			required: ['myFile'],
			properties: {
				myFile: {
					type: 'string',
					description: 'Product image file',
				},
			},
		},
		response: {
			200: {
				description: 'Updated product image',
				type: 'object',
				properties: {
					id: {
						type: 'string',
					},
					url: {
						type: 'string',
						description: 'Product image url',
					},
					productId: {
						type: 'string',
						description: 'Product Id',
					},
					createdAt: {
						type: 'string',
						format: 'datetime',
					},
					updatedAt: {
						type: 'string',
						format: 'datetime',
					},
				},
			},
			400: {
				description: 'Invalid parameters to update product image',
				type: 'object',
				properties: {
					path: {
						type: 'string',
					},
					status: {
						type: 'string',
					},
					message: {
						type: 'string',
					},
					details: {
						type: 'array',
						items: {
							type: 'string',
						},
					},
				},
			},
			500: {
				description: 'Unexpected error when updating product image',
				type: 'object',
				properties: {
					path: {
						type: 'string',
					},
					status: {
						type: 'string',
					},
					message: {
						type: 'string',
					},
					details: {
						type: 'array',
						items: {
							type: 'string',
						},
					},
				},
			},
		},
	},
};
