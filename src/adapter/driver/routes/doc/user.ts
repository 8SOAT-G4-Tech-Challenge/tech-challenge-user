export const SwaggerGetUsers = {
	schema: {
		summary: 'Get users',
		description: 'Returns users data',
		tags: ['User'],
		response: {
			200: {
				description: 'Success get users data',
				type: 'array',
				items: {
					type: 'object',
					properties: {
						id: {
							type: 'string',
							format: 'uuid',
						},
						name: {
							type: 'string',
						},
						email: {
							type: 'string',
							format: 'email',
						},
						password: {
							type: 'string',
						},
						sessionToken: {
							type: 'string',
						},
						isAdmin: {
							type: 'boolean',
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
				description: 'Unexpected error when listing for users',
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

export const SwaggerGetUserById = {
	schema: {
		summary: 'Get user by id',
		description: 'Returns user data by id',
		tags: ['User'],
		params: {
			type: 'object',
			properties: {
				id: {
					type: 'string',
					format: 'uuid',
				},
			},
		},
		response: {
			200: {
				description: 'Success get user data',
				type: 'object',
				properties: {
					id: {
						type: 'string',
						format: 'uuid',
					},
					name: {
						type: 'string',
					},
					email: {
						type: 'string',
						format: 'email',
					},
					sessionToken: {
						type: 'string',
					},
					isAdmin: {
						type: 'boolean',
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
			404: {
				description: 'User not found',
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
				description: 'Unexpected error when deleting customer',
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

export const SwaggerGetUserByEmail = {
	schema: {
		summary: 'Get user by email',
		description: 'Returns user data by email',
		tags: ['User'],
		params: {
			type: 'object',
			properties: {
				email: {
					type: 'string',
					format: 'email',
				},
			},
		},
		response: {
			200: {
				description: 'Success get user data',
				type: 'object',
				properties: {
					id: {
						type: 'string',
						format: 'uuid',
					},
					name: {
						type: 'string',
					},
					email: {
						type: 'string',
						format: 'email',
					},
					sessionToken: {
						type: 'string',
					},
					isAdmin: {
						type: 'boolean',
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
			404: {
				description: 'User not found',
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
				description: 'Unexpected error when deleting customer',
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

export const SwaggerCreateUsers = {
	schema: {
		summary: 'Create user',
		description: 'Create a new user',
		tags: ['User'],
		body: {
			type: 'object',
			required: ['email', 'password'],
			properties: {
				name: {
					type: 'string',
				},
				email: {
					type: 'string',
					format: 'email',
				},
				password: {
					type: 'string',
				},
				isAdmin: {
					type: 'boolean',
				},
			},
		},
		response: {
			201: {
				description: 'Success create user',
				type: 'object',
				properties: {
					id: {
						type: 'string',
						format: 'uuid',
					},
					name: {
						type: 'string',
					},
					email: {
						type: 'string',
						format: 'email',
					},
					sessionToken: {
						type: 'string',
					},
					isAdmin: {
						type: 'boolean',
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
				description: 'Invalid parameters to customer create',
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
				description: 'Unexpected error when creating customer',
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

export const SwaggerUpdateUsers = {
	schema: {
		summary: 'Update user',
		description: 'Update user data',
		tags: ['User'],
		params: {
			type: 'object',
			properties: {
				id: {
					type: 'string',
					format: 'uuid',
				},
			},
		},
		body: {
			type: 'object',
			properties: {
				name: {
					type: 'string',
				},
				email: {
					type: 'string',
					format: 'email',
				},
				sessionToken: {
					type: 'string',
				},
				isAdmin: {
					type: 'boolean',
				},
			},
		},
		response: {
			200: {
				description: 'Success update user data',
				type: 'object',
				properties: {
					id: {
						type: 'string',
						format: 'uuid',
					},
					name: {
						type: 'string',
					},
					email: {
						type: 'string',
						format: 'email',
					},
					sessionToken: {
						type: 'string',
					},
					isAdmin: {
						type: 'boolean',
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
			404: {
				description: 'User not found',
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
				description: 'Unexpected error when creating customer',
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

export const SwaggerDeleteUsers = {
	schema: {
		summary: 'Delete user',
		description: 'Delete user data',
		tags: ['User'],
		params: {
			type: 'object',
			properties: {
				id: {
					type: 'string',
					format: 'uuid',
				},
			},
		},
		response: {
			204: {
				description: 'Success delete user data',
				type: 'object',
				properties: {
					message: {
						type: 'string',
						example: 'User successfully deleted',
					},
				},
			},
			404: {
				description: 'Customer not found',
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
				description: 'Unexpected error when deleting customer',
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
