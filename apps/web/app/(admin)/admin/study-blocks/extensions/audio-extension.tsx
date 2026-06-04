import { Node, mergeAttributes } from "@tiptap/core"
import { ReactNodeViewRenderer, NodeViewWrapper } from "@tiptap/react"
import { Mic, MicOff, Play, Square, Trash2, Volume2 } from "lucide-react"
import { useState, useRef, useEffect } from "react"

function AudioComponent(props: any) {
  const { textToSpeech } = props.node.attrs
  const isEditable = props.editor.isEditable
  const [isRecording, setIsRecording] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isLoadingSpeech, setIsLoadingSpeech] = useState(false)
  const [permissionError, setPermissionError] = useState<string | null>(null)
  const recognitionRef = useRef<any>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const audioObjectUrlRef = useRef<string | null>(null)
  const cachedAudioTextRef = useRef("")
  const blockedAudioTextRef = useRef("")
  const textRef = useRef(textToSpeech)

  useEffect(() => {
    textRef.current = textToSpeech
  }, [textToSpeech])

  const updateAttribute = (key: string, value: any) => {
    if (!isEditable) return
    props.updateAttributes({ [key]: value })
  }

  useEffect(() => {
    if (typeof window === "undefined") return

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition

    if (!SpeechRecognition) {
      setPermissionError("Seu navegador não suporta ditado por voz. Use Chrome ou Edge para transformar fala em texto.")
      return
    }

    const recognition = new SpeechRecognition()
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = "pt-BR"

    recognition.onresult = (event: any) => {
      let finalTranscript = ""

      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        if (event.results[i].isFinal) {
          finalTranscript += `${event.results[i][0].transcript} `
        }
      }

      const transcript = finalTranscript.trim()

      if (transcript) {
        const currentText = textRef.current || ""
        const nextText = `${currentText}${currentText ? " " : ""}${transcript}`.trim()
        textRef.current = nextText
        updateAttribute("textToSpeech", nextText)
      }
    }

    recognition.onerror = (event: any) => {
      setIsRecording(false)

      if (event.error === "not-allowed") {
        setPermissionError("O navegador bloqueou o ditado por voz. Libere o microfone para localhost e desative bloqueios de privacidade do navegador para esta página.")
        return
      }

      if (event.error === "audio-capture") {
        setPermissionError("Nenhum microfone foi encontrado ou o sistema operacional bloqueou o acesso.")
        return
      }

      if (event.error === "network") {
        setPermissionError("O serviço de ditado do navegador não conseguiu processar a fala. Verifique conexão ou teste no Chrome/Edge.")
        return
      }

      setPermissionError(`Erro no ditado por voz: ${event.error}`)
    }

    recognition.onend = () => {
      setIsRecording(false)
    }

    recognitionRef.current = recognition

    return () => {
      recognition.stop()
    }
  }, [])

  useEffect(() => {
    return () => {
      audioRef.current?.pause()

      if (audioObjectUrlRef.current) {
        URL.revokeObjectURL(audioObjectUrlRef.current)
      }
    }
  }, [])

  const toggleRecording = async () => {
    if (!isEditable) return

    if (isRecording) {
      recognitionRef.current?.stop()
      return
    }

    setPermissionError(null)

    if (!recognitionRef.current) {
      setPermissionError("Seu navegador não suporta ditado por voz. Use Chrome ou Edge.")
      return
    }

    try {
      if (!window.isSecureContext) {
        setPermissionError("O microfone só funciona em origem segura. Use localhost ou HTTPS.")
        return
      }

      if (!navigator.mediaDevices?.getUserMedia) {
        setPermissionError("Seu navegador não expõe acesso ao microfone nesta página.")
        return
      }

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      stream.getTracks().forEach((track) => track.stop())

      recognitionRef.current.start()
      setIsRecording(true)
    } catch (e: any) {
      console.warn("[Audio] Falha ao obter permissão ou iniciar:", e.name, e.message)
      if (e.name === "NotAllowedError" || e.name === "PermissionDeniedError") {
        setPermissionError("Permissão do microfone negada. Clique no cadeado da barra de endereços, permita Microfone para localhost e recarregue a página.")
      } else if (e.name === "NotFoundError" || e.name === "DevicesNotFoundError") {
        setPermissionError("Nenhum microfone foi encontrado no dispositivo.")
      } else if (e.name === "NotReadableError" || e.name === "TrackStartError") {
        setPermissionError("O microfone está em uso por outro aplicativo ou o sistema operacional bloqueou o acesso.")
      } else {
        setPermissionError(`Erro ao iniciar gravação: ${e.name}`)
      }
    }
  }

  const stopSpeech = () => {
    audioRef.current?.pause()
    audioRef.current = null

    setIsSpeaking(false)
  }

  const speakWithElevenLabs = async (text: string) => {
    if (audioObjectUrlRef.current && cachedAudioTextRef.current === text) {
      const cachedAudio = new Audio(audioObjectUrlRef.current)
      audioRef.current = cachedAudio
      cachedAudio.onended = stopSpeech
      cachedAudio.onerror = () => {
        stopSpeech()
        setPermissionError("Não foi possível reproduzir o áudio já gerado.")
      }

      try {
        await cachedAudio.play()
        setIsSpeaking(true)
        return
      } catch (error) {
        stopSpeech()
        throw error
      }
    }

    const response = await fetch("/api/admin/study-blocks/tts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    })

    if (!response.ok) {
      let detail = ""

      try {
        const data = await response.json()
        const errorMessage = data?.error ? String(data.error) : ""
        const errorDetail = data?.detail ? String(data.detail) : ""
        detail = [errorMessage, errorDetail].filter(Boolean).join(" - ")
      } catch {
        detail = ""
      }

      blockedAudioTextRef.current = text
      throw new Error(`ElevenLabs ${response.status}${detail ? `: ${detail}` : ""}`)
    }

    const audioBlob = await response.blob()

    if (!audioBlob.size) {
      throw new Error("ElevenLabs retornou um áudio vazio.")
    }

    const audioUrl = URL.createObjectURL(audioBlob)
    const audio = new Audio(audioUrl)
    audio.preload = "auto"

    if (audioObjectUrlRef.current) {
      URL.revokeObjectURL(audioObjectUrlRef.current)
    }

    cachedAudioTextRef.current = text
    blockedAudioTextRef.current = ""
    audioObjectUrlRef.current = audioUrl
    audioRef.current = audio

    audio.onended = stopSpeech
    audio.onerror = () => {
      stopSpeech()
      setPermissionError("Não foi possível reproduzir o áudio gerado.")
    }

    try {
      await audio.play()
      setIsSpeaking(true)
    } catch (error) {
      stopSpeech()
      throw error
    }
  }

  const toggleSpeech = async () => {
    if (typeof window === "undefined") return

    const text = String(textToSpeech || "").trim()

    if (!text) {
      setPermissionError("Digite ou dite um texto antes de ouvir a narração.")
      return
    }

    if (isLoadingSpeech) {
      return
    }

    if (blockedAudioTextRef.current === text) {
      setPermissionError("Essa narração já falhou na ElevenLabs. Altere o texto ou confira a configuração antes de tentar novamente.")
      return
    }

    if (isSpeaking) {
      stopSpeech()
      return
    }

    setPermissionError(null)
    setIsLoadingSpeech(true)

    try {
      await speakWithElevenLabs(text)
    } catch (error) {
      const message = error instanceof Error ? error.message : "erro desconhecido"
      console.warn("[Audio] Falha na voz ElevenLabs:", message)
      setPermissionError(`A voz da ElevenLabs não foi gerada (${message}). Verifique créditos, chave, voz e modelo da ElevenLabs.`)
    } finally {
      setIsLoadingSpeech(false)
    }
  }

  if (!isEditable) {
    return (
      <NodeViewWrapper as="span" className="audio-inline-node inline-block align-middle mx-1" contentEditable={false}>
        <div className="inline-flex items-center gap-3 rounded-full border border-border bg-muted/50 px-3 py-1.5 align-middle shadow-sm">
          <button
            className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-primary-foreground transition-colors ${
              isSpeaking ? "bg-destructive hover:bg-destructive/90" : "bg-primary hover:bg-primary/90"
            } disabled:cursor-wait disabled:opacity-80`}
            type="button"
            disabled={isLoadingSpeech}
            onClick={toggleSpeech}
            title={isLoadingSpeech ? "Gerando narração" : isSpeaking ? "Parar narração" : "Ouvir narração"}
          >
            {isLoadingSpeech ? (
              <Volume2 className="h-3.5 w-3.5 animate-pulse" />
            ) : isSpeaking ? (
              <Square className="h-3.5 w-3.5" />
            ) : (
              <Play className="ml-0.5 h-3.5 w-3.5" />
            )}
          </button>
          <div className="h-1 w-32 overflow-hidden rounded-full bg-muted">
            <div className={`h-full rounded-full bg-primary ${isLoadingSpeech || isSpeaking ? "w-full animate-pulse" : "w-1/3"}`} />
          </div>
          <span className="min-w-14 text-xs font-medium text-muted-foreground">
            {isLoadingSpeech ? "Gerando..." : isSpeaking ? "Tocando" : "Áudio"}
          </span>
        </div>
        {permissionError && (
          <span className="ml-2 text-xs text-destructive">{permissionError}</span>
        )}
      </NodeViewWrapper>
    )
  }

  return (
    <NodeViewWrapper as="span" className="audio-inline-node group/audio cursor-default">
      <button 
        className="inline-flex items-center space-x-1 px-2 py-0.5 mx-1 bg-primary/10 text-primary border border-primary/20 rounded text-sm font-medium hover:bg-primary/20 transition-colors align-middle focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <Volume2 className="w-4 h-4" />
        <span>Áudio</span>
      </button>

      {/* Floating Card (positioned relative to the paper, vertically aligned to the line) */}
      <div className="absolute left-[-360px] w-[340px] z-50 transition-opacity duration-200 mt-[-16px]">
        {/* Visual connector line */}
        <div className="absolute right-[-20px] top-6 w-5 h-px bg-primary/40" />
        
        <div className="w-full bg-card rounded-lg p-5 shadow-xl border border-border dark:border-primary/20" contentEditable={false}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2 text-primary">
              <Volume2 className="w-4 h-4" />
              <span className="font-semibold text-xs uppercase tracking-wide">Gravação de Áudio</span>
            </div>
            <button
              onClick={() => props.deleteNode()}
              className="p-1 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded transition-colors"
              title="Remover áudio"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            <button
              onClick={toggleRecording}
              className={`w-full flex items-center justify-center space-x-2 px-3 py-2 rounded-md font-medium text-sm transition-colors ${
                isRecording
                  ? "bg-destructive/10 text-destructive border border-destructive/20 animate-pulse"
                  : "bg-primary text-primary-foreground hover:bg-primary/90"
              }`}
            >
              {isRecording ? (
                <>
                  <MicOff className="w-4 h-4" />
                  <span>Parar Gravação</span>
                </>
              ) : (
                <>
                  <Mic className="w-4 h-4" />
                  <span>Gravar Áudio</span>
                </>
              )}
            </button>

            <textarea
              placeholder="Fale ou digite o texto que será narrado para o aluno..."
              value={textToSpeech}
              onChange={(e) => updateAttribute("textToSpeech", e.target.value)}
              className="w-full min-h-[100px] p-2 text-sm bg-transparent text-foreground placeholder:text-muted-foreground/60 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-y"
            />
            {permissionError && (
              <div className="text-xs text-destructive mt-2 p-2 bg-destructive/10 border border-destructive/20 rounded">
                {permissionError}
              </div>
            )}
          </div>
        </div>
      </div>
    </NodeViewWrapper>
  )
}

export const AudioExtension = Node.create({
  name: "audioBlock",
  group: "inline",
  inline: true,
  atom: true,

  addAttributes() {
    return {
      textToSpeech: {
        default: "",
      },
    }
  },

  parseHTML() {
    return [
      {
        tag: "div[data-type='audio-block']",
      },
    ]
  },

  renderHTML({ HTMLAttributes }) {
    return ["div", mergeAttributes(HTMLAttributes, { "data-type": "audio-block" })]
  },

  addNodeView() {
    return ReactNodeViewRenderer(AudioComponent)
  },
})
