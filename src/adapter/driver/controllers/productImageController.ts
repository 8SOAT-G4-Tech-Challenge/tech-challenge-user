import { FastifyReply, FastifyRequest } from 'fastify';
import * as fs from 'fs';
import { StatusCodes } from 'http-status-codes';
import * as path from 'path';
import { pipeline } from 'stream';
import { promisify } from 'util';

import logger from '@common/logger';
import { handleError } from '@driver/errorHandler';
import { MultipartFile } from '@fastify/multipart';
import { ProductImageService } from '@services/productImageService';
import {
	CreateProductImageParams,
	GetProductImageByIdParams,
} from '@src/core/application/ports/input/productImage';

const pump = promisify(pipeline);

interface ProductImageID {
	value: string;
}

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
			logger.info('Uploading file');
			const data = (await req.file()) as MultipartFile;
			const { productId } = data.fields;

			if (!data || !productId) {
				throw new Error('Invalid parameters to product image create');
			}

			if (data.filename === undefined) {
				throw new Error('File not found');
			}

			const productIdObj = productId as ProductImageID;

			const uploadDir = path.join(
				__dirname,
				`/../../../uploads/${productIdObj.value}`,
			);
			if (!fs.existsSync(uploadDir)) {
				fs.mkdirSync(uploadDir, { recursive: true });
			}

			const timestamp = Date.now();
			const newFilename = `${timestamp}-${data.filename}`;
			const filePath = path.join(uploadDir, newFilename);
			await pump(data.file, fs.createWriteStream(filePath));

			const productImageUrl = `/uploads/${productIdObj.value}/${newFilename}`;

			logger.info(
				`Creating product image with productId: ${productIdObj.value} and URL: ${productImageUrl}`,
			);
			const productImage = await this.productImageService.createProductImage({
				url: productImageUrl,
				productId: productIdObj.value,
			});

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
			const productImage = await this.productImageService.getProductImageById(
				req.params,
			);
			if (!productImage) {
				reply
					.code(StatusCodes.NOT_FOUND)
					.send({ message: 'Product image not found' });
				return;
			}

			await this.productImageService.deleteProductImageById(req.params);

			const filePath = path.join(__dirname, `/../../../${productImage.url}`);
			if (fs.existsSync(filePath)) {
				fs.unlinkSync(filePath);
			}

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

			const { id: productId } = req.params;
			const productImages =
				await this.productImageService.getProductImageByProductId({
					id: productId,
				});

			if (!productImages.length) {
				reply.code(StatusCodes.NOT_FOUND).send({
					message: 'No product images found for the given product id',
				});
				return;
			}

			await this.productImageService.deleteProductImageByProductId(req.params);

			const uploadDir = path.join(__dirname, `/../../../uploads/${productId}`);

			if (fs.existsSync(uploadDir)) {
				fs.readdirSync(uploadDir).forEach((file) => {
					fs.unlinkSync(path.join(uploadDir, file));
				});

				fs.rmdirSync(uploadDir);
			}

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
			logger.info('Updating product image', req?.params?.id);

			const currentImage = await this.productImageService.getProductImageById(
				req.params,
			);
			if (!currentImage) {
				reply
					.code(StatusCodes.NOT_FOUND)
					.send({ message: 'Product image not found' });
				return;
			}

			const data = (await req.file()) as MultipartFile;
			let productImageUrl = currentImage.url;

			if (data && data.filename !== undefined) {
				const { productId } = currentImage;

				if (!productId) {
					throw new Error('Invalid parameters to product image update');
				}

				const uploadDir = path.join(
					__dirname,
					`/../../../uploads/${productId}`,
				);
				if (!fs.existsSync(uploadDir)) {
					fs.mkdirSync(uploadDir, { recursive: true });
				}

				const timestamp = Date.now();
				const newFilename = `${timestamp}-${data.filename}`;
				const filePath = path.join(uploadDir, newFilename);
				await pump(data.file, fs.createWriteStream(filePath));

				const oldFilePath = path.join(
					__dirname,
					`/../../../${currentImage.url}`,
				);
				if (fs.existsSync(oldFilePath)) {
					fs.unlinkSync(oldFilePath);
				}

				productImageUrl = `/uploads/${productId}/${newFilename}`;
			}

			const updatedProductImage =
				await this.productImageService.updateProductImage({
					id: req.params.id,
					url: productImageUrl,
					productId: currentImage.productId,
				});

			reply.code(StatusCodes.OK).send(updatedProductImage);
		} catch (error) {
			const errorMessage =
				'Unexpected error when updating for product category';
			logger.error(`${errorMessage}: ${error}`);
			handleError(req, reply, error);
		}
	}
}
