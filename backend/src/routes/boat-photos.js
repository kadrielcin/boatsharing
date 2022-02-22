const express = require('express')

const router = express.Router()
const BoatPhoto = require('../models/boat-photo')

/* POST create a photo */
router.post('/', async (req, res) => {
  const boatPhotoToCreate = {
    filename: req.body.filename,
  }

  const createdBoatPhoto = await BoatPhoto.create(boatPhotoToCreate)
  res.send(createdBoatPhoto)
})

module.exports = router
