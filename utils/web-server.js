var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);


app.use(express.static(__dirname));

server.listen(process.env.PORT || 3000);

//debugging port 80, for socket.io performance
//console.log(process.env.PORT);

server.on('listening', function() {
	console.log('Express server started at http://localhost%s', server.address().port == 80 ? '' : ':'+server.address().port);
});

module.exports = server;