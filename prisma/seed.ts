import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
	// Criar usuários
	await Promise.all([
		prisma.user.upsert({
			where: { email: 'admin@example.com' },
			update: {},
			create: {
				name: 'Admin User',
				email: 'admin@example.com',
				password: 'password123',
				isAdmin: true,
			},
		}),
		prisma.user.upsert({
			where: { email: 'user@example.com' },
			update: {},
			create: {
				name: 'Regular User',
				email: 'user@example.com',
				password: 'password123',
				isAdmin: false,
			},
		}),
	]);

	// Criar clientes
	await Promise.all([
		prisma.customer.upsert({
			where: { cpf: '12345678901' },
			update: {},
			create: {
				name: 'John Doe',
				email: 'john.doe@example.com',
				cpf: '12345678901',
			},
		}),
		prisma.customer.upsert({
			where: { cpf: '10987654321' },
			update: {},
			create: {
				name: 'Jane Doe',
				email: 'jane.doe@example.com',
				cpf: '10987654321',
			},
		}),
	]);

	console.log('Seed data created successfully!');
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
