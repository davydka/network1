var React = require('react');
var Reflux = require('reflux');

var DataStore = require('../stores/data-store');
var Actions = require('../actions');

module.exports = React.createClass({
	mixins: [
		Reflux.listenTo(DataStore, 'onChange')
	],

	getInitialState: function(){
		return {
			data: []
		}
	},

	componentWillMount: function(){
		Actions.getData();
	},

	render: function(){
		console.log(this.state);
		return <div className="list-group">
			{this.renderData()}
		</div>
	},

	onChange: function(event, data){
		this.setState({
			data: data
		});
	},

	renderData: function(){
		return null;
		return this.state.data.map(function(topic){
			return <div className="list-group-item" key={topic.id}>
				<h4>{topic.name}</h4>
				<p>{topic.description}</p>
			</div>
		});
	}
});