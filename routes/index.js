const cookieParser = require('cookie-parser');
var express = require('express');
var router = express.Router();
var request = require('sync-request');
/*
router.get('/users', function (req, res, next) {
  var requete = request("GET","https://jsonplaceholder.typicode.com/users");
  var resultWS = JSON.parse(requete.body);
  console.log(resultWS)
  res.render('users', { users: resultWS});
  }); */
  //1ab23c3905561070e8f38cf42108df6d

let cityList = []




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.get('/weather', function(req, res, next) {
  const defaultLoaction = req.body.name ? req.body.name : "Paris"
  let requete = request("GET","http://api.openweathermap.org/data/2.5/weather?q=" + defaultLoaction + "&units=metric&appid=1ab23c3905561070e8f38cf42108df6d");
  let cityList = JSON.parse(requete.body)
  res.render('weather', { cityList: cityList });
});



router.post('/add-city', function (req, res, next) {

  const setLoaction = req.body.newCity
  var requete = request("GET","http://api.openweathermap.org/data/2.5/weather?q=" + setLoaction + "&units=metric&appid=1ab23c3905561070e8f38cf42108df6d");
  var newCityList = JSON.parse(requete.body)
  let alreadyExist = false;

  for(let i=0; i<cityList.length; i++){
    if(req.body.newCity.toLowerCase() == cityList[i].name.toLowerCase()){
      alreadyExist = true;
    }
  }
 
  if (alreadyExist == false){
  cityList.push({
  name: req.body.newCity,
  weather: newCityList.weather[0].description,
  img: "http://openweathermap.org/img/w/"+ newCityList.weather[0].icon +".png",
  temp_max: newCityList.main.temp_max, 
  temp_min: newCityList.main.temp_min
}
)}

  res.render('weather', {cityList: cityList});
});




router.get('/delete-city', function(req, res, next) {
  cityList.splice(req.query.position, 1)
  res.render('weather', { cityList: cityList });
});


module.exports = router;
