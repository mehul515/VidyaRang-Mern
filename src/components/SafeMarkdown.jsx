import { marked } from "marked";
import DOMPurify from "dompurify";
import { useEffect, useState } from "react";

export function SafeMarkdown({ content, className = "" }) {
  const [cleanHtml, setCleanHtml] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      marked.setOptions({
        breaks: false,
        gfm: true,
        pedantic: false,
        smartLists: true,
        smartypants: false
      });

      const html = marked(content);
      const clean = DOMPurify.sanitize(html, {
        ALLOWED_TAGS: [
          "p", "br", "strong", "em", "ul", "ol", "li",
          "h1", "h2", "h3", "h4", "h5", "h6",
          "a", "code", "pre", "blockquote"
        ],
        ALLOWED_ATTR: ["href", "target", "rel"]
      });

      setCleanHtml(clean);
    }
  }, [content]);

  return (
    <div
      className={`markdown-content ${className}`}
      dangerouslySetInnerHTML={{ __html: cleanHtml }}
    />
  );
}
