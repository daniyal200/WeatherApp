const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
    },
    username: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Please add a password'],
    },
    cities: {
      type: Array,
      required: true
    }
  },
  {
    timestamps: true,
  },
  
)

module.exports = mongoose.model('User', userSchema)