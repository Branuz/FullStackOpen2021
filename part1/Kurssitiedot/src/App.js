import React from 'react'

const Header = (props) =>{
  return (
    <h1>{props.course}</h1>
  )
}
const Content = (props) =>{
  return(
    <div>
      <Part name={props.name} exercises = {props.exercises}/>
    </div>
  )
}


const Part = (props) =>{
  return (
  <p>{props.name} {props.exercises}</p>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content  name={part1} exercises ={exercises1}/>
      <Content  name={part2} exercises ={exercises2}/>
      <Content  name={part3} exercises ={exercises3}/>
      <Content  name="Number of exercises" exercises ={exercises1 + exercises2 + exercises3}/>
    </div>
  )
}

export default App