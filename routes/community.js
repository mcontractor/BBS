var express = require('express')
var router = express.Router();

// var io = require('socket.io')

var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var users = [];
var connections = [];

router.get('/', function(req, res, next) {
	var name12;
    if ((require('./login.js').name12) != undefined ) {
      name12 = require('./login.js').name12;
    }
    else
      name12 = require('./signup.js').name12;
  res.render('community', { title: 'Community', name122:name12 });

});

io.on('connection', function(socket) {
	console.log("connected");
	while (true) {}
	connections.push(socket);
	console.log('Connected: %s sockets connected', connections.length);

	//Disconnect
	socket.on('disconnect', function(data){
		connections.splice(connections.indexOf(socket), 1);
		console.log('Disconnected: %s sockets connected', connections.length);
	});

	//Send Message
	socket.on('send message', function(data) {
		console.log(data);
		io.sockets.emit('new message', {msg: data});
	})
	
});

module.exports = router;