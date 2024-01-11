import { Trip } from "../models/trip.js"
import { Profile } from "../models/profile.js"

// trips
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

// expenses
async function update(req, res) {
  try {
    const trip = await Trip.findByIdAndUpdate(
      req.params.tripId,
      req.body,
      { new: true }
    )
    res.status(200).json(trip)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function createExpense(req, res) {
  try {
    req.body.addedBy = req.user.profile
    const trip = await Trip.findByIdAndUpdate(
      req.params.tripId,
      { $push: { expenses: req.body }},
      { new: true }
    )
    res.status(201).json(trip)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function deleteExpense(req, res) {
  try {
    const trip = await Trip.findById(req.params.tripId)
    trip.expenses.remove({ _id: req.params.expenseId })
    await trip.save()
    res.status(200).json(trip)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function updateExpense(req, res) {
  try {
    const trip = await Trip.findById(req.params.tripId)
    const expense = trip.expenses.id(req.params.expenseId)
    expense.category = req.body.category
    expense.locationName = req.body.locationName
    expense.cost = req.body.cost
    expense.description = req.body.description
    trip.save()
    res.status(200).json(trip)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

// itineraries
async function createItinerary(req, res) {
try {
  req.body.addedBy = req.user.profile
  const trip = await Trip.findById(req.params.tripId)
  trip.itineraries.push(req.body),
  trip.save()
  res.status(200).json(trip)
} catch (error) {
  console.log(error)
  res.status(500).json(error)
}
}

async function showItinerary(req, res) {
  try {
    const trip = await Trip.findById(req.params.tripId)
    const itinerary = trip.itineraries.id(req.params.itineraryId)
    res.status(200).json(itinerary)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function deleteItinerary(req, res) {
  try {
    const trip = await Trip.findById(req.params.tripId)
    trip.itineraries.remove({ _id: req.params.itineraryId })
    trip.save()
    res.status(200).json(trip)
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
  update,
  createExpense,
  deleteExpense,
  updateExpense,
  createItinerary,
  showItinerary,
  deleteItinerary
}