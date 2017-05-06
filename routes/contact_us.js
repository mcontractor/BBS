var express = require('express');
var nodemailer = require('nodemailer');
var mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;
var router = express.Router();
var multer  = require('multer')
var upload = multer({ dest: 'uploads/' })

router.get('/', function(req, res, next) {
	var name12;
    if ((require('./login.js').name12) != undefined ) {
      name12 = require('./login.js').name12;
    }
    else
      name12 = require('./signup.js').name12;
  res.render('contact_us', { title: 'Contact Us',name122:name12 });

});

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'helpservice.bbs@gmail.com',
        pass: 'bbsforlums2018'
    }
});

router.post('/submit', upload.any(), function(req,res,next){
	// setup email data with unicode symbols
	let mailOptions = {
	    from: 'helpservice.bbs@gmail.com',
	    to: 'helpservice.bbs@gmail.com', // sender address 
	    subject: 'Contact us message', // Subject line
	    text: "The details of the contact us page are given below." +'\n'+ "Name : "+req.body.name+
	    '\n'+ "Email ID : "+req.body.email+'\n'+"Contact Info : "+req.body.phone+'\n'+
	    "Contact reason : "+req.body.type+ '\n'+ "Message : "+req.body.message+"\n"
	};

	// send mail with defined transport object
	transporter.sendMail(mailOptions, (error, info) => {
	    if (error) {
	        return console.log(error);
	    }
	    console.log('Message %s sent: %s', info.messageId, info.response);
	    res.redirect('/feedback');
	});
});

module.exports = router;
