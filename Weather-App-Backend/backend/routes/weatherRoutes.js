const express = require('express')
const router = express.Router()
const {
    getWeatherLocation,
    getAllWeathers,
    addWeather
} = require('../controllers/weatherController')


router.route('/').get(getWeatherLocation)
router.route('/getAllWeathers').get(getAllWeathers)
router.route('/addWeather').post(addWeather)

module.exports = router