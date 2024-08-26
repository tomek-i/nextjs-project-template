"use client"
import React from "react"
import { type DefaultTableHeaderVariants } from "./DefaultTableHeader.variants"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { sanitizeNumber } from "@/lib/sanitizeNumber"

export type DefaultTableHeaderProps = {
  disabled?: boolean
  show?: {
    filter?: boolean
    pagination?: boolean
    search?: boolean
    selectAll?: boolean
  }
} & React.HTMLAttributes<HTMLDivElement> &
  DefaultTableHeaderVariants

export const DefaultTableHeader: React.FC<DefaultTableHeaderProps> = ({
  className = "",
  size = "default",
  variant = "default",
  disabled = false,
  show = {},
  ...props
}) => {
  // const style = clsx(defaulttableheader({ variant, disabled, size }))
  const searchParams = useSearchParams()
  const pathName = usePathname()
  const { replace } = useRouter()

  const params = new URLSearchParams(searchParams)

  //TODO: implement proper pagination based on total pages this way we can disable the next button if there is no more
  const hasNext = /*ITEMS_PER_PAGE * */ Number(params.get("page")) - 1 /* + ITEMS_PER_PAGE  < MAX_ITEMS */
  const hasPrevious = /*ITEMS_PER_PAGE * */ Number(params.get("page")) - 1 > 0

  function handlePreviousClick(_event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    const pageNumber = Math.max(sanitizeNumber(params.get("page")) - 1, 1) || 1

    if (pageNumber === 1) {
      params.delete("page")
    } else {
      params.set("page", pageNumber.toString())
    }
    replace(`${pathName}?${params.toString()}`)
  }

  function handleNextClick(_event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void {
    const sanitized = sanitizeNumber(params.get("page")) || 1
    const pageNumber = Math.max(sanitized + 1, 1)
    if (pageNumber === 1) {
      params.delete("page")
    } else {
      params.set("page", pageNumber.toString())
    }
    replace(`${pathName}?${params.toString()}`)
  }

  //TODO: need to update the pagination variants, the disabled state needs to remove the hover effect
  const pagination = (
    <div className="flex w-full items-center justify-between">
      <Button disabled={!hasPrevious} onClick={handlePreviousClick}>
        {"<<"}
      </Button>
      {/* TODO: implement specific pages, relates to do proper pagination results */}

      <Button>1</Button>
      <Button>2</Button>
      <Button>3</Button>

      <Button disabled={!hasNext} onClick={handleNextClick}>
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
