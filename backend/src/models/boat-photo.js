const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')

const boatPhotoSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  /*likedBy: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      autopopulate: true,
    },
  ],
  description: String,*/
})

boatPhotoSchema.plugin(autopopulate)
module.exports = mongoose.model('BoatPhoto', boatPhotoSchema)
