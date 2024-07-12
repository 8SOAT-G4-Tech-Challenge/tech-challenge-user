import { prisma } from '@lib/prisma';
import { Customer } from '@src/models/customers.model';
import { BadRequest } from '@src/routes/_errors/bad-request';

export const serviceGetCustomers = async (): Promise<Customer[]> => {
	try {
		const costumers = await prisma.customer.findMany({
			select: {
				id: true,
				name: true,
				email: true,
				cpf: true,
				createdAt: true,
			},
		});
		return costumers;
	} catch (error) {
		if (error instanceof Error) {
			throw new Error(`Error fetching customers from the database: ${error.message}`);
		} else {
			console.error(error);
			throw new Error('An unexpected error occurred while fetching customers from the database');
		}
	}
};

export const serviceGetCustomerById = async (id: string): Promise<Customer | null> => {
	try {
		if (!id) {
			throw new BadRequest('Provide a ID to perform the search.');
		}

		const customer = await prisma.customer.findUnique({
			where: { id },
			select: {
				id: true,
				name: true,
				email: true,
				cpf: true,
				createdAt: true,
			},
		});

		return customer;
	} catch (error) {
		if (error instanceof BadRequest) {
			throw error;
		} else if (error instanceof Error) {
			throw new Error(`Error fetching customer by ID from the database: ${error.message}`);
		} else {
			console.error(error);
			throw new Error('An unexpected error occurred while fetching customer by ID from the database');
		}
	}
};

export const serviceGetCustomerByCpf = async (cpf: string): Promise<Customer | null> => {
	try {
		if (!cpf) {
			throw new BadRequest('Provide a CPF to perform the search.');
		}

		const customer = await prisma.customer.findFirst({
			where: { cpf },
			select: {
				id: true,
				name: true,
				email: true,
				cpf: true,
				createdAt: true,
			},
		});

		return customer;
	} catch (error) {
		if (error instanceof BadRequest) {
			throw error;
		} else if (error instanceof Error) {
			throw new Error(`Error fetching customer by CPF from the database: ${error.message}`);
		} else {
			console.error(error);
			throw new Error('An unexpected error occurred while fetching customer by CPF from the database');
		}
	}
};

export const serviceCreateCustomer = async (customerData: Omit<Customer, 'id' | 'createdAt'>): Promise<Customer> => {
	try {
		if (!customerData.name && !customerData.email) {
			throw new BadRequest('At least one of the fields "name" or "email" must be provided.');
		}

		const createdCustomer = await prisma.customer.create({
			data: {
				name: customerData.name,
				email: customerData.email,
				cpf: customerData.cpf,
				createdAt: new Date(),
			},
		});

		return createdCustomer;
	} catch (error) {
		if (error instanceof BadRequest) {
			throw error;
		} else if (error instanceof Error) {
			throw new Error(`Error creating a new customer: ${error.message}`);
		} else {
			console.error(error);
			throw new Error('An unexpected error occurred while creating a new customer');
		}
	}
};
