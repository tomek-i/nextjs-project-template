import { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"
import { Column, Table } from "."

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Table> = {
  title: "Example/Table",
  component: Table,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: "centered",
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  // argTypes: {
  //   backgroundColor: { control: "color" },
  // },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onClick: fn() },
} satisfies Meta<typeof Table>

export default meta

type Story = StoryObj<typeof meta>

type ExampleData = {
  id: number
  name: string
  age: number
  email?: string
  address?: { street: string; city: string; state: string; zip: string }
}
const myData: ExampleData[] = [
  {
    id: 343,
    name: "John Doe",
    age: 28,
    address: { street: "123 Main St", city: "New York", state: "NY", zip: "10001" },
  },
  { id: 3243, name: "Jane Smith", age: 34, email: "h8vzP@example.com" },
  { id: 543, name: "Sam Johnson", age: 45 },
]

const myColumns: Column<ExampleData>[] = [
  { name: "name", displayName: "Name" },
  { name: "age", displayName: "Age" },
  { name: "address.city", displayName: "City" },
  { name: "email", displayName: "Email" },
]

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    data: myData,
    columns: myColumns as Column<Record<string, unknown>>[],
    show: {
      selectAll: false,
    },
  },
}
