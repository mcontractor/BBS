var express = require('express')
var router = express.Router();

router.get('/', function(req, res, next) {
	
    var sess = require('./login').sess
    if(sess.email){
    	res.render('upload_requests', { title: 'Upload A Request',name122:sess.name });
    }
  
});

// Creating JSON Array for Requests.
var json_reqs = [];
router.get(function(req,res,next) {
	var MongoClient = require('mongodb').MongoClient;
	var url = 'mongodb://127.0.0.1:27017/BBS';

	MongoClient.connect(url, function(err, db) {

	    var cursor = db.collection('requests').find();
	    // Execute the each command, triggers for each document
		cursor.each( function(err, item) {
			// If the item is null then the cursor is exhausted/empty and closed
        	if(item != null) {
	        	var obj = {
	        		email: item.email,
    			   	title: item.title,
    			   	name: item.name,
    			   	category: item.category,
    			  	description: item.description,
    			  	contact: item.contact
	        	};
	        	json_reqs.push(obj);
	        };	        
      	});
	});   
});

router.post('/submit',function(req,res,next){
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
	    json_reqs.push(reqs);
	    cursor.insert(reqs);
	    db.close();
	    res.redirect('/req_pic');
	    module.exports.json_reqs = json_reqs;
	}); 	
});

module.exports = router;
