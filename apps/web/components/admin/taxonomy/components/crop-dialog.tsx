"use client"

import { useState, useCallback } from "react"
import Cropper from "react-easy-crop"
import { Button } from "@workspace/ui/components/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@workspace/ui/components/dialog"
import { getCroppedImg } from "@/lib/cropImage"

interface CropDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    rawImageUrl: string
    onCropConfirm: (croppedFile: File, previewUrl: string) => void
}

export function CropDialog({ open, onOpenChange, rawImageUrl, onCropConfirm }: CropDialogProps) {
    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null)

    const onCropComplete = useCallback((croppedArea: any, croppedAreaPixels: any) => {
        setCroppedAreaPixels(croppedAreaPixels)
    }, [])

    const handleCropComplete = useCallback(async () => {
        if (rawImageUrl && croppedAreaPixels) {
            try {
                const croppedFile = await getCroppedImg(rawImageUrl, croppedAreaPixels)
                if (croppedFile) {
                    const reader = new FileReader()
                    reader.onloadend = () => {
                        onCropConfirm(croppedFile, reader.result as string)
                        onOpenChange(false)
                    }
                    reader.readAsDataURL(croppedFile)
                }
            } catch (e) {
                console.error(e)
            }
        }
    }, [rawImageUrl, croppedAreaPixels, onCropConfirm, onOpenChange])

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[600px] h-[500px] flex flex-col p-0 overflow-hidden">
                <DialogHeader className="px-6 py-4 border-b">
                    <DialogTitle>Recortar Imagem</DialogTitle>
                    <DialogDescription>
                        Ajuste o enquadramento da imagem para o formato circular.
                    </DialogDescription>
                </DialogHeader>

                <div className="flex-1 relative bg-black/95">
                    {rawImageUrl && (
                        <Cropper
                            image={rawImageUrl}
                            crop={crop}
                            zoom={zoom}
                            aspect={1}
                            cropShape="round"
                            showGrid={false}
                            onCropChange={setCrop}
                            onCropComplete={onCropComplete}
                            onZoomChange={setZoom}
                        />
                    )}
                </div>

                <div className="px-6 py-4 border-t flex flex-col gap-4 bg-background">
                    <div className="flex items-center gap-4">
                        <span className="text-xs text-muted-foreground shrink-0">Zoom</span>
                        <input
                            type="range"
                            min={1}
                            max={3}
                            step={0.1}
                            value={zoom}
                            onChange={(e) => setZoom(Number(e.target.value))}
                            className="w-full h-1 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
                        />
                    </div>

                    <div className="flex items-center justify-end gap-3">
                        <Button variant="ghost" size="sm" onClick={() => onOpenChange(false)}>
                            Cancelar
                        </Button>
                        <Button size="sm" onClick={handleCropComplete}>
                            Confirmar Recorte
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
