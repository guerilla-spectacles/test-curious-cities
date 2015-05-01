var NearbyView = Backbone.View.extend({
	el: '#info-contents',
	events: {
		'markerClick' : 'renderMarkerInfo'
	},

	initialize: function(){
		var self = this;
		var theCode = "<div id='guide-button-div' class='info-dropdown center'>" +
			// "<div id='the-list'>" +
				// "<p>Listfksdj</p>" +
			// "</div>" +
			"<div id='selected-marker'>" +
				"<div class='curiousProfile'>" +
					"<h3>Belmont goats</h3>" +
					"<img class='curious-img' src='images/goat.JPG'>" +
					"<p class='curious-description'>Gone but not forgotten. We miss you goats!</p>" +
					"<p class='curious-type'>Category:<br>Nature</p>" +
					"</div>" +
				"</div>"

		//makes the sidebar section
		oddity = theCode;
		$('#info-contents').append(oddity);
		console.log('hi');
	}
})