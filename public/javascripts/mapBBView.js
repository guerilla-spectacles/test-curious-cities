var ScoutMap = Backbone.View.extend({
	el: '#google-map',

	initialize: function(opts){

		var self = this;
		self.render();
		//var locationFlag = new MarkerView({map: map, collection: mapLocs});
		mapLocs.fetch();
		var curiousButtons = new Buttons();
		var StartBar = new OddView();
	},

	render: function(){

		//////////////////  Google maps API properties //////////////////
		var mapProp = {
		    //center:new google.maps.LatLng(45.517534,-122.648507),

		    zoom:14,
		    maxZoom: 18,
		    minZoom: 3,
	        zoomControl: true,
	        zoomControlOptions: {
	            style: google.maps.ZoomControlStyle.DEFAULT,
	        },
	        disableDoubleClickZoom: true,
	        mapTypeControl: true,
	        mapTypeControlOptions: {
	            style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
	        },
	        scaleControl: true,
	        scrollwheel: false,
	        panControl: true,
	        streetViewControl: true,
	        draggable : true,
	        overviewMapControl: false,
	        overviewMapControlOptions: {
	            opened: false,
	        },
			mapTypeId:google.maps.MapTypeId.ROADMAP,
        	styles: [ 
        	{ "stylers": [ { "saturation": -100 } ] },
        	{ "featureType": "water", "elementType": "geometry.fill", "stylers": [ { "color": "#0099dd" } ] },
        	{ "elementType": "labels", "stylers": [ { "visibility": "off" } ] },
        	{ "featureType": "poi.park", "elementType": "geometry.fill", "stylers": [ { "visibility": "on" } ] },
        	{ "featureType": "road.highway", "elementType": "labels", "stylers": [ { "visibility": "on" } ] },
        	{ "featureType": "road.arterial", "elementType": "labels.text", "stylers": [ { "visibility": "on" } ] },
        	{ "featureType": "road.local", "elementType": "labels.text", "stylers": [ { "visibility": "on" } ] },{ } ],
		};

		//////////////////  Grabs users geolocation //////////////////
	    if(navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
				console.log('grabbing location from nav');
				var pos = new google.maps.LatLng(position.coords.latitude,
	    		position.coords.longitude);		      		
	      		app.map.setCenter(pos);


				//////////////////  You are here marker //////////////////
      			var userLocation = new google.maps.Marker({
		      		map: app.map,
		      		position: pos,
		      		icon: 'images/you-are-here.png',
		      		id: 'usersLocation',
		      		animation: google.maps.Animation.DROP,

      			});
      			// mapVariables.userLat = position.coords.latitude;
		      	// mapVariables.userLong = position.coords.longitude;
		      	// mapVariables.LatLng = (position.coords.latitude, position.coords.longitude);
      					      	// return pos;	
    		}, function() {
      			handleNoGeolocation(true);
    		});
    	} else {
			//////////////////  If browser doesn't allow geo, use default //////////////////
			handleNoGeolocation(false);
		};

		//////////////////  Geolocation errors //////////////////		
		function handleNoGeolocation(errorFlag) {
  			if (errorFlag) {
  				console.log('location found an error');
			    var content = 'Error: The Geolocation service failed.';
			} else {
			  	console.log('grabbing map from no location');
			    var content = 'Error: Your browser doesn\'t support geolocation.';
			}
		var options = {
			map: app.map,
			position: new google.maps.LatLng(45.517534,-122.648507),
			content: content
		};
		app.map.setCenter(options.position);
      	//end Geolocation	
		};
		
		// google.maps.event.addListener(marker, 'click', function() {
		// 	console.log('clicked on map!')
		// };
		//////////////////  Declares the actual map  //////////////////
		app.map = new google.maps.Map(document.getElementById("google-map"),mapProp);
  		

	},	

});


//////////////////  Deleted code for potential "click to add a marker" //////////////////

// var scoutMapView = Backbone.View.extend({
// 	model: this.model,
// 	events: {
// 		'click #googleMap': 'placeMarker',

// 	},
// 	placeMarker: function(){
// 		console.log('heres a click');
//   		var moveMarker = new google.maps.Marker({
//     		position: location,
//     		map: map,
//   		});
//   		moveMarker.setMap(map); 
// 	},
// })
