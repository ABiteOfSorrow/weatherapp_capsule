const cookieParser = require('cookie-parser');
var express = require('express');
var router = express.Router();
var request = require('sync-request');
var cityModel = require('./bdd')


let cityList = []


/* GET home page. */
router.get('/', async function (req, res, next) {
  res.render('login', {title: 'Express'});
});

/* GET weather page. */
router.get('/weather', async function (req, res, next) {
  cityList = await cityModel.find();
  res.render('weather', {cityList: cityList});
});


/* Add city weather page. */
router.post('/add_city', async function (req, res, next) {

  const setLoaction = req.body.newCity
  var requete = request("GET", "http://api.openweathermap.org/data/2.5/weather?q=" + setLoaction + "&units=metric&appid=1ab23c3905561070e8f38cf42108df6d");
  var newCityList = JSON.parse(requete.body)
  let alreadyExist = false;

  for (let i = 0; i < cityList.length; i++) {
    if (cityList[i].name.toLowerCase() == req.body.newCity.toLowerCase()) {
      alreadyExist = true;
    }
  }

let tempName = req.body.newCity.toLowerCase()
let newCityName = tempName.charAt(0).toUpperCase() + tempName.slice(1)

  if (alreadyExist == false) {
    var newAddCity = new cityModel({
      name: newCityName,
      weather: newCityList.weather[0].description,
      img: "http://openweathermap.org/img/w/" + newCityList.weather[0].icon + ".png",
      temp_max: newCityList.main.temp_max,
      temp_min: newCityList.main.temp_min
    })
    var citySaved = await newAddCity.save()
    if (citySaved) {
      console.log('Data input to BD Success!')
    }
  }
  cityList = await cityModel.find();
  res.render('weather', {cityList: cityList});
});



/* Delete city page. */
router.get('/delete_city', async function (req, res, next) {
  await cityModel.deleteMany({
    name: req.query.deleteName
  });
  cityList = await cityModel.find();
  res.render('weather', {cityList: cityList});
});



/* Update city page. */
router.get('/update_cities', async function (req, res, next) {

  for (let i = 0; i < cityList.length; i++) {
  const setLoaction = cityList[i].name
  var requete = request("GET", "http://api.openweathermap.org/data/2.5/weather?q=" + setLoaction + "&units=metric&appid=1ab23c3905561070e8f38cf42108df6d");
  var newCityList = JSON.parse(requete.body)

  await cityModel.updateOne(
    {name: newCityList.name}, 
    {name: newCityList.name,
    weather: newCityList.weather[0].description,
    img: "http://openweathermap.org/img/w/" + newCityList.weather[0].icon + ".png",
    temp_max: newCityList.main.temp_max,
    temp_min: newCityList.main.temp_min
  });
  console.log(newCityList.name + ' is updated')
  }
  cityList = await cityModel.find();
  res.render('weather', {cityList: cityList});
  });
  module.exports = router;
