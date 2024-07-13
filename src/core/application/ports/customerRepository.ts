import { Customer } from '@models/customer';

export interface CustomerRepository {
    getCustomers(): Promise<Customer[]>;
    getCustomerById(id: string): Promise<Customer>;
    getCustomerByCpf(cpf: string): Promise<Customer>;
    createCustomer(customer: Customer): Promise<Customer>;
}