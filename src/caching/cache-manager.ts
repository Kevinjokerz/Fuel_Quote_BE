import { caching, MemoryCache, MemoryConfig } from 'cache-manager';

class CacheManager {
  private static globalCache: MemoryCache;

  static async newCache(configs: MemoryConfig) {
    const cache = await caching('memory', configs);

    return cache;
  }

  public static getGlobalCache() {
    return CacheManager.globalCache;
  }

  public static async init() {
    CacheManager.globalCache = await CacheManager.newCache({
      ttl: 60 * 60 * 1000,
    });
  }
}

export { CacheManager };