import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', phone: '040-123456' },
    { name: 'Ada Lovelace', phone: '39-44-5323523' },
    { name: 'Dan Abramov', phone: '12-43-234345' },
    { name: 'Mary Poppendieck', phone: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [ newSearch, setSearch ] = useState('')
  const [ searchStatus, setStatus ] = useState(true)

  const addName = (event) =>{
    event.preventDefault()
    const userObject = {
      name: newName,
      phone: newPhone
    }
    const contains = persons.map(x => x.name===newName)
 
    
    if(contains.includes(true)){
      alert(`${newName} is already added to phonebook`)
    }else{
    setPersons(persons.concat(userObject))
    setNewName("")
    }
  }

  const notesToShow = searchStatus
  ? persons
  : persons.filter(x => x.name.includes(newSearch))


  return (
    <div>
      <h2>Phonebook</h2>
      <div>filter show with<input onChange={(x) =>{
        setSearch(x.target.value)
        setStatus(false>0)
        }}/></div>
      <h2>add a new</h2>
      <form id="myForm" onSubmit={addName}>
        <div>name: <input onChange={(x) => setNewName(x.target.value) }/></div>
        <div>phone: <input onChange={(x) =>setNewPhone(x.target.value) }/></div>
        <div>
          <button type="submit" onClick={()=>document.getElementById("myForm").reset()}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {notesToShow.map(x =><p key={x.name}> {x.name} {x.phone}</p>)}
    </div>
  )

}

export default App