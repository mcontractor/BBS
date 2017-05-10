var express = require('express')
var router = express.Router();

router.get('/', function(req, res, next) {
	var sess = require('./login').sess
    if(sess.email){
    	var val = req.query[1];
    	if (val == undefined) {
    		val = '';
    	}
    	res.render('upload_ad', { title: 'Upload An Ad',name122:sess.name, message:val });
    }
  
});

router.post('/submit',function(req,res,next){
	
	if ((req.body.title == '') || (req.body.pname == '') || (req.body.description == '') || 
		(req.body.contact == '') || (req.body.price == '')) {

		res.redirect('/upload_ad?1=Please fill all the fields');
	}
	else
	{
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
		    cursor.insert(ad);
		    db.collection('users').update({'email': email},{ $inc:{points: 1}});

		    var ad_name = req.body.pname;
			module.exports.ad_name = ad_name;
		    db.close();
		    res.redirect('/ad_pic');
		});
	} 	
});
module.exports = router;

