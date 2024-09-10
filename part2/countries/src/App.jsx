import { useState,useEffect } from "react"
import axios from "axios"

const Display = ({countries,search}) => {
  const [countryFilter, setCountryFilter] = useState(null)
  const [countryData, setCountryData] = useState(null)
  const [weather,setWeather] = useState(null)

  useEffect(() => {  // setFilter base on search
    if(countries) 
      setCountryFilter(countries.filter(country => country.toLowerCase().includes(search)))
    else setCountryFilter(null)
  },[search])

  useEffect(() => { //if only one country then fetch data
    if(countryFilter && countryFilter.length === 1){
      axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${countryFilter[0]}`)
      .then(res => {
        setCountryData(res.data)
        // console.log('countryData', countryData)
      })
    }
    else setCountryData(null)
  },[countryFilter])

  useEffect(() => {
      if(countryData){
        const lat = countryData.latlng[0]
        const lng = countryData.latlng[1]
        const apiKey = import.meta.env.VITE_SOME_KEY
        axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${apiKey}&units=metric`)
        .then(res => {
          setWeather(res.data)
          // console.log('weather',weather)
        })
      }
      else setWeather(null)
  },[countryData])

  if(!countries)
    return (<p> waiting for data ...</p>)
  if(countries && countryFilter)
    return countryFilter.length ===1 ? (
            !(countryData && weather) ? (<p>waiting for data ...</p>)
            :
            (
              <>
                <h3>{countryData.name.common}</h3>
                <p>capital {countryData.capital}</p>
                <p>area {countryData.area} km</p>
                <strong>languages</strong>
                <ul>
                  {Object.values(countryData.languages).map(language => (
                    <li key={language}>{language}</li>
                  ))}
                </ul>
                <img src={countryData.flags.png} alt={countryData.name.common} sizes="100" />
                <h3>Weather in {countryData.capital}</h3>
                <p>temperature {weather.main.temp} Celcius</p>
                <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
                <p>wind {weather.wind.speed} m/s</p>
              </>
            )
        )
      : countryFilter.length >10 ? (
        <p>Too many matches, specify another filter</p>
      )
      : countryFilter.length >1 ? (
        <ul>
          {countryFilter.map(country => 
            <li key={country}>{country} <button onClick={() => setCountryFilter([country])}>show</button></li>
          )}
        </ul>      
      )
      : (
        <p>Search to find country</p>
      )  
}
function App() {
  const [search, setSearch] = useState(null)
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
    setSearch(event.target.value)
  }
  return (
    <>
      <p>find countries <input onChange={handleSearch} type="text" /></p>
      <Display search={search} countries={countries}/>
    </>
  )
}

export default App
