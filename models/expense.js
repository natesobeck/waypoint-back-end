import mongoose from 'mongoose'

const Schema = mongoose.Schema

const expenseSchema = new Schema({

},{
  timestamps: true,
})

const Expense = mongoose.model('Expense', expenseSchema)

export { Expense }