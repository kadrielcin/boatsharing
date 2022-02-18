/* eslint-disable no-console */
const express = require('express')

const router = express.Router()
const axios = require('axios')

const describeImage = require('../lib/image-description')
const downloadImage = require('../lib/download-image')
const User = require('../models/user')
const Photo = require('../models/photo')
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

async function createPhoto(filename) {
  const photo = await Photo.create({ filename })

  const picsumUrl = `https://picsum.photos/seed/${photo._id}/300/300`
  const pictureRequest = await axios.get(picsumUrl)
  photo.filename = pictureRequest.request.path

  const imagePath = await downloadImage(picsumUrl, filename)
  const description = await describeImage(imagePath)
  photo.description = description.BestOutcome.Description

  return photo.save()
}

router.get('/initialize', async (req, res) => {
  const kadri = new User({ name: 'kadri', age: 35, email: 'kadri@kadri.com' })
  await kadri.setPassword('test')
  await kadri.save()

  const serhat = new User({ name: 'serhat', age: 36, email: 'serhat@serhat.com' })
  await serhat.setPassword('test')
  await serhat.save()

  const baris = new User({ name: 'baris', age: 21, email: 'baris@baris.com' })
  await baris.setPassword('test')
  await baris.save()

  baris.bio = 'An awesome hacker who has seen it all, and now sharing them all with you.'
  baris.save()

  const baturay1boatPhoto = await createPhoto('baturay1boat.jpg')
  const baturay2boatPhoto = await createPhoto('baturay2boat.jpg')

  await baris.addPhoto(baturay1boatPhoto)
  await baris.addPhoto(baturay2boatPhoto)

  await serhat.likePhoto(baturay1boatPhoto)
  await kadri.likePhoto(baturay2boatPhoto)

  const dolunay = await createBoat()
  const doganay = await createBoat()
  const baturay = await createBoat()

  await serhat.addBoat(dolunay)
  await kadri.addBoat(doganay)
  await baris.addBoat(baturay)

  console.log(baris)
  res.sendStatus(200)
})

router.post('/:userId/adds', async (req, res) => {
  const user = await User.findById(req.params.userId)
  const photo = await Photo.findById(req.body.photoId)

  await user.addPhoto(photo)
  res.sendStatus(200)
})

router.post('/:userId/likes', async (req, res) => {
  const user = await User.findById(req.params.userId)
  const photo = await Photo.findById(req.body.photoId)

  await user.likePhoto(photo)
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
