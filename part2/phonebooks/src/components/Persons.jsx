import React from 'react'

export default function Persons({persons,onRemove}) {
  return (
    <div>
        {persons.map(person =>
            <p 
            key={person.id}>{person.name} {person.number} 
            <button key= {person.id} onClick={()=> onRemove(person)}>delete</button>
            </p>
        )}
    </div>
  )
}
