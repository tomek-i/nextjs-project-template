import React, { Key } from "react"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { table, thead, tbody, type TableVariants, type TBodyVariants, type THeadVariants } from "./Table.variants"
import { getNestedProperty } from "@/lib/getNestedProperty"
import { TableProps } from "./Table"

type BaseTableProps<T extends Record<string, unknown>> = Omit<TableProps<T>, "components" | "itemsPerPage"> &
  TableVariants &
  TBodyVariants &
  THeadVariants

export const BaseTable = <T extends Record<string, unknown>>({
  className = "",
  size = "default",
  variant = "default",
  rounded = false,
  disabled = false,
  show = {
    selectAll: false,
  },
  data,
  border,
  columns,
  selectedRows = [],
  onSelectRow,
  onSelectAll,
  ...props
}: BaseTableProps<T>) => {
  const tableStyle = clsx(table({ variant, disabled, rounded, border, size }))
  const tbodyStyle = clsx(tbody({ variant }))
  const theadStyle = clsx(thead({ variant }))

  return (
    <>
      <table className={twMerge(tableStyle, className)} {...props}>
        <thead className={twMerge(theadStyle, className)}>
          <tr>
            {show.selectAll && (
              <th scope="col">
                <input
                  type="checkbox"
                  name="select all"
                  onChange={(e) => onSelectAll?.(e.target.checked)}
                  checked={selectedRows.length === data.length}
                />
              </th>
            )}
            {columns.map((column) => (
              <th key={column.name} scope="col">
                {column.displayName ?? column.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={twMerge(tbodyStyle, className)}>
          {data.map((row, rowIndex) => (
            <tr key={(row.id as T["id"] as Key) ?? rowIndex} className="hover:bg-slate-300">
              {show.selectAll && (
                <td>
                  <input
                    type="checkbox"
                    id={`select-${row.id ?? rowIndex}`}
                    checked={selectedRows.includes(row.id as T["id"])}
                    onChange={() => onSelectRow?.(row.id as T["id"])}
                  />
                </td>
              )}
              {columns.map((column) => (
                <td key={column.name}>{getNestedProperty(row, column.name)}</td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot /*className={twMerge(tfootStyle, className)}*/>
          <tr>
            <td colSpan={columns.length + (show.selectAll ? 1 : 0)}>Footer</td>
          </tr>
        </tfoot>
      </table>
    </>
  )
}
