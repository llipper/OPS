"use client"

import { Input } from "@workspace/ui/components/input"
import { Textarea } from "@workspace/ui/components/textarea"
import { Label } from "@workspace/ui/components/label"
import { Card, CardContent } from "@workspace/ui/components/card"
import { useQuestionFormContext } from "../context/question-form-context"
import { MATERIAL_FIELDS } from "../constants"

export function MaterialsSection() {
    const { materials, setMaterials } = useQuestionFormContext()

    const onFieldChange = (key: string, value: string) => {
        setMaterials(prev => ({ ...prev, [key]: value }))
    }

    return (
        <section className="space-y-4">
            <div className="flex items-center gap-2 px-1">
                <div className="h-6 w-6 rounded-md border bg-muted flex items-center justify-center">
                    <span className="text-xs font-medium">6</span>
                </div>
                <h2 className="text-sm font-medium text-muted-foreground">Materiais de Apoio e Macetes</h2>
            </div>
            <Card>
                <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {MATERIAL_FIELDS.map(({ key, icon: Icon, color, label, placeholder }) => (
                        <div key={label} className="space-y-2">
                            <Label className="flex items-center gap-1.5">
                                <Icon className={`h-3.5 w-3.5 ${color}`} />
                                {label}
                            </Label>
                            {key === "videoUrl" ? (
                                <Input
                                    value={materials[key] ?? ""}
                                    placeholder={placeholder}
                                    onChange={(event) => onFieldChange(key, event.target.value)}
                                />
                            ) : (
                                <Textarea
                                    value={materials[key] ?? ""}
                                    placeholder={placeholder}
                                    className="min-h-[80px] resize-y"
                                    onChange={(event) => onFieldChange(key, event.target.value)}
                                />
                            )}
                        </div>
                    ))}
                </CardContent>
            </Card>
        </section>
    )
}
