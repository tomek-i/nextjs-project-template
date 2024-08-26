"use client"
import React from "react"
import { type DefaultTableHeaderVariants } from "./DefaultTableHeader.variants"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { usePagination } from "@/hooks"

export type DefaultTableHeaderProps = {
  disabled?: boolean
  show?: {
    filter?: boolean
    pagination?: boolean
    search?: boolean
    selectAll?: boolean
  }
  totalItems?: number
  itemsPerPage?: number
} & React.HTMLAttributes<HTMLDivElement> &
  DefaultTableHeaderVariants

export const DefaultTableHeader: React.FC<DefaultTableHeaderProps> = ({
  className = "",
  size = "default",
  variant = "default",
  disabled = false,
  show = {},
  totalItems,
  itemsPerPage,
  ...props
}) => {
  const { setPage, hasNextPage, hasPreviousPage, currentPage, limit, totalPages } = usePagination(totalItems!, 1)

  function handlePreviousClick(_event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    if (hasPreviousPage) setPage(currentPage - 1)
  }

  function handleNextClick(_event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    if (hasNextPage) setPage(currentPage + 1)
  }

  //TODO: need to update the pagination variants, the disabled state needs to remove the hover effect

  const pagination = (
    <div className="flex w-full items-center justify-between">
      <Button disabled={!hasPreviousPage} onClick={handlePreviousClick}>
        {"<<"}
      </Button>

      {Array.from({ length: totalPages }, (_, index) => (
        <Button
          key={index + 1}
          onClick={() => setPage(index + 1)}
          className={currentPage === index + 1 ? "bg-red-500" : ""}
        >
          {index + 1}
        </Button>
      ))}

      <Button disabled={!hasNextPage} onClick={handleNextClick}>
        {">>"}
      </Button>
    </div>
  )

  if (!(show.search || show.pagination || show.filter)) return null

  return (
    <>
      {(show.search || show.filter) && (
        <div className="flex w-full justify-between bg-blue-300 px-2 py-4">
          <>
            <div className="flex w-full items-center justify-between">
              {show.search && <Input placeholder="Search..." className="max-w-48" />}
              {show.filter && (
                <Button
                  className="flex items-center space-x-2"
                  size="small"
                  // onClick={handleFilterButtonClick}
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="size-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75"
                      />
                    </svg>
                  </span>
                </Button>
              )}
            </div>
          </>
        </div>
      )}
      {show.pagination && pagination}
    </>
  )
}
