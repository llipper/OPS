import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

type RateLimitInput = {
  key: string
  limit: number
  windowSeconds: number
}

type RateLimitBucket = {
  count: number
  resetAt: number
}

const buckets = new Map<string, RateLimitBucket>()
const upstashLimiters = new Map<string, Ratelimit>()

function hasUpstashEnv() {
  return Boolean(
    process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  )
}

function getUpstashLimiter(limit: number, windowSeconds: number) {
  const key = `${limit}:${windowSeconds}`
  const existing = upstashLimiters.get(key)

  if (existing) return existing

  const limiter = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(limit, `${windowSeconds} s`),
    analytics: true,
    prefix: "concurso-master:ratelimit",
  })

  upstashLimiters.set(key, limiter)
  return limiter
}

async function checkUpstashLimit({
  key,
  limit,
  windowSeconds,
}: RateLimitInput) {
  const limiter = getUpstashLimiter(limit, windowSeconds)
  const result = await limiter.limit(key)

  if (!result.success) {
    throw new Error("Muitas tentativas. Aguarde alguns minutos e tente novamente.")
  }
}

function checkMemoryLimit({ key, limit, windowSeconds }: RateLimitInput) {
  const now = Date.now()
  const current = buckets.get(key)

  if (!current || current.resetAt <= now) {
    buckets.set(key, {
      count: 1,
      resetAt: now + windowSeconds * 1000,
    })
    return
  }

  if (current.count >= limit) {
    throw new Error("Muitas tentativas. Aguarde alguns minutos e tente novamente.")
  }

  current.count += 1
}

export async function rateLimitOrThrow({
  key,
  limit,
  windowSeconds,
}: RateLimitInput) {
  if (hasUpstashEnv()) {
    await checkUpstashLimit({ key, limit, windowSeconds })
    return
  }

  checkMemoryLimit({ key, limit, windowSeconds })
}
