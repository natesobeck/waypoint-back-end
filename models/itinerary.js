import mongoose from 'mongoose'
import { addressSchema } from './addressSchema.js'

const Schema = mongoose.Schema

const scheduleItemSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: Date,
  startTime: String,
  endTime: String,
  category: {
    type: String,
    enum: ['entertainment', 'food', 'fitness', 'lifestyle', 'other']
  },
    address: addressSchema
},{
  timestamps: true,
})

const itinerarySchema = new Schema({
  activities: [{
    type: Schema.Types.ObjectId,
    ref: 'Activity'
  }],
  restaurants: [{
    type: Schema.Types.ObjectId,
    ref: 'Restaurant'
  }],
  scheduleItems: [scheduleItemSchema],
  addedBy: {
    type: Schema.Types.ObjectId,
    ref: 'Profile'
  }
},{
  timestamps: true,
})

const Itinerary = mongoose.model('Itinerary', itinerarySchema)

export {
  Itinerary
}