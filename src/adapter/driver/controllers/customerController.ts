import { Customer } from '@prisma/client';
import { CustomerService } from '@services/customerService';
import { FastifyReply, FastifyRequest } from 'fastify';
import { handleError } from '../utils/errorHandler';
import { StatusCodes } from 'http-status-codes'

export class CustomerController {
	constructor(private readonly customerService: CustomerService) { }

	async getCustomers(req: FastifyRequest, reply: FastifyReply) {
		try {
			const customers: Customer[] = await this.customerService.getCustomers();
			reply.code(StatusCodes.CREATED).send(customers);
		} catch (error) {
			handleError(reply, error);
		}
	}

	async getCustomerByProperty(req: FastifyRequest, reply: FastifyReply) {
		try {
			const { id, cpf } = req.query as { id?: string; cpf?: string };
	  
			if (!(id || cpf)) {
				return reply.code(StatusCodes.BAD_REQUEST).send({ error: 'Bad Request', message: 'Please provide either an ID or a CPF to search for a customer.' });
			}
		  
			if (id && cpf) {
				return reply.code(StatusCodes.BAD_REQUEST).send({ error: 'Bad Request', message: 'Please provide either an ID or a CPF, not both.' });
			}
	  
			const searchParam = id ? { id } : { cpf };
    		const customer = await this.customerService.getCustomerByProperty(searchParam);
	  
			if (customer) {
				reply.code(StatusCodes.OK).send(customer);
			} else {
				reply.code(StatusCodes.NOT_FOUND).send({ error: 'Not Found', message: `Customer with ${id ? 'ID' : 'CPF'} ${id || cpf} not found` });
			}
		} catch (error) {
			handleError(reply, error);
		}
	};

	async createCustomer(req: FastifyRequest, reply: FastifyReply) {
		try {
			const { name, email, cpf }: Customer = req.body as Customer;

			const createdCustomer: Customer = await this.customerService.createCustomer({ name, email, cpf });

			reply.code(StatusCodes.CREATED).send(createdCustomer);
		} catch (error) {
			handleError(req, reply, error);
		}
	}
}