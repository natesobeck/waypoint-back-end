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

// expenses

async function createExpense(req, res) {
  try {
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

async function deleteScheduleItem(req, res) {
  try {
    const trip = await Trip.findById(req.params.tripId)
    trip.schedule.forEach(day => {
      day.scheduleItems.forEach(item => {
        if (item._id.toString() === req.params.itemId) {
          day.scheduleItems.remove({ _id: req.params.itemId })
        }
      })
    })
    await trip.save()
    res.status(200).json(trip)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function updateScheduleItem(req, res) {
  try {
    const trip = await Trip.findById(req.params.tripId)
    let newItem
    trip.schedule.forEach(day => {
      day.scheduleItems.forEach(item => {
        if (item._id.toString() === req.params.itemId) {
          newItem = day.scheduleItems.id(req.params.itemId)
        }
      })
    })
    newItem.name = req.body.name
    newItem.startTime = req.body.startTime
    newItem.endTime = req.body.endTime
    newItem.category = req.body.category
    newItem.venue = req.body.venue
    newItem.address.street = req.body.address.street
    newItem.address.city = req.body.address.city
    newItem.address.zipCode = req.body.address.zipCode
    await trip.save()
    res.status(200).json(newItem)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

// packing list

async function createPackingListItem(req, res) {
  try {
    const trip = await Trip.findById(req.params.tripId)
    trip.packingList.push(req.body)
    await trip.save()
    res.status(200).json(trip)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function updatePackingListItem(req, res) {
  try {
    const trip = await Trip.findById(req.params.tripId)
    const listItem = trip.packingList.id(req.params.itemId)
    listItem.packed = !listItem.packed
    await trip.save()    
    res.status(200).json(listItem)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

async function deletePackingListItem(req, res) {
  try {
    const trip = await Trip.findById(req.params.tripId)
    trip.packingList.remove({ _id: req.params.itemId })
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

  // Schedule Items
  createScheduleItem,
  updateScheduleItem,
  deleteScheduleItem,

  // Packing List Items
  createPackingListItem,
  updatePackingListItem,
  deletePackingListItem
}