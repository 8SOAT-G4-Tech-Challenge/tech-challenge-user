import { prisma } from '@driven/infra/lib/prisma';
import { ProductCategory } from '@models/productCategory';
import { ProductCategoryRepository } from '@ports/repository/productCategoryRepository';
import { DeleteProductCategoryParams } from '@src/core/application/ports/input/productCategory';

export class ProductCategoryRepositoryImpl
	implements ProductCategoryRepository
{
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

	async createProductCategory(
		productCategory: ProductCategory
	): Promise<ProductCategory> {
		return prisma.productCategory.create({
			data: productCategory,
		});
	}

	async getProductCategoryByName(
		nameFilter: string
	): Promise<ProductCategory | null> {
		return prisma.productCategory.findFirst({
			where: {
				name: {
					equals: nameFilter,
					mode: 'insensitive',
				},
			},
		});
	}

	async getProductCategoryById(id: string): Promise<ProductCategory | null> {
		const productCategory = await prisma.productCategory.findUnique({
			where: { id },
			select: {
				id: true,
				name: true,
				createdAt: true,
				updatedAt: true,
			},
		});

		return productCategory;
	}

	async deleteProductCategories(
		deleteProductCategoryParams: DeleteProductCategoryParams
	): Promise<void> {
		await prisma.productCategory.delete({
			where: { id: deleteProductCategoryParams.id },
		});
	}
}
