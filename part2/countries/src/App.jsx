import { useState,useEffect } from "react"
import axios from "axios"

const Display = ({countries}) => {
  const [Data, setData] = useState(null)
  console.log('show display')
  if(countries){
    if (countries.length === 0)
      return (
        <p>no matches</p>
    )
    if(countries.length >10)
      return (
        <p>Too many matches, specify another filter</p>
      )
    if(countries.length >1)
      return(
        <ul>
          {countries.map(country => 
            <li key={country}>{country}</li>
          )}
        </ul>
      )
    if(countries.length === 1) {
      const country = countries[0]
      axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`)
      .then(res => setData(res.data))
        console.log('Data',Data)
        return (
          <>
            <h3>name</h3>
            <p>capital</p>
            <p>area</p>
            <strong>languages</strong>
            <ul>
            </ul>
          <img src="" alt="" sizes="100" srcset="" />
          </>
        )
    }
  }
  else{
    return (
      <p>search to find country</p>
    )
  }
}
function App() {
  const [filter, setFilter] = useState(null)
  const [countries, setCountries] = useState('')
  
  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all')
    .then(res => {
      const Data = res.data.map(country => country.name.common)
      setCountries(Data)
      console.log('data ready')
    })
  }, [])
  // useEffect(()=> {
  //   console.log('use effect filter run')
  //   if(filter){

  //   }
  // },[filter])
  const handleSearch = (event) => {
    event.preventDefault()
    const search = event.target.value
    setFilter(countries.filter(country => country.toLowerCase().includes(search)))
    // setFilter(event.target.value)
  }
  return (
    <>
      <p>find countries <input onChange={handleSearch} type="text" /></p>
      <Display countries={filter}/>
    </>
  )
}

export default App
