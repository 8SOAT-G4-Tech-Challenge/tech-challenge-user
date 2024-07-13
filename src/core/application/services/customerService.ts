import { Customer } from '@models/customer';
import { CustomerRepository } from '@ports/customerRepository'
import { BadRequestException } from '@exceptions/badRequestException'

export class CustomerService {
	constructor(private readonly customerRepository: CustomerRepository) { }

	async getCustomers(): Promise<Customer[]> {
		try {
			const costumers = await this.customerRepository.getCustomers();
			return costumers;
		} catch (error) {
			if (error instanceof Error) {
				throw new Error(`Error fetching customers from the database: ${error.message}`);
			} else {
				console.error(error);
				throw new Error('An unexpected error occurred while fetching customers from the database');
			}
		}
	}

	async getCustomerById(id: string): Promise<Customer | null> {
		try {
			if (!id) {
				throw new BadRequestException('Provide a ID to perform the search.');
			}
			return await this.customerRepository.getCustomerById(id);
		} catch (error) {
			if (error instanceof BadRequestException) {
				throw error;
			} else if (error instanceof Error) {
				throw new Error(`Error fetching customer by ID from the database: ${error.message}`);
			} else {
				console.error(error);
				throw new Error('An unexpected error occurred while fetching customer by ID from the database');
			}
		}
	}

	async getCustomerByCpf(cpf: string): Promise<Customer | null> {
		try {
			if (!cpf) {
				throw new BadRequestException('Provide a CPF to perform the search.');
			}
			return this.customerRepository.getCustomerByCpf(cpf);;
		} catch (error) {
			if (error instanceof BadRequestException) {
				throw error;
			} else if (error instanceof Error) {
				throw new Error(`Error fetching customer by CPF from the database: ${error.message}`);
			} else {
				console.error(error);
				throw new Error('An unexpected error occurred while fetching customer by CPF from the database');
			}
		}
	};

	async createCustomer(customerData: Customer): Promise<Customer> {
		try {
			if (!customerData.name && !customerData.email) {
				throw new BadRequestException('At least one of the fields "name" or "email" must be provided.');
			}
			return this.customerRepository.createCustomer(customerData);
		} catch (error) {
			if (error instanceof BadRequestException) {
				throw error;
			} else if (error instanceof Error) {
				throw new Error(`Error creating a new customer: ${error.message}`);
			} else {
				console.error(error);
				throw new Error('An unexpected error occurred while creating a new customer');
			}
		}
	}
}
