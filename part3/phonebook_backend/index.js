const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()
app.use(cors())
app.use(express.json())
morgan.token('body', (req,res) => {
    return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
let data =[
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]
app.get('/',(req,res) => {
    res.send('connected')
})
app.get('/api/persons',(req,res) => {
    if(data)
        res.json(data)
})
app.get('/info',(req,res) => {
    const numOfPeople = data.length
    const date = new Date()
    const time = date.toUTCString()
    const timezone = date.getTimezoneOffset()
    res.send(
        `<p>Phonebook has info for ${numOfPeople} people 
        <br/>${time + timezone} (Eastern European Standard Time)</p>`
    )
})
app.get('/api/persons/:id', (req,res) => {
    const id = req.params.id
    person = data.find(person => person.id == id)
    if (person)
        res.json(person)
    else 
        res.status(404).end()
})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    data = data.filter(person => person.id !== id)
    res.json(data)
})
app.post('/api/persons',(req,res) => {
    const body = req.body
    if(!body.name || !body.number){
        return res.status(400).json({err:'the name or number is missing'})
    }
    const collision = data.find(person => person.name == body.name)
    if (collision){
        return res.status(400).json({err: 'name must be unique'})
    }
    const {name,number} = body
    const id = Math.round(Math.random()*10000).toString()
    const newContact = {"id": id,"name": name,"number":number}
    data = data.concat(newContact)
    console.log(data)
    res.status(200).json(newContact)
})
const PORT = process.env.PORT || 3000
app.listen(PORT)
console.log(`server running on port ${PORT}`)
