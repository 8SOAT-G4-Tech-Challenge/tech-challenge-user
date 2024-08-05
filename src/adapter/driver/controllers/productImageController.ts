import { FastifyReply, FastifyRequest } from 'fastify';
import { StatusCodes } from 'http-status-codes';

import logger from '@common/logger';
import { handleError } from '@driver/errorHandler';
import { ProductImageService } from '@services/productImageService';
import { InvalidProductImageException } from '@src/core/application/exceptions/invalidProductImageException';
import { GetProductImageByIdParams } from '@src/core/application/ports/input/productImage';

export class ProductImageController {
	private readonly productImageService;

	constructor(productImageService: ProductImageService) {
		this.productImageService = productImageService;
	}

	async deleteProductImageById(
		req: FastifyRequest<{ Params: GetProductImageByIdParams }>,
		reply: FastifyReply,
	) {
		try {
			logger.info('Deleting product image by id');
			const productImage = await this.productImageService.getProductImageById(
				req.params,
			);
			if (!productImage) {
				throw new InvalidProductImageException('Product image not found');
			}

			await this.productImageService.deleteProductImageById(productImage);

			reply
				.code(StatusCodes.OK)
				.send({ message: 'Product image successfully deleted' });
		} catch (error) {
			const errorMessage =
				'Unexpected error when deleting for product category';
			logger.error(`${errorMessage}: ${error}`);
			handleError(req, reply, error);
		}
	}
}
