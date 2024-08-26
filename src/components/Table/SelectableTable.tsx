"use client"

import React, { useState } from "react"
import { BaseTable } from "./BaseTable"
import { TableProps } from "./Table"

export const SelectableTable = <T extends Record<string, unknown>>({ ...props }: TableProps<T>) => {
  const [selectedRows, setSelectedRows] = useState<number[]>([])

  const handleSelectAll = (isSelected: boolean) => {
    if (isSelected) {
      const updatedSelectedRows = props.data.map((_, index) => index)
      setSelectedRows(updatedSelectedRows)
    } else {
      setSelectedRows([])
    }
  }

  const handleRowSelect = (id: number) => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.includes(id) ? prevSelectedRows.filter((rowId) => rowId !== id) : [...prevSelectedRows, id]
    )
  }

  return (
    <BaseTable {...props} selectedRows={selectedRows} onSelectRow={handleRowSelect} onSelectAll={handleSelectAll} />
  )
}
