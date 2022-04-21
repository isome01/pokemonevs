const fs = require('fs')

const https = require('https')
const http = require('http')

const key  = fs.readFileSync(process.env.npm_package_privKey)
const cert = fs.readFileSync(process.env.npm_package_cert)

const credentials = {key, cert}

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

// create our http and https servers
const httpServer = http.createServer(app)
const httpsServer = https.createServer(credentials, app)

httpServer.listen(5001)
httpsServer.listen(5443)
