import React from 'react'

const ColorChanger = ({color,setColor}) => {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
        <input 
            type='text'
            placeholder='Enter Colour'
            value = {color}
            onChange={(e) => setColor(e.target.value)}
        />
    </form>
  )
}

export default ColorChanger