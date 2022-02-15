const mongoose = require('mongoose')
const autopopulate = require('mongoose-autopopulate')
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  bio: String,
  photos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Photo',
      autopopulate: true,
    },
  ],
  boats: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Boat',
      autopopulate: true,
    },
  ],

  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Photo',
    },
  ],
  createdAt: {
    type: Date,
    default: new Date(),
  },
})

class User {
  async addPhoto(photo) {
    this.photos.push(photo)
    await this.save()
  }
  // addBoat must be added

  async addBoat(boat) {
    this.boats.push(boat)
    await this.save()
  }

  async likePhoto(photo) {
    this.likes.push(photo)
    photo.likedBy.push(this)

    await photo.save()
    await this.save()
  }
}

userSchema.loadClass(User)
userSchema.plugin(autopopulate)
userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email',
})

module.exports = mongoose.model('User', userSchema)
