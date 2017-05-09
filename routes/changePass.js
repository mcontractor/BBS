var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	var sess = require('./login').sess
    if(sess.email){
  		res.render('changePass', { title: 'changePass', name122:sess.name });
  	}
});

router.post('/submit',function(req,res,next){
	var MongoClient = require('mongodb').MongoClient;
	var url = 'mongodb://127.0.0.1:27017/BBS';

	MongoClient.connect(url, function(err, db) {

	    var cursor = db.collection('users').find({'email':req.body.email});
	    var email = req.body.email;

	    cursor.each(function(err, doc) {
	    	console.log(doc)
	    	if(doc != null){
	    		if(doc.email == email && doc.password == req.body.password){
					db.collection('users').update({'email':email},{$set:{'password':req.body.npassword}});
					res.redirect('/profile')
	    		}
	    		else{

					res.redirect('/profile');
	    		}
	    	}

	    });
	}); 	
})


module.exports = router;
