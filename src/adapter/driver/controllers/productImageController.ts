import { FastifyReply, FastifyRequest } from 'fastify';
import { StatusCodes } from 'http-status-codes';

import logger from '@common/logger';
import { handleError } from '@driver/errorHandler';
import { ProductImageService } from '@services/productImageService';
import {
	CreateProductImageParams,
	GetProductImageByIdParams,
} from '@src/core/application/ports/input/productImage';

export class ProductImageController {
	private readonly productImageService;

	constructor(productImageService: ProductImageService) {
		this.productImageService = productImageService;
	}

	async getProductImages(req: FastifyRequest, reply: FastifyReply) {
		try {
			logger.info('Listing product images');
			reply
				.code(StatusCodes.OK)
				.send(await this.productImageService.getProductImages());
		} catch (error) {
			const errorMessage = 'Unexpected error when listing for product images';
			logger.error(`${errorMessage}: ${error}`);
			handleError(req, reply, error);
		}
	}

	async getProductImageById(
		req: FastifyRequest<{ Params: GetProductImageByIdParams }>,
		reply: FastifyReply,
	) {
		try {
			logger.info('Listing product image by id');
			const productImage = await this.productImageService.getProductImageById(
				req?.params,
			);
			reply.code(StatusCodes.OK).send(productImage);
		} catch (error) {
			const errorMessage = 'Unexpected error when listing for product category';
			logger.error(`${errorMessage}: ${error}`);
			handleError(req, reply, error);
		}
	}

	async getProductImageByProductId(
		req: FastifyRequest<{ Params: GetProductImageByIdParams }>,
		reply: FastifyReply,
	) {
		try {
			logger.info('Listing product image by product id');
			const productImages =
				await this.productImageService.getProductImageByProductId(req?.params);
			reply.code(StatusCodes.OK).send(productImages);
		} catch (error) {
			const errorMessage = 'Unexpected error when listing for product category';
			logger.error(`${errorMessage}: ${error}`);
			handleError(req, reply, error);
		}
	}

	async createProductImage(req: FastifyRequest, reply: FastifyReply) {
		try {
			logger.info(`Creating product image: ${JSON.stringify(req.body)}`);
			const productImage = await this.productImageService.createProductImage(
				req.body as CreateProductImageParams,
			);
			reply.code(StatusCodes.CREATED).send(productImage);
		} catch (error) {
			const errorMessage = 'Unexpected when creating for product category';
			logger.error(`${errorMessage}: ${error}`);
			handleError(req, reply, error);
		}
	}

	async deleteProductImageById(
		req: FastifyRequest<{ Params: GetProductImageByIdParams }>,
		reply: FastifyReply,
	) {
		try {
			logger.info('Deleting product image by id');
			await this.productImageService.deleteProductImageById(req?.params);
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

	async deleteProductImageByProductId(
		req: FastifyRequest<{ Params: GetProductImageByIdParams }>,
		reply: FastifyReply,
	) {
		try {
			logger.info('Deleting product image by product id');
			await this.productImageService.deleteProductImageByProductId(req?.params);
			reply
				.code(StatusCodes.OK)
				.send({ message: 'Product images successfully deleted' });
		} catch (error) {
			const errorMessage =
				'Unexpected error when deleting for product category';
			logger.error(`${errorMessage}: ${error}`);
			handleError(req, reply, error);
		}
	}

	async updateProductImage(
		req: FastifyRequest<{
			Params: GetProductImageByIdParams;
			Body: CreateProductImageParams;
		}>,
		reply: FastifyReply,
	) {
		try {
			logger.info('Updating product image', req?.body?.id);
			const productImage = await this.productImageService.updateProductImage({
				...req.body,
				id: req?.params?.id,
			} as CreateProductImageParams);
			reply.code(StatusCodes.OK).send(productImage);
		} catch (error) {
			const errorMessage =
				'Unexpected error when updating for product category';
			logger.error(`${errorMessage}: ${error}`);
			handleError(req, reply, error);
		}
	}
}
