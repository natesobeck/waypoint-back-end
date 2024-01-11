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

async function index(req, res) {
  try {
    const trips = await Trip.find({})
      .sort({ 
        createdAt: 'desc' 
      })
    res.status(200).json(trips)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function show(req, res) {
  try {
    const trip = await Trip.findById(req.params.tripId)
    res.status(200).json(trip)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function deleteTrip(req, res) {
  try {
    const trip = await Trip.findByIdAndDelete(req.params.tripId)
    const profile = await Profile.findById(req.user.profile)
    profile.trips.remove({ _id: req.params.tripId })
    await profile.save()
    res.status(200).json(trip)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function update(req, res) {
  try {
    const trip = await Trip.findByIdAndUpdate(
      req.params.tripId,
      req.body,
      { new: true }
    )
    return res.status(200).json(trip)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

export {
  create,
  index,
  show,
  deleteTrip as delete,
  update
}