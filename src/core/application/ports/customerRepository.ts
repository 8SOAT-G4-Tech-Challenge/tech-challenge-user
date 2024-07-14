import { Customer } from '@models/customer';

export interface CustomerRepository {
    getCustomers(): Promise<Customer[]>;
    getCustomerById(id: string): Promise<Customer | null>;
    getCustomerByCpf(cpf: string): Promise<Customer | null>;
    createCustomer(customer: Customer): Promise<Customer>;
}
