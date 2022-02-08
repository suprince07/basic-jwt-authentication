const mongoose = require('mongoose');

const { Schema } = mongoose;

const schema = new Schema({
  title: String,
  userId: String,
  description: String,
  completed: Boolean,
  created_at: Date,
  updated_at: Date
})

module.exports = mongoose.model('Todos', schema);