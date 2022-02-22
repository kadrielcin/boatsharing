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
  boatPhotos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'BoatPhoto',
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
      ref: 'Boat',
    },
  ],
  createdAt: {
    type: Date,
    default: new Date(),
  },
})

class User {
  async addBoatPhoto(boatPhoto) {
    this.boatPhotos.push(boatPhoto)
    await this.save()
  }

  async addBoat(boat) {
    this.boats.push(boat)
    await this.save()
  }

  async likeBoat(boat) {
    this.likes.push(boat)
    boat.likedBy.push(this)

    await boat.save()
    await this.save()
  }
}

userSchema.loadClass(User)
userSchema.plugin(autopopulate)
userSchema.plugin(passportLocalMongoose, {
  usernameField: 'email',
})

module.exports = mongoose.model('User', userSchema)
