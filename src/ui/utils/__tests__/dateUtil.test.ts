import { formatDate, formatDuration } from '../date.util'

describe('Date Util', () => {
  it('should format duration correctly for valid input', () => {
    expect(formatDuration('2:5')).toBe('2:05')
    expect(formatDuration('10:30')).toBe('10:30')
    expect(formatDuration('0:0')).toBe('0:00')
    expect(formatDuration('12:')).toBe('12:00')
    expect(formatDuration(':34')).toBe('0:34')
  })

  it('should return the same duration for invalid input', () => {
    expect(formatDuration('invalid')).toBe('invalid')
  })
})

describe('formatDate', () => {
  it('should format date correctly for valid input', () => {
    expect(formatDate('2024-09-19T00:00:00Z')).toBe('19/09/2024')
    expect(formatDate('2000-01-01T00:00:00Z')).toBe('01/01/2000')
  })

  it('should handle invalid date input gracefully', () => {
    expect(formatDate('invalid')).toBe('Invalid date')
    expect(formatDate('')).toBe('Invalid date')
  })
})
