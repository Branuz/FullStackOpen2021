import React, { useState } from 'react'

const Statistics = (props) => { 
 const good = props.good
 const bad = props.bad
 const neutral = props.neutral
 const all = good+bad+neutral
 const positive = good/all
 const average = (good-bad)/all


 if(all === 0){
 
   return(
     <h3>No feedback given</h3>
   )
 }
  
 return (

  <table >
    <tbody>
    <StatisticLine text="Good" value={good}/>
    <StatisticLine text="Bad" value={bad}/>
    <StatisticLine text="Neutral" value={neutral}/>
    <StatisticLine text="All" value={all}/>
    <StatisticLine text="Average" value={average}/>
    <StatisticLine text="Positive" value={positive}/>
    </tbody>
  </table>
  )
}
const StatisticLine = (props) => {
  if(props.text==="Positive"){
    return(
      <tr>
        <th>{props.text}:</th>
        <td>{props.value} %</td>
    </tr>
    )
  }
  return(
    <tr>
      <th>{props.text}:</th>
      <td>{props.value}</td>
    </tr>
  )
}

const Button = (props) =>{


  return (
  <button onClick={props.action}>{props.effect}</button>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = () => {setGood(good+1)}
  const addBad = () => {setBad(bad+1)}
  const addNeutral = () => {setNeutral(neutral+1)}

  return (
    <div>
      <h1>give feedback</h1>
      <Button action={addGood} effect="good"/>
      <Button action={addNeutral} effect="neutral"/>
      <Button action={addBad} effect="bad"/>
      <h1>Statistics</h1>
       <Statistics good= {good} bad= {bad} neutral= {neutral}/>
    </div>
  )
}


export default App