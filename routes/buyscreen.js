var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	var json_ads=[];
	var val = req.query[1]
	if (val == undefined)
		val = 0;
	var i = val*5;

	var sess = require('./login.js').sess;
    if(sess.email){

	 	var MongoClient = require('mongodb').MongoClient;
		var url = 'mongodb://127.0.0.1:27017/BBS';

		MongoClient.connect(url, function(err, db) {
			if (err) {
	        	console.log('Unable to connect to the Server:', err);
	      	} else {
	        console.log('Connected to Server');
		    };

		    var cursor = db.collection('ads').find();		   
		    cursor.each(function(err, doc) {
		    	if(doc != null){
		    		json_ads.push(doc);
		   			
		    	}
		    	else {
		    		console.log(json_ads.length)
		    		res.render('buyscreen', { title: 'buyscreen', name122:sess.name, array_1: json_ads[1+i],array_2:json_ads[2+i],array_3:json_ads[3+i],array_4:json_ads[4+i],array_5:json_ads[0+i] });
		    	}
		    });
		});     	
	}
	else{
		res.redirect('/')
	}
    

});

router.post('/submit',function(req,res,next){

	if ((req.body.query == '') &&(req.body.category != 'ALL')) {
		res.redirect('/buyscreen2?a='+req.body.category);
	}
	else if (req.body.query == '' && req.body.category == 'ALL') {
		res.render('/buyscreen');	
	}
	else if ((req.body.query != undefined) && (req.body.category == 'ALL')) {
		res.redirect('/buyscreen2?b='+req.body.query);
	}
	else if ((req.body.query != undefined) && (req.body.category != 'ALL')){
		res.redirect('/buyscreen2?c='+req.body.category+'~'+req.body.query);
	}

});

module.exports = router;

