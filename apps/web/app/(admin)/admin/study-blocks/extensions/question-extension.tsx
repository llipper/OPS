import { Node, mergeAttributes } from "@tiptap/core"
import { ReactNodeViewRenderer, NodeViewWrapper } from "@tiptap/react"
import { HelpCircle, Trash2 } from "lucide-react"

function QuestionComponent(props: any) {
  const { question, options } = props.node.attrs
  const isEditable = props.editor.isEditable

  const updateAttribute = (key: string, value: any) => {
    if (!isEditable) return
    props.updateAttributes({ [key]: value })
  }

  const updateOption = (index: number, value: string) => {
    if (!isEditable) return
    const newOptions = [...options]
    newOptions[index] = value
    updateAttribute("options", newOptions)
  }

  const removeOption = (index: number) => {
    if (!isEditable) return
    const newOptions = options.filter((_: any, i: number) => i !== index)
    updateAttribute("options", newOptions)
  }

  const addOption = () => {
    if (!isEditable) return
    updateAttribute("options", [...options, ""])
  }

  return (
    <NodeViewWrapper className="question-block my-6">
      <div className={`w-full bg-card rounded-md p-6 relative group ${isEditable ? 'border border-border shadow-sm' : ''}`} contentEditable={false}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className={`flex ${isEditable ? 'items-start' : 'items-center'} space-x-2`}>
              <span className={`font-semibold text-foreground ${isEditable ? 'mt-2' : ''}`}>Questão:</span>
              {isEditable ? (
                <textarea
                  placeholder="Digite a pergunta aqui..."
                  value={question}
                  onChange={(e) => updateAttribute("question", e.target.value)}
                  className="w-full min-h-[60px] p-2 text-foreground bg-transparent focus:outline-none focus:bg-muted/30 border border-transparent focus:border-border rounded-md resize-y"
                />
              ) : (
                <div className="flex-1 p-2 text-foreground whitespace-pre-wrap">
                  {question || <span className="text-muted-foreground italic">Sem pergunta definida.</span>}
                </div>
              )}
            </div>
          </div>
          {isEditable && (
            <button
              onClick={() => props.deleteNode()}
              className="p-1.5 ml-4 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-md transition-colors flex-shrink-0"
              title="Excluir questão inteira"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>

        {isEditable && <hr className="border-border my-4" />}
        {!isEditable && <div className="h-4" />}

        <div className="space-y-3">
          {options.map((option: string, index: number) => {
            const letter = String.fromCharCode(65 + index)
            return (
              <div key={index} className={`flex items-center space-x-3 ${isEditable ? 'group/option' : ''}`}>
                {!isEditable && (
                  <div className="w-5 h-5 rounded-full border border-muted-foreground flex-shrink-0" />
                )}
                {isEditable && (
                  <span className="w-6 text-center font-medium text-muted-foreground">
                    {letter})
                  </span>
                )}
                
                {isEditable ? (
                  <input
                    type="text"
                    placeholder={`Alternativa ${letter}`}
                    value={option}
                    onChange={(e) => updateOption(index, e.target.value)}
                    className="flex-1 p-2 text-foreground bg-transparent border border-transparent hover:border-border focus:border-primary focus:outline-none rounded-md transition-colors"
                  />
                ) : (
                  <div className="flex-1 text-foreground py-1">
                    <span className="font-medium mr-2">{letter})</span>
                    {option || <span className="text-muted-foreground italic">Alternativa vazia</span>}
                  </div>
                )}
                
                {isEditable && (
                  <button
                    onClick={() => removeOption(index)}
                    className="p-1.5 text-muted-foreground hover:text-destructive opacity-0 group-hover/option:opacity-100 transition-opacity"
                    title="Excluir alternativa"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            )
          })}
        </div>

        {isEditable && (
          <button
            onClick={addOption}
            className="mt-6 text-sm font-medium text-primary hover:text-primary/90 flex items-center space-x-1"
          >
            <span>+ Adicionar alternativa</span>
          </button>
        )}
      </div>
    </NodeViewWrapper>
  )
}

export const QuestionExtension = Node.create({
  name: "questionBlock",
  group: "block",
  atom: true,

  addAttributes() {
    return {
      question: {
        default: "",
      },
      options: {
        default: ["", "", "", ""],
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: "div[data-type='question-block']",
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ["div", mergeAttributes(HTMLAttributes, { "data-type": "question-block" })]
  },

  addNodeView() {
    return ReactNodeViewRenderer(QuestionComponent)
  },
})
