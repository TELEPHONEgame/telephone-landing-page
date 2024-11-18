import sanitizeHtml from "sanitize-html";

export function sanitize(html: string) {
  return sanitizeHtml(html, {
    allowedTags: [
      "a",
      "b",
      "br",
      "del",
      "em",
      "i",
      "li",
      "ol",
      "p",
      "s",
      "strong",
      "u",
      "ul",
    ],
    allowedAttributes: {
      a: ["href", "text-align"],
    },
  });
}
