import { Customer } from '@prisma/client';
import {
	serviceCreateCustomer, serviceGetCustomerByCpf, serviceGetCustomerById, serviceGetCustomers,
} from '@services/customers.service';
import { BadRequest } from '@src/routes/_errors/bad-request';
import { FastifyReply, FastifyRequest } from 'fastify';

export const controllerGetCustomers = async (
	req: FastifyRequest,
	reply: FastifyReply,
) => {
	try {
		const customers: Customer[] = await serviceGetCustomers();
		reply.code(201).send(customers);
	} catch (error) {
		reply.code(500).send({ error: 'Internal Server Error', message: error.message });
	}
};

export const controllerGetCustomerById = async (
	req: FastifyRequest,
	reply: FastifyReply,
) => {
	try {
		const { id } = req.params as { id: string };

		const customer: Customer | null = await serviceGetCustomerById(id);

		if (customer) {
			reply.code(200).send(customer);
		} else {
			reply.code(404).send({ error: 'Not Found', message: `Customer with ID ${id} not found` });
		}
	} catch (error) {
		if (error instanceof BadRequest) {
			reply.code(error.statusCode).send({ error: 'Bad Request', message: error.message });
		} else {
			reply.code(500).send({ error: 'Internal Server Error', message: error.message });
		}
	}
};

export const controllerGetCustomerByCpf = async (
	req: FastifyRequest,
	reply: FastifyReply,
) => {
	try {
		const { cpf } = req.params as { cpf: string };

		const customer: Customer | null = await serviceGetCustomerByCpf(cpf);

		if (customer) {
			reply.code(200).send(customer);
		} else {
			reply.code(404).send({ error: 'Not Found', message: `Customer with CPF ${cpf} not found` });
		}
	} catch (error) {
		if (error instanceof BadRequest) {
			reply.code(error.statusCode).send({ error: 'Bad Request', message: error.message });
		} else {
			reply.code(500).send({ error: 'Internal Server Error', message: error.message });
		}
	}
};

export const controllerCreateCustomer = async (req: FastifyRequest, reply: FastifyReply) => {
	try {
		const { name, email, cpf }: Customer = req.body as Customer;

		const createdCustomer: Customer = await serviceCreateCustomer({ name, email, cpf });

		reply.code(201).send(createdCustomer);
	} catch (error) {
		if (error instanceof BadRequest) {
			reply.code(error.statusCode).send({ error: 'Bad Request', message: error.message });
		} else {
			reply.code(500).send({ error: 'Internal Server Error', message: error.message });
		}
	}
};
