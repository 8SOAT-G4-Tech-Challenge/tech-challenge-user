export class BadRequestException extends Error {
	statusCode: number;

	constructor(message: string) {
		super(message);
		this.name = 'BadRequestException';
		this.statusCode = 400;
	}
}
