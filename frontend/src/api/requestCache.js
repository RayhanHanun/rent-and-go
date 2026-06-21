const cache = new Map();

const stableStringify = (value) => JSON.stringify(value || {}, Object.keys(value || {}).sort());

export const publicCacheKey = (name, params) => `${name}:${stableStringify(params)}`;

export const cachedRequest = (key, requestFactory, ttl = 60_000) => {
  const now = Date.now();
  const cached = cache.get(key);

  if (cached && cached.expiresAt > now) {
    return cached.promise || Promise.resolve(cached.data);
  }

  const promise = requestFactory()
    .then((data) => {
      cache.set(key, {
        data,
        expiresAt: Date.now() + ttl,
      });

      return data;
    })
    .catch((error) => {
      cache.delete(key);
      throw error;
    });

  cache.set(key, {
    promise,
    expiresAt: now + ttl,
  });

  return promise;
};
