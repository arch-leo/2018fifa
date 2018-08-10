export function delHtmlTag (str) {
  return str.replace(/<[^>]+>/g, '')
}
