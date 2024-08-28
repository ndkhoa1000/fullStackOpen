import { useEffect, useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'
const App = () => {
  const [persons, setPersons] = useState([
    // { name: 'Arto Hellas', number: '040-123456', id: 1 },
    // { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    // { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    // { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [NewNumber, setNewNumber] = useState('')
  const [filterTerm, setFilterTerm] = useState('')
  const [filter, setFilter] = useState(persons)

  const handleNewNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNewNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setFilterTerm(event.target.value)
  }
  const fetchHook = () => {
    axios.get('http://localhost:3001/persons')
    .then(res => {
      setPersons(res.data)
    })
  }
  const personToFilterHook = () => {
    const newPersons = persons.filter(person => 
      person.name.toLowerCase().includes(filterTerm.toLowerCase())
    )
      setFilter(newPersons)
  }
  useEffect(fetchHook,[])
  useEffect(personToFilterHook,[filterTerm,persons])

  const handleSubmit = (event) => {
    event.preventDefault()
    let collision = false
    persons.map(person => {
      if (person.name === newName){
        alert(`${newName} is already added to phonebook`)
        collision = true
      }
      if (person.number === NewNumber){
        alert(`${NewNumber} is already added to phonebook`)
        collision = true
      }
    })
    if(!collision){
      setPersons([...persons, {name:newName,number:NewNumber}])
      
    }
    setNewName('');
    setNewNumber('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm 
        onNameChange={handleNewNameChange}
        onNumberChange={handleNewNumberChange}
        onSubmit={handleSubmit}
        nameValue={newName}
        numberValue={NewNumber}
      />
      <h2>Numbers</h2>
       <Persons persons={filter}/>
    </div>
  )
}

export default App