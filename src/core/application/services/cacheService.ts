import logger from '@common/logger';
import redis from '@src/adapter/driven/infra/lib/redis';

export class CacheService {
	private logError(action: string, key: string, error: any): void {
		logger.error(
			`[CACHE SERVICE] Error during ${action} for key: ${key}. Error: ${error.message}`
		);
	}

	async get<T>(key: string): Promise<T | null> {
		try {
			const cacheData = await redis.get(key);
			if (!cacheData) {
				logger.info(`[CACHE SERVICE] Cache miss for key: ${key}`);
				return null;
			}
			logger.info(`[CACHE SERVICE] Cache hit for key: ${key}`);
			return JSON.parse(cacheData) as T;
		} catch (error) {
			this.logError('GET', key, error);
			throw new Error(`Error: ${error.message}`);
		}
	}

	async set<T>(key: string, value: T, ttlInSeconds: number): Promise<void> {
		try {
			await redis.set(key, JSON.stringify(value), { EX: ttlInSeconds });
			logger.info(
				`[CACHE SERVICE] Cache set for key: ${key} with TTL: ${ttlInSeconds} seconds`
			);
		} catch (error) {
			this.logError('SET', key, error);
			throw new Error(`Error: ${error.message}`);
		}
	}

	async delete(key: string): Promise<void> {
		try {
			await redis.del(key);
			logger.info(`[CACHE SERVICE] Cache deleted for key: ${key}`);
		} catch (error) {
			this.logError('DELETE', key, error);
			throw new Error(`Error: ${error.message}`);
		}
	}
}

export const cacheService = new CacheService();
