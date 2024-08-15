import { useState } from 'react'

const Button = ({onClick,text}) => {
  return (
      <button onClick={onClick}>{text}</button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(Array(anecdotes.length).fill(0))

  const random = (arr) => {
    return Math.floor(Math.random() * arr.length)
  }
  const handleVote = (selected) => {
    const copy = [...vote]
    copy[selected] +=1
    setVote(copy)
  }
  
  return (
    <div>
      <h3>Anecdote of the day</h3>
      <p>{anecdotes[selected]}</p>
      <p>has {vote[selected]} votes</p>
      <Button onClick={() => setSelected(random(anecdotes))} text='next anecdotes'></Button>
      <Button onClick={() => handleVote(selected)} text='vote'></Button>
      <h3>anecdote with most votes</h3>
      <p>{anecdotes[vote.indexOf(Math.max(...vote))]}</p>
      <p>has {vote[vote.indexOf(Math.max(...vote))]} votes</p>
    </div>
  )
}

export default App