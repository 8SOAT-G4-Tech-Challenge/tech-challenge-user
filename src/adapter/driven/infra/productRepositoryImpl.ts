import logger from '@common/logger';
import { prisma } from '@driven/infra/lib/prisma';
import { DataNotFoundException } from '@exceptions/dataNotFound';
import { Product, ProductWithDetails } from '@models/product';
import {
	CreateProductParams,
	UpdateProductParams,
} from '@ports/input/products';
import { ProductRepository } from '@ports/repository/productRepository';
import { Prisma } from '@prisma/client';
import { InvalidProductException } from '@src/core/application/exceptions/invalidProductException';

export class ProductRepositoryImpl implements ProductRepository {
	async getProducts(): Promise<ProductWithDetails[]> {
		const products = await prisma.product.findMany({
			include: {
				category: true,
				images: true,
			},
		});
		return products.map((product) => ({
			...product,
			amount: parseFloat(product.amount.toString()),
		}));
	}

	async getProductById(id: string): Promise<ProductWithDetails> {
		const product = await prisma.product.findUnique({
			where: { id },
			include: { images: true },
		});

		if (!product) {
			throw new DataNotFoundException(`Product with id: ${id} not found`);
		}

		return {
			...product,
			amount: parseFloat(product.amount.toString()),
		};
	}

	async getProductsByCategory(categoryId: string): Promise<Product[]> {
		const products = await prisma.product.findMany({
			where: { categoryId },
			include: {
				category: true,
				images: true,
			},
		});
		return products.map((product) => ({
			...product,
			amount: parseFloat(product.amount.toString()),
		}));
	}

	async deleteProducts(id: string): Promise<void> {
		const findProduct = await prisma.product.findFirst({
			where: { id },
		});
		if (findProduct) {
			await prisma.productImage.deleteMany({
				where: { productId: findProduct.id },
			});
			await prisma.product.delete({
				where: { id },
			});
		}
	}

	async createProducts(product: CreateProductParams): Promise<Product> {
		const createdProducts = await prisma.product
			.create({
				data: {
					amount: product.amount,
					description: product.description,
					name: product.name,
					categoryId: product.categoryId,
				},
			})
			.catch((error) => {
				if (error instanceof Prisma.PrismaClientKnownRequestError) {
					if (error.code === 'P2002') {
						throw new InvalidProductException(
							`Product with name: ${product.name} already exists`,
						);
					}
				}
				throw new InvalidProductException('Error creating product');
			});

		return {
			...createdProducts,
			amount: parseFloat(product.amount.toString()),
		};
	}

	async updateProducts(product: UpdateProductParams): Promise<Product> {
		console.log('productRepository => ', product);
		const updatedProduct = await prisma.product
			.update({
				where: {
					id: product.id,
				},
				data: {
					name: product.name,
					amount: product.amount,
					description: product.description,
					categoryId: product.categoryId,
				},
			})
			.catch((error) => {
				console.log('error => ', error);
				throw new DataNotFoundException(
					`Product with id: ${product.id} not found`,
				);
			});

		logger.info(`Product updated: ${JSON.stringify(updatedProduct)}`);

		return {
			...updatedProduct,
			amount: parseFloat(updatedProduct.amount.toString()),
		};
	}
}
