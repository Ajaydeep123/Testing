import {describe, it, vi, expect} from "vitest"
// import { StateForm as Form } from "./StateForm.jsx"
import { RefForm as Form } from "./RefForm.jsx"

import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

describe("Form Component", ()=>{
    it("should call onSubmit when the form is valid with right data", async()=>{
        const onSubmitMock = vi.fn()
        const user = userEvent.setup()
        render(<Form onSubmit={onSubmitMock}/>)
        const email = "ajaydeep@gmail.com"
        const password = "Password123"

        await user.type(screen.getByLabelText("Email"), email)
        await user.type(screen.getByLabelText("Password"), password)
        await user.click(screen.getByText("Submit"))

        expect(screen.queryByTestId("email-error-msg")).not.toBeInTheDocument()
        expect(screen.queryByTestId("password-error-msg")).not.toBeInTheDocument()

        expect(onSubmitMock).toHaveBeenCalledOnce()
        expect(onSubmitMock).toHaveBeenCalledWith({email, password})

    })

    it("should show the email error when the email is invalid", async () => {
        const onSubmitMock = vi.fn();
        const user = userEvent.setup();
        render(<Form onSubmit={onSubmitMock} />);
        const email = "ajaydeepsinfvberviwr@gmmmail.com"; // invalid email
        const password = "Password123";

        await user.type(screen.getByLabelText("Email"), email);
        await user.type(screen.getByLabelText("Password"), password);
        await user.click(screen.getByText("Submit"));

        // Debugging
        // await screen.debug(); // Shows the current state of the DOM

        
        expect(screen.getByTestId("email-error-msg")).toBeInTheDocument();
        

        expect(onSubmitMock).not.toHaveBeenCalled();
    });

    it("should show the password error when the password is invalid", async () => {
        const onSubmitMock = vi.fn();
        const user = userEvent.setup();
        render(<Form onSubmit={onSubmitMock} />);
        const email = "ajaydeepsingh@gmail.com";
        const password = "password123";

        await user.type(screen.getByLabelText("Email"), email);
        await user.type(screen.getByLabelText("Password"), password);
        await user.click(screen.getByText("Submit"));

        // Debugging
        // await screen.debug(); // Shows the current state of the DOM

        expect(screen.getByTestId("password-error-msg")).toBeInTheDocument();
        expect(onSubmitMock).not.toHaveBeenCalled();
    });

    it("should update the error message while typing after the first submit", async ()=>{
        const onSubmitMock = vi.fn();
        const user = userEvent.setup();
        render(<Form onSubmit={onSubmitMock} />);
        const email = "ajaydeepsingh@gmail.com";
        const passwordInput = screen.getByLabelText("Password");

        await user.type(screen.getByLabelText("Email"), email);
        await user.type(passwordInput, "123456");
        await user.click(screen.getByText("Submit"));

        const passwordErrorMsg = screen.getByTestId("password-error-msg");

        expect(passwordErrorMsg).toBeInTheDocument();
        expect(onSubmitMock).not.toHaveBeenCalled();
        await user.clear(passwordInput)
        await user.type(passwordInput,"Password1234")
        expect(passwordErrorMsg).not.toBeInTheDocument()     
    });

}) 
