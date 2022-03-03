/* eslint-disable spaced-comment */
/* eslint-disable no-console */
const express = require('express')

const router = express.Router()
//const axios = require('axios')

//const describeImage = require('../lib/image-description')
//const downloadImage = require('../lib/download-image')
const User = require('../models/user')
const BoatPhoto = require('../models/boat-photo')
const Boat = require('../models/boat')

/* GET users listing. */
router.get('/', async (req, res) => {
  const query = {}

  if (req.query.name) {
    query.name = req.query.name
  }

  if (req.query.age) {
    query.age = req.query.age
  }

  res.send(await User.find(query))
})

/* POST create a user */
router.post('/', async (req, res) => {
  const userToCreate = {
    name: req.body.name,
    age: req.body.age,
  }

  const createdUser = await User.create(userToCreate)
  res.send(createdUser)
})

async function createBoatPhoto(filename) {
  const boatPhoto = await BoatPhoto.create({ filename })

  /*const picsumUrl = `https://picsum.photos/seed/${boatPhoto._id}/300/300`
  const pictureRequest = await axios.get(picsumUrl)
  boatPhoto.filename = pictureRequest.request.path

  const imagePath = await downloadImage(picsumUrl, filename)
  const description = await describeImage(imagePath)
  boatPhoto.description = description.BestOutcome.Description*/

  return boatPhoto.save()
}

router.get('/initialize', async (req, res) => {
  await User.deleteMany({})
  await Boat.deleteMany({})
  await BoatPhoto.deleteMany({})

  const kadri = new User({ name: 'kadri', age: 35, email: 'kadri@kadri.com' })
  await kadri.setPassword('test')
  await kadri.save()

  const serhat = new User({ name: 'serhat', age: 36, email: 'serhat@serhat.com' })
  await serhat.setPassword('test')
  await serhat.save()

  const baris = new User({ name: 'baris', age: 21, email: 'baris@baris.com' })
  await baris.setPassword('test')
  await baris.save()

  baris.bio = 'An awesome skipper'
  baris.save()

  const baturay1boatPhoto = await createBoatPhoto('baturay1boat.jpg')
  const doganay1boatPhoto = await createBoatPhoto('doganay1boat.jpg')
  const dolunay1boatPhoto = await createBoatPhoto('dolunay1boat.jpg')

  await baris.addBoatPhoto(baturay1boatPhoto)
  await kadri.addBoatPhoto(doganay1boatPhoto)
  await serhat.addBoatPhoto(dolunay1boatPhoto)

  const dolunay = await Boat.create({ name: 'Dolunay', age: 8, longness: 29, cabins: 2, location: 'Datca' })
  const doganay = await Boat.create({ name: 'Doganay', age: 7, longness: 35, cabins: 2, location: 'Marmaris' })
  const baturay = await Boat.create({ name: 'Baturay', age: 6, longness: 39, cabins: 4, location: 'Gocek' })

  await serhat.addBoat(dolunay)
  await kadri.addBoat(doganay)
  await baris.addBoat(baturay)

  console.log(baris)
  res.sendStatus(200)
})

router.post('/:userId/adds', async (req, res) => {
  const user = await User.findById(req.params.userId)
  const boatPhoto = await BoatPhoto.findById(req.body.boatPhotoId)

  await user.addPhoto(boatPhoto)
  res.sendStatus(200)
})

router.post('/:userId/likes', async (req, res) => {
  const user = await User.findById(req.params.userId)
  const boat = await Boat.findById(req.body.boatId)

  await user.likeBoat(boat)
  res.sendStatus(200)
})

router.get('/:userId', async (req, res) => {
  const user = await User.findById(req.params.userId)

  if (user) res.send(user)
  else res.sendStatus(404)
})

router.get('/:userId/json', async (req, res) => {
  const user = await User.findById(req.params.userId)
  res.send(user)
})

module.exports = router
