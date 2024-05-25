import {describe, it, expect, afterEach} from "vitest"
import {renderHook, act} from "@testing-library/react"
import {useLocalStorage} from "./useLocalStorage"

describe("#useLocalStorage", () => {

    function renderLocalStorageHook(key, initialvalue){
        return renderHook(
            ({key, initialvalue})=>useLocalStorage(key, initialvalue),
            {
                initialProps: {key, initialvalue},
            }
        )
    }

    //clear the localstorage before each test, otherwise if we use any other value then "initialvalue" which we set in the first test, the tests will fail
    afterEach(()=>{
        localStorage.clear()
    })

    it("should utilize the initialvalue passed to the hook and store it in the localstorage", ()=>{
        const key = "key"
        const initialvalue = "initialvalue"
        const {result} = renderLocalStorageHook(key, initialvalue) // when the useLocalStorage hook is used, it returns an array with value and setValue 
    
        // console.log(result.current[])
        expect(result.current[0]).toBe(initialvalue)   // current[0] is the value
        expect(localStorage.getItem(key)).toBe(JSON.stringify(initialvalue)) 
    })

    it("should use the initialValue (function) passed to the hook and store it in the localstorage", ()=>{
        const key = "key"
        const initialValue = "initial2"

        const {result} = renderLocalStorageHook(key, ()=>initialValue)

        expect(result.current[0]).toBe(initialValue)
        expect(localStorage.getItem(key)).toBe(JSON.stringify(initialValue))
    })

    it("should update localStorage when setValue is called", ()=>{
        const key = "key"
        const initialValue = "initial"
        const {result} = renderLocalStorageHook(key, initialValue)

        const newValue = "new"
        
        //now  we will use act() to call the setvalue function

        act(()=> result.current[1](newValue))
        expect(result.current[0]).toBe(newValue)
        expect(localStorage.getItem(key)).toBe(JSON.stringify(newValue))
    })

    it("should clear localStorage when setValue is called with undefined", ()=>{
        const key = "key"
        const initialValue = "initial"
        const {result} = renderLocalStorageHook(key, initialValue)

        act(()=> result.current[1](undefined))

        expect(result.current[0]).toBeUndefined()

        expect(localStorage.getItem(key)).toBeNull()
    })

    it("should use the value in the localstorage it it exists", ()=>{
        const key = "key"
        const initialValue = "initial"
        const existingValue = "existing"

        localStorage.setItem(key, JSON.stringify(existingValue))

        const {result} = renderLocalStorageHook(key, initialValue)

        expect(result.current[0]).toBe(existingValue)
        expect(localStorage.getItem(key)).toBe(JSON.stringify(existingValue))
    })

})