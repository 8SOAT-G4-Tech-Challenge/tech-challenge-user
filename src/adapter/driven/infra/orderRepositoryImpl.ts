import { OrderStatusType } from '@domain/types/orderStatusType';
import { prisma } from '@driven/infra/lib/prisma';
import { Order } from '@models/order';
import { IOrderRepository } from '@ports/orderRepository';

export class OrderRepositoryImpl implements IOrderRepository {
	async getOrders(): Promise<Order[]> {
		const orders = await prisma.order.findMany({
			include: {
				items: {
					include: {
						product: true,
					},
				},
				customer: true,
				payment: true,
			},
		});

		return orders.map((order) => ({
			...order,
			amount: parseFloat(order.amount.toString()),
			status: order.status as OrderStatusType,
		}));
	}
}
