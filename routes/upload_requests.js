var express = require('express')
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('upload_requests', { title: 'Upload A Request' });

});

router.post('/submit',function(req,res,next){
	var MongoClient = require('mongodb').MongoClient;
	var url = 'mongodb://127.0.0.1:27017/BBS';

	MongoClient.connect(url, function(err, db) {

	    var cursor = db.collection('requests');
	    var email = require('./login.js').email;
	    var ad = {
	    	email : email,
	    	title : req.body.title,
	    	name : req.body.pname,
	    	category : req.body.category,
	    	description : req.body.description,
	    	contact : req.body.contact

	    };
	    cursor.insert(ad);
	    db.close();
	    res.redirect('/confirmation');
	}); 	


})

module.exports = router;
