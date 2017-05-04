var express = require('express')
var router = express.Router();
var app = require('express')();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var users = [];
var connections = [];

router.get('/', function(req, res, next) {
  res.render('community', { title: 'Community' });

});

io.on('connection', function(socket) {
	console.log("connected");
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