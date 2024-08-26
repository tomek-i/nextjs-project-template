import { cva, type VariantProps } from "class-variance-authority"

export const button = cva("", {
  variants: {
    variant: {
      default: "bg-blue-700 stroke-white text-white hover:bg-blue-950",
    },
    disabled: {
      true: "cursor-not-allowed bg-slate-200 !text-slate-300",
      false: "",
    },
    size: {
      default: "w-full px-6 py-3",
      small: "p-2",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
    disabled: false,
  },
})

export type ButtonVariants = VariantProps<typeof button>
