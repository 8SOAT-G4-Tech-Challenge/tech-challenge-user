import { OrderStatusType } from './types/orderStatus.type';

export interface Order {
    id: string;
	customerId: string | null;
	status: OrderStatusType;
	amount: number;
	createdAt: Date;
	updatedAt: Date;
}
