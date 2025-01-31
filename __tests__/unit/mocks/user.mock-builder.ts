export class UserMockBuilder {
	id: string;

	name: string | null;

	email: string;

	password: string;

	sessionToken: string | null;

	isAdmin: boolean;

	createdAt: Date;

	updatedAt: Date;

	constructor() {
		this.id = '';
		this.name = null;
		this.email = '';
		this.password = '';
		this.sessionToken = null;
		this.isAdmin = false;
		this.createdAt = new Date();
		this.updatedAt = new Date();
	}

	withId(value: string) {
		this.id = value;
		return this;
	}

	withName(value: string | null) {
		this.name = value;
		return this;
	}

	withEmail(value: string) {
		this.email = value;
		return this;
	}

	withPassword(value: string) {
		this.password = value;
		return this;
	}

	withSessionToken(value: string | null) {
		this.sessionToken = value;
		return this;
	}

	withIsAdmin(value: boolean) {
		this.isAdmin = value;
		return this;
	}

	withCreatedAt(value: Date) {
		this.createdAt = value;
		return this;
	}

	withUpdatedAt(value: Date) {
		this.updatedAt = value;
		return this;
	}

	withDefaultValues() {
		this.id = '7a9c0954-9488-4953-ac48-a751b5569659';
		this.name = 'Default User';
		this.email = 'user@example.com';
		this.sessionToken = 'session-token-12345';
		this.password = 'Password123456@';
		this.isAdmin = false;
		this.createdAt = new Date();
		this.updatedAt = new Date();
		return this;
	}

	withInvalidValues() {
		this.name = 'Default User';
		this.email = 'invalid-email';
		this.sessionToken = 'session-token-12345';
		this.password = 'Password123456@';
		this.isAdmin = false;
		return this;
	}

	build() {
		return {
			id: this.id,
			name: this.name,
			email: this.email,
			password: this.password,
			sessionToken: this.sessionToken,
			isAdmin: this.isAdmin,
			createdAt: this.createdAt,
			updatedAt: this.updatedAt,
		};
	}
}
