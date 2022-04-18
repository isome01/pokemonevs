const BACKEND_PORT = process.env.BACKEND_PORT || 5002

const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const bodyParser = require('body-parser')

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(helmet())

// Assign routes to service
require('./pokemonInfo')(app)

app.listen(BACKEND_PORT, function() {
  console.log(`REST service listening at localhost on port ${BACKEND_PORT}.`)
})
