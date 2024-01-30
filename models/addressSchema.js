import mongoose from 'mongoose'

const Schema = mongoose.Schema

const addressSchema = new Schema({
  street: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String
  },
  country: {
    type: String,
  },
  zipCode: {
    type: String
  }
},{
  timestamps: true,
})

export { addressSchema }