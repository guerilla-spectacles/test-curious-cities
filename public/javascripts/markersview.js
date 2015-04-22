var Marker = Backbone.Model.extend({

});

var MapLocs = Backbone.Collection.extend({
  model: Marker
});

var markersView = Backbone.View.extend({

	initialize: function(opts){
		var self = this;
		self.map = opts.map;
		self.render();
		console.log('here is map after installing from opts');
		console.log(map);
	},

	placeMarker: function(){
		console.log("Hi from placeMarker")
	},

	// Render stationary middle flag
	render: function(){
    var locations = [
		['Spot 1', 'This is spot 1. Blah blah. #this #that', 'undefined', 'undefined', 'undefined', 45.5136190, -122.6520430, 'public/images/map-marker-image.png'],
		['Spot 2', 'This is spot 2. Beep boop. #beep #boop', 'undefined', 'undefined', 'undefined', 45.5196190, -122.6590430, 'public/images/map-marker-image.png'],
        ['Spot 3', 'This is spot 3. Blah blah. #this #that', 'undefined', 'undefined', 'undefined', 45.5316190, -122.6320430, 'public/images/map-marker-image.png'],
        ['Spot 4', 'This is spot 4. Beep boop. #beep #boop', 'undefined', 'undefined', 'undefined', 45.517555,  -122.631819, 'public/images/map-marker-image.png']
    ];
    for (i = 0; i < locations.length; i++) {
		if (locations[i][1] =='undefined'){ description ='';} else { description = locations[i][1];}
		if (locations[i][2] =='undefined'){ telephone ='';} else { telephone = locations[i][2];}
		if (locations[i][3] =='undefined'){ email ='';} else { email = locations[i][3];}
       	if (locations[i][4] =='undefined'){ web ='';} else { web = locations[i][4];}
       	if (locations[i][7] =='undefined'){ markericon ='';} else { markericon = locations[i][7];}
        marker = new google.maps.Marker({
            icon: locations[i][7],
            position: new google.maps.LatLng(locations[i][5], locations[i][6]),
            map: map,
            title: locations[i][0],
            // desc: description,
            // tel: telephone,
            // email: email,
            // web: web,
            id: 'markerLayer'
        });
      // ADDS INFO WINDOW TO MARKER  
      // link = '';            bindInfoWindow(marker, map, locations[i][0], description, telephone, email, web, link);
      var myoverlay = new google.maps.OverlayView();
     	myoverlay.draw = function () {
        this.getPanes().markerLayer.id='markerLayer';
     };
     myoverlay.setMap(map);
 }		
  		/*var flag = new google.maps.Marker({
  			position: map.center, 
		});
		flag.setMap(self.map);
		*/
console.log("Yeah I see you");
	},

});


