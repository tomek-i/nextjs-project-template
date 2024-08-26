import { render, screen } from "@testing-library/react"
import { Label } from "./Label"

test("renders", () => {
    render(<Label />)
    expect(screen.getByText("Label")).toBeInTheDocument()
})