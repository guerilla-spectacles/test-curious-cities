var ScoutMap = Backbone.View.extend({
	el: '#google-map',

	initialize: function(opts){
		var self = this;
		self.render();
		// console.log('here is map, and then self.map');
		// console.log(map);
		// console.log(self.map);
		var locationFlag = new MarkerView({map: map, collection: mapLocs});
		
		var curiousButtons = new Buttons();
		var StartBar = new sidebars('add');
		
		// console.log('here is location flag');
		// console.log(locationFlag);
		// console.log(locationFlag.placeMarker);

		//////////////////  ???????????? //////////////////
		// var scoutPlace = new scoutMapView({map: map});
		// google.maps.event.addListener(map, 'click', function(event) {
  // 			locationFlag.placeMarker();
  // 		});
		// console.log(map);
	},

	render: function(){

		//////////////////  Google maps API properties //////////////////
		var mapProp = {
		    //center:new google.maps.LatLng(45.517534,-122.648507),

		    zoom:12,
		    maxZoom: 18,
		    minZoom: 6,
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
        	{ "featureType": "poi.park", "elementType": "geometry.fill", "stylers": [ { "color": "#aadd55" } ] },
        	{ "featureType": "road.highway", "elementType": "labels", "stylers": [ { "visibility": "on" } ] },
        	{ "featureType": "road.arterial", "elementType": "labels.text", "stylers": [ { "visibility": "on" } ] },
        	{ "featureType": "road.local", "elementType": "labels.text", "stylers": [ { "visibility": "on" } ] },{ } ],
		};
		// google.maps.event.addListener(marker, 'click', function() {
		// 	console.log('clicked on map!')
		// };
		//////////////////  Declares the actual map  //////////////////
  		self.map = new google.maps.Map(document.getElementById("google-map"),mapProp);
  		
			//////////////////  Grabs users geolocation //////////////////
  		    if(navigator.geolocation) {
    			navigator.geolocation.getCurrentPosition(function(position) {
    			console.log('grabbing location from nav');
      			var pos = new google.maps.LatLng(position.coords.latitude,
            		position.coords.longitude);		      		
		      		map.setCenter(pos);

				//////////////////  You are here flag //////////////////
		      	var userLocation = new google.maps.Marker({
		      		map: map,
		      		position: pos,
		      		icon: 'images/you-are-here.png',
		      		id: 'usersLocation',
		      		animation: google.maps.Animation.DROP,
		      	})
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
			    map: map,
			    position: new google.maps.LatLng(45.517534,-122.648507),
			    content: content
			  };
			  map.setCenter(options.position);
      	//end Geolocation	
		};
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

