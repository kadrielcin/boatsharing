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

router.get('/:boatId', async (req, res) => {
  const boat = await Boat.findById(req.params.boatId)
  if (boat) res.send(boat)
  else res.sendStatus(404)
})
module.exports = router
