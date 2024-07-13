export interface User {
	id: string;
	name: string;
	email: string;
	password: string;
	sessionToken: string;
	isAdmin: boolean;
	createdAt: Date;
	updatedAt: Date;
}
