import { useEffect, useState } from 'react'
import axios from 'axios'
import PersonService from './services/persons'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([]) 
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
  useEffect(() => {
    PersonService.getAll()
    .then(intialPerson =>
      setPersons(intialPerson)
    )},[])
    
  useEffect(personToFilterHook,[filterTerm,persons])

  const handleSubmit = (event) => {
    event.preventDefault()
    persons.map(person => {
      if (person.name === newName){
        const replace = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
        if(replace){
          const updatePerson = {name:newName,number:NewNumber}
          PersonService.update(person.id,updatePerson)
          .then(update => 
            setPersons(persons.map(person => person.id == update.id? update: person))
          )
        }
      }
      else{
        const newPerson = {name:newName,number:NewNumber}
        PersonService.create(newPerson)
        .then(PersonData => {
          setPersons([...persons, PersonData])
        })
      }
    })
    setNewName('');
    setNewNumber('');
  }

  const handleRemove = (person) => {
    const remove = window.confirm(`Delete ${person.name}?`)
    if(remove){
      PersonService.remove(person.id)
      .then(hidden => 
        setPersons(persons.filter(p => p.id !== hidden.id))
      )
    }
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
       <Persons persons={filter} onRemove={handleRemove}/>
    </div>
  )
}

export default App