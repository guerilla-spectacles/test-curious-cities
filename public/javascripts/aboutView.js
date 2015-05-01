var AboutView = Backbone.View.extend({
	el: '#info-contents',

	initialize: function(){
		var self = this;
		
		//////////////////  About Curious Cities Sidebar//////////////////
		about = '<div id="about-button-div" class="info-dropdown center">' +
					"<h3>About Curious Cities</h3>" +
					"<p class='about'>Curious Cities is a location-based photo-sharing application highlighting local spots of interest based on user contributions. Our goal is to help users find new and exciting adventures off the beaten path.</p><br>" +
						"<p>Made By:<br>" +
						"<a href='https://github.com/aloosefish'>Ian Davis</a><br>" +
						"<a href='https://github.com/jahsierebecca'>Jahsie Ault</a><br>" +
						"<a href='https://github.com/ergray'>Eric Gray</a><br></p>" +
				"</div>";
		$('#info-contents').append(about);		
	}
})