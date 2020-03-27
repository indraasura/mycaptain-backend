const express = require('express')
const app = express()
const Joi = require('joi')
app.use(express.json())

workshops = [
    {id: 1, name: 'workshop1'},
    {id: 2, name: 'workshop2'},
    {id: 3, name: 'workshop3'}
]

app.set('view-engine', 'ejs')

// Get routes


app.get('/', (req, res) => {
    res.render('home.ejs')
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


// Put request
app.put('/api/workshops/:id', (req, res) => {
    // requested workshop exists?
    const workshop = workshops.find(w => parseInt(req.params.id) === w.id)
    if (!workshop) return res.status(404).send("The requested workshop was not found")
    // check the req body to see if the entered name is valid or not
    const { error } = validateCourse(req.body)
    if(error) return res.status(400).send(error.details[0].message)
    // update the workshop's name
    workshop.name = req.body.name
    // return to the user
    res.send(workshops)
})

// Delete request
app.delete('/api/workshops/:id', (req, res) => {
    const workshop = workshops.find(w => parseInt(req.params.id) === w.id)
    if (!workshop) return res.status(404).send("The requested workshop was not found")
    const index = workshops.indexOf(workshop)
    workshops.splice(index, 1)
    res.send(workshops)
})

validateCourse = workshop => {
    const schema = {
        name : Joi.string().min(3).required()
    }
    return Joi.validate(workshop, schema)
}



app.listen(3000)




