import mongoose from 'mongoose'

const Schema = mongoose.Schema

const Address = new Schema({
  street: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  zipCode: {
    type: String,
    required: true,
  }
},{
  timestamps: true,
})

const addressSchema = mongoose.model('addressSchema', Address)

export { addressSchema }