import logger from '@common/logger';
import {
	getProductImageByIdSchema,
	productImageCreateSchema,
	productImageUpdateSchema,
} from '@driver/schemas/productImageSchema';
import { InvalidProductImageException } from '@exceptions/invalidProductImageException';
import {
	CreateProductImageParams,
	GetProductImageByIdParams,
} from '@ports/input/productImage';
import { ProductImageRepository } from '@ports/repository/productImageRepository';
import { ProductImage } from '@prisma/client';

export class ProductImageService {
	private readonly productImageRepository;

	constructor(productImageRepository: ProductImageRepository) {
		this.productImageRepository = productImageRepository;
	}

	async getProductImages(): Promise<ProductImage[]> {
		return this.productImageRepository.getProductImages();
	}

	async getProductImageById({
		id,
	}: GetProductImageByIdParams): Promise<ProductImage> {
		const { success } = getProductImageByIdSchema.safeParse({ id });
		if (!success) {
			throw new InvalidProductImageException(
				`Error listing product image by Id. Invalid Id: ${id}`,
			);
		}

		logger.info(`Searching product image by Id: ${id}`);

		const productImageFound =
			await this.productImageRepository.getProductImageById({ id });

		return productImageFound;
	}

	async getProductImageByProductId({
		id,
	}: GetProductImageByIdParams): Promise<ProductImage[]> {
		const { success } = getProductImageByIdSchema.safeParse({ id });
		if (!success) {
			throw new InvalidProductImageException(
				`Error listing product image by Product Id. Invalid Id: ${id}`,
			);
		}

		logger.info(`Searching product image by Product Id: ${id}`);

		const productImageFound =
			await this.productImageRepository.getProductImageByProductId({ id });

		if (productImageFound.length === 0) {
			throw new InvalidProductImageException(
				`Product Image with product id: ${id} not found`,
			);
		}

		return productImageFound;
	}

	async createProductImage(
		productImageData: CreateProductImageParams,
	): Promise<ProductImage> {
		productImageCreateSchema.parse(productImageData);
		return this.productImageRepository.createProductImage(productImageData);
	}

	async deleteProductImageById({
		id,
	}: GetProductImageByIdParams): Promise<void> {
		const { success } = getProductImageByIdSchema.safeParse({ id });
		if (!success) {
			throw new InvalidProductImageException(
				`Error deleting product image by Id. Invalid Id: ${id}`,
			);
		}

		logger.info(`Deleting product image by Id: ${id}`);

		await this.productImageRepository.deleteProductImageById({ id });
	}

	async deleteProductImageByProductId({
		id,
	}: GetProductImageByIdParams): Promise<void> {
		const { success } = getProductImageByIdSchema.safeParse({ id });
		if (!success) {
			throw new InvalidProductImageException(
				`Error deleting product images by Product Id. Invalid Id: ${id}`,
			);
		}

		logger.info(`Deleting product image by Product Id: ${id}`);

		await this.productImageRepository.deleteProductImageByProductId({ id });
	}

	async updateProductImage(
		productImageData: CreateProductImageParams,
	): Promise<ProductImage> {
		productImageUpdateSchema.parse(productImageData);
		return this.productImageRepository.updateProductImage(productImageData);
	}
}
