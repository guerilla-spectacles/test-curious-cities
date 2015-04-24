var fakeDB = {};
fakeDB.locations = [
	{
		title: 'Angst on Angst',
		description: 'This is a weird and ugly mural of some sort of hipster meta-angst.  #ugly',
		curiousType: 'Art',
		img: 'public/images/jollyRog.jpg',
		latitude: 45.5136190,
		longitude: -122.6590430,
		category: 'Art'
	},
	{
		title: 'ffka',
		description: 'fasdjkfa;lskdfja;lksdfj This is a weird and ugly mural of some sort of hipster meta-angst.  #ugly',
		curiousType: 'Stuff',
		img: 'public/images/jollyRog.jpg',
		latitude: 45.517555,
		longitude: -122.631819,
		category: 'Art'
	}];

var Marker = Backbone.Model.extend({

});

// var allMarkersView = new 
// a collection of models, each model is a marker, marker will have an associated view, 

var MapLocs = Backbone.Collection.extend({
	model: Marker,
	comparator: 'cid'
});

var mapLocs = new MapLocs();
	mapLocs.add(fakeDB.locations);
	console.log(mapLocs);

// make one view for each marker, iterate through collection, make a new view for each thing in collection to pass through. 

// var allMarkersView = new AllMarkersView({collection: mapLocs});

var AllMarkersView = Backbone.View.extend({
// google map 
	el: '#google-map',
	render: function() {
		this.collection.each(function (marker) {
			console.log('making a marker');
			var markerView = new MarkerView({model: marker});
			console.log('before markerView Render');
			markerView.render();
			console.log(markerView);
		});

	},
	initialize: function() {
		var self = this;
		self.render();
		console.log('allMarkersView hello')

	}
});
// this.view.model

var MarkerView = Backbone.View.extend({
	// each id
	// el: 
	// events: {
		// "click" : fucntion name
	// },
	// click function
	initialize: function(opts){
		var self = this;
		self.map = opts.map;
		console.log(self);
		self.render();
		console.log('here is map after installing from opts');
		console.log(map);
	},

	placeMarker: function(){
		console.log("Hi from placeMarker");
	},

	// Render stationary middle flag
	render: function(){

		// ['name', 'description', 'telephone', 'email', 'web', 'lat', 'long', 'img', 'category']
		// ['Spot 1', 'This is spot 1. Blah blah. #this #that', 'undefined', 'undefined', 'undefined', 45.5136190, -122.6520430, 'public/images/map-marker-image.png'],
		// ['Spot 2', 'This is spot 2. Beep boop. #beep #boop', 'undefined', 'undefined', 'undefined', 45.5196190, -122.6590430, 'public/images/map-marker-image.png'],
				// ['Spot 3', 'This is spot 3. Blah blah. #this #that', 'undefined', 'undefined', 'undefined', 45.5316190, -122.6320430, 'public/images/map-marker-image.png'],
				// ['Spot 4', 'This is spot 4. Beep boop. #beep #boop', 'undefined', 'undefined', 'undefined', 45.517555,  -122.631819, 'public/images/map-marker-image.png']
		// for (var i=0; i< locations.length; i++) {
		//   console.log('hiiiiiiiii');
		// var thisMarker = locations[i];
		// console.log(thisMarker);
		var desc = this.model.get('description');
		console.log(desc);
		console.log('hi!');
		var latitude= this.model.get('latitude');
		var longitude = this.model.get('longitude');
		var img = this.model.get('img');
		console.log('this is the image' + img);
		marker = new google.maps.Marker({
		// if (this.model.get('description') =='undefined'){ description ='';} else { description = this.model.get('description');}
		// if (this.model.telephone =='undefined'){ telephone ='';} else { telephone = this.model.telephone;}
		// if (this.model.email =='undefined'){ email ='';} else { email = this.model.email;}
		// if (this.model.web =='undefined'){ web ='';} else { web = this.model.web;}
		// if (this.model.markerType =='undefined'){ icon ='public/images/map-marker-image.png';} else { icon = this.model.markerType;}      
			icon: 'public/images/map-marker-image.png',
			position: new google.maps.LatLng(latitude, longitude),
			map: map,
			img: img,
			title: this.model.get('title'),
			description: this.model.get('description'),
			category: this.model.get('category'),
			// description
			
			// tel: telephone,
			// email: email,
			// web: web,
			id: 'markerLayer',
		});


			//Makes markers clickable
			// google.maps.event.addListener(marker, 'click', function() {
			// // map.setZoom(8);
			// console.log('before move');
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
	}});    
			/*var flag = new google.maps.Marker({
				position: map.center, 
		});
		flag.setMap(self.map);
		*/
console.log("Yeah I see you");
	// },



