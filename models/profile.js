import mongoose from 'mongoose'

const Schema = mongoose.Schema


const profileSchema = new Schema({
  name: String,
  photo: String,
  trips: [{
    type: Schema.Types.ObjectId,
    ref: 'Trip'
  }],
},{
  timestamps: true,
})

const Profile = mongoose.model('Profile', profileSchema)

export { Profile }
