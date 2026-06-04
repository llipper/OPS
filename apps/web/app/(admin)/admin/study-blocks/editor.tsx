"use client"

import { useEditor, EditorContent } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { useEffect, useState } from "react"
import { AudioExtension } from "./extensions/audio-extension"
import { QuestionExtension } from "./extensions/question-extension"
import { TextFormatExtension } from "./extensions/text-format-extension"
import { EditorToolbar } from "./editor-toolbar"

const editorClass =
  "focus:outline-none min-h-[1056px] w-full px-16 py-20 text-base leading-relaxed cursor-text rounded-md"

export function WordEditor() {
  const [isPreview, setIsPreview] = useState(false)
  const editor = useEditor({
    extensions: [
      TextFormatExtension,
      StarterKit,
      AudioExtension,
      QuestionExtension,
    ],
    content: "<p>Comece a digitar sua aula aqui...</p>",
    editorProps: {
      attributes: {
        class: `${editorClass} bg-card text-card-foreground`,
      },
    },
  })

  useEffect(() => {
    if (!editor) return

    editor.setEditable(!isPreview)
    editor.setOptions({
      editorProps: {
        attributes: {
          class: isPreview
            ? `${editorClass} bg-white text-zinc-950 cursor-default`
            : `${editorClass} bg-card text-card-foreground`,
        },
      },
    })
  }, [editor, isPreview])

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] overflow-hidden bg-muted/40 dark:bg-background/95">
      <div className="flex-none">
        <EditorToolbar editor={editor} isPreview={isPreview} onPreviewChange={setIsPreview} />
      </div>
      
      <div className={`flex flex-1 justify-center overflow-auto ${isPreview ? "items-start bg-zinc-950 py-10" : "items-start py-12"}`}>
        <div
          className={`relative mb-12 w-[816px] max-w-[95vw] border bg-card ${
            isPreview
              ? "min-h-[1056px] rounded-sm border-zinc-200 shadow-2xl dark:bg-white dark:text-zinc-950"
              : "rounded-md border-border shadow-sm"
          }`}
        >
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  )
}
