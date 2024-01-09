import { Trip } from "../models/trip.js"
import { Profile } from "../models/profile.js"

async function create(req, res) {
  try {
    req.body.addedBy = req.user.profile
    const trip = await Trip.create(req.body)
    const profile = await Profile.findByIdAndUpdate(
      req.user.profile,
      { $push: { trips: trip } },
      { new: true }
    )
    trip.addedBy = profile
    res.status(201).json(trip)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

export {
  create
}