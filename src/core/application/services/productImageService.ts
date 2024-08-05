import logger from '@common/logger';
import { getProductImageByIdSchema } from '@driver/schemas/productImageSchema';
import { InvalidProductImageException } from '@exceptions/invalidProductImageException';
import { ProductImage } from '@models/productImage';
import { GetProductImageByIdParams } from '@ports/input/productImage';
import { FileSystemStorage } from '@ports/output/fileSystemStorage';
import { ProductImageRepository } from '@ports/repository/productImageRepository';

export class ProductImageService {
	private readonly productImageRepository;

	private readonly fileStorage;

	constructor(
		productImageRepository: ProductImageRepository,
		fileStorage: FileSystemStorage,
	) {
		this.productImageRepository = productImageRepository;
		this.fileStorage = fileStorage;
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

	async deleteProductImageById(productImage: ProductImage): Promise<void> {
		const { success } = getProductImageByIdSchema.safeParse(productImage);
		if (!success) {
			throw new InvalidProductImageException(
				`Error deleting product image by Id. Invalid Id: ${productImage.id}`,
			);
		}

		logger.info(`Deleting product image by Id: ${productImage.id}`);

		await this.fileStorage.deleteFile(productImage.url);

		await this.productImageRepository.deleteProductImageById({
			id: productImage.id,
		});
	}
}
