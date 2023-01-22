const axios = require('axios');
const User = require('../models/userModel')
const Weather = require('../models/weatherModel');

const getWeatherLocation = async (req, res) => {
  console.log("USER >>> ", req.user.id);
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
  const { cityName, username } = req.body;
  console.log(cityName);
  const weather = await Weather.findOne({ city: cityName })
  console.log(weather);
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

    // Add weather to User Document
    const updatedWeather = await Weather.findOne({ city: response.data.name });

    if (updatedWeather) {
      const user = await User.findOne({ username: username });

      if (user) {
        console.log("USER >>> ", user);
        let cities = user.cities;
        cities.push(updatedWeather);
        userObject = {
          cities: cities
        }

        console.log("UPDATED CITIES >>>>");
          console.log(userObject);
        await User.updateOne({ username: username }, userObject);
      }

      return res.send('Data Rec')
    }
  return res.send('Data Rec')
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
