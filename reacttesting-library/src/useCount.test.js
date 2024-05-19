import { renderHook, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import {useCount} from "./useCount";

describe("#useCount",()=>{
    it("should increment and decrement the count when the funcs are called",()=>{
        //here our useCount hook is a custom hook so we are using the below approach, otherwise we could have just 
        // const {result} = renderHook(()=>hookname)

        const {result} = renderHook(({initialCount})=>useCount(initialCount),
    {
        initialProps:{initialCount:0},
    })
    expect(result.current.count).toBe(0)

    act(()=>{
        result.current.incrementCount()
    })
    expect(result.current.count).toBe(1)

    act(()=>{
        result.current.decrementCount()
    })
    expect(result.current.count).toBe(0)
    })
})