import mongoose from 'mongoose'
import { addressSchema } from './addressSchema.js'

const Schema = mongoose.Schema

const scheduleItemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  startTime: String,
  endTime: String,
  category: {
    type: String,
    enum: ['entertainment', 'food', 'fitness', 'lifestyle', 'other']
  },
  venue: String,
  address: addressSchema
},{
  timestamps: true,
})

const scheduleDaySchema = new Schema({
  date: String,
  scheduleItems: [scheduleItemSchema],
},{
  timestamps: true,
})

const expenseSchema = new Schema({
  category: {
    type: String,
    enum: ['food', 'lodging', 'activity', 'transportation', 'entertainment', 'miscellaneous'],
    required: true,
  },
  expense: String,
  location: String,
  cost: {
    type: Number,
    required: true
  },
  note: String,
},{
  timestamps: true,
})

const packingListSchema = new Schema({
  packed: {
    type: Boolean,
    default: false
  },
  name: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
})

const tripSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  destination: addressSchema,
  schedule: [scheduleDaySchema],
  departureDate: Date,
  returnDate: Date,
  travelers: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Profile' }],
  packingList: [packingListSchema],
  travelMethod: {
    type: String,
    enum: ["car", "bus", "train", "plane", "other"]
  },
  expenses: [expenseSchema],
  addedBy: {
    type: Schema.Types.ObjectId,
    ref: 'Profile'
  }
},{
  timestamps: true,
})

const Trip = mongoose.model('Trip', tripSchema)

export { Trip }
