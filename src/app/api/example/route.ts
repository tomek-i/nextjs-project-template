import { BadRequest, Created, NoContent, OK } from "@/lib/http"

export async function GET() {
  return OK([
    { id: 1, name: "test" },
    { id: 2, name: "test 2" },
  ])
}
export async function POST() {
  return Created({ id: 1, message: "Resource created" })
}
export async function PUT() {
  return BadRequest({ error: "Bad request" })
}
export async function DELETE() {
  return NoContent()
}
