var Reflux = require('reflux');

var Api = require('../utils/api');
var Actions = require('../actions');

module.exports = Reflux.createStore({
	listenables: [Actions],

	getData: function(){
		return Api.get('data.json')
			.then(function(json){
				this.data = json.data
				this.triggerChange();
			}.bind(this));
	},

	triggerChange: function(){
		this.trigger('change', this.data);
	}
})