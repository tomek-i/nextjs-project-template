import React from "react"
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { label, type LabelVariants } from "./Label.variants"

export type LabelProps = { disabled?: boolean; required?: boolean } & React.LabelHTMLAttributes<HTMLLabelElement> &
  LabelVariants

export const Label: React.FC<LabelProps> = ({
  className = "",
  size = "default",
  variant = "default",
  disabled = false,
  required = false,
  htmlFor = undefined,
  children,
  ...props
}) => {
  const style = clsx(label({ variant, disabled, size }))

  return (
    <label htmlFor={htmlFor} className={twMerge(style, className)} {...props}>
      {children}
      {required && <span className="text-red-500">*</span>}
    </label>
  )
}
