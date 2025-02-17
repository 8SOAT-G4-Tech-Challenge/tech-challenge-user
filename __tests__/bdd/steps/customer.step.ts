import assert from 'assert';
import axios, { AxiosResponse } from 'axios';

import { Given, Then, When } from '@cucumber/cucumber';

let response: AxiosResponse;
let customerData: { name: string; cpf: string; email: string };
let customerId: string;
let customerCpf: string;

// Cenário: Criar um novo cliente
Given('I have customer data', () => {
	customerData = {
		name: 'Test Customer',
		cpf: '12345678901',
		email: 'testcustomer@example.com',
	};
});

When('I send a POST request to create a customer', async () => {
	response = await axios.post(
		'http://localhost:3334/users/totem/customers',
		customerData,
	);
	customerId = response.data.id; // Armazena o ID do cliente criado para uso posterior
	customerCpf = response.data.cpf; // Armazena o CPF do cliente criado para uso posterior
});

Then(
	'the response status code for creating a customer should be {int}',
	(statusCode: number) => {
		assert.strictEqual(response.status, statusCode);
	},
);

Then('the response should contain the created customer', () => {
	const customer = response.data;
	assert.strictEqual(customer.name, customerData.name);
	assert.strictEqual(customer.cpf, customerData.cpf);
	assert.strictEqual(customer.email, customerData.email);
});

// Cenário: Obter um cliente por ID
Given('I have an existing customer ID for retrieval', () => {
	// Supondo que o ID do cliente criado anteriormente está armazenado em customerId
});

When('I send a GET request to get the customer by ID', async () => {
	response = await axios.get(
		`http://localhost:3334/users/totem/customers/property?id=${customerId}`,
	);
});

Then(
	'the response status code for getting a customer by ID should be {int}',
	(statusCode: number) => {
		assert.strictEqual(response.status, statusCode);
	},
);

Then('the response should contain the customer data', () => {
	const customer = response.data;
	assert.strictEqual(customer.id, customerId);
	assert.strictEqual(customer.cpf, customerCpf);
});

// Cenário: Obter um cliente por CPF
Given('I have an existing customer CPF for retrieval', () => {
	// Supondo que o CPF do cliente criado anteriormente está armazenado em customerCpf
});

When('I send a GET request to get the customer by CPF', async () => {
	response = await axios.get(
		`http://localhost:3334/users/totem/customers/property?cpf=${customerCpf}`,
	);
});

Then(
	'the response status code for getting a customer by CPF should be {int}',
	(statusCode: number) => {
		assert.strictEqual(response.status, statusCode);
	},
);

// Cenário: Listar todos os clientes
Given('there are customers in the system', async () => {
	// Supondo que a aplicação já esteja rodando e o banco de dados esteja populado com clientes
});

When('I send a GET request to list all customers', async () => {
	response = await axios.get('http://localhost:3334/users/admin/customers');
});

Then(
	'the response status code for listing customers should be {int}',
	(statusCode: number) => {
		assert.strictEqual(response.status, statusCode);
	},
);

Then('the response should contain a list of customers', () => {
	const customers = response.data;
	assert(Array.isArray(customers));
	assert(customers.length > 0);
});

// Cenário: Deletar um cliente existente
Given('I have an existing customer ID for deletion', () => {
	// Supondo que o ID do cliente criado anteriormente está armazenado em customerId
});

When('I send a DELETE request to delete the customer', async () => {
	response = await axios.delete(
		`http://localhost:3334/users/admin/customers/${customerId}`,
	);
});

Then(
	'the response status code for deleting a customer should be {int}',
	(statusCode: number) => {
		assert.strictEqual(response.status, statusCode);
	},
);
