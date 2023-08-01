import { BaseError } from 'make-error';

export default class HttpError extends BaseError {
	status: number;

	constructor(status: number, msg: string) {
		super(msg);
		this.status = status;
	}
}
