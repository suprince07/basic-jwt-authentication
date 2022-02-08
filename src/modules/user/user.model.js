const mongoose = require('mongoose');
const AuthUtils = require('../../utils/auth.util');

const { Schema } = mongoose;

const schema = new Schema({
  name: String,
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  admin: Boolean,
  created_at: Date,
  updated_at: Date
})
schema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = AuthUtils.hashPassword(user.password);
  }
  next();
})

module.exports = mongoose.model('Users', schema);