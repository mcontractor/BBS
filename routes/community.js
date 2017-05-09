var express = require('express')
var router = express.Router();

router.get('/', function(req, res, next) {
	var name12;
	var user_found=[];
	if ((require('./login.js').name12) != undefined ) {
    	name12 = require('./login.js').name12;
    }
    else
    	name12 = require('./signup.js').name12;
	var val = req.query[1];
	if (val != undefined){
		var MongoClient = require('mongodb').MongoClient;
		var url = 'mongodb://127.0.0.1:27017/BBS';

		MongoClient.connect(url, function(err, db) {
			if (err) {
	        	console.log('Unable to connect to the Server:', err);
	      	} else {
	        console.log('Connected to Server');
		    };

		    var query = val.toLowerCase();  //user query in lower case.
			var cursor = db.collection('users').find();  //cursor to the records in 'users' collection		 
		    cursor.each(function(err, doc) {
		    	if(doc != null) {
					var user_nm = doc.name.toLowerCase();  //users name to lower case
					var find = (user_nm.indexOf(query) !== -1);
					if (find == true) {
						user_found.push(doc);
					};	   			
		    	}
	 	    	else {
		    		res.render('community', { title: 'community', name122:name12, array:user_found });
		    	};
		    });
		});    
	}
	else
	{
		res.render('community', { title: 'community', name122:name12, array:[] })
	}
});

var user_found = [];
router.post('/submit', function(req, res, next) {
	res.redirect('/community?1='+req.body.query);
});


module.exports = router;