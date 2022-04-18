const pokemonInfoModel = require('./model')

/* routes */
module.exports = function pokemonInfo(app) {

  app.get('/pokemoninfo', function (req, res) {
    pokemonInfoModel.list().then(results => {
      res.send(results)
    })
  })
  app.get('/pokemoninfo/:id', function (req, res) {
    const {id} = req.params
    pokemonInfoModel.get(id).then(results => {
      res.send(results)
    })
  })
}
