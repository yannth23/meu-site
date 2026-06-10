import { RedisClient } from 'redis';

const client = new RedisClient();

const cacheService = {
  get: async (key: string) => {
    try {
      return await client.get(key);
    } catch (error) {
      console.error('Error getting from cache:', error);
      return null;
    }
  },
  set: async (key: string, value: string) => {
    try {
      return await client.set(key, value);
    } catch (error) {
      console.error('Error setting in cache:', error);
      return null;
    }
  },
};

export default cacheService;
