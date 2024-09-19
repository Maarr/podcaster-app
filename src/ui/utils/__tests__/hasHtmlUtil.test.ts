import { hasHtml } from '../hasHtml.util'

describe('Has HTML Util', () => {
  it('should return true for strings containing HTML tags', () => {
    expect(hasHtml('<div>Hello</div>')).toBe(true)
    expect(hasHtml('<p>This is a paragraph.</p>')).toBe(true)
    expect(hasHtml('<a href="#">Link</a>')).toBe(true)
    expect(hasHtml('<img src="image.jpg" alt="Image"/>')).toBe(true)
  })

  it('should return false for strings without HTML tags', () => {
    expect(hasHtml('Hello, world!')).toBe(false)
    expect(hasHtml('This is plain text.')).toBe(false)
    expect(hasHtml('Just text with <no> tags')).toBe(false)
    expect(hasHtml('')).toBe(false)
  })

  it('should return false for strings with incorrectly formatted HTML', () => {
    expect(hasHtml('<div>Some text</div')).toBe(false)
    expect(hasHtml('<p>This is a paragraph')).toBe(false)
  })
})
