import React from "react"
import { SelectableTable } from "./SelectableTable"
import { BaseTable } from "./BaseTable"

export type TableProps<T extends Record<string, unknown>> = {
  HeaderComponent?: React.FC
  FooterComponent?: React.FC

  disabled?: boolean
  data: T[]
  columns: Column<Record<string, unknown>>[]

  components: {
    header?: React.ReactNode
    footer?: React.ReactNode
  }

  show: {
    selectAll?: boolean
  }
  selectedRows?: T["id"][] // Pass selected rows from the client-side component
  onSelectRow?: (id: T["id"]) => void // Pass row selection handler from the client-side component
  onSelectAll?: (isSelected: boolean) => void // Pass select all handler from the client-side component
} & React.HTMLAttributes<HTMLDivElement>

export type Column<T> = {
  name: keyof T | string
  displayName?: string
  visible?: boolean
  sortable?: boolean
  cellRenderer?: (data: T) => React.ReactNode
  type?: "string" | "number" | "date" | "boolean" | "currency"
}

export const Table = <T extends Record<string, unknown>>({ show, ...props }: TableProps<T>) => {
  if (show.selectAll)
    return (
      <>
        <h1>Selectable</h1>
        <SelectableTable {...props} show={show} />
      </>
    )
  else
    return (
      <>
        <h1>Base Table</h1>
        <BaseTable {...props} show={show} />
      </>
    )
}
