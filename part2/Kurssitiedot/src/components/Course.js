import React from 'react'

const Header = (props) =>{
    return (
      <h1>{props.course}</h1>
    )
  }
 
  const Content = (props) =>{
     
    return(
        props.name.map(x =>  <div key= {x.id}>
             <Part name = {x.name} exercises={x.exercises}/></div> )
    )
  }
  
  
  const Part = (props) =>{
    return (
    <p>{props.name} {props.exercises}</p>
    )
  }

const Course = (props) =>{
    
    return(
        <>
        <Header course={props.course.name}/>
        <Content name={props.course.parts}/>
        </>
    )
}

export default Course