import {
  getFromCache,
  saveToCache,
  cleanChache,
} from '@/infrastructure/cache/localStorageCache.util'

describe('Local Storage Cache Util', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  describe('getFromCache', () => {
    it('should return null if no data is cached', () => {
      expect(getFromCache('testKey')).toBeNull()
    })

    it('should return null if data is expired', () => {
      localStorage.setItem('testKey', JSON.stringify({ data: 'test' }))
      localStorage.setItem(
        'testKey_timestamp',
        new Date(Date.now() - 25 * 60 * 60 * 1000).toISOString() // 25 hours ago
      )
      expect(getFromCache('testKey')).toBeNull()
    })

    it('should return cached data if it is valid', () => {
      localStorage.setItem('testKey', JSON.stringify({ data: 'test' }))
      localStorage.setItem('testKey_timestamp', new Date().toISOString())
      expect(getFromCache('testKey')).toEqual({ data: 'test' })
    })
  })

  describe('saveToCache', () => {
    it('should save data and timestamp to localStorage', () => {
      saveToCache('testKey', { data: 'test' })
      expect(localStorage.getItem('testKey')).toBe(
        JSON.stringify({ data: 'test' })
      )
      expect(localStorage.getItem('testKey_timestamp')).not.toBeNull()
    })

    it('should update the timestamp when saving data', () => {
      saveToCache('testKey', { data: 'test' })
      const initialTimestamp = localStorage.getItem('testKey_timestamp')

      jest.advanceTimersByTime(1000)
      saveToCache('testKey', { data: 'test updated' })

      const newTimestamp = localStorage.getItem('testKey_timestamp')
      expect(newTimestamp).not.toBe(initialTimestamp)
    })
  })

  describe('cleanChache', () => {
    it('should remove expired cache entries', () => {
      localStorage.setItem('expiredKey', JSON.stringify({ data: 'expired' }))
      localStorage.setItem(
        'expiredKey_timestamp',
        new Date(Date.now() - 25 * 60 * 60 * 1000).toISOString() // 25 hours ago
      )

      localStorage.setItem('validKey', JSON.stringify({ data: 'valid' }))
      localStorage.setItem('validKey_timestamp', new Date().toISOString())

      cleanChache()

      expect(localStorage.getItem('expiredKey')).toBeNull()
      expect(localStorage.getItem('validKey')).not.toBeNull()
    })
  })
})
