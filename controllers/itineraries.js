import { Itinerary } from "../models/itinerary.js"
import { Profile } from "../models/profile.js"

async function create(req, res) {
  try {
    req.body.addedBy = req.user.profile
    const itinerary = await Itinerary.create(req.body)
    res.status(201).json(itinerary)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

export {
  create
}