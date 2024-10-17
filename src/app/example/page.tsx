"use client"
import { Button } from "@/components/ui/Button"
import axios from "axios"

const handleGet = async () => {
  try {
    const response = await axios.get("/api/example")
    console.log("GET response:", response.data)
  } catch (error) {
    console.error("GET error:", error)
  }
}

const handlePost = async () => {
  try {
    const response = await axios.post("/api/example", { data: "example data" })
    console.log("POST response:", response.data)
  } catch (error) {
    console.error("POST error:", error)
  }
}

const handlePut = async () => {
  try {
    const response = await axios.put("/api/example", { data: "updated data" })
    console.log("PUT response:", response.data)
  } catch (error) {
    console.error("PUT error:", error)
  }
}

const handleDelete = async () => {
  try {
    const response = await axios.delete("/api/example")
    console.log("DELETE response:", response.data)
  } catch (error) {
    console.error("DELETE error:", error)
  }
}
export default function ExamplePage() {
  return (
    <section>
      <h1>Example</h1>
      <div className="flex gap-2">
        <Button onClick={handleGet}>GET</Button>
        <button className="bg-sky-400 px-4 py-2" onClick={handlePost}>
          POST
        </button>
        <button className="bg-sky-400 px-4 py-2" onClick={handlePut}>
          PUT
        </button>
        <button className="bg-sky-400 px-4 py-2" onClick={handleDelete}>
          DELETE
        </button>
      </div>
    </section>
  )
}
