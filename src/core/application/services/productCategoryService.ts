import { productCategoryCreateSchema } from '@driver/schemas/productCategorySchema';
import { ProductCategory } from '@models/productCategory';
import { ProductCategoryRepository } from '@ports/repository/productCategoryRepository';

import { InvalidProductCategoryException } from '../exceptions/invalidProductCategoryException';
import { DeleteProductCategoryParams } from '../ports/input/productCategory';

export class ProductCategoryService {
	private readonly productCategoryRepository;

	constructor(productCategoryRepository: ProductCategoryRepository) {
		this.productCategoryRepository = productCategoryRepository;
	}

	async getProductCategories(): Promise<ProductCategory[]> {
		return this.productCategoryRepository.getProductCategories();
	}

	async getProductCategoryByName(
		category: string
	): Promise<ProductCategory | null> {
		return this.productCategoryRepository.getProductCategoryByName(category);
	}

	async createProductCategory(
		productCategoryData: any
	): Promise<ProductCategory> {
		productCategoryCreateSchema.parse(productCategoryData);
		return this.productCategoryRepository.createProductCategory(
			productCategoryData
		);
	}

	async deleteProductCategory(
		deleteProductCategoryParams: DeleteProductCategoryParams
	): Promise<void> {
		const existingProductCategory =
			await this.productCategoryRepository.getProductCategoryById(
				deleteProductCategoryParams.id
			);

		if (!existingProductCategory) {
			throw new InvalidProductCategoryException(
				`Categ Product with ID ${deleteProductCategoryParams.id} not found.`
			);
		}

		return this.productCategoryRepository.deleteProductCategories(
			deleteProductCategoryParams
		);
	}
}
