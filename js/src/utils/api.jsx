var Fetch = require('whatwg-fetch');
var rootUrl = 'https://h-network.firebaseio.com/';

module.exports = {
	get: function(url){
		return fetch(rootUrl + url)
		.then(function(response){
			return response.json();
		})
	}
}