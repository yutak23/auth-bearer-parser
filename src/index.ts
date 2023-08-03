import { Request, Response, NextFunction } from 'express';
import HttpError from './lib/http-error.js';

declare module 'express-serve-static-core' {
	interface Request {
		token: string | undefined;
	}
}

export interface BearerParserOptions {
	/**
	 * @default false
	 * @description If true, throw error when bearer token is invalid.
	 */
	isThrowError?: boolean;
}

const authBearerParser =
	(option?: BearerParserOptions) =>
	(req: Request, res: Response, next: NextFunction): void => {
		const { authorization } = req.headers;
		if (!authorization) {
			if (option?.isThrowError) throw new HttpError(401, `authorization header missing`);
			return next();
		}

		const [type, token] = authorization.split(/\s/, 2);
		if (type !== 'Bearer') {
			if (option?.isThrowError) throw new HttpError(400, `invalid token type: ${type}`);
			return next();
		}

		if (!token) {
			if (option?.isThrowError) throw new HttpError(401, `token missing`);
			return next();
		}

		req.token = token;
		return next();
	};

export default authBearerParser;
