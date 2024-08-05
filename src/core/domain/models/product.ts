import { ProductCategory } from './productCategory';
import { ProductImage } from './productImage';

export interface Product {
	id: string;
	name: string;
	description: string;
	value: number;
	categoryId: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface ProductWithDetails extends Product {
	category?: ProductCategory;
	images?: ProductImage[];
}
