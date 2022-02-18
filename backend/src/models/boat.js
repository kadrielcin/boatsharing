const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const boatSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
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
