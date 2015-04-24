var Marker = Backbone.Model.extend({

});

// a collection of models, each model is a marker, marker will have an associated view, 

var MapLocs = Backbone.Collection.extend({
  model: Marker,
  comparator: 'cid'
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
    }
    // ['name', 'description', 'telephone', 'email', 'web', 'lat', 'long', 'img', 'category']
		// ['Spot 1', 'This is spot 1. Blah blah. #this #that', 'undefined', 'undefined', 'undefined', 45.5136190, -122.6520430, 'public/images/map-marker-image.png'],
		// ['Spot 2', 'This is spot 2. Beep boop. #beep #boop', 'undefined', 'undefined', 'undefined', 45.5196190, -122.6590430, 'public/images/map-marker-image.png'],
        // ['Spot 3', 'This is spot 3. Blah blah. #this #that', 'undefined', 'undefined', 'undefined', 45.5316190, -122.6320430, 'public/images/map-marker-image.png'],
        // ['Spot 4', 'This is spot 4. Beep boop. #beep #boop', 'undefined', 'undefined', 'undefined', 45.517555,  -122.631819, 'public/images/map-marker-image.png']
    ];
    for (var i=0; i< locations.length; i++) {
      console.log('hiiiiiiiii');
    var thisMarker = locations[i];
    console.log(thisMarker);
		if (thisMarker.description =='undefined'){ description ='';} else { description = thisMarker.description;}
		if (thisMarker.telephone =='undefined'){ telephone ='';} else { telephone = thisMarker.telephone;}
		if (thisMarker.email =='undefined'){ email ='';} else { email = thisMarker.email;}
       	if (thisMarker.web =='undefined'){ web ='';} else { web = thisMarker.web;}
       	if (thisMarker.markerType =='undefined'){ icon ='public/images/map-marker-image.png';} else { icon = thisMarker.markerType;}
        marker = new google.maps.Marker({
            icon: 'public/images/map-marker-image.png',
            position: new google.maps.LatLng(thisMarker.latitude, thisMarker.longitude),
            map: map,
            img: thisMarker.img,
            title: thisMarker.title,
            description: thisMarker.description,
            category: thisMarker.category,
            // description
            
            // tel: telephone,
            // email: email,
            // web: web,
            id: 'markerLayer',

        });


      //Makes markers clickable
      google.maps.event.addListener(marker, 'click', function() {
      // map.setZoom(8);
      console.log('before move');
      map.setCenter(marker.getPosition());
      console.log(marker.description);
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


