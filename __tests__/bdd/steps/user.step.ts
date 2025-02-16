import assert from 'assert';
import axios, { AxiosResponse } from 'axios';

import { Given, Then, When } from '@cucumber/cucumber';

let response: AxiosResponse;
let userData: {
	name: string;
	email: string;
	password: string;
	isAdmin: boolean;
};
let userId: string;
let userEmail: string;

// Cenário: Criar um novo usuário
Given('I have user data', () => {
	userData = {
		name: 'Test User',
		email: 'testuser@example.com',
		password: 'Password123!',
		isAdmin: true,
	};
});

When('I send a POST request to create a user', async () => {
	response = await axios.post(
		'http://localhost:3334/users/admin/users',
		userData,
	);
	userId = response.data.id; // Armazena o ID do usuário criado para uso posterior
	userEmail = userData.email; // Armazena o email do usuário criado para uso posterior
});

Then(
	'the response status code for creating a user should be {int}',
	(statusCode: number) => {
		assert.strictEqual(response.status, statusCode);
	},
);

Then('the response should contain the created user', () => {
	const user = response.data;
	assert.strictEqual(user.name, userData.name);
	assert.strictEqual(user.email, userData.email);
});

// Cenário: Obter um usuário por ID
Given('I have an existing user ID for retrieval', () => {
	// Supondo que o ID do usuário criado anteriormente está armazenado em userId
});

When('I send a GET request to get the user by ID', async () => {
	response = await axios.get(
		`http://localhost:3334/users/admin/users/${userId}`,
	);
});

Then(
	'the response status code for getting a user by identifier should be {int}',
	(statusCode: number) => {
		assert.strictEqual(response.status, statusCode);
	},
);

Then('the response should contain the user data', () => {
	const user = response.data;
	assert.strictEqual(user.id, userId);
	assert.strictEqual(user.email, userEmail);
});

// Cenário: Obter um usuário por email
Given('I have an existing user email', () => {
	// Supondo que o email do usuário criado anteriormente está armazenado em userEmail
});

When('I send a GET request to get the user by email', async () => {
	response = await axios.get(
		`http://localhost:3334/users/admin/users/email/${userEmail}`,
	);
});

Then(
	'the response status code for getting a user by email should be {int}',
	(statusCode: number) => {
		assert.strictEqual(response.status, statusCode);
	},
);

// Cenário: Listar todos os usuários
Given('there are users in the system', async () => {
	// Supondo que a aplicação já esteja rodando e o banco de dados esteja populado com usuários
});

When('I send a GET request to list all users', async () => {
	response = await axios.get('http://localhost:3334/users/admin/users');
});

Then(
	'the response status code for listing users should be {int}',
	(statusCode: number) => {
		assert.strictEqual(response.status, statusCode);
	},
);

Then('the response should contain a list of users', () => {
	const users = response.data;
	assert(Array.isArray(users));
	assert(users.length > 0);
});

// Cenário: Atualizar um usuário existente
Given('I have existing user data', () => {
	userData = {
		name: 'Updated User',
		email: 'updateduser@example.com',
		password: 'UpdatedPassword123!',
		isAdmin: false,
	};
});

When('I send a PUT request to update the user', async () => {
	response = await axios.put(
		`http://localhost:3334/users/admin/users/${userId}`,
		userData,
	);
});

Then(
	'the response status code for updating a user should be {int}',
	(statusCode: number) => {
		assert.strictEqual(response.status, statusCode);
	},
);

Then('the response should contain the updated user', () => {
	const user = response.data;
	assert.strictEqual(user.name, userData.name);
	assert.strictEqual(user.email, userData.email);
});

// Cenário: Deletar um usuário existente
Given('I have an existing user ID for deletion', () => {
	// Supondo que o ID do usuário criado anteriormente está armazenado em userId
});

When('I send a DELETE request to delete the user', async () => {
	response = await axios.delete(
		`http://localhost:3334/users/admin/users/${userId}`,
	);
});

Then(
	'the response status code for deleting a user should be {int}',
	(statusCode: number) => {
		assert.strictEqual(response.status, statusCode);
	},
);
