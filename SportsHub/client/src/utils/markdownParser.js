import { marked } from 'marked';

export const parseMarkdown = (text) => {
  // You can add more complex Marked.js options or custom renderers here if needed.
  return marked.parse(text);
};