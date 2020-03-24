const express = require('express')
const app = express()
const Joi = require('joi')
app.use(express.json())

workshops = [
    {id: 1, name: 'workshop1'},
    {id: 2, name: 'workshop2'},
    {id: 3, name: 'workshop3'}
]


// Get routes


app.get('/', (req, res) => {
    res.send('Hello World')
})

app.get('/api/workshops', (req, res) => {
    res.send(workshops)
})

app.get('/api/workshops/:id', (req, res) => {
    const workshop = workshops.find(w => parseInt(req.params.id) === w.id)
    if (!workshop) return res.status(404).send("The requested workshop was not found")
    res.send(workshop)
})

// Post request
app.post('/api/workshops', (req, res) => {
    
    const { error } = validateCourse(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    workshop = {
        id: workshops.length + 1,
        name: req.body.name
    }
    workshops.push(workshop)
    res.send(workshops)
})

validateCourse = workshop => {
    const schema = {
        name : Joi.string().min(3).required()
    }
    return Joi.validate(workshop, schema)
}



app.listen(3000)




