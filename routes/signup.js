var express = require('express');
var nodemailer = require('nodemailer');
var mongodb = require('mongodb');
var fileUpload = require('express-fileupload');
var MongoClient = require('mongodb').MongoClient;
var router = express.Router();
var mkdirp = require('mkdirp');

router.get('/', function(req, res, next) {
	var val = req.query[1]
	if (val == undefined)
		val = '';
  res.render('signup', { title: 'Sign Up',message:val });

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
router.post('/submit', function(req,res,next){
	// MongoClient.connect('mongodb://127.0.0.1:27017/BBS'
	var email = req.body.emailid;
	module.exports.email = email;

	var name12 = req.body.mem_name;
	module.exports.name12 = name12;

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
						verfcode : rand_num,
						points: 0
					};

					var verf = rand_num
					module.exports.verf = verf;

					mkdirp(('public/ads/'+email), function(err) { 
					    console.log('directory made')
					});

					mkdirp(('public/requests/'+email), function(err) { 
					    console.log('directory made')
					});
					
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
					res.redirect('/profile_picture');
			    });	    		
	    	}
	    	else{
	    		res.redirect('/signup?1=You already have an account. Please log in instead');
	    	}
     	});
	});			
});

router.post('/upload',function(req, res) {
  if (!req.files)
    return res.status(400).send('No files were uploaded.');
 
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file 
  let sampleFile = req.files.file_nm;
 
  // Use the mv() method to place the file somewhere on your server 
  sampleFile.mv('/uploads/filename.jpg', function(err) {
    if (err)
      return res.status(500).send(err);
 
    console.log(req.files.file_nm.name+'name');
  });
});


module.exports = router;
