import { Column, Table } from "@/components/Table"
import { DefaultTableHeader } from "@/components/Table/DefaultTableHeader"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Home - Example Server Page",
  description: "This is a page that is pre-rendered on the server for {{pascalCase name}}.",
}

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

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <p className="">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">src/app/page.tsx</code>
        </p>
      </div>
      <Table
        components={{
          header: (
            <DefaultTableHeader
              itemsPerPage={1}
              show={{
                pagination: true,
                search: true,
                filter: true,
              }}
            />
          ),
          footer: (
            <DefaultTableHeader
              itemsPerPage={1}
              show={{
                pagination: true,
              }}
            />
          ),
        }}
        data={myData}
        columns={myColumns as Column<unknown>[]}
        show={{
          selectAll: true,
        }}
      />
    </main>
  )
}
