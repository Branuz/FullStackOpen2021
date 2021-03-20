import React, { useState } from 'react'

let randomNumber = 0

const App = () => {
  const numberGenerator = (props) =>{
    randomNumber = Math.floor(Math.random() * 6)
    setSelected(randomNumber)
}
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes, insertVotes] = useState(new Array(anecdotes.length).fill(0));


  const handelVote = () =>{
    const copyVotes = [...votes];
    copyVotes[selected] += 1
    insertVotes(copyVotes) 
    console.log(votes)
  }

  const checkMax = () =>{
    
    return Math.max(...votes)
  }

  const mostVoted = () =>{
    var i=0
    for(i = 0; i < votes.length; i++){
      if(votes[i]===checkMax()){
        break
      }
    }
    return (i)
    }
    
  
  return (
    <div>
      <h1>Anectode of the day</h1>
      {anecdotes[selected]}
      <p>Has {votes[randomNumber]} votes</p>
     <p>
       <button onClick = {handelVote}>vote</button> 
       <button onClick ={numberGenerator}>next anectode</button>
     </p> 
     <h1>Anectode with most votes</h1>
     {anecdotes[mostVoted()]}
     <p>Has {checkMax()} votes</p>
    </div>
  )
}

export default App