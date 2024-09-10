import { useState,useEffect } from "react"
import axios from "axios"

const Display = ({countries,dataReady}) => {
  const [Data, setData] = useState(null)
  // console.log('countries', countries)
  // console.log('Data', Data)
  useEffect(() => {
    if(countries && countries.length === 1){
      axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${countries[0]}`)
      .then(res => setData(res.data))}
    else setData(null)
  },[countries])

  if(!dataReady)
    return (<p> waiting for data ...</p>)
  else
    return countries && countries.length ===1 ? (
            !Data ? (<p>waiting for data ...</p>)
            :
            (
              <>
                <h3>{Data.name.common}</h3>
                <p>capital {Data.capital}</p>
                <p>area {Data.area} km</p>
                <strong>languages</strong>
                <ul>
                  {Object.values(Data.languages).map(language => (
                    <li key={language}>{language}</li>
                  ))}
                </ul>
                <img src={Data.flags.png} alt={Data.name.common} sizes="100" />
              </>
            )
        )
      : countries && countries.length >10 ? (
        <p>Too many matches, specify another filter</p>
      )
      : countries && countries.length >1 ? (
        <ul>
          {countries.map(country => 
            <li key={country}>{country} <button>show</button></li>
          )}
        </ul>      
      )
      : (
        <p>Search to find country</p>
      )  
}
function App() {
  const [filter, setFilter] = useState(null)
  const [countries, setCountries] = useState(null)
  
  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(res => {
      const Data = res.data.map(country => country.name.common)
      setCountries(Data)
      console.log('data ready')
    })
  }, [])
  const handleSearch = (event) => {
    event.preventDefault()
    const search = event.target.value
    setFilter(countries.filter(country => country.toLowerCase().includes(search)))
  }
  return (
    <>
      <p>find countries <input onChange={handleSearch} type="text" /></p>
      <Display countries={filter} dataReady={countries}/>
    </>
  )
}

export default App
