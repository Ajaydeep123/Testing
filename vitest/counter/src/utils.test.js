import { describe,it, expect,vi, beforeEach, afterEach } from "vitest";
import {sum} from "./utils"
import { delayedFunc } from "./utils";
describe("#sum", ()=>{
    it("should add the numbers passed to it", ()=>{
        const a = 1
        const b = 2
        expect(sum(a,b)).toBe(a+b)
    })
    it("should add the numbers passed to it", ()=>{
        const a = 1
        const b = 4
        expect(sum(a,b)).toBe(a+b)
    })
})

// For primitive types (numbers, booleans, strings), both .toBe and .toEqual will work, as they compare the value

// For non-primitive types (objects, arrays), .toBe compares the reference, while .toEqual compares the values

/*
expect({}).toBe({})-> false
expect({}).toEqual({})  -> true 

*/

it("should call the passed in function after a delay",async ()=>{
    const func = vi.fn()
    await delayedFunc(func)
})
describe("#delayedFunc", ()=>{

    beforeEach(()=>{
        vi.useFakeTimers()
    })
    afterEach(()=>{
        vi.useRealTimers()
    })
    it("should call the passed in function after a delay, but here instantly",()=>{
        const func = vi.fn()
        delayedFunc(func)
        vi.runAllTimers()

        expect(func).toHaveBeenCalledOnce()
        expect(func).toHaveBeenCalledWith("sdfc")
    })
})
it("should call the passed in function after a delay",async ()=>{
    const func = vi.fn()
    await delayedFunc(func)
})