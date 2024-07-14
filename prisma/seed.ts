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
	const [customer1, customer2] = await Promise.all([
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

	// Criar categorias de produtos
	const [category1, category2] = await Promise.all([
		prisma.productCategory.upsert({
			where: { name: 'Bebida' },
			update: {},
			create: {
				name: 'Bebida',
			},
		}),
		prisma.productCategory.upsert({
			where: { name: 'Lanche' },
			update: {},
			create: {
				name: 'Lanche',
			},
		}),
		prisma.productCategory.upsert({
			where: { name: 'Acompanhamento' },
			update: {},
			create: {
				name: 'Acompanhamento',
			},
		}),
		prisma.productCategory.upsert({
			where: { name: 'Sobremesa' },
			update: {},
			create: {
				name: 'Sobremesa',
			},
		}),
	]);

	// Criar produtos
	const [product1, product2] = await Promise.all([
		prisma.product.upsert({
			where: { name: 'Coca-Cola' },
			update: {},
			create: {
				name: 'Coca-Cola',
				amount: 3.5,
				description: 'Bebida refrescante',
				category: {
					connect: { id: category1.id },
				},
			},
		}),
		prisma.product.upsert({
			where: { name: 'Cheeseburger' },
			update: {},
			create: {
				name: 'Cheeseburger',
				amount: 1.5,
				description:
					'Hambúrguer com uma fatia de queijo derretido por cima do hambúrguer de carne',
				category: {
					connect: { id: category2.id },
				},
			},
		}),
	]);

	// Criar imagens de produtos
	await Promise.all([
		prisma.productImage.upsert({
			where: { url: 'https://example.com/coca-cola.jpg' },
			update: {},
			create: {
				url: 'https://example.com/coca-cola.jpg',
				product: {
					connect: { id: product1.id },
				},
			},
		}),
		prisma.productImage.upsert({
			where: { url: 'https://example.com/cheeseburguer.jpg' },
			update: {},
			create: {
				url: 'https://example.com/cheeseburguer.jpg',
				product: {
					connect: { id: product2.id },
				},
			},
		}),
	]);

	// Criar pedidos e itens do pedido
	const itemsOrder1 = [{ product: product1, quantity: 1 }];

	const itemsOrder2 = [{ product: product2, quantity: 1 }];

	const itemsOrder3 = [{ product: product1, quantity: 2 }];

	const order1Amount = itemsOrder1.reduce(
		(sum, item) => sum + Number(item.product.amount) * Number(item.quantity),
		0,
	);
	const order2Amount = itemsOrder2.reduce(
		(sum, item) => sum + Number(item.product.amount) * Number(item.quantity),
		0,
	);

	const order3Amount = itemsOrder3.reduce(
		(sum, item) => sum + Number(item.product.amount) * Number(item.quantity),
		0,
	);

	const [order1, order2, order3] = await Promise.all([
		prisma.order.create({
			data: {
				customer: {
					connect: { id: customer1.id },
				},
				status: 'received',
				amount: order1Amount,
			},
		}),
		prisma.order.create({
			data: {
				status: 'received',
				amount: order2Amount,
			},
		}),
		prisma.order.create({
			data: {
				customer: {
					connect: { id: customer2.id },
				},
				status: 'received',
				amount: order3Amount,
			},
		}),
	]);

	// Criar itens do pedido
	await Promise.all([
		...itemsOrder1.map((item) => prisma
			.orderItem.create({
				data: {
					order: {
						connect: { id: order1.id },
					},
					product: {
						connect: { id: item.product.id },
					},
					quantity: item.quantity,
					amount: Number(item.product.amount) * item.quantity,
				},
			})),
		...itemsOrder2.map((item) => prisma
			.orderItem.create({
				data: {
					order: {
						connect: { id: order2.id },
					},
					product: {
						connect: { id: item.product.id },
					},
					quantity: item.quantity,
					amount: Number(item.product.amount) * Number(item.quantity),
				},
			})),
		...itemsOrder3.map((item) => prisma
			.orderItem.create({
				data: {
					order: {
						connect: { id: order3.id },
					},
					product: {
						connect: { id: item.product.id },
					},
					quantity: item.quantity,
					amount: Number(item.product.amount) * Number(item.quantity),
				},
			})),
	]);

	// Criar pagamentos dos pedidos
	await Promise.all([
		prisma.paymentOrder.create({
			data: {
				order: {
					connect: { id: order1.id },
				},
				status: 'paid',
				paidAt: new Date(),
			},
		}),
		prisma.paymentOrder.create({
			data: {
				order: {
					connect: { id: order2.id },
				},
				status: 'received',
			},
		}),
		prisma.paymentOrder.create({
			data: {
				order: {
					connect: { id: order3.id },
				},
				status: 'received',
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
