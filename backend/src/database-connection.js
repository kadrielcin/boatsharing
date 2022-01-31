const mongoose = require('mongoose')

const username = process.env.MONGODB_USERNAME
const password = process.env.MONGODB_PASSWORD
const dbName = process.env.MONGODB_DATABASE
let connectionString = process.env.MONGODB_CONNECTION_STRING

if (!connectionString) {
  connectionString = `mongodb+srv://${username}:${password}@cluster0.knvjh.gcp.mongodb.net/${dbName}?retryWrites=true&w=majority`
}

mongoose.set('debug', true)

mongoose
  .connect(connectionString, {
//`mongodb+srv://${username}:${password}@cluster0.oiquu.mongodb.net/${dbName}?retryWrites=true&w=majority`,
// `mongodb+srv://root:84mJaOirQdQW6hmz@cluster0.oiquu.mongodb.net/Cluster0?retryWrites=true&w=majority`,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
  .then(() => console.log('connection established'))
  .catch(console.log)
