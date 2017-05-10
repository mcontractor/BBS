var express = require('express')
var router = express.Router();

router.get('/', function(req, res, next) {
	var sess = require('./login').sess
    if(sess.email){
    	res.render('upload_ad', { title: 'Upload An Ad',name122:sess.name });
    }
  
});

// Creating JSON Array for Ads.
var json_ads = [];
router.get(function(req,res,next) {
	var MongoClient = require('mongodb').MongoClient;
	var url = 'mongodb://127.0.0.1:27017/BBS';

	MongoClient.connect(url, function(err, db) {

	    var cursor = db.collection('ads').find();
	    // Execute the each command, triggers for each document
		cursor.each( function(err, item) {
			// If the item is null then the cursor is exhausted/empty and closed
        	if(item != null) {
	        	var obj = {
	        		email: item.email,
    			   	title: item.title,
    			   	name: item.name,
    			   	category: item.category,
    			   	price: item.price,
    			  	description: item.description,
    			  	contact: item.contact
	        	};
	        	json_ads.push(obj);
	        };	        
      	});
	});   
});

var json_ads = [];
router.get(function(req,res,next) {
	var MongoClient = require('mongodb').MongoClient;
	var url = 'mongodb://127.0.0.1:27017/BBS';

	MongoClient.connect(url, function(err, db) {

	    var cursor = db.collection('ads').find();
	    // Execute the each command, triggers for each document
		cursor.each( function(err, item) {
			// If the item is null then the cursor is exhausted/empty and closed
        	if(item != null) {
	        	var obj = {
	        		email: item.email,
    			   	title: item.title,
    			   	name: item.name,
    			   	category: item.category,
    			   	price: item.price,
    			  	description: item.description,
    			  	contact: item.contact
	        	};
	        	json_ads.push(obj);
	        };	        
      	});
	});   
});

router.post('/submit',function(req,res,next){
	var MongoClient = require('mongodb').MongoClient;
	var url = 'mongodb://127.0.0.1:27017/BBS';

	MongoClient.connect(url, function(err, db) {

	    var cursor = db.collection('ads');
	    var email = require('./login.js').email;
	    var ad = {
	    	email : email,
	    	title : req.body.title,
	    	name : req.body.pname,
	    	category : req.body.category,
	    	price : req.body.price,
	    	description : req.body.description,
	    	contact : req.body.contact
	    };
	    json_ads.push(ad);
	    cursor.insert(ad);

	    db.collection('users').update({'email': email, $inc:{points: 1}});
	  
	    var ad_name = req.body.pname;
		module.exports.ad_name = ad_name;
	    db.close();
	    res.redirect('/ad_pic');
	    module.exports.json_ads = json_ads;
	}); 	
});
module.exports = router;

