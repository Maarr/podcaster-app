export function hasHtml(content: string): boolean {
  const htmlPattern =
    /<([a-z][a-z0-9]*)\b[^>]*>(.*?)<\/\1>|<([a-z][a-z0-9]*)\b[^>]*\/>/gi
  return htmlPattern.test(content)
}
