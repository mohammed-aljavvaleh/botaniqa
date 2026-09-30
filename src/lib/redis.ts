import { Redis } from '@upstash/redis';
import { CafeStoreData } from '@/data/initialData';

const REDIS_KEY = 'botaniqa:cafe_data';

// Upstash or Vercel KV environment variables
const redisUrl = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

export const isRedisConfigured = Boolean(redisUrl && redisToken);

let redisClient: Redis | null = null;

if (isRedisConfigured) {
  try {
    redisClient = new Redis({
      url: redisUrl!,
      token: redisToken!,
    });
  } catch (error) {
    console.warn('Failed to initialize Redis client:', error);
  }
}

export async function getCafeDataFromDb(): Promise<CafeStoreData | null> {
  if (!redisClient) return null;
  try {
    const data = await redisClient.get<CafeStoreData>(REDIS_KEY);
    return data || null;
  } catch (error) {
    console.error('Error fetching from Upstash Redis:', error);
    return null;
  }
}

export async function saveCafeDataToDb(data: CafeStoreData): Promise<boolean> {
  if (!redisClient) return false;
  try {
    await redisClient.set(REDIS_KEY, data);
    return true;
  } catch (error) {
    console.error('Error saving to Upstash Redis:', error);
    return false;
  }
}

export async function resetCafeDataInDb(): Promise<boolean> {
  if (!redisClient) return false;
  try {
    await redisClient.del(REDIS_KEY);
    return true;
  } catch (error) {
    console.error('Error deleting from Upstash Redis:', error);
    return false;
  }
}
