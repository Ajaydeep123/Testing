import {expect, afterEach, beforeAll, afterAll} from "vitest"
import { cleanup } from "@testing-library/react"
import * as matchers from "@testing-library/jest-dom/matchers";
import { mockServer } from "./mockServer";

expect.extend(matchers)

beforeAll(()=>{
    mockServer.listen({onUnhandledRequest: "error"})
})

afterEach(()=>{
    cleanup()
    mockServer.resetHandlers()
})

afterAll(()=>{
    mockServer.close()
})

// jsdom doesnot support all browser functions, so it'll give error due to the use of scrollTo property that we used

// To resolve that we define a cutom property with same name and returns nothing, as we want to test our page not its scroll behavior
Object.defineProperty(window, "scrollTo", { value: () => {} })
