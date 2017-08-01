var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static('client'));

app.get('/hola-mundo', function( req, res){
	res.status(200).send('Hello word!!!');
});

var messages = [{
	id: 1,
	text: 'Welcome to private chat of Socket.io and NodeJS',
	nickname: 'Bot - rece'
}];

io.on('connection', function(socket){
	console.log("the node with IP: " + socket.handshake.address + " is connected...");

	socket.emit('messages', messages);

	socket.on('add-message', function(data){
		messages.push(data);
		io.sockets.emit('messages', messages);
	});
});

server.listen(6677, function(){
	console.log('Server init http://localhost:6677');
});