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
