import React, { useState, useEffect } from 'react'
import axios from 'axios'
import serverConnector from "./components/serverConnector"
import './index.css'



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

         props.setSuccessMessage("Deleted " +x.name)
         setTimeout(()=>{
           props.setSuccessMessage(null)
         },5000)
         
      }
    }}>delete</button></p>)
  )
}

const Notification = ({ message }) => {
  
  if (message === null) {
    return null
  }

  return (
    <div className="success">
      {message}
    </div>
  )
}
const ErrorNotification = ({ message }) => {
  
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])

  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [ newSearch, setSearch ] = useState('')
  const [ searchStatus, setStatus ] = useState(true)
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)




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
      

     const t= serverConnector
        .update(user[0].id, changedNote)
        .then(response => {
          setPersons(persons.map(note => (note.id !== user[0].id ? note : response)))
        }).catch(error =>{
          
          setErrorMessage(user[0].name +" was already removed from server")
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          return error
        })
        
        const checkSuccess = () => {
          t.then((a) => {
            if([a][0]===undefined){
              setSuccessMessage("Number changed for " +user[0].name)
              setTimeout(()=>{
                setSuccessMessage(null)
              },5000)
            }
          })
        }

    checkSuccess()
}
    }
    else{
    serverConnector.create(userObject)
    .then(returnedNote => {
      setPersons(persons.concat(returnedNote))
      setNewName("")
    })
    setSuccessMessage(<div>Added {userObject.name}</div>)
    setTimeout(()=>{
      setSuccessMessage(null)
    },5000)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
        <Notification message={successMessage} />
        <ErrorNotification message={errorMessage} />
        <Filter setSearch={setSearch} setStatus={setStatus}/>
      <h2>add a new</h2>
        <FormSetup  setNewName={setNewName} setNewPhone={setNewPhone} addName={addName} avain={persons.length+1}  />
      <h2>Numbers</h2>
       <Persons searchStatus={searchStatus} persons={persons} newSearch={newSearch} setPersons={setPersons} setNewName={setNewName} setSuccessMessage={setSuccessMessage}/>
    </div>
  )
}

export default App