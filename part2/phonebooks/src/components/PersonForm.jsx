import React from 'react'

export default function PersonForm({onNameChange, onNumberChange, onSubmit,nameValue, numberValue}) {
  return (
    <form>
        <div>
          name: <input onChange={onNameChange} value={nameValue}/>
        </div>
        <div>
          number: <input onChange={onNumberChange} value={numberValue}/>
        </div>
        <div>
          <button type="submit" onClick={onSubmit}>add</button>
        </div>
      </form>
  )
}
