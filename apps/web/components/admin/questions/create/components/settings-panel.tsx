"use client"

import { Switch } from "@workspace/ui/components/switch"
import { Label } from "@workspace/ui/components/label"
import { Card, CardContent } from "@workspace/ui/components/card"
import { useQuestionFormContext } from "../context/question-form-context"
import { PUBLICATION_SETTINGS } from "../constants"

export function SettingsPanel() {
    const { settings, setSettings } = useQuestionFormContext()

    const onFieldChange = (field: "isPublic" | "allowComments" | "reviewMode", value: boolean) => {
        setSettings(prev => ({ ...prev, [field]: value }))
    }

    return (
        <section className="space-y-4">
            <div className="flex items-center gap-2 px-1">
                <div className="h-6 w-6 rounded-md border bg-muted flex items-center justify-center">
                    <span className="text-xs font-medium">7</span>
                </div>
                <h2 className="text-sm font-medium text-muted-foreground">Configurações de Publicação</h2>
            </div>
            <Card>
                <CardContent className="p-4 divide-y">
                    {PUBLICATION_SETTINGS.map(({ icon: Icon, color, label, description }) => {
                        const field = label === "Visibilidade Pública"
                            ? "isPublic"
                            : label === "Permitir Comentários"
                                ? "allowComments"
                                : "reviewMode"

                        return (
                            <div key={label} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                                <div className="flex items-center gap-3">
                                    <Icon className={`h-4 w-4 ${color}`} />
                                    <div>
                                        <Label className="text-sm font-medium cursor-pointer">{label}</Label>
                                        <p className="text-xs text-muted-foreground">{description}</p>
                                    </div>
                                </div>
                                <Switch
                                    checked={settings[field]}
                                    onCheckedChange={(checked) => onFieldChange(field, checked)}
                                />
                            </div>
                        )
                    })}
                </CardContent>
            </Card>
        </section>
    )
}
