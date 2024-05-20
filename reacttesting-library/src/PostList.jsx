import React, { useEffect } from 'react'


function PostList() {
    const [posts, setPosts] = React.useState([])
    //fetch is not supported by msw library for the time being, so we will use axios instead.
    useEffect(()=>{
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then(res => res.json())
        .then(setPosts)
    },[])

  return (
    <ol>
        {posts.map(post =>(
            <li key={post.id}>{post.title}</li>
        ))}
    </ol>
  )
}

export default PostList