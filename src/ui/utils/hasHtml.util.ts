export function hasHtml(content: string): boolean {
  const htmlPattern = /<\/?[a-z][\s\S]*>/i
  return htmlPattern.test(content)
}
