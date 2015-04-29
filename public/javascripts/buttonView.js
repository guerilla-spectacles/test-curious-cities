//////////////////  Manages the menu buttons //////////////////
var Buttons = Backbone.View.extend({
	el: '#buttons',

	events: {
		'click #add-button' : 'createSB',
		'click #guide-button' : 'createSB',
		'click #about-button' : 'createSB',
	},

	initialize: function(){
			console.log('Hi from updatebutton')
	},

	//////////////////  Add Location Sidebar, takes opts from sidebarsView's initialize function //////////////////
	createSB: function(event, opts){
		event.preventDefault();
		$('#info-contents').children().remove();
		var target = $(event.target);
		var targetID = $(target).attr("id")
		if (targetID == 'add-button'){
			Add = new sidebars('add')
		} else if (targetID == 'guide-button'){
			Guide = new sidebars('guide')
			
		} else if (targetID == 'about-button'){
			Info = new sidebars('info')
		};	
	},
})