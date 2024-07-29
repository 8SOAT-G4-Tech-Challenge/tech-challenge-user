import {
	CreateProductImageParams,
	GetProductImageByIdParams,
} from '@ports/input/productImage';
import { ProductImage } from '@src/core/domain/models/productImage';

export interface ProductImageRepository {
	getProductImages(): Promise<ProductImage[]>;
	getProductImageById(
		productImageId: GetProductImageByIdParams,
	): Promise<ProductImage>;
	getProductImageByProductId(
		productId: GetProductImageByIdParams,
	): Promise<ProductImage[]>;
	createProductImage(
		productImage: CreateProductImageParams,
	): Promise<ProductImage>;
	deleteProductImageById(
		productImageId: GetProductImageByIdParams,
	): Promise<void>;
	deleteProductImageByProductId(
		productId: GetProductImageByIdParams,
	): Promise<void>;
	updateProductImage(
		productImage: CreateProductImageParams,
	): Promise<ProductImage>;
}
