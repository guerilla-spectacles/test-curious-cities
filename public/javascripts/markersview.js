//////////////////  Fake DB for build/test purposes //////////////////
var fakeDB = {};
fakeDB.locations = [
	{
		title: 'Fake DB 1: Angst on Angst',
		description: 'This is a weird and ugly mural of some sort of hipster meta-angst.  #ugly',
		curiousType: 'Art',
		img: 'images/jollyRog.jpg',
		latitude: 45.51361,
		longitude: -122.65904,
		category: 'Art'
	},
	{
		title: 'Fake DB 2: Portlandy picture',
		description: 'Hey look! Its Portland!  #pdx',
		curiousType: 'Stuff',
		img: 'images/pdx.jpg',
		latitude: 45.517555,
		longitude: -122.63119,
		category: 'Art'
	},
	{
		title: 'Fake DB 3: Blurry Image',
		description: 'This is a blurry mural. Not a good pucture #outoffocus',
		curiousType: 'Stuff',
		img: 'images/fontina.png',
		latitude: 45.517255,
		longitude: -122.621819,
		category: 'Art'
	},
	{
		title: 'Fake DB 4: Random placeholder',
		description: 'Placeholder picture of the Portland trailblazers.#ripcity',
		curiousType: 'Stuff',
		img: 'images/blazers.jpg',
		latitude: 45.51555,
		longitude: -122.6419,
		category: 'Art'
	},
	{
		title: 'Fake DB 5: Random placeholder',
		description: 'Placeholder picture of the Portland trailblazers.#ripcity',
		curiousType: 'Stuff',
		img: 'images/blazers.jpg',
		latitude: 45.49555,
		longitude: -122.6419,
		category: 'Art'
	},
	{
		title: 'Fake DB 6: Random placeholder',
		description: 'Placeholder picture of the Portland trailblazers.#ripcity',
		curiousType: 'Stuff',
		img: 'images/blazers.jpg',
		latitude: 45.59555,
		longitude: -122.7419,
		category: 'Art'
	}];

var locationList = [];	
// var closestList = [];


//////////////////  Makes Marker model //////////////////
var Marker = Backbone.Model.extend({
	initialize: function() {
		var markyMark = new MarkerView({model: this});
		console.log('hi from marker init');
	}
	//initializie: make view, which renders the view

});


// var allMarkersView = new 

//////////////////  Makes collection for all map locations //////////////////
var MapLocs = Backbone.Collection.extend({
	model: Marker,
	comparator: 'cid',
	url: '/api'
});
var mapLocs = new MapLocs();


// //////////////////  Puts all objects from fake DB in the MapLocs collection //////////////////
// mapLocs.add(fakeDB.locations);


		/////////////Closest Marker Attempt
		        // find the closest location to the user's location
        // var closest = 0;
        // var mindist = 99999;


///////////Delete this section? ///////////
//////////////////  Makes view for all of the markers //////////////////
// var AllMarkersView = Backbone.View.extend({
// 	el: '#google-map',
// 	render: function() {
// 		this.collection.each(function (marker) {
// 			// console.log('making a marker');
// 			var markerView = new MarkerView({model: marker});
// 			// console.log('before markerView Render');
// 			// markerView.render();
// 			// console.log(markerView);
// 		});
// 	},

// 	initialize: function() {
// 		var self = this;
// 		self.render();
// 		// console.log('allMarkersView hello')
// 	}
// });


//////////////////  Makes view for each individual marker //////////////////
var MarkerView = Backbone.View.extend({
	// each id
	el: "#google-map",
	// var self = this;
	className : 'google-map-marker',

	
	initialize: function(){
		var self = this;
		self.map = app.map;
		// console.log(self);
		self.render();
		// console.log('here is map after installing from opts');
		// console.log(map);
	},

	// placeMarker: function(){
	// 	console.log("Hi from placeMarker");
	// },

	// Render stationary middle flag
	render: function(){
		// find the closest location to the user's location
        // var closest = 0;
        // var mindist = 99999;
        // var mapVariables = {
        // 	userLong: null,
        // 	userLat: null,
        // 	LatLng: null
        // }


		// for (i=0; i < fakeDB.locations.length; i++) {
			var desc = this.model.get('description');
			var latitude= this.model.get('latitude');
			var longitude = this.model.get('longitude');
			var img = this.model.get('img');
			var category = this.model.get('category');
			var title = this.model.get('title');
			// var thisLatLng = (latitude, longitude);



			var marker = new google.maps.Marker({
				icon: 'images/map-marker-image.png',
				position: new google.maps.LatLng(latitude, longitude),
				map: app.map,
				img: img,
				title: title,
				description: desc,
				category: category,
				id: 'markerLayer',
			});
			// console.log(mapVariables.userLat);

			// console.log(marker);
			var infowindow = new google.maps.InfoWindow();

			//Close any open infoWindow if the map is clicked (don't want more than one open at a time)
			google.maps.event.addListener(app.map, 'click', function() {
				infowindow.close();
			});

			google.maps.event.addListener(marker, 'click', (function(marker, i) {
				return function() {

					var infoWindowInfo = "<div id='guide-button-div' class='info-dropdown center'><h2>Closest Curiosties</h2><div class='curiousProfile'><h3>" + title + "</h3><img class='curious-img' src=" + img + "><p class='curious-description'>" + desc + "</p><p class='curious-type'>Category:<br>" + category + '</p></div>';

					//////////////Info Window if we want it ///////////////
					// infowindow.setContent("<div id='guide-button-div' class='info-dropdown center'><h2>Closest Curiosties</h2><div class='curiousProfile'><h3>" + fakeDB.locations[i].title + "</h3><img class='curious-img' src=" + fakeDB.locations[i].img + "><p class='curious-description'>" + fakeDB.locations[i].description + "</p><p class='curious-type'>Category:" + fakeDB.locations[i].category + '</p></div>');
					// infowindow.open(map, marker);

					////////MAkes the sidebar content from the marker info
					document.getElementById('info-contents').innerHTML=infoWindowInfo;
				};
			})(marker));
			locationList.push(marker.title);
		// }
		// console.log(locationList);

	},



		// for (i = 0; i <= locationList.length; i++) {
		// 	console.log(locationList);
		// 	console.log("location list" + locationList[i].title);
		// };



			// Makes markers clickable
			// google.maps.event.addListener(marker, 'click', function() {
			// // map.setZoom(8);
			// // console.log('before move');
			// map.setCenter(marker.getPosition());
			// console.log(marker.description);
			// });
			// ADDS INFO WINDOW TO MARKER  
			// link = '';            bindInfoWindow(marker, map, locations[i][0], description, telephone, email, web, link);
		 //  var myoverlay = new google.maps.OverlayView();
		 //   myoverlay.draw = function () {
		 //    this.getPanes().markerLayer.id='markerLayer';
		 // };
		 // myoverlay.setMap(map);
	});    
			/*var flag = new google.maps.Marker({
				position: map.center, 
		});
		flag.setMap(self.map);
		*/



console.log("Yeah I see you");
	// },

// for (i=0; i < fakeDB.locations.length; i++) 
// 			var c = Math.sqrt( mapVariables.userLat * latitude + mapVariables.userLong * longitude );
// 			// var distance = google.maps.geometry.spherical.computeDistanceBetween(from:mapVariables.LatLng, to:thisLatLng, radius?:number);
// 				console.log(c);
