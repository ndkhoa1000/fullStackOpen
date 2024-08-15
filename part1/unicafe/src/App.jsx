import { useState } from 'react'

const Button = ({onClick,text}) => {
  return ( 
    <button onClick={onClick}>{text}</button>
  )
}
const StatisticLine = ({text, number}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{number}</td>
    </tr>
  )
}
const Statistics = ({good,neutral,bad}) => {
  const all = bad+good+neutral
  return (
    all == 0 ? <p>No feedback given</p>
    :
    <>
      <h2>statistic</h2>
      <table>
        <tbody>
          <StatisticLine text='good' number={good}/>
          <StatisticLine text='neutral' number={neutral}/>
          <StatisticLine text='bad' number={bad}/>
          <StatisticLine text='all' number={all}/>
          <StatisticLine text='average' number={(good - bad)/all}/>
          <StatisticLine text='positive' number={(good/all*100) + '%'}/>
        </tbody>
      </table>
    </>
  )
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>give feedback</h2>
      <Button onClick={() => setGood(good + 1)} text='good'></Button>
      <Button onClick={() => setNeutral(neutral+1)} text='neutral'></Button>
      <Button onClick={() => setBad(bad+1)} text='bad'></Button>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App