const express = require('express')

const router = express.Router()
const axios = require('axios')

const describeImage = require('../lib/image-description')
const downloadImage = require('../lib/download-image')
const User = require('../models/user')
const Photo = require('../models/photo')

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
  const mihri = await User.create({ name: 'kadri', age: 35 })
  const armagan = await User.create({ name: 'serhat', age: 36 })

  const steve = await User.create({ name: 'baris', age: 21 })
  steve.bio = 'An awesome hacker who has seen it all, and now sharing them all with you.'
  steve.save()

  const berlinPhoto = await createPhoto('berlin.jpg')
  const munichPhoto = await createPhoto('munich.jpg')

  await steve.addPhoto(berlinPhoto)
  await steve.addPhoto(munichPhoto)

  await armagan.likePhoto(berlinPhoto)
  await mihri.likePhoto(berlinPhoto)

  // eslint-disable-next-line no-console
  // eslint-disable-next-line no-undef
  // eslint-disable-next-line no-console
  // eslint-disable-next-line no-undef
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
