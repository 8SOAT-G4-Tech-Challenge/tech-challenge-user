import { FastifyReply, FastifyRequest } from 'fastify';
import { StatusCodes } from 'http-status-codes';

import { OrderService } from '@application/services';
import { handleError } from '@common/errorHandler';
import logger from '@common/logger';
import { Order } from '@domain/order';
import { OrderQueryParams } from '@domain/types/order';

export class OrderController {
	orderService: OrderService;

	constructor(private _orderService: OrderService) {
		this.orderService = _orderService;
	}

	async getOrders(
		req: FastifyRequest<{ Querystring: OrderQueryParams }>,
		reply: FastifyReply
	) {
		try {
			logger.info('Listing orders');
			const orders: Order[] = await this.orderService.getOrders(req.query);
			reply.code(StatusCodes.OK).send(orders);
		} catch (error) {
			logger.error(`Unexpected error when trying to get orders: ${error}`);
			handleError(req, reply, error);
		}
	}
}
