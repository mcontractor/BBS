var express = require('express')
var router = express.Router();

router.get('/', function(req, res, next) {
	var name12;
    if ((require('./login.js').name12) != undefined ) {
      name12 = require('./login.js').name12;
    }
    else
      name12 = require('./signup.js').name12;
  res.render('upload_requests', { title: 'Upload A Request',name122:name12 });

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
	    var req_name = req.body.pname;
		module.exports.req_name = req_name;
	    cursor.insert(ad);
	    db.close();
	    res.redirect('/req_pic');
	}); 	


})

module.exports = router;
