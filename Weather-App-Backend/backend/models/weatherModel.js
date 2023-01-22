const mongoose = require('mongoose')

const weatherSchema = mongoose.Schema(
  {
    // user: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   required: true,
    //   ref: 'User',
    // },
    city: {
      type: String,
      required: true
    },
    temp: {
      type: String,
      required: true
    },
    feels_Like: {
      type: String,
      required: false
    },
    description: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    defaultCity: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Weather', weatherSchema)