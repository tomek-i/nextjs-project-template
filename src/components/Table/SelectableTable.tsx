"use client"
import React, { useState } from "react"
import { BaseTable } from "./BaseTable"
import { TableProps } from "./Table"

export const SelectableTable = <T extends Record<string, unknown>>({ onSelectRow, ...props }: TableProps<T>) => {
  const [selectedRows, setSelectedRows] = useState<T["id"][]>([])

  const handleSelectAll = (isSelected: boolean) => {
    if (isSelected) {
      const updatedSelectedRows = props.data.map((item) => item.id as T["id"])
      setSelectedRows(updatedSelectedRows)
    } else {
      setSelectedRows([])
    }
  }

  const handleRowSelect = (id: T["id"]) => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.includes(id) ? prevSelectedRows.filter((rowId) => rowId !== id) : [...prevSelectedRows, id]
    )
  }

  return (
    <BaseTable {...props} selectedRows={selectedRows} onSelectAll={handleSelectAll} onSelectRow={handleRowSelect} />
  )
}
