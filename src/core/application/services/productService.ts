import { ProductRepository } from '@ports/productRepository';
import { Product } from 'models/product';
import { ProductCategory } from 'models/productCategory';
import { productCategorySchema, ProductCategoryDto } from '@driver/schemas/productCategorySchema';

export class ProductService {
    constructor(private readonly productRepository: ProductRepository) { }

    async getProducts(): Promise<Product[]> {
        return []
    }

    async createProductCategory(productCategoryDto: ProductCategoryDto): Promise<ProductCategory> {
        productCategoryDto = productCategorySchema.parse(productCategoryDto);
        return this.productRepository.createProductCategory({...productCategoryDto})
    }

    async getProductCategories(): Promise<ProductCategory[]> {
        return this.productRepository.getProductCategories();
    }
}