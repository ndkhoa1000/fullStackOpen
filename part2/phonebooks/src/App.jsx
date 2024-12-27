import { useEffect, useState } from 'react'
import PersonService from './services/persons'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notification'
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterTerm, setFilterTerm] = useState('')
  const [filter, setFilter] = useState(persons)
  const [message,setMessage] = useState({status:'0',content:null})

  const handleNewNameChange = (event) => {
    setNewName(event.target.value)
  }
  const handleNewNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleFilterChange = (event) => {
    setFilterTerm(event.target.value)
  }
  const personToFilterHook = () => {
    if(filterTerm){
      const newPersons = persons.filter(person => 
        person.name.toLowerCase().includes(filterTerm.toLowerCase())
      )
      setFilter(newPersons)
    } else {
      setFilter(persons)
    }
  }
  useEffect(() => {
    PersonService.getAll()
    .then(intialPerson =>{
      setPersons(intialPerson)
      setFilter(intialPerson)
    })
    .catch(err => {
      console.log('failed to fetch persons', err)
      setMessage({
        status:'err',
        content:'Failed to fetch data from server'
      })
    })
  },[])
    
  useEffect(personToFilterHook,[filterTerm,persons])
//support function for handleSubmit()

  const handleSubmit = (event) => {
    event.preventDefault()
    let caseSubmit = 'create'
    //case: update
    persons.map(person => {
      if (person.name === newName){
        caseSubmit = 'update'
        const replace = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
        if(replace){
          const updatePerson = {name:newName,number:newNumber}
          PersonService.update(person.id,updatePerson)
          .then(updatePerson => {
            setPersons(persons.map(person => person.id == updatePerson.id? updatePerson: person))
            setMessage({status:'success',
              content:`updated ${updatePerson.name}`
            })
            setTimeout(()=>{
              setMessage({status:'0',content:null})
            },5000)
          })
          .catch((error) => {
            setMessage({
              status: 'error',
              content: `Failed to update ${person.name}`,
            })
            setTimeout(() => setMessage({ status: '0', content: null }), 5000)
          })
        }
      }
    })
    //case: create
    if(caseSubmit =='create'){
      const newPerson = {name:newName,number:newNumber}
      PersonService.create(newPerson)
      .then(PersonData => {
        const updatePersons = [...persons, PersonData]
        setPersons(updatePersons)
        setFilter(updatePersons)
        
        setMessage({
          status:'success',
          content:`Added ${PersonData.name}`
        })
        setTimeout(()=>{setMessage({status:'0',content:null})},5000)
      })
    }
    setNewName('');
    setNewNumber('');
  }

  const handleRemove = (person) => {
    const remove = window.confirm(`Delete ${person.name}?`)
    if(remove){
      PersonService.remove(person.id)
      .then(() =>{
        const updatePersons = persons.filter(p => p.id !== person.id) 
        setPersons(updatePersons)
        setFilter(updatePersons)
        setMessage({
          status: 'success',
          content: `Deleted ${person.name}`,
        })
        setTimeout(() => setMessage({ status: '0', content: null }), 5000)
      })
      .catch((error) => {
        setMessage({
          status: 'error',
          content: `Failed to delete ${person.name}`,
        })
        setTimeout(() => setMessage({ status: '0', content: null }), 5000)
      })
    }
  }
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification status={message.status} content={message.content}/>
      <Filter onChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm 
        onNameChange={handleNewNameChange}
        onNumberChange={handleNewNumberChange}
        onSubmit={handleSubmit}
        nameValue={newName}
        numberValue={newNumber}
      />
      <h2>Numbers</h2>
       <Persons persons={filter} onRemove={handleRemove}/>
    </div>
  )
}

export default App