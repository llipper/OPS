import { useState, useRef } from "react"

export function useImageCrop(initialImageUrl: string = "") {
    const [previewUrl, setPreviewUrl] = useState<string>(initialImageUrl)
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const [cropModalOpen, setCropModalOpen] = useState(false)
    const [rawImageUrl, setRawImageUrl] = useState<string>("")

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            const reader = new FileReader()
            reader.onloadend = () => {
                setRawImageUrl(reader.result as string)
                setCropModalOpen(true)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleCropConfirm = (croppedFile: File, newPreviewUrl: string) => {
        setSelectedFile(croppedFile)
        setPreviewUrl(newPreviewUrl)
    }

    const clearImage = () => {
        setSelectedFile(null)
        setPreviewUrl("")
        if (fileInputRef.current) fileInputRef.current.value = ""
    }

    return {
        previewUrl,
        selectedFile,
        fileInputRef,
        cropModalOpen,
        setCropModalOpen,
        rawImageUrl,
        handleFileChange,
        handleCropConfirm,
        clearImage,
    }
}
