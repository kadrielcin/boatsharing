/* eslint-disable no-console */
const express = require('express')

const router = express.Router()

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
  const createdUser = await User.create(req.body)
  res.send(createdUser)
})

router.get('/initialize', async (req, res) => {
  const kadri = new User({ name: 'kadri', age: 35, email: 'kadri@yahoo.com' })
  await kadri.setPassword('test')
  await kadri.save()

  const serhat = new User({ name: 'serhat', age: 36, email: 'serhat@yahoo.com' })
  await serhat.setPassword('test')
  await serhat.save()


  const baris = new User({ name: 'baris', age: 21, email: 'baris@yahoo.com' })
  await baris.setPassword('test')
  await baris.Photosave()

  baris.bio = 'An awesome hacker who has seen it all, and now sharing them all with you.'

  const berlinPhoto = await Photo.create({ filename: 'berlin.jpg' })
  const munichPhoto = await Photo.create({ filename: 'munich.jpg' })

  await baris.addPhoto(berlinPhoto)
  await baris.addPhoto(munichPhoto)

  await serhat.likePhoto(berlinPhoto)
  await kadri.likePhoto(berlinPhoto)

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
