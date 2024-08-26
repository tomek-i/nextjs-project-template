import React from "react"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { label ,type LabelVariants } from "./Label.variants"

export type LabelProps = { disabled?: boolean } 
  & React.HTMLAttributes<HTMLDivElement> 
  & LabelVariants

export const Label: React.FC<LabelProps> = ({
  className = "",
  size = "default",
  variant = "default",
  disabled = false,
  ...props
}) => {
  const style = clsx(label({ variant, disabled, size }))
  
  return <div className={twMerge(style, className)} {...props}></div>
}