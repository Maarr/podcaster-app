const VALIDITY_TIME_MS: number = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

export const getFromCache = <T>(
  key: string,
  validityTime = VALIDITY_TIME_MS
): T | null => {
  const cachedData = localStorage.getItem(key)
  const cachedTimestamp = localStorage.getItem(`${key}_timestamp`)

  if (!cachedData || !cachedTimestamp) return null

  const now = new Date().getTime()
  const lastFetch = new Date(cachedTimestamp).getTime()

  return now - lastFetch < validityTime ? JSON.parse(cachedData) : null
}

export const saveToCache = <T>(key: string, data: T): void => {
  localStorage.setItem(key, JSON.stringify(data))
  localStorage.setItem(`${key}_timestamp`, new Date().toISOString())
}
