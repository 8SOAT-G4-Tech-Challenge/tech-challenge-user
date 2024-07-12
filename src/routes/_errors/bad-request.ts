export class BadRequest extends Error {
	statusCode: number;

	constructor(message: string) {
		super(message);
		this.name = 'BadRequestError';
		this.statusCode = 400;
	}
}
