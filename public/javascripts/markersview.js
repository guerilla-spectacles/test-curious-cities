//////TO DO
// When click marker, clear sidebar and replace with info

//////////////////  Fake DB for build/test purposes //////////////////
var fakeDB = {};
fakeDB.locations = [
	{
		title: '(Fake DB 1: Angst on Angst',
		description: 'This is a weird and ugly mural of some sort of hipster meta-angst.  #ugly',
		curiousType: 'Art',
		img: 'public/images/jollyRog.jpg',
		latitude: 45.5136190,
		longitude: -122.6590430,
		category: 'Art'
	},
	{
		title: 'Fake DB 2: Blak',
		description: 'Blah blah blah, picture picture kflasjf;lasd f;alskjdf falsdkj  #ugly',
		curiousType: 'Stuff',
		img: 'public/images/fontina.png',
		latitude: 45.517555,
		longitude: -122.631819,
		category: 'Art'
	},
		{
		title: 'Fake DB 2: Blak',
		description: 'Blah blah blah, picture picture kflasjf;lasd f;alskjdf falsdkj  #ugly',
		curiousType: 'Stuff',
		img: 'public/images/fontina.png',
		latitude: 45.577555,
		longitude: -122.601819,
		category: 'Art'
	}];

//////////////////  Makes Marker model //////////////////
var Marker = Backbone.Model.extend({
});

// var allMarkersView = new 

//////////////////  Makes collection for all map locations //////////////////
var MapLocs = Backbone.Collection.extend({
	model: Marker,
	comparator: 'cid'
});
var mapLocs = new MapLocs();

//////////////////  Puts all objects from fake DB in the MapLocs collection //////////////////
mapLocs.add(fakeDB.locations);
// console.log(mapLocs);

//////////////////  Makes view for all of the markers //////////////////
var AllMarkersView = Backbone.View.extend({
	el: '#google-map',
	render: function() {
		this.collection.each(function (marker) {
			// console.log('making a marker');
			var markerView = new MarkerView({model: marker});
			// console.log('before markerView Render');
			markerView.render();
			// console.log(markerView);
		});
	},

	initialize: function() {
		var self = this;
		self.render();
		// console.log('allMarkersView hello')
	}
});

//////////////////  Makes view for each individual marker //////////////////
var MarkerView = Backbone.View.extend({
	// each id
	// el: 
	// var self = this;
	className : 'google-map-marker',

	events: {
		'click': 'locationClick'
	},

	locationClick: function(event) {
		console.log('clicked on a marker');
	},
	
	initialize: function(opts){
		var self = this;
		self.map = opts.map;
		// console.log(self);
		self.render();
		// console.log('here is map after installing from opts');
		// console.log(map);
	},

	placeMarker: function(){
		console.log("Hi from placeMarker");
	},

	// Render stationary middle flag
	render: function(){
		// this.id = this.cid;
		// console.log(this.id);
		// console.log('"this is the marker view ID:' + this.cid);
		var desc = this.model.get('description');
		// console.log(desc);
		// console.log('hi!');
		var latitude= this.model.get('latitude');
		var longitude = this.model.get('longitude');
		var img = this.model.get('img');
		// console.log('this is the image' + img);
		marker = new google.maps.Marker({

		//Google maps API stuff, helps prevent bugs.	
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
			id: 'markerLayer',
		});

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
	}});    
			/*var flag = new google.maps.Marker({
				position: map.center, 
		});
		flag.setMap(self.map);
		*/
console.log("Yeah I see you");
	// },



