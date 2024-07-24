import { StatusCodes } from 'http-status-codes';

import { BaseException } from '@driver/exceptions/baseException';

export class InvalidCustomerException extends BaseException {
	constructor(message: string) {
		super(message, InvalidCustomerException.name, StatusCodes.BAD_REQUEST);
	}
}
