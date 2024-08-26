import React from "react"
import { SelectableTable } from "./SelectableTable"
import { BaseTable } from "./BaseTable"

export type TableProps = {
  HeaderComponent?: React.FC
  FooterComponent?: React.FC

  disabled?: boolean
  data: unknown[]
  columns: Column<unknown>[]

  components: {
    header?: React.ReactNode
    footer?: React.ReactNode
  }

  show: {
    selectAll?: boolean
  }
  selectedRows?: number[] // Pass selected rows from the client-side component
  onSelectRow?: (id: number) => void // Pass row selection handler from the client-side component
  onSelectAll?: (isSelected: boolean) => void // Pass select all handler from the client-side component
} & React.HTMLAttributes<HTMLDivElement>

type SelectableTableData<T> = {
  id: number
  data: T
}

export type Column<T = unknown> = {
  name: keyof Partial<T> | string
  displayName?: string
  visible?: boolean
  sortable?: boolean
  cellRenderer?: (data: T) => React.ReactNode
  type?: "string" | "number" | "date" | "boolean" | "currency"
}

export const Table: React.FC<TableProps> = ({ show, ...props }) => {
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
