/* simple middleware tech */
const express = require('express')
const app = express()

/* This is just middleware_redirect: <url> in package.json*/
const middlewareRedirect = process.env.npm_package_middlewareRedirect
app.get('*', (req, res) => {
  return res.redirect(`https://${middlewareRedirect}${req.url}`)
})

app.listen(80, () => {
  console.log('Now intercepting traffic from http requests.')
})
