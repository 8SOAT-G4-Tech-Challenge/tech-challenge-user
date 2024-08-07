import {
	CreateProductImageParams,
	GetProductImageByIdParams,
} from '@ports/input/productImage';
import { ProductImage } from '@src/core/domain/models/productImage';

export interface ProductImageRepository {
	createProductImage(
		productImage: CreateProductImageParams,
	): Promise<ProductImage>;
	deleteProductImageById(
		productImageId: GetProductImageByIdParams,
	): Promise<void>;
	getProductImageById(
		productImageId: GetProductImageByIdParams,
	): Promise<ProductImage>;
	deleteProductImageByProductId(productId: string): Promise<void>;
}
