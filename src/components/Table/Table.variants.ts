import { cva, type VariantProps } from "class-variance-authority"

export const table = cva("", {
  variants: {
    variant: {
      default: "",
    },
    disabled: {
      true: "cursor-not-allowed bg-slate-200 !text-slate-300",
      false: "",
    },
    size: {
      default: "w-full",
    },
    border: {
      true: "border",
      false: "",
    },
    rounded: {
      true: "border-separate border-spacing-0 overflow-clip rounded-lg",
      false: "border-collapse",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
    disabled: false,
    rounded: false,
    border: true,
  },
})

export const thead = cva("cursor-default capitalize", {
  variants: {
    variant: {
      default: "bg-gray-800 text-gray-200",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export const tbody = cva("text-black", {
  variants: {
    variant: {
      default: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

export type TableVariants = VariantProps<typeof table>
export type THeadVariants = VariantProps<typeof thead>
export type TBodyVariants = VariantProps<typeof tbody>
