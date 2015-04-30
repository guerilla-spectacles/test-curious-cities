//////////////////  Fake DB for build/test purposes //////////////////
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

//////////////////  Makes view for each individual marker //////////////////
var MarkerView = Backbone.View.extend({
	// each id
	el: "#google-map",
	className : 'google-map-marker',

	
	initialize: function(){
		var self = this;
		self.map = app.map;
		self.render();
	},

	render: function(){

////////Work for potential closest locations
		// find the closest location to the user's location
        // var closest = 0;
        // var mindist = 99999;
        // var mapVariables = {
        // 	userLong: null,
        // 	userLat: null,
        // 	LatLng: null
        // }

        	/////////////////  Gathers info from model- preps for google maps /////////////////
			var desc = this.model.get('description');
			var latitude= this.model.get('latitude');
			var longitude = this.model.get('longitude');
			var img = this.model.get('img');
			var category = this.model.get('category');
			var title = this.model.get('title');

			/////////////////  Creates actual marker on map /////////////////
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
			marker.mycategory = category;              
        	marker.myname = name;
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

					////////MAkes the sidebar content from the marker info
					document.getElementById('info-contents').innerHTML=infoWindowInfo;
				};
			})(marker));
			locationList.push(marker);
		// }
		console.log(locationList);

		//THIS ONE
	        function makeSidebar() {
	        	console.log(locationList);
		        var html = "";
		        // var node = document.getElementById("loc-list");
		        for (var i=0; i<locationList.length; i++) { 
		        console.log(locationList[i].mycategory); 
		        	html += '<li><a href="javascript:myclick(' + i + ')">' + locationList[i].title + '<\/a></li>';
		        	// console.log(html);
	    	    }
	    	    var theListContents = "<ul>" + html + "</ul>";
	    	    console.log(theListContents);

	        	document.getElementById('the-list').innerHTML = theListContents;
	      	}
			makeSidebar();

	},

		// for (i = 0; i <= locationList.length; i++) {
		// 	console.log(locationList);
		// 	console.log("location list" + locationList[i].title);
		// };

	});    

console.log("Yeah I see you");