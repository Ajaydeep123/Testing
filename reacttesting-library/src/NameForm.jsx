import React, { useState } from 'react'


function NameForm({onSubmit}) {
    const [name, setName] = useState("")
    function handleSubmit(e){
        e.preventDefault()

        if(name === "") return

        onSubmit(name)
    }

  return (
    <form onSubmit={handleSubmit} >
        <label htmlFor="name">Name</label>
        <input
        id='name'
        name='name'
        value={name}
        onChange={e=>setName(e.target.value)}
        />
        <br/>
        <br/>
        <button>Submit</button>
    </form>
  )
}


export default NameForm