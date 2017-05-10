var express = require('express')
var router = express.Router();

router.get('/', function(req, res, next) {
	
    var sess = require('./login').sess
    if(sess.email){
    	var val = req.query[1];
    	if (val == undefined)
    		val = '';
    	res.render('upload_requests', { title: 'Upload A Request',name122:sess.name, message: val});
    }
  
});

router.post('/submit',function(req,res,next){

	if ((req.body.title == '') || (req.body.pname == '') || (req.body.description == '') || 
		(req.body.contact == '')) {

		res.redirect('/upload_requests?1=Please fill all the fields');
	}
	else
	{

		var MongoClient = require('mongodb').MongoClient;
		var url = 'mongodb://127.0.0.1:27017/BBS';

		MongoClient.connect(url, function(err, db) {

		    var cursor = db.collection('requests');
		    var email = require('./login.js').email;
		    var reqs = {
		    	email : email,
		    	title : req.body.title,
		    	name : req.body.pname,
		    	category : req.body.category,
		    	description : req.body.description,
		    	contact : req.body.contact

		    };
		    var req_name = req.body.pname;
			module.exports.req_name = req_name;
		    cursor.insert(reqs);
		    db.close();
		    res.redirect('/req_pic');
		});
	}; 	
});

module.exports = router;
