import logger from '@common/logger';
import { Order } from '@domain/order';
import { OrderQueryParams } from '@domain/types/order';
import { OrderStatusEnum } from '@domain/types/orderStatusType';
import { InvalidOrderStatusException } from '@driver/exceptions/invalidOrderStatusException';
import { IOrderRepository } from '@ports/orderRepository';

export class OrderService {
	orderRepository: IOrderRepository;

	constructor(private readonly _orderRepository: IOrderRepository) {
		this.orderRepository = _orderRepository;
	}

	async getOrders({ status }: OrderQueryParams): Promise<Order[]> {
		if (status && Object.values(OrderStatusEnum).includes(status)) {
			logger.info(`Searching orders by status: ${status}`);
			const orders = await this.orderRepository.getOrdersByStatus(status);
			return orders;
		}

		if (status && !Object.values(OrderStatusEnum).includes(status)) {
			throw new InvalidOrderStatusException(
				`Error listing orders by status. Invalid status: ${status}`
			);
		}

		logger.info('Searching all orders');
		const orders = await this.orderRepository.getOrders();
		return orders;
	}
}
