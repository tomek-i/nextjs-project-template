"use client"

import React, { useState } from "react"
import { BaseTable } from "./BaseTable"
import { TableProps } from "./Table"

export const SelectableTable: React.FC<TableProps> = (props) => {
  const [selectedRows, setSelectedRows] = useState<number[]>([])

  const handleSelectAll = (isSelected: boolean) => {
    if (isSelected) {
      const updatedSelectedRows = props.data.map((_, index) => index)
      console.log(`Select All: ${isSelected}`, `Updated Selected Rows:`, updatedSelectedRows)
      setSelectedRows(updatedSelectedRows)
    } else {
      console.log(`Select All: ${isSelected}`, `Updated Selected Rows: []`)
      setSelectedRows([])
    }
  }

  const handleRowSelect = (id: number) => {
    setSelectedRows((prevSelectedRows) => {
      const updatedSelectedRows = prevSelectedRows.includes(id)
        ? prevSelectedRows.filter((rowId) => rowId !== id)
        : [...prevSelectedRows, id]

      console.log(`Row ID: ${id}`, `Updated Selected Rows:`, updatedSelectedRows)

      return updatedSelectedRows
    })
  }
  // const handleRowSelect = (id: number) => {
  //   setSelectedRows((prevSelectedRows) =>
  //     prevSelectedRows.includes(id) ? prevSelectedRows.filter((rowId) => rowId !== id) : [...prevSelectedRows, id]
  //   )
  // }

  return (
    <BaseTable {...props} selectedRows={selectedRows} onSelectRow={handleRowSelect} onSelectAll={handleSelectAll} />
  )
}
