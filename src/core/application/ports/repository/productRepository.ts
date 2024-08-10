import { Product, ProductWithDetails } from '@models/product';
import {
	CreateProductParams,
	UpdateProductParams,
} from '@ports/input/products';

export interface ProductRepository {
	getProducts(): Promise<ProductWithDetails[]>;
	getProductById(id: string): Promise<ProductWithDetails>;
	getProductsByCategory(categoryId: string): Promise<ProductWithDetails[]>;
	deleteProducts(id: string): Promise<void>;
	createProducts(product: CreateProductParams): Promise<Product>;
	updateProducts(product: UpdateProductParams): Promise<Product>;
	getProductById(id: string): Promise<Product>;
}
