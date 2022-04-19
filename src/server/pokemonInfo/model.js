/* Has direct access and "models" functionality of the db */

const dbDriver = require('../driver')
const {ObjectId} = require('mongodb')
const dbName = 'pokemon-evs-db'
const dbCollection = 'pokemon-info'

const pokemonInfo = {}

pokemonInfo.list = () => {
  return dbDriver(dbName).then(
    db => {
      return db.collection(dbCollection).find().toArray().then(
        res => res
      ).catch(
        err => {throw new Error(err)}
      )
    }
  ).catch(
    err => {throw new Error(err)}
  )
}

pokemonInfo.get = id => {
  return dbDriver(dbName).then(
    db => {
      return db.collection(dbCollection).findOne({_id: ObjectId(id)}).then(
        res => res
      ).catch(
        err => {throw new Error(err)}
      )
    }
  ).catch(
    err => {throw new Error(err)}
  )
}

module.exports = pokemonInfo
