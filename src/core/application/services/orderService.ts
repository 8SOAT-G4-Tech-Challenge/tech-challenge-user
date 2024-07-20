import { IOrderRepository } from '@ports/orderRepository';
import { Order } from '@src/core/domain/order';

export class OrderService {
	orderRepository: IOrderRepository;

	constructor(private readonly _orderRepository: IOrderRepository) {
		this.orderRepository = _orderRepository;
	}

	async getOrders(): Promise<Order[]> {
		const orders = await this.orderRepository.getOrders();

		return orders;
	}
}
