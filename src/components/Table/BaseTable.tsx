import React from "react"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { table, thead, tbody, type TableVariants, type TBodyVariants, type THeadVariants } from "./Table.variants"
import { getNestedProperty } from "@/lib/getNestedProperty"
import { TableProps } from "./Table"

type SelectableTableData<T> = {
  id: number
  data: T
}

type BaseTableProps = TableProps & TableVariants & TBodyVariants & THeadVariants

export const BaseTable: React.FC<BaseTableProps> = ({
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
  components = {},
  selectedRows = [],
  onSelectRow,
  onSelectAll,
  ...props
}) => {
  const tableStyle = clsx(table({ variant, disabled, rounded, border, size }))
  const tbodyStyle = clsx(tbody({ variant }))
  const theadStyle = clsx(thead({ variant }))

  const myTableData: SelectableTableData<unknown>[] = React.useMemo(() => {
    return data.map((data, index) => ({ id: index, data }))
  }, [data])

  return (
    <>
      {components.header}
      {/* <DefaultTableHeader showSearch={show.search} showPagination={show.pagination} showFilter={show.filter} /> */}
      <table className={twMerge(tableStyle, className)} {...props}>
        <thead className={twMerge(theadStyle, className)}>
          <tr>
            {show.selectAll && (
              <th scope="col">
                <input
                  type="checkbox"
                  name="select all"
                  onChange={(e) => onSelectAll?.(e.target.checked)}
                  checked={selectedRows.length === myTableData.length}
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
          {myTableData.map((row, rowIndex) => (
            <tr key={row.id ?? rowIndex} className="hover:bg-slate-300">
              {show.selectAll && (
                <td>
                  <input
                    type="checkbox"
                    id={`select-${row.id ?? rowIndex}`}
                    checked={selectedRows.includes(row.id)}
                    onChange={() => onSelectRow?.(row.id)}
                  />
                </td>
              )}
              {columns.map((column) => (
                <td key={column.name}>{getNestedProperty(row.data, column.name)}</td>
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
      {components.footer}
    </>
  )
}
