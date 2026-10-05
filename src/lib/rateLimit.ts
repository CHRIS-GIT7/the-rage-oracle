interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const entries = new Map<string, RateLimitEntry>();

export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number,
  now = Date.now()
): number | null {
  const entry = entries.get(key);
  if (!entry || entry.resetAt <= now) {
    entries.set(key, { count: 1, resetAt: now + windowMs });
    if (entries.size > 2_048) {
      for (const [entryKey, value] of entries) {
        if (value.resetAt <= now) entries.delete(entryKey);
      }
      while (entries.size > 2_048) {
        const oldestKey = entries.keys().next().value;
        if (!oldestKey) break;
        entries.delete(oldestKey);
      }
    }
    return null;
  }

  entry.count += 1;
  return entry.count > limit ? Math.max(1, Math.ceil((entry.resetAt - now) / 1000)) : null;
}
