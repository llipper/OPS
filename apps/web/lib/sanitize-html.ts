import sanitize from "sanitize-html"

export function sanitizeHtml(value?: string | null) {
  if (!value) return ""

  return sanitize(value, {
    allowedTags: [
      "p",
      "br",
      "strong",
      "b",
      "em",
      "i",
      "u",
      "ol",
      "ul",
      "li",
      "blockquote",
      "code",
      "pre",
      "sup",
      "sub",
      "span",
    ],
    allowedAttributes: {},
    allowedSchemes: [],
    disallowedTagsMode: "discard",
    enforceHtmlBoundary: true,
  })
}
