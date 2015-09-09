var _ = require('lodash');
var fs = require('fs');
var fetch = require('node-fetch');
var date = require('datejs');
var webServer = require('./utils/web-server');
var socketServer = require('./utils/socket-server')(webServer);





// Get last local data-store
var localJsonDir = './data/';
var files = fs.readdirSync(localJsonDir);

var latestJsonFileName = _.last(files);
var currentJson = require(localJsonDir + latestJsonFileName);
console.log('latest locally stored data id is:', currentJson.id);

// Fetch latest data from server
var remoteDataUrl = 'https://h-network.firebaseio.com/data.json';
fetch(remoteDataUrl)
	.then(function(response) {
		return response.json()
	}).then(function(json) {
		handleNewJson(json);
	}).catch(function(ex) {
		console.log('parsing failed', ex);
	});

function handleNewJson(newJson){
	if(newJson.id != currentJson.id){
		var newDateString = Date.parse(newJson.day).toString('yyyy-MM-dd'); //format date string, https://xkcd.com/1179/
		var newFileName = newDateString+'.json';

		//fs.writeFile(localJsonDir + newFileName, JSON.stringify(newJson), function (err) {
		//	if (err) throw err;
		//	console.log('It\'s saved!');
		//});
	}
}