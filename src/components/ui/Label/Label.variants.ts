import { cva, type VariantProps } from "class-variance-authority"

export const label = cva(
  "font-medium leading-none transition-colors duration-300 ease-in-out peer-disabled:opacity-70",
  {
    variants: {
      variant: {
        default: "",
      },
      disabled: {
        true: "cursor-not-allowed !text-slate-300",
        false: "",
      },
      size: {
        default: "text-base",
        large: "text-lg",
        medium: "text-sm",
        small: "text-xs",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      disabled: false,
    },
  }
)

export type LabelVariants = VariantProps<typeof label>
