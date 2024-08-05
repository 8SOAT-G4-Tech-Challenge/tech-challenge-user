import { ProductCategory } from './productCategory';
import { ProductImage } from './productImage';

export interface Product {
	id: string;
	name: string;
	amount: number;
	description: string;
	categoryId: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface ProductWithDetails extends Product {
	category?: ProductCategory;
	images?: ProductImage[];
}
