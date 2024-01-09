import mongoose from 'mongoose'
import { addressSchema } from './addressSchema.js'

const Schema = mongoose.Schema

const tripSchema = new Schema({
  destination: String,
  itinerary: { 
    type: Schema.Types.ObjectId, 
    ref: 'Itinerary' },
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
  expenses: [{
    type: Schema.Types.ObjectId,
    ref: 'Expense'
  }],
  addedBy: {
    type: Schema.Types.ObjectId,
    ref: 'Profile'
  }
},{
  timestamps: true,
})

const Trip = mongoose.model('Trip', tripSchema)

export { Trip }
