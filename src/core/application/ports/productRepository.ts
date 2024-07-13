import { ProductCategory } from "@domains/productCategory"
import { Product } from "@domains/product"

export interface ProductRepository {
    getProducts(): Promise<Product[]>;
    createProductCategory(productCategory: ProductCategory): Promise<ProductCategory>;
    getProductCategories(): Promise<ProductCategory[]> 
}