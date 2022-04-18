const { MongoClient, ServerApiVersion } = require('mongodb')

const config = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1
}

const uri = 'mongodb+srv://hero-profile-master:QrkR6T%24cAa%2385Md4@cluster0.m88bh.mongodb.net/Cluster0?retryWrites=true&w=majority'

module.exports = function driver(dbUri) {
  return MongoClient.connect(uri, config).then(
    client => client.db(dbUri)
  ).catch(
    err => {
      console.log(`There\'s been an error...\n ${err}`)
      return err
    }
  )
}
