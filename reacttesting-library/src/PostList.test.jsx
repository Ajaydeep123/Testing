import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import PostList from "./PostList";
import {mockServer} from "../test-setup/mockServer";
import { HttpResponse, http} from 'msw'

// console.log(http)
describe("PostList Component", () => {
/*     it("should get a list of posts", ()=>{
        render(<PostList/>)
    }) 
This test will fail as we are not mocking the api call which is being made inside the PostList component
*/

        it("should get a list of posts", async ()=>{
            mockServer.use(
                http.get("https://jsonplaceholder.typicode.com/posts", ()=>{
                    return HttpResponse.json([
                            {id:1, title:"Hello World"},
                            {id:2, title:"Hello World 2"}
                        ])
                })
            )
            render(<PostList/>)

            expect(await screen.findByText("Hello World")).toBeInTheDocument()
        })
})