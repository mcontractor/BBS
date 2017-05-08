var express = require('express')
var router = express.Router();

router.get('/', function(req, res, next) {
  var ads = [];
  var requests = [];
  var val = req.query[1];
  if (val == undefined)
    val = 0

	var name12;
    if ((require('./login.js').name12) != undefined ) {
      name12 = require('./login.js').name12;
    }
    else
      name12 = require('./signup.js').name12;
  	var email;
    if ((require('./login.js').email) != undefined ) {
      email = require('./login.js').email;
    }
    else
      email = require('./signup.js').email;
  var link = '/uploads/' + email + '.jpg'

  var MongoClient = require('mongodb').MongoClient;
  var url = 'mongodb://127.0.0.1:27017/BBS';

  MongoClient.connect(url, function(err, db) {
    if (err) {
          console.log('Unable to connect to the Server:', err);
        } else {
        console.log('Connected to Server');
      };

      if (val == 0) {
        var cursor = db.collection('ads').find({'email':email});      
        cursor.each(function(err, doc) {
          if(doc != null){
            ads.push(doc);
          }
          else {
            console.log(ads.length);
            res.render('profile', { title: 'Profile', name122:name12, link1:link, array:ads, val1 : 0 });
          }
        });
      }
      else
      {
        var cursor = db.collection('requests').find({'email':email});      
        cursor.each(function(err, doc) {
          if(doc != null){
            requests.push(doc);
            
          }
          else {
            res.render('profile', { title: 'Profile', name122:name12, link1:link, array:requests, val1 : 1 });
          }
        });
      };
    });
});

module.exports = router;
