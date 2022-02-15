const express = require('express')

const router = express.Router()
const Boat = require('../models/boat')

/* POST create a boat */
router.post('/', async (req, res) => {
  const boatToCreate = {
    filename: req.body.filename,
  }

  const createdBoat = await Boat.create(boatToCreate)
  res.send(createdBoat)
})

module.exports = router
