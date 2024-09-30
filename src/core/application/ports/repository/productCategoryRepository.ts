import { ProductCategory } from '@src/core/domain/models/productCategory';

import { DeleteProductCategoryParams } from '../input/productCategory';

export interface ProductCategoryRepository {
	createProductCategory(
		productCategory: ProductCategory
	): Promise<ProductCategory>;
	getProductCategories(): Promise<ProductCategory[]>;
	getProductCategoryByName(name: string): Promise<ProductCategory | null>;
	getProductCategoryById(id: string): Promise<ProductCategory | null>;
	deleteProductCategories(
		deleteProductCategoryParams: DeleteProductCategoryParams
	): Promise<void>;
}
