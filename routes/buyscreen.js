var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('buyscreen', { title: 'buyscreen' });
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

})



module.exports = router;
