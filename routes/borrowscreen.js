var express = require('express')
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	var name12;
	var json_reqs=[];
	var val = req.query[1]
	if (val == undefined)
		val = 0;
	var i = val*5;

    if ((require('./login.js').name12) != undefined ) {
      name12 = require('./login.js').name12;
    }
    else
      name12 = require('./signup.js').name12;

  var MongoClient = require('mongodb').MongoClient;
	var url = 'mongodb://127.0.0.1:27017/BBS';

		MongoClient.connect(url, function(err, db) {
			if (err) {
	        	console.log('Unable to connect to the Server:', err);
	      	} else {
	        console.log('Connected to Server');
		    };

		    var cursor = db.collection('requests').find();		   
		    cursor.each(function(err, doc) {
		    	if(doc != null){
		    		json_reqs.push(doc);
		   			
		    	}
		    	else {
		    		console.log(json_reqs.length)
		    		res.render('borrowscreen', { title: 'borrowscreen', name122:name12, array_1: json_reqs[0+i],array_2:json_reqs[1+i],array_3:json_reqs[2+i],array_4:json_reqs[3+i],array_5:json_reqs[4+i] });
		    	}
		    });
		}); 
});

module.exports = router;
