const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const boatSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  age: {
    type: Number,
  },

  length: {
    type: Number,
  },

  cabins: {
    type: Number,
  },

  location: {
    type: String,
  },

  likedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      autopopulate: true,
    },
  ],
  description: String,
})

boatSchema.plugin(autopopulate)
module.exports = mongoose.model('Boat', boatSchema)
