import { CustomerRepository } from "@ports/customerRepository";
import { Customer } from "@models/customer";
import { prisma } from '@driven/infra/lib/prisma';

export class CustomerRepositoryImpl implements CustomerRepository {
    async getCustomers(): Promise<Customer[]> {
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
    }
    async getCustomerById(id: string): Promise<Customer> {
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
    }
    async getCustomerByCpf(cpf: string): Promise<Customer> {
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
    }

    async createCustomer(customer: Customer): Promise<Customer> {
        const createdCustomer = await prisma.customer.create({
            data: {
                name: customer.name,
                email: customer.email,
                cpf: customer.cpf,
                createdAt: new Date(),
            },
        });
        return createdCustomer;
    }
}