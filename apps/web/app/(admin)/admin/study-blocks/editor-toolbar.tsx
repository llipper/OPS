"use client"

import { Editor } from "@tiptap/react"
import {
  Bold,
  Edit3,
  Eraser,
  Eye,
  HelpCircle,
  Italic,
  Music,
  Palette,
  Redo,
  Strikethrough,
  Type,
  Undo,
} from "lucide-react"

interface ToolbarProps {
  editor: Editor | null
  isPreview: boolean
  onPreviewChange: (value: boolean) => void
}

export function EditorToolbar({ editor, isPreview, onPreviewChange }: ToolbarProps) {
  if (!editor) return null

  const isEditable = !isPreview
  const hasTextFormat = Boolean(editor.schema.marks.textFormat)
  const textFormat = editor.getAttributes("textFormat")
  const selectedColor = typeof textFormat.color === "string" ? textFormat.color : ""
  const currentColor = /^#[0-9a-f]{6}$/i.test(selectedColor) ? selectedColor : "#111827"
  const currentFontSize = typeof textFormat.fontSize === "string" ? textFormat.fontSize : "16px"
  const colorOptions = ["#111827", "#dc2626", "#2563eb", "#16a34a", "#9333ea", "#ca8a04"]
  const fontSizes = [
    { label: "12", value: "12px" },
    { label: "14", value: "14px" },
    { label: "16", value: "16px" },
    { label: "18", value: "18px" },
    { label: "22", value: "22px" },
    { label: "28", value: "28px" },
  ]
  const applyTextColor = (color: string) => {
    if (!hasTextFormat) return

    editor.chain().focus().setMark("textFormat", { ...textFormat, color }).run()
  }
  const applyFontSize = (fontSize: string) => {
    if (!hasTextFormat) return

    editor.chain().focus().setMark("textFormat", { ...textFormat, fontSize }).run()
  }
  const clearTextFormat = () => {
    if (!hasTextFormat) return

    editor.chain().focus().unsetMark("textFormat").run()
  }

  return (
    <div className="sticky top-0 z-50 flex w-full items-center justify-between gap-3 border-b border-border bg-card px-4 py-2 shadow-sm">
      <div className="flex min-w-0 flex-wrap items-center gap-3">
        <div className="flex items-center space-x-2 bg-muted p-1 rounded-md">
          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo() || !isEditable}
            icon={<Undo className="w-4 h-4" />}
            title="Desfazer"
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo() || !isEditable}
            icon={<Redo className="w-4 h-4" />}
            title="Refazer"
          />
        </div>

        <div className="h-6 w-px bg-border" />

        <div className="flex items-center space-x-2 bg-muted p-1 rounded-md">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            isActive={editor.isActive("bold")}
            disabled={!isEditable}
            icon={<Bold className="w-4 h-4" />}
            title="Negrito"
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            isActive={editor.isActive("italic")}
            disabled={!isEditable}
            icon={<Italic className="w-4 h-4" />}
            title="Itálico"
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            isActive={editor.isActive("strike")}
            disabled={!isEditable}
            icon={<Strikethrough className="w-4 h-4" />}
            title="Tachado"
          />
        </div>

        <div className="h-6 w-px bg-border" />

        <div className="flex items-center gap-2 rounded-md bg-muted p-1">
          <div className="flex items-center gap-1 rounded-md border border-border/60 bg-background px-2 py-1.5 text-muted-foreground">
            <Type className="h-4 w-4" />
            <select
              value={currentFontSize}
              disabled={!isEditable || !hasTextFormat}
              onChange={(event) => applyFontSize(event.target.value)}
              className="h-6 bg-transparent text-xs font-medium text-foreground outline-none disabled:cursor-not-allowed disabled:opacity-50"
              title="Tamanho do texto"
            >
              {fontSizes.map((fontSize) => (
                <option key={fontSize.value} value={fontSize.value}>
                  {fontSize.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1 rounded-md border border-border/60 bg-background px-2 py-1.5">
            <Palette className="h-4 w-4 text-muted-foreground" />
            <input
              type="color"
              value={currentColor}
              disabled={!isEditable || !hasTextFormat}
              onChange={(event) => applyTextColor(event.target.value)}
              className="h-6 w-7 cursor-pointer rounded border-0 bg-transparent p-0 disabled:cursor-not-allowed disabled:opacity-50"
              title="Cor do texto"
            />
            <div className="flex items-center gap-1">
              {colorOptions.map((color) => (
                <button
                  key={color}
                  type="button"
                  disabled={!isEditable || !hasTextFormat}
                  onClick={() => applyTextColor(color)}
                  className={`h-5 w-5 rounded-full border transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50 ${
                    currentColor === color ? "border-foreground ring-2 ring-ring/30" : "border-border"
                  }`}
                  style={{ backgroundColor: color }}
                  title={`Aplicar cor ${color}`}
                />
              ))}
            </div>
          </div>

          <ToolbarButton
            onClick={clearTextFormat}
            disabled={!isEditable || !hasTextFormat}
            icon={<Eraser className="w-4 h-4" />}
            title="Limpar cor e tamanho"
          />
        </div>

        <div className="h-6 w-px bg-border" />

        <div className="flex items-center space-x-2 bg-muted p-1 rounded-md">
          <ToolbarButton
            onClick={() => editor.chain().focus().insertContent("<div data-type=\"audio-block\"></div>").run()}
            disabled={!isEditable}
            icon={<Music className="w-4 h-4" />}
            label="Áudio"
            title="Inserir Áudio"
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().insertContent("<div data-type=\"question-block\"></div>").run()}
            disabled={!isEditable}
            icon={<HelpCircle className="w-4 h-4" />}
            label="Questão"
            title="Inserir Questão"
          />
        </div>
      </div>

      <div className="shrink-0">
        <button
          onClick={() => onPreviewChange(!isPreview)}
          className={`flex items-center space-x-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
            isPreview
              ? "bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20 border border-amber-500/20" 
              : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground border border-border"
          }`}
        >
          {isPreview ? (
            <>
              <Edit3 className="w-4 h-4" />
              <span>Sair do Preview</span>
            </>
          ) : (
            <>
              <Eye className="w-4 h-4" />
              <span>Preview do Aluno</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}

function ToolbarButton({ 
  onClick, 
  isActive = false, 
  disabled = false, 
  icon, 
  label, 
  title 
}: { 
  onClick: () => void
  isActive?: boolean
  disabled?: boolean
  icon: React.ReactNode
  label?: string
  title?: string
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`flex items-center space-x-1 p-2 rounded-md transition-colors ${
        isActive ? "bg-background text-primary shadow-sm" : "text-muted-foreground hover:bg-muted-foreground/10 hover:text-foreground"
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {icon}
      {label && <span className="text-xs font-semibold pr-1">{label}</span>}
    </button>
  )
}
