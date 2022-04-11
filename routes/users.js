var express = require('express');
var router = express.Router();
var request = require('sync-request');
var usersModel = require('../models/users');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/* Sign_up. */
router.post('/sign_up', async function (req, res, next) {
  req.session.userName = req.body.userName,
  req.session.userEmail = req.body.userEmail
  req.session.userPassword = req.body.userPassword
  
  var alreadyExist = await usersModel.findOne({ email: req.session.userEmail });

  if(alreadyExist == null){
      var newUsers = new usersModel({
        name: req.body.userName,
        email: req.body.userEmail,
        password: req.body.userPassword
      })        

      var userSaved = await newUsers.save()
      if (userSaved) {
        console.log('userData input to BD Success!')
      }
      if (userSaved) {
         req.session.user = {
        id: userSaved._id,
        name: userSaved.name
      } 
  }   
}
res.redirect('/weather');
});



/* Sign_in */
  router.post('/sign_in', async function (req, res, next) {
    var alreadyExist = await usersModel.findOne({ email: req.body.userEmail, password: req.body.userPassword });
    if(alreadyExist){
      req.session.user = {
        id: req.session.id,
        name: req.session.name}
      res.redirect('/weather');
      } else{res.redirect('/');
    }
    });


/* Sign_out */
router.get('/logout', async function (req, res, next) {
  req.session.user = null;
  res.redirect('/');
  });

module.exports = router;
