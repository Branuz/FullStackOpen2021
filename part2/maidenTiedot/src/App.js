import React, { useState, useEffect } from 'react'
import axios from 'axios'

const api_key = process.env.REACT_APP_API_KEY 

const ReturnWeather =(props) =>{
  const [weather, setWether] = useState("")

  const info = 'http://api.weatherstack.com/current?access_key='+api_key+'&query='+props



 const tester =() =>{
    axios
      .get(info)
      .then(response => {
        setWether(response.data.current.temperature)
      })}

      
  useEffect(() => {
    axios
      .get(info)
      .then(response => {
        setWether(response.data.current.temperature)
      })
  }, [info])

  if (weather.current===undefined){
    tester()
  }


  return (weather)
}


const PrintWeather = (props) =>{

  const weather = ReturnWeather(props.city)

  return(
    <div>
      
      <h4>Temperature: {weather}</h4> 
    </div>
  )
}

const Country = (props) =>{


  return(
  props.list.map(x =>
    <div key={x.alpha3Code}>
       <h2>{x.name}</h2>
      <p>Capital: {x.capital}</p> 
      <p>Population: {x.population}</p> 
       <h3>Languages</h3>
       <ul>
         {x.languages.map(y => <li key={y.name}>{y.name}</li>)}
       </ul>
       <img style={{width:"100px", height:"100px"}} src={x.flag }alt="Flag" ></img> 
       <h3>Weather in {x.capital}</h3>
       <PrintWeather city={x.capital}/>
   </div>
   )
)
}

const SearchForm = (props) =>{
  const [ seachInfo, setSearch ] = useState('')
  const [ countryInfo, setCountry ] = useState([])
  
  const countries = props.data.filter(x => x.name.toLowerCase().includes(seachInfo))


 const Input = () => <form>Find countries: <input onChange={(x => setSearch(x.target.value.toLowerCase()))}/></form>

 if(countries.length===1){
   return(
     <>
     <form>Find countries: <input onChange={(x => setSearch(x.target.value.toLowerCase()))}/></form>
     <Country list={countries}/>
     </>
   )
 }
 if(Object.keys(countryInfo).length>0){
  return(
    <>
    <form>Find countries: <input onChange={(x => {
      if(Object.keys(countryInfo).length>0){
        setCountry([])
      }
      return (setSearch(x.target.value.toLowerCase()))})}/></form>
    <Country list={[countryInfo]}/>
    </>
  )
}


 if(countries.length>10){
   
   return(
    <>
    {Input()}
      Too many matches, specify another filter.
    </>
   )
 }

return(
   <>
   {Input()}
    {countries.map(x =>
    <div key={x.alpha3Code}>
     <p >{x.name} <button onClick={(y=> {setCountry(x)})}>show</button></p>
    </div>
    )}
   </>
   
)
}

const App = () => { 
  const [data, setData] = useState([])

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setData(response.data)
      })
  }, [])

  return (
    <div>
      <SearchForm data={data}/>
    </div>
  )
}

export default App