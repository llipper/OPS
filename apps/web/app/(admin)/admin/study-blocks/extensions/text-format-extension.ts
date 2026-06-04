import { Mark, mergeAttributes } from "@tiptap/core"

export const TextFormatExtension = Mark.create({
  name: "textFormat",

  addAttributes() {
    return {
      color: {
        default: null,
        parseHTML: (element) => element.style.color || null,
        rendered: false,
      },
      fontSize: {
        default: null,
        parseHTML: (element) => element.style.fontSize || null,
        rendered: false,
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: "span[style]",
      },
    ]
  },

  renderHTML({ mark, HTMLAttributes }) {
    const styles = [
      mark.attrs.color ? `color: ${mark.attrs.color}` : "",
      mark.attrs.fontSize ? `font-size: ${mark.attrs.fontSize}` : "",
    ].filter(Boolean)

    return [
      "span",
      mergeAttributes(HTMLAttributes, styles.length ? { style: styles.join("; ") } : {}),
      0,
    ]
  },

})
