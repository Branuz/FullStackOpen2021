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

  const Total = (props) =>{
    
    const total = props.course.reduce( (x, y) => {
        return x + y.exercises
      },0)

    return (
      <h3>Number of exercises {total}</h3>
    )
  }

const Course = (props) =>{
    
return(
 props.course.map(x =>{

      return(
        <div key={x.id}>
            <Header course={x.name}/>
            <Content name={x.parts}/>
            <Total course ={x.parts}/>
        </div>
        )
    })
)
}

export default Course