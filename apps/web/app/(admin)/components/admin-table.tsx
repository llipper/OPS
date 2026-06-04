"use client"

import * as React from "react"
import { Plus, Edit2, Trash2, Search, AlertTriangle } from "lucide-react"
import { Button } from "@workspace/ui/components/button"
import { Input } from "@workspace/ui/components/input"
import { Badge } from "@workspace/ui/components/badge"
import { Card, CardContent } from "@workspace/ui/components/card"
import {
  Table, TableBody, TableCell, TableHead,
  TableHeader, TableRow,
} from "@workspace/ui/components/table"
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel,
  AlertDialogContent, AlertDialogDescription,
  AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
  AlertDialogTrigger,
} from "@workspace/ui/components/alert-dialog"

export type AdminTableColumn<T> = {
  key: keyof T | string
  label: string
  width?: string
  render?: (row: T) => React.ReactNode
}

interface AdminTableProps<T extends { id: string }> {
  title: string
  subtitle?: string
  columns: AdminTableColumn<T>[]
  data: T[]
  onDelete: (id: string) => Promise<void>
  onEdit: (row: T) => void
  createAction: React.ReactNode
  searchKeys?: (keyof T)[]
  emptyMessage?: string
}

export function AdminTable<T extends { id: string }>({
  title,
  subtitle = "Gestão de Conteúdo",
  columns,
  data,
  onDelete,
  onEdit,
  createAction,
  searchKeys = [],
  emptyMessage = "Nenhum registro encontrado.",
}: AdminTableProps<T>) {
  const [search, setSearch] = React.useState("")
  const [deletingId, setDeletingId] = React.useState<string | null>(null)

  const filtered = React.useMemo(() => {
    if (!search.trim() || searchKeys.length === 0) return data
    const q = search.toLowerCase()
    return data.filter((row) =>
      searchKeys.some((key) => String(row[key] ?? "").toLowerCase().includes(q))
    )
  }, [data, search, searchKeys])

  const handleDelete = async (id: string) => {
    setDeletingId(id)
    try { await onDelete(id) } finally { setDeletingId(null) }
  }

  return (
    <div className="flex-1 space-y-6 p-8 pt-6 bg-background">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground">{subtitle}</p>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">{title}</h1>
        </div>
        {createAction}
      </div>

      <Card className="bg-background">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar..."
                className="pl-10 h-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="px-3 py-1.5 bg-muted/50 border rounded-md flex items-center gap-2">
              <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">Total</span>
              <span className="text-sm font-semibold">{data.length}</span>
            </div>
          </div>

          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="bg-muted/50 hover:bg-muted/50">
                  {columns.map((col) => (
                    <TableHead
                      key={String(col.key)}
                      className="text-xs font-bold uppercase tracking-wider"
                      style={col.width ? { width: col.width } : {}}
                    >
                      {col.label}
                    </TableHead>
                  ))}
                  <TableHead className="w-[100px] text-right" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((row) => (
                  <TableRow key={row.id} className="group hover:bg-muted/30">
                    {columns.map((col) => (
                      <TableCell key={String(col.key)} className="py-3">
                        {col.render
                          ? col.render(row)
                          : <span className="text-sm">{String((row as Record<string, unknown>)[String(col.key)] ?? "—")}</span>
                        }
                      </TableCell>
                    ))}
                    <TableCell className="py-3 text-right pr-4">
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          variant="ghost" size="icon"
                          className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => onEdit(row)}
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost" size="icon"
                              className="h-8 w-8 opacity-0 group-hover:opacity-100 hover:text-destructive transition-all"
                              disabled={deletingId === row.id}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center text-destructive">
                                  <AlertTriangle className="w-5 h-5" />
                                </div>
                                <AlertDialogTitle>Confirmar exclusão?</AlertDialogTitle>
                              </div>
                              <AlertDialogDescription>
                                Esta ação não pode ser desfeita.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                onClick={() => handleDelete(row.id)}
                              >
                                {deletingId === row.id ? "Excluindo..." : "Excluir"}
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}

                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={columns.length + 1} className="h-36 text-center">
                      <p className="text-sm text-muted-foreground">{emptyMessage}</p>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
