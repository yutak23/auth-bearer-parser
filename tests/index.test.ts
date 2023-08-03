import { describe, it, expect, vi } from 'vitest';
import { Request, Response } from 'express';
import authBearerParser, { BearerParserOptions } from '../src/index.js';

describe('Test authBearerParser', () => {
	const reqHander = authBearerParser();

	it('no authorization headers', () => {
		const req: Partial<Request> = {
			headers: { authorization: '' }
		};
		const res: Partial<Response> = {};
		const next = vi.fn();

		reqHander(req as Request, res as Response, next);
		expect(req.token).toBe(undefined);
		expect(next).toHaveBeenCalled();
	});

	it('token type is not bearer', () => {
		const req: Partial<Request> = {
			headers: { authorization: 'Test hoge' }
		};
		const res: Partial<Response> = {};
		const next = vi.fn();

		reqHander(req as Request, res as Response, next);
		expect(req.token).toBe(undefined);
		expect(next).toHaveBeenCalled();
	});

	it('token is missing', () => {
		const req: Partial<Request> = {
			headers: { authorization: 'Bearer' }
		};
		const res: Partial<Response> = {};
		const next = vi.fn();

		reqHander(req as Request, res as Response, next);
		expect(req.token).toBe(undefined);
		expect(next).toHaveBeenCalled();
	});

	it('req.token is set', () => {
		const req: Partial<Request> = {
			headers: { authorization: 'Bearer 123' }
		};
		const res: Partial<Response> = {};
		const next = vi.fn();

		reqHander(req as Request, res as Response, next);
		expect(req.token).toBe('123');
		expect(next).toHaveBeenCalled();
	});
});

describe('Test authBearerParser with isThrowError', () => {
	const options: BearerParserOptions = { isThrowError: true };
	const reqHander = authBearerParser(options);

	it('no authorization headers', () => {
		const req: Partial<Request> = {
			headers: { authorization: '' }
		};
		const res: Partial<Response> = {};
		const next = vi.fn();

		expect(() => reqHander(req as Request, res as Response, next)).toThrowError(
			`authorization header missing`
		);
		expect(req.token).toBe(undefined);
		expect(next).not.toHaveBeenCalled();
	});

	it('token type is not bearer', () => {
		const req: Partial<Request> = {
			headers: { authorization: 'Test hoge' }
		};
		const res: Partial<Response> = {};
		const next = vi.fn();

		expect(() => reqHander(req as Request, res as Response, next)).toThrowError(
			`invalid token type: Test`
		);
		expect(req.token).toBe(undefined);
		expect(next).not.toHaveBeenCalled();
	});

	it('token is missing', () => {
		const req: Partial<Request> = {
			headers: { authorization: 'Bearer' }
		};
		const res: Partial<Response> = {};
		const next = vi.fn();

		expect(() => reqHander(req as Request, res as Response, next)).toThrowError(`token missing`);
		expect(req.token).toBe(undefined);
		expect(next).not.toHaveBeenCalled();
	});

	it('req.token is set', () => {
		const req: Partial<Request> = {
			headers: { authorization: 'Bearer 123' }
		};
		const res: Partial<Response> = {};
		const next = vi.fn();

		reqHander(req as Request, res as Response, next);
		expect(req.token).toBe('123');
		expect(next).toHaveBeenCalled();
	});
});
