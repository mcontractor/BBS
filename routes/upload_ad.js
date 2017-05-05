var express = require('express')
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('upload_ad', { title: 'Upload An Ad' });

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
	    var ad_name = req.body.pname;
		module.exports.ad_name = ad_name;

	    cursor.insert(ad);
	    db.close();
	    res.redirect('/ad_pic');
	}); 	


})

module.exports = router;
