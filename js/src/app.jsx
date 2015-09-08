var React = require('react');
var Firebase = require('firebase');

var fbRef = new Firebase("https://<firebase-server>.firebaseio.com/");


var Hello = React.createClass({
	render: function () {
		return <h1>Hello</h1>
	}
});

var element = React.createElement(Hello, {});
React.render(element, document.querySelector('.container'));

/*
content
layout data
transition data

five hours is 18000 seconds
300 minutes


Every 15 minutes the server checks for new data (looks for unique id on data-set).
If new data found (checked id does not equal current id), it will begin fetching the new content.
Once all new data is fetched it gets added to the data-store.
Data-store has time-start and time-end information.
If current time falls within data-store time, update state. (how do we handle this transition?)
Default state is what is in Night Time Mode, or a screensaver mode.

Data consists of 2 Streets objects with Sets of Items for each Street's Led Wall and its 9 Pillars.

Street
	Wall
	Pillars 1-9

Sets and Items
	they both are sequential
	an item contains layout data and position data
	items within the set transition from one to the next over the course of the set's duration
	after all the items are complete and the end of the transition is reached, the next set begins
	led wall sets contain an additional wrapper element called sections
		sections contain items
		sections have a position on the wall (x,y center point)
		each section concurrently plays their items
		items within the section control their own polygon shape
		polygon morphing transition times will be the same as segue transition times
		sections can overlap and will respect their stack order
			as opposed to each new item stacking on top of the next, although this might be better
	led items contain their polygon shape
	pillar items contain their height and position on the smart glass
	if all sets are complete and the data-store still has the time, the sets will restart (loop)
	if the wall and the pillars have sets of different length, they will phase. this might be desirable to create variation

led wall
	set
		section
			item
			item
			...
		section
			item
			item
			...

pillar1
	set
		item
		item
		...

pillar2
	set
		item
		item
		...

pillar3
	...
*/

// H***** Window Experience JSON Structure


var data = {
	startTime: '2015-09-07T02:00:00-04:00', //ISO 8601 - 4pm
	endTime:   '2015-09-07T21:00:00-04:00', //ISO 8601 - 9pm

	street1: {
		ledWall: {
			set: {
				section: {
					x: 2000,
					y: 550,
					items: [
						{
							duration: 0.05, //15 minutes, relative time, assuming 5 hour data-store
							segue: {
								duration: 2.0, //percentage, relative to parent's duration. 2% would be 18 seconds assuming a 15 minute item
								effect: 'disolve'
							},
							pan: { //item will tween over these values over the course of its duration
								//coordinate system has x:0 y:0 positioned in the top left
								x: [0, -150], //pull item to the left over the duration of the item
								y: [0, -200]  //pull item up over the duration of the item
							},
							zoom: [1, 1.5, 1.25, 1.5, 1.65], //item will tween over these values over the course of its duration
								polygon: {
									coordinates: '60,20 100,40 100,80 60,100 20,80 20,40', //the x and y coordinates for each corner of the polygon, https://mdn.mozillademos.org/files/3259/polygon.svg
								},
							type: 'livestream',
							asset: 'url.external.stream',
							assetCredit: 'credit',
							title: 'title',
							text: 'text',
							children: []
						},
						{
							duration: 0.10, //30 minutes, assuming 5 hour data-store
							segue: {
								duration: 0.5556, //percentage, relative to parent's duration. 0.5556 would be 10 seconds assuming a 30 minute item
								effect: 'slideUp'
							},
							pan: { //item will tween over these values over the course of its duration
								//coordinate system has x:0 y:0 positioned in the top left
								x: [0, -150], //pull item to the left over the duration of the item
								y: [0, -200]  //pull item up over the duration of the item
							},
							zoom: [1, 1.5, 1.25, 1.5, 1.65], //item will tween over these values over the course of its duration
							polygon: {
								coordinates: '60,20 100,40 100,80 60,100 20,80 20,40', //the x and y coordinates for each corner of the polygon, https://mdn.mozillademos.org/files/3259/polygon.svg
							},
							type: 'video',
							asset: 'file.mp4',
							assetCredit: 'credit',
							title: 'title',
							text: 'text',
							children: []
						},
						{
							duration: 0.05, //15 mins again
							segue: {
								duration: 0.2222, //percentage, relative to parent's duration. 0.2222 would be 2 seconds assuming a 15 minute item
								effect: 'triangleConfetti'
							},
							pan: { //item will tween over these values over the course of its duration
								//coordinate system has x:0 y:0 positioned in the top left
								x: [0, -150], //pull item to the left over the duration of the item
								y: [0, -200]  //pull item up over the duration of the item
							},
							zoom: [1, 1.5, 1.25, 1.5, 1.65], //item will tween over these values over the course of its duration
							polygon: {
								coordinates: '60,20 100,40 100,80 60,100 20,80 20,40', //the x and y coordinates for each corner of the polygon, https://mdn.mozillademos.org/files/3259/polygon.svg
							},
							type: 'slideshow',
							asset: 'main.jpg',
							assetCredit: 'credit',
							title: 'title',
							text: 'text',
							children: [
								{
									type: 'slide',
									asset: 'slide1.jpg',
									assetCredit: 'credit',
									title: 'title',
									text: 'text'
								},
								{
									type: 'slide',
									asset: 'slide2.jpg',
									assetCredit: 'credit',
									title: 'title',
									text: 'text'
								}
							]
						}
					]
				}
			}
		},

		pillar1: {
			set: {
				items: [
					{
						duration: 0.05,
						segue: {
							duration: 2.0,
							effect: 'disolve'
						},
						pan: { //content being projected can have movement but smart glass stays static until next segue
							x: [0, -150],
							y: [0, -200]
						},
						zoom: [1, 1.5, 1.25, 1.5, 1.65], //content being projected can have movement
						top: 2, //1-9, number of smartglass rows
						height: 6, //1-9, number of smartglass rows
						type: 'card',
						asset: 'news.jpg',
						assetCredit: 'credit',
						title: 'title',
						text: 'text text text text',
						children: []
					}
				]
			}
		},
		pillar2: {

		},
		pillar3: {

		},
		pillar4: {

		},
		pillar5: {

		},
		pillar6: {

		},
		pillar7: {

		},
		pillar8: {

		},
		pillar9: {

		}

	},

	street2: {
		//etc
	}
}