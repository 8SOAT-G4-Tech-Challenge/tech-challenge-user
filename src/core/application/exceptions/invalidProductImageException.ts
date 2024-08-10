import { StatusCodes } from 'http-status-codes';

import { BaseException } from '@src/core/application/exceptions/baseException';

export class InvalidProductImageException extends BaseException {
	constructor(message: string) {
		super(message, InvalidProductImageException.name, StatusCodes.BAD_REQUEST);
	}
}
