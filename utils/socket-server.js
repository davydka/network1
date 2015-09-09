var socketServer = require('socket.io');


module.exports = function(server){
	var io = new socketServer(server);

	io.on('connection', function (socket) {
		socket.emit('news', { hello: 'world' });
		socket.on('my other event', function (data) {
			console.log(data);
		});
	});
}