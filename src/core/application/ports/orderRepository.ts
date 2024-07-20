import { Order } from '@models/order';

export interface IOrderRepository {
	getOrders(): Promise<Order[]>;
}
