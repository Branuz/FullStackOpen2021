import React, { useState, useEffect } from 'react'
import axios from 'axios'

const FormSetup = (props) =>{
  return(
  <form key={props.avain} id="myForm" onSubmit={props.addName}>
  <div>name: <input onChange={(x) => props.setNewName(x.target.value) }/></div>
  <div>phone: <input onChange={(x) =>props.setNewPhone(x.target.value) }/></div>
  <div>
    <button type="submit" onClick={()=>document.getElementById("myForm").reset()}>add</button>
  </div>
</form>
  )
}

const Filter = (props) =>{
  return(
    <div>filter show with<input onChange={(x) =>{
      props.setSearch(x.target.value)
      props.setStatus(false>0)
      }}/></div>
  )
}

const Persons = (props) =>{
  const notesToShow = props.searchStatus
  ? props.persons
  : props.persons.filter(x => x.name.includes(props.newSearch))

  return(
    notesToShow.map(x =><p key={x.id}> {x.name} {x.number}</p>)
  )

}

const App = () => {
  const [persons, setPersons] = useState([])

  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [ newSearch, setSearch ] = useState('')
  const [ searchStatus, setStatus ] = useState(true)

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addName = (event) =>{
    event.preventDefault()
    const userObject = {
      name: newName,
      number: newPhone,
      id: persons.length+1
    }
    const contains = persons.map(x => x.name===newName)
    
    if(contains.includes(true)){
      alert(`${newName} is already added to phonebook`)
    }else{
    setPersons(persons.concat(userObject))
    setNewName("")
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter setSearch={setSearch} setStatus={setStatus}/>
      <h2>add a new</h2>
        <FormSetup  setNewName={setNewName} setNewPhone={setNewPhone} addName={addName} avain={persons.length+1}  />
      <h2>Numbers</h2>
       <Persons searchStatus={searchStatus} persons={persons} newSearch={newSearch}/>
    </div>
  )
}

export default App