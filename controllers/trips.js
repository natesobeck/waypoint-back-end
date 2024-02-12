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
    console.log(trip)
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
    await trip.save()
    res.status(200).json(trip)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

// Schedule Items

async function createScheduleItem(req, res) {
  try {
    const trip = await Trip.findById(req.params.tripId)
    let pushed = false
    if (trip.schedule.length) {
      trip.schedule.forEach(day => {
        if (new Date(day.date).toLocaleDateString() === new Date(req.body.startTime).toLocaleDateString()) {
          day.scheduleItems.push(req.body)
          pushed = true
        }
      })
    } 
    if (pushed === false) {
      trip.schedule.push({
        date: req.body.startTime,
        scheduleItems: req.body
      })
    }
    await trip.save()
    res.status(200).json(trip)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function indexScheduleItem(req, res) {
  try {
    const trip = await Trip.findById(req.params.tripId)
    const itinerary = trip.itineraries.id(req.params.itineraryId)
    res.status(200).json(itinerary.scheduleItems)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function showScheduleItem(req, res) {
  try {
    const trip = await Trip.findById(req.params.tripId)
    const itinerary = trip.itineraries.id(req.params.itineraryId)
    const scheduleItem = itinerary.scheduleItems.id(req.params.scheduleItemId)
    res.status(200).json(scheduleItem)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function updateScheduleItem(req, res) {
  try {
    const trip = await Trip.findById(req.params.tripId)
    const itinerary = trip.itineraries.id(req.params.itineraryId)
    const scheduleItem = itinerary.scheduleItems.id(req.params.scheduleItemId)
    scheduleItem.name = req.body.name
    scheduleItem.date = req.body.date
    scheduleItem.startTime = req.body.startTime
    scheduleItem.endTime = req.body.endTime
    scheduleItem.category = req.body.category
    await trip.save()
    res.status(200).json(scheduleItem)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function deleteScheduleItem(req, res) {
  try {
    const trip = await Trip.findById(req.params.tripId)
    const itinerary = trip.itineraries.id(req.params.itineraryId)
    itinerary.scheduleItems.remove({ _id: req.params.scheduleItemId })
    await trip.save()
    res.status(200).json(trip)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function createPackingListItem(req, res) {
  try {
    const trip = Trip.findById(req.params.tripId)
    trip.packingList.push(req.body)
    await trip.save()
    res.status(200).json(trip)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

export {
  // Trips
  create,
  index,
  show,
  deleteTrip as delete,
  update,

  // Expenses
  createExpense,
  deleteExpense,
  updateExpense,

  // Itineraries
  // createItinerary,
  // showItinerary,
  // deleteItinerary,
  // updateItinerary,

  // Schedule Items
  createScheduleItem,
  indexScheduleItem,
  showScheduleItem,
  updateScheduleItem,
  deleteScheduleItem,

  // Packing List Items
  createPackingListItem
}