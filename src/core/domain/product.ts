import { ProductCategory } from "@models/productCategory"

export interface Product {
    id: string;
	name: string;
	amount: number;
	descrption: string;
	category: ProductCategory;
	createdAt: Date;
	updatedAt: Date;
}