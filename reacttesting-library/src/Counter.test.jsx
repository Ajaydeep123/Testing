import {describe, it, expect} from "vitest"
import Counter from "./Counter.jsx"
import {render, screen} from "@testing-library/react"
import userEvent from "@testing-library/user-event"

describe("Counter Component", ()=>{
    it("should render the initial count", ()=>{
        render (<Counter initialCount={3}/>)
        // console.log(screen.getByText("3"))
        // screen.debug()
        // expect(screen.getByText("3")).toBeInTheDocument()
        expect(screen.getByTestId("count")).toHaveTextContent("3")  //useful in situation when the element in not directly accessible, we then use data-testid for accessing it. 
        /* 
        .get will fail in case when the element which we are looking for does not exists
        .query will return null in case when the element which we are looking for does not exists, thereby it is 
        useful to check for the existence of elements or values
        .find is useful in the cases of async calls and animations.
        */
    })


    it("should increment and decrement the count when clicking the +/- buttons", async ()=>{
        const user = userEvent.setup()
        render (<Counter initialCount={0}/>)

        const incrementButton = screen.getByText("+")
        const decrementButton = screen.getByText("-")

        await user.click(incrementButton)
        expect(screen.getByText("1")).toBeInTheDocument()

        await user.click(decrementButton)
        expect(screen.getByText("0")).toBeInTheDocument()
})

})

