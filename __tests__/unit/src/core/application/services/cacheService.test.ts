import { CacheService } from '@application/services/cacheService';
import logger from '@common/logger';
import redis from '@driven/infra/lib/redis';

import { CustomerMockBuilder } from '../../../../mocks/customer.mock-builder';

jest.mock('@src/adapter/driven/infra/lib/redis', () => ({
	get: jest.fn(),
	set: jest.fn(),
	del: jest.fn(),
}));

describe('CacheService -> Test', () => {
	let service: CacheService;

	beforeEach(() => {
		service = new CacheService();
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('get', () => {
		test('should not find cache', async () => {
			const loggerSpy = jest.spyOn(logger, 'info');

			await service.get('local:key');

			expect(loggerSpy).toHaveBeenCalledWith(
				'[CACHE SERVICE] Cache miss for key: local:key'
			);
		});

		test('should find cache', async () => {
			const loggerSpy = jest.spyOn(logger, 'info');

			jest.spyOn(redis, 'get').mockResolvedValue('{"value": "cache"}');

			const result = await service.get('local:key');

			expect(loggerSpy).toHaveBeenCalledWith(
				'[CACHE SERVICE] Cache hit for key: local:key'
			);
			expect(result).toEqual({ value: 'cache' });
		});

		test('should trigger logger error', async () => {
			jest.spyOn(redis, 'get').mockRejectedValue({ message: 'error' });

			try {
				await service.get('local:key');
				fail('Expected method to throw an error');
			} catch (error) {
				expect(error).toBeInstanceOf(Error);
				expect(error.message).toBe('Error: error');
			}
		});
	});

	describe('set', () => {
		test('should set cache', async () => {
			const loggerSpy = jest.spyOn(logger, 'info');

			const objectToCache = new CustomerMockBuilder()
				.withDefaultValues()
				.build();

			jest.spyOn(redis, 'set').mockResolvedValue('{"value": "cache"}');

			await service.set('local:key', objectToCache, 4000);

			expect(loggerSpy).toHaveBeenCalledWith(
				'[CACHE SERVICE] Cache set for key: local:key with TTL: 4000 seconds'
			);
		});

		test('should trigger logger error', async () => {
			const objectToCache = new CustomerMockBuilder()
				.withDefaultValues()
				.build();

			jest.spyOn(redis, 'set').mockRejectedValue({ message: 'error' });

			try {
				await service.set('local:key', objectToCache, 4000);
				fail('Expected method to throw an error');
			} catch (error) {
				expect(error).toBeInstanceOf(Error);
				expect(error.message).toBe('Error: error');
			}
		});
	});

	describe('delete', () => {
		test('should delete cache', async () => {
			const loggerSpy = jest.spyOn(logger, 'info');

			jest.spyOn(redis, 'del').mockResolvedValue(0);

			await service.delete('local:key');

			expect(loggerSpy).toHaveBeenCalledWith(
				'[CACHE SERVICE] Cache deleted for key: local:key'
			);
		});

		test('should trigger logger error', async () => {
			jest.spyOn(redis, 'del').mockRejectedValue({ message: 'error' });

			try {
				await service.delete('local:key');
				fail('Expected method to throw an error');
			} catch (error) {
				expect(error).toBeInstanceOf(Error);
				expect(error.message).toBe('Error: error');
			}
		});
	});
});
