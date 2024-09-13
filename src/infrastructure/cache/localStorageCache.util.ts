const VALIDITY_TIME_MS: number = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

export const getFromCache = <T>(
  key: string,
  validityTime = VALIDITY_TIME_MS
): T | null => {
  const cachedData = localStorage.getItem(key)
  const cachedTimestamp = localStorage.getItem(`${key}_timestamp`)

  if (!cachedData || !cachedTimestamp) return null

  return isValidTimestamp(cachedTimestamp, validityTime)
    ? JSON.parse(cachedData)
    : null
}

export const saveToCache = <T>(key: string, data: T): void => {
  cleanChache()
  localStorage.setItem(key, JSON.stringify(data))
  localStorage.setItem(`${key}_timestamp`, new Date().toISOString())
}

export const cleanChache = (validityTime = VALIDITY_TIME_MS) => {
  Object.keys(localStorage)
    .filter((key) => key.endsWith('_timestamp'))
    .forEach((key) => {
      const timestamp = localStorage.getItem(key)
      if (!timestamp) return

      if (!isValidTimestamp(timestamp, validityTime)) {
        const itemKey = key.replace('_timestamp', '')
        localStorage.removeItem(key)
        localStorage.removeItem(itemKey)
      }
    })
}

const isValidTimestamp = (
  timestamp: string,
  validityTime = VALIDITY_TIME_MS
) => {
  const now = new Date().getTime()
  const lastFetch = new Date(timestamp).getTime()

  return now - lastFetch < validityTime
}
