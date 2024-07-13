import { ProductCategory } from "@models/productCategory"

export interface Product {
    id: String;
	name: String;
	amount: number;
	descrption: String;
	category: ProductCategory;
	createdAt: Date;
	updatedAt: Date;
}