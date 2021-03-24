import React, { useState, useEffect } from 'react'
import axios from 'axios'
import serverConnector from "./components/serverConnector"

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
    notesToShow.map(x =><p key={x.id}> {x.name} {x.number} <button onClick={() =>{
      if(window.confirm("Delete "+x.name)){
        console.log(x.name + " deleted")

        serverConnector.deleteUser(x.id)
        .then(returnedNote => {
          props.setPersons(props.persons.filter(n => n.id !== x.id))
         })
      }
    }}>delete</button></p>)
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
    
    const user = persons.filter(x => x.name===newName)

    if(user.length===1){
      const data = persons.find(n => n.id === user[0].id)
      const changedNote = { ...data, number: newPhone, }
      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)){
        serverConnector
        .update(user[0].id, changedNote)
        .then(response => {
          setPersons(persons.map(note => (note.id !== user[0].id ? note : response)))
        })
      }
    }else{
    serverConnector.create(userObject)
    .then(returnedNote => {
      setPersons(persons.concat(returnedNote))
      setNewName("")
    })
    console.log("Added successfully")
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter setSearch={setSearch} setStatus={setStatus}/>
      <h2>add a new</h2>
        <FormSetup  setNewName={setNewName} setNewPhone={setNewPhone} addName={addName} avain={persons.length+1}  />
      <h2>Numbers</h2>
       <Persons searchStatus={searchStatus} persons={persons} newSearch={newSearch} setPersons={setPersons} setNewName={setNewName} />
    </div>
  )
}

export default App