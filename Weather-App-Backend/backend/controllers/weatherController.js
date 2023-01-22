const axios = require('axios');
const User = require('../models/userModel')
const Weather = require('../models/weatherModel')

const getWeatherLocation = async (req, res) => {
  const defaultCities = ["karachi", "lahore", "islamabad", "peshawar", "quetta"];
  const defaultCitiesData = [];
  defaultCities.map(async (city, index) => {
    let response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${defaultCities[index]}&appid=391e35b2cf975ec5e8a1411762f11ca4&units=metric`)
    console.log("response >>>")
    console.log(response.data)
    const obj = {
      city: response.data.name,
      temp: response.data.main.temp,
      description: response.data.weather[0].description,
      date: response.data.dt
    };
    // defaultCitiesData.push(obj);
    const cityFound = await Weather.findOne({ city: response.data.name });
    if (cityFound) {
      await Weather.updateOne({ city: response.data.name }, obj);
    } else {
      await Weather.create(obj);
    }
  })
  res.send('Data Rec');
}
const addWeather = async (req, res) => {
  const { cityName } = req.body;
  console.log(cityName);
  const weather = await Weather.findOne({ city: cityName })
  console.log(weather);
  if (weather) {
    res.status(400).json({ msg: "City Already Exists" });
  } else {
    let response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=391e35b2cf975ec5e8a1411762f11ca4&units=metric`)
    console.log("response >>>")
    console.log(response.data)
    const obj = {
      city: response.data.name,
      temp: response.data.main.temp,
      description: response.data.weather[0].description,
      date: response.data.dt
    };
    // defaultCitiesData.push(obj);
    const cityFound = await Weather.findOne({ city: response.data.name });
    if (cityFound) {
      await Weather.updateOne({ city: response.data.name }, obj);
    } else {
      await Weather.create(obj);
    }
  }
  res.send('Data Rec')
}
const getAllWeathers = async (req, res) => {
  const weathers = await Weather.find({});
  res.json(weathers);
}

module.exports = {
  getWeatherLocation,
  getAllWeathers,
  addWeather
}
