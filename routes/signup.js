var express = require('express');
var nodemailer = require('nodemailer');
var mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var router = express.Router();
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

router.get('/', function(req, res, next) {
  res.render('signup', { title: 'Sign Up' });

});

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'helpservice.bbs@gmail.com',
        pass: 'bbsforlums2018'
    }
});

var rand_num = Math.floor((Math.random()*10000)+1000)
router.post('/submit', upload.any(), function(req,res,next){
	// MongoClient.connect('mongodb://127.0.0.1:27017/BBS'

 	var url = 'mongodb://127.0.0.1:27017/BBS';
	MongoClient.connect(url, function(err, db){
      if (err) {
        console.log('Unable to connect to the Server:', err);
      } else {
        console.log('Connected to Server');
	    };
		var users = db.collection("users");
		var user_pictures = db.collection("user_pictures");

	    var cursor = db.collection('users').find({'email':req.body.emailid});

	    cursor.count(function(err,count){
	    	console.log(count)
	    	if(count == 0){
			    cursor.each(function(err, doc) {
			    	console.log(doc)
					var user1 = {
						email : req.body.emailid,
						password : req.body.password,
						name : req.body.mem_name,
						dob : {d:req.body.dd, m:req.body.mm, y:req.body.yyyy},
						gender : req.body.gender,
						number : req.body.contactnum,
						verfcode : rand_num
					};
					var email = req.body.emailid
					module.exports.email = email;

					var verf = rand_num
					module.exports.verf = verf;
					
					users.insert([user1]);
					db.close();

					// setup email data with unicode symbols
					let mailOptions = {
					    from: 'helpservice.bbs@gmail.com', // sender address
					    to: req.body.emailid, // list of receivers
					    subject: 'Welcome to BBS ✔', // Subject line
					    text: 'Welcome,' + req.body.mem_name +'!'+ '\n' +'Your verification code: ' + rand_num  // plain text body
					};

					// send mail with defined transport object
					transporter.sendMail(mailOptions, (error, info) => {
					    if (error) {
					        return console.log(error);
					    }
					    console.log('Message %s sent: %s', info.messageId, info.response);
					});
					res.redirect('/security_code');
			    });	    		
	    	}
	    	else{
	    		res.redirect('/');
	    	}

     	});



	});

			
});
module.exports = router;
