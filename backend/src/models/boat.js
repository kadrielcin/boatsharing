const mongoose = require('mongoose')

const boatSchema = new mongoose.Schema({
  filename: String,
  likedBy: [],
})
class Boat {
  constructor(filename) {
    this.filename = filename
    this.likedBy = []
  }
}

module.exports = mongoose.model('Boat', boatSchema)
