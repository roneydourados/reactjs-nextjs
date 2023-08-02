import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class CachedbService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async get<T>(key: string, requestDb: () => Promise<T>) {
    const data = await this.cacheManager.get<T>(key);

    if (data) {
      return data;
    }

    const dataDb = await requestDb();

    return dataDb;
  }
}
