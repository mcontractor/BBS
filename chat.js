var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var counter = 0;
var clients = []
var num = -1
var check = 0
app.get('/', function(req, res){
res.sendFile(__dirname + '/chat.html');

});

io.on('connection', function(socket){
	for (var i = 0; i < clients.length; i++) {
		if(clients[i] == counter){
			num = counter
			check = -1
			break;
		}
	}
	if(check != -1){
		
		clients = [...clients,counter]
		num = counter
		counter++;
		check = 0;
	}
  	socket.on('chat message', function(msg){
    io.emit('chat message', 'User ' + num + ': '+ msg);
  });
});

http.listen(5000, function(){
  console.log('listening on *:5000');
});

