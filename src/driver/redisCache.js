const Redis = require('ioredis-mock');

class RedisCache {
  constructor() {
    this.client = new Redis();
  }

  async set(key, value, expirationInSeconds) {
    await this.client.setex(key, expirationInSeconds, JSON.stringify(value));
  }

  async get(key) {
    const cachedData = await this.client.get(key);
    return cachedData ? JSON.parse(cachedData) : null;
  }

  async del(key) {
    await this.client.del(key);
  }
}

module.exports = RedisCache;
