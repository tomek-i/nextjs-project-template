"use client"
import { getPaginationParams } from "@/util"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export const usePagination = ({ totalItems }: { totalItems?: number }) => {
  const { replace } = useRouter()
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams)
  const pathName = usePathname()

  const { limit, page, skip, take } = getPaginationParams(searchParams)
  const currentPage = page
  const totalPages = Math.ceil(totalItems! / (limit ?? 1))

  const hasNext = currentPage < totalPages
  const hasPrevious = currentPage > 1

  function handlePageClick(page: number): void {
    if (page === 1) {
      params.delete("page")
    } else {
      params.set("page", page.toString())
    }
    replace(`${pathName}?${params.toString()}`)
  }

  return {
    skip,
    limit,
    take,
    handlePageClick,
    hasNext,
    hasPrevious,
    currentPage,
  }
}
