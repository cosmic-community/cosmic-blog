import { marked } from 'marked'
import DOMPurify from 'isomorphic-dompurify'

export function markdownToHtml(markdown: string): string {
  if (!markdown) return ''
  
  // Configure marked options
  marked.setOptions({
    breaks: true,
    gfm: true,
  })
  
  // Convert markdown to HTML
  const html = marked(markdown)
  
  // Sanitize the HTML to prevent XSS attacks
  return DOMPurify.sanitize(html as string)
}