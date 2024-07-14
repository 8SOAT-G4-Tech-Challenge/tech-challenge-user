import { prisma } from '@driven/infra/lib/prisma';
import { ProductRepository } from '@ports/productRepository';
import { Product } from '@src/core/domain/product';
import { ProductCategory } from '@src/core/domain/productCategory';

export class ProductRepositoryImpl implements ProductRepository {
	async getProducts(): Promise<Product[]> {
		return prisma.product.findMany({
			select: {
				id: true,
				name: true,
				amount: true,
				description: true,
				category: true,
				createdAt: true,
				updatedAt: true,
			},
		});
	}

	async getProductCategories(): Promise<ProductCategory[]> {
		return prisma.productCategory.findMany({
			select: {
				id: true,
				name: true,
				createdAt: true,
				updatedAt: true,
			},
		});
	}

	async createProductCategory(productCategory: ProductCategory): Promise<ProductCategory> {
		return prisma.productCategory.create({
			data: productCategory,
		});
	}
}
