import {describe, it, expect, vi} from "vitest"
import {render, screen} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import NameForm from "./NameForm"

describe ("NameForm Component",()=>{
    it("should call the onSubmit function when the value is valid for name", async()=>{
        const onSubmitMock = vi.fn()  //used for mocking functions
        const user = userEvent.setup()

        render(<NameForm onSubmit={onSubmitMock}/>)
        const name = "Ajaydeep"
        const nameInput = screen.getByLabelText("Name")
        const submitButton = screen.getByText("Submit")

        await user.clear(nameInput)
        await user.click(submitButton)

        expect(onSubmitMock).not.toHaveBeenCalled()

        await user.type(nameInput, name)
        await user.click(submitButton)

        expect(onSubmitMock).toHaveBeenCalledOnce()
        expect(onSubmitMock).toHaveBeenCalledWith(name)

    })
})