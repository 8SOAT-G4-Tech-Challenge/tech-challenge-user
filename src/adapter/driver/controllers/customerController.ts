import { Customer } from '@prisma/client';
import { CustomerService } from '@services/customerService';
import { BadRequestException } from '@exceptions/badRequestException';
import { FastifyReply, FastifyRequest } from 'fastify';

export class CustomerController {
	constructor(private readonly customerService: CustomerService) { }

	async getCustomers(req: FastifyRequest, reply: FastifyReply) {
		try {
			const customers: Customer[] = await this.customerService.getCustomers();
			reply.code(201).send(customers);
		} catch (error) {
			reply.code(500).send({ error: 'Internal Server Error', message: error.message });
		}
	}

	async getCustomerById(req: FastifyRequest, reply: FastifyReply) {
		try {
			const { id } = req.params as { id: string };

			const customer: Customer | null = await this.customerService.getCustomerById(id);

			if (customer) {
				reply.code(200).send(customer);
			} else {
				reply.code(404).send({ error: 'Not Found', message: `Customer with ID ${id} not found` });
			}
		} catch (error) {
			if (error instanceof BadRequestException) {
				reply.code(error.statusCode).send({ error: 'Bad Request', message: error.message });
			} else {
				reply.code(500).send({ error: 'Internal Server Error', message: error.message });
			}
		}
	}

	async getCustomerByCpf(req: FastifyRequest, reply: FastifyReply) {
		try {
			const { cpf } = req.params as { cpf: string };

			const customer: Customer | null = await this.customerService.getCustomerByCpf(cpf);

			if (customer) {
				reply.code(200).send(customer);
			} else {
				reply.code(404).send({ error: 'Not Found', message: `Customer with CPF ${cpf} not found` });
			}
		} catch (error) {
			if (error instanceof BadRequestException) {
				reply.code(error.statusCode).send({ error: 'Bad Request', message: error.message });
			} else {
				reply.code(500).send({ error: 'Internal Server Error', message: error.message });
			}
		}
	};

	async createCustomer(req: FastifyRequest, reply: FastifyReply) {
		try {
			const { name, email, cpf }: Customer = req.body as Customer;

			const createdCustomer: Customer = await this.customerService.createCustomer({ name, email, cpf });

			reply.code(201).send(createdCustomer);
		} catch (error) {
			if (error instanceof BadRequestException) {
				reply.code(error.statusCode).send({ error: 'Bad Request', message: error.message });
			} else {
				reply.code(500).send({ error: 'Internal Server Error', message: error.message });
			}
		}
	}
};



