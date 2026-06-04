"use client"

import { useState } from "react"
import { Palette } from "lucide-react"
import { Label } from "@workspace/ui/components/label"
import { Input } from "@workspace/ui/components/input"

interface ColorPickerInputProps {
    value: string
    onChange: (color: string) => void
    name?: string
}

export function ColorPickerInput({ value, onChange, name = "cor" }: ColorPickerInputProps) {
    const [color, setColor] = useState(value || "#FFD700")

    const handleColorChange = (newColor: string) => {
        const uppercaseColor = newColor.toUpperCase()
        setColor(uppercaseColor)
        onChange(uppercaseColor)
    }

    return (
        <div className="space-y-2">
            <Label className="text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 text-muted-foreground">
                <Palette className="w-3.5 h-3.5" />
                Cor Visual do Badge
            </Label>
            <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-input focus-within:ring-1 focus-within:ring-primary transition-all">
                <div className="relative w-10 h-10 shrink-0">
                    <input
                        type="color"
                        value={color}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        onChange={(e) => handleColorChange(e.target.value)}
                    />
                    <div
                        className="w-full h-full rounded-full border-2 border-white shadow-sm transition-colors"
                        style={{ backgroundColor: color }}
                    />
                </div>
                <Input
                    name={name}
                    value={color}
                    placeholder="#FFD700"
                    className="border-0 bg-transparent focus-visible:ring-0 h-8 font-mono uppercase text-sm"
                    maxLength={7}
                    onChange={(e) => handleColorChange(e.target.value)}
                />
            </div>
        </div>
    )
}
