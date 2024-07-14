import { Product } from '@src/core/domain/product';
import { ProductCategory } from '@src/core/domain/productCategory';

export interface ProductRepository {
    getProducts(): Promise<Product[]>;
    createProductCategory(productCategory: ProductCategory): Promise<ProductCategory>;
    getProductCategories(): Promise<ProductCategory[]>
}
