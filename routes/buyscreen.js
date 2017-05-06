var express = require('express');
var router = express.Router();
var json_ads = require('./upload_ad.js').json_ads;

/* GET home page. */
router.get('/', function(req, res, next) {
	var name12;
    if ((require('./login.js').name12) != undefined ) {
      name12 = require('./login.js').name12;
    }
    else
      name12 = require('./signup.js').name12;
  res.render('buyscreen', { title: 'buyscreen', name122:name12, array_ads: json_ads });
});

router.get('/submit',function(req,res,next){
	var MongoClient = require('mongodb').MongoClient;
	var url = 'mongodb://127.0.0.1:27017/BBS';

	if (req.query.search) {
		MongoClient.connect(url, function(err, db) {
			if (err) {
	        	console.log('Unable to connect to the Server:', err);
	      	} else {
	        console.log('Connected to Server');
		    };

		    var category = req.body.category;

		    var cursor = db.collection('ads').find({'category':category});
		   
		    cursor.each(function(err, doc) {
		    	if(doc != null){
		    		console.log('result found');
		   			
		    	}
		    	else {
		    		console.log('result not found');
		    	}
		    });
		}); 
	}
	// When the user enters nothing and category is All
	else if (req.query.search == null && req.body.category == 'All') {
		res.render('/buyscreen');	
	}	

});
module.exports = router;