const cookieParser = require('cookie-parser');
var express = require('express');
var router = express.Router();

let cityList = [
  {name: "Paris", weather: "nuageux", img: "/images/nuageux.png", highDegree: 28, lowDegree: 5.5},
  {name: "London", weather: "nuageux", img: "/images/nuageux.png", highDegree: 28, lowDegree: 5.5},
  {name: "Italie", weather: "nuageux", img: "/images/nuageux.png", highDegree: 28, lowDegree: 5.5},
  {name: "Luxembourg", weather: "nuageux", img: "/images/nuageux.png", highDegree: 28, lowDegree: 5.5},
]


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.get('/weather', function(req, res, next) {
  res.render('weather', { cityList: cityList });
});

router.post('/add-city', function (req, res, next) {

  let alreadyExist = false;

  for(let i=0; i<cityList.length; i++){
    if(req.body.newCity.toLowerCase() == cityList[i].name.toLowerCase()){
      alreadyExist = true;
    }
  }

  if (alreadyExist == false){
  cityList.push({
  name: req.body.newCity,
  weather: "nuageux",
  img: "/images/nuageux.png",
  highDegree: 28, 
  lowDegree: 5.5
}
)}

  res.render('weather', {cityList: cityList});
});

router.get('/delete-city', function(req, res, next) {
  cityList.splice(req.query.position, 1)
  res.render('weather', { cityList: cityList });
});


module.exports = router;
