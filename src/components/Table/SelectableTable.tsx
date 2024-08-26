"use client"

import React, { useState } from "react"
import { BaseTable } from "./BaseTable"
import { TableProps } from "./Table"

export const SelectableTable = <T extends Record<string, unknown>>({ ...props }: Omit<TableProps<T>, "components">) => {
  // export const SelectableTable: React.FC<TableProps<T>> = (props) => {
  const [selectedRows, setSelectedRows] = useState<T["id"][]>([])

  const handleSelectAll = (isSelected: boolean) => {
    if (isSelected) {
      const updatedSelectedRows = props.data.map((item) => item.id as T["id"])
      setSelectedRows(updatedSelectedRows)
    } else {
      setSelectedRows([])
    }
    console.log({ selectedRows, data: props.data })
  }

  const handleRowSelect = (id: T["id"]) => {
    console.log("Row selected with id:", id)
    setSelectedRows((prevSelectedRows) => {
      const updatedSelectedRows = prevSelectedRows.includes(id)
        ? prevSelectedRows.filter((rowId) => rowId !== id)
        : [...prevSelectedRows, id]
      console.log("Updated selected rows:", updatedSelectedRows)
      return updatedSelectedRows
    })
  }

  return (
    <BaseTable {...props} selectedRows={selectedRows} onSelectRow={handleRowSelect} onSelectAll={handleSelectAll} />
  )
}
