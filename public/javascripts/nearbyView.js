var NearbyView = Backbone.View.extend({
	el: '#info-contents',
	events: {
		'markerClick' : 'renderMarkerInfo'
	},

	initialize: function(){
		var self = this;
		var theCode = "<div id='guide-button-div' class='info-dropdown center'><h3>Closest Curiosties!</h3><div id='the-list'><p>Listfksdj</p></div><div id='selected-marker'><p>fsd</p></div>"

		//makes the sidebar section
		oddity = theCode;
		$('#info-contents').append(oddity);
		console.log('hi');

	}

})