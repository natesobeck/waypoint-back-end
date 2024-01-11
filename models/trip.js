import mongoose from 'mongoose'
import { addressSchema } from './addressSchema.js'

const Schema = mongoose.Schema

const expenseSchema = new Schema({
  category: {
    type: String,
    enum: ['food', 'lodging', 'travel', 'transportation', 'activity', 'miscellaneous'],
    required: true,
  },
  locationName: String,
  address: addressSchema,
  cost: {
    type: Number,
    required: true
  },
  responsiblePeople: [{
    type: Schema.Types.ObjectId,
    ref: 'Profile'
  }],
  description: String,
  addedBy: {
    type: Schema.Types.ObjectId,
    ref: 'Profile'
  }
},{
  timestamps: true,
})

const tripSchema = new Schema({
  destination: addressSchema,
  itinerary: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Itinerary' }],
  departureDate: Date,
  returnDate: Date,
  travelers: [{ 
    type: Schema.Types.ObjectId, 
    ref: 'Profile' }],
  packingList: [String],
  travelMethod: {
    type: String,
    enum: ["car", "bus", "train", "plane", "boat", "other"]
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
