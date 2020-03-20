const express = require('express')
const app = express()

workshops = [
    {id: 1, name: 'workshop1'},
    {id: 2, name: 'workshop2'},
    {id: 3, name: 'workshop3'}
]


// Get routes


app.get('/', (req, res) => {
    res.send('')
})

app.get('/workshops', (req, res) => {
    res.send(workshops)
})

app.get('/workshops/:id', (req, res) => {
    
})


app.listen(3000)