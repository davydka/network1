var express = require('express');
var http = require('http');
var _ = require('lodash');
var path = require('path');
var fs = require('fs');



// Start Express
var app = express();
var server = http.createServer(app);

app.use(express.static(__dirname));

server.listen(process.env.PORT || 3000);

//debugging port 80, for socket.io performance
//console.log(process.env.PORT);

server.on('listening', function() {
	console.log('Express server started at http://localhost%s', server.address().port == 80 ? '' : ':'+server.address().port);
});



// Get last local data-store
var localDataRoot = './data/';
var files = fs.readdirSync(localDataRoot);

var latestFileName = _.last(files);
var data = require(localDataRoot + latestFileName);
console.log('latest locally stored data id is:', data.id);